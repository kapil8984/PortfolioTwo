import { generateAIResponse, GroqServiceError } from '../lib/groqService';
import { performWebSearch } from '../lib/searchService';
import { sendJsonResponse } from '../contact';

// Basic in-memory rate limiter per warm container (25 queries per minute per IP)
const IP_REQUEST_LOG = new Map<string, { count: number; lastReset: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 25;

async function getRequestBody(req: any): Promise<any> {
  if (req?.body && typeof req.body === 'object') {
    return req.body;
  }
  if (typeof req?.body === 'string') {
    try {
      return JSON.parse(req.body);
    } catch {
      return {};
    }
  }
  if (typeof req?.json === 'function') {
    try {
      return await req.json();
    } catch {
      return {};
    }
  }
  if (typeof req?.on === 'function') {
    return new Promise((resolve) => {
      let data = '';
      req.on('data', (chunk: any) => { data += chunk; });
      req.on('end', () => {
        try { resolve(JSON.parse(data)); } catch { resolve({}); }
      });
      req.on('error', () => resolve({}));
    });
  }
  return {};
}

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    if (typeof res?.setHeader === 'function') {
      res.setHeader('Allow', ['POST']);
    }
    return sendJsonResponse(res, 405, { error: `Method ${req.method} Not Allowed` });
  }

  // Rate Limiting Check
  const clientIp = (req.headers && (req.headers['x-forwarded-for'] as string)) || req.socket?.remoteAddress || '127.0.0.1';
  const now = Date.now();
  const rateData = IP_REQUEST_LOG.get(clientIp) || { count: 0, lastReset: now };

  if (now - rateData.lastReset > RATE_LIMIT_WINDOW) {
    rateData.count = 1;
    rateData.lastReset = now;
  } else {
    rateData.count += 1;
  }
  IP_REQUEST_LOG.set(clientIp, rateData);

  if (rateData.count > MAX_REQUESTS_PER_WINDOW) {
    console.warn('[API/ai/chat:RATE_LIMIT]', { clientIp });
    return sendJsonResponse(res, 429, {
      error: 'Rate limit exceeded. Please wait a moment before sending more messages.',
    });
  }

  try {
    const body = await getRequestBody(req);
    const { messages } = body || {};

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return sendJsonResponse(res, 400, { error: 'Please provide a valid messages array.' });
    }

    const lastMessage = messages[messages.length - 1];
    if (!lastMessage || typeof lastMessage.content !== 'string' || !lastMessage.content.trim()) {
      return sendJsonResponse(res, 400, { error: 'Empty message content.' });
    }

    if (lastMessage.content.length > 2000) {
      return sendJsonResponse(res, 400, { error: 'Message exceeds maximum length of 2000 characters.' });
    }

    // Check if query is asking for current news / real-time updates
    const lowerContent = lastMessage.content.toLowerCase();
    const needsSearch =
      /\b(news|latest|today|currently|president|election|updates? from|weather)\b/i.test(
        lowerContent
      ) &&
      !lowerContent.includes('swati') &&
      !lowerContent.includes('viberent') &&
      !lowerContent.includes('mommyist') &&
      !lowerContent.includes('ayurveda');

    let searchResults = null;
    if (needsSearch) {
      try {
        searchResults = await performWebSearch(lastMessage.content);
      } catch (searchErr) {
        console.warn('[API/ai/chat:SEARCH_FAILED]', searchErr);
      }
    }

    // Call Groq AI service with portfolio knowledge and search context
    const aiResponse = await generateAIResponse(messages, searchResults);

    return sendJsonResponse(res, 200, aiResponse);
  } catch (err: any) {
    const statusCode = err instanceof GroqServiceError ? err.statusCode : 500;
    const errorCode = err instanceof GroqServiceError ? err.code : 'INTERNAL_SERVER_ERROR';

    console.error('[API/ai/chat:ERROR]', {
      statusCode,
      errorCode,
      message: err.message,
    });

    return sendJsonResponse(res, statusCode, {
      error: err.message || 'An error occurred while generating the assistant response.',
    });
  }
}
