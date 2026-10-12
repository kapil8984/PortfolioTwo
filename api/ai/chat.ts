import { generateAIResponse } from '../lib/groqService';
import { performWebSearch } from '../lib/searchService';

// Basic in-memory rate limiter for serverless instance protection
const IP_REQUEST_LOG = new Map<string, { count: number; lastReset: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 25; // 25 queries per minute per IP

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }

  // Rate Limiting Check
  const clientIp =
    (req.headers['x-forwarded-for'] as string) || req.socket?.remoteAddress || '127.0.0.1';
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
    return res.status(429).json({
      error: 'Rate limit exceeded. Please wait a moment before sending more messages.',
    });
  }

  try {
    const { messages } = req.body || {};

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: 'Please provide a valid messages array.' });
    }

    const lastMessage = messages[messages.length - 1];
    if (!lastMessage || typeof lastMessage.content !== 'string' || !lastMessage.content.trim()) {
      return res.status(400).json({ error: 'Empty message content.' });
    }

    if (lastMessage.content.length > 2000) {
      return res.status(400).json({ error: 'Message exceeds maximum length of 2000 characters.' });
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
        console.warn('[API/chat] Web search execution failed:', searchErr);
      }
    }

    // Call Groq AI service with portfolio knowledge and search context
    const aiResponse = await generateAIResponse(messages, searchResults);

    return res.status(200).json(aiResponse);
  } catch (err: any) {
    console.error('[API/chat:ERROR]', err.message);
    return res.status(500).json({
      error: err.message || 'An error occurred while generating the assistant response.',
    });
  }
}
