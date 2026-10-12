import { sendEmail, EmailServiceError } from './lib/emailService';

// Standardized response helper for Node.js, Vercel wrapper, and Web runtimes
export function sendJsonResponse(res: any, statusCode: number, data: any) {
  const jsonStr = JSON.stringify(data);
  if (typeof res?.status === 'function' && typeof res?.json === 'function') {
    return res.status(statusCode).json(data);
  }
  if (typeof res?.setHeader === 'function' && typeof res?.end === 'function') {
    res.statusCode = statusCode;
    res.setHeader('Content-Type', 'application/json');
    return res.end(jsonStr);
  }
  return new Response(jsonStr, {
    status: statusCode,
    headers: { 'Content-Type': 'application/json' },
  });
}

// Robust body parser handling pre-parsed objects, raw strings, and streams
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

// In-memory rate limiter per warm container (10 submissions per 5 minutes per IP)
const IP_SUBMIT_LOG = new Map<string, { count: number; lastReset: number }>();
const RATE_LIMIT_WINDOW = 5 * 60 * 1000;
const MAX_SUBMISSIONS_PER_WINDOW = 25;

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

export default async function handler(req: any, res: any) {
  // Method validation
  if (req.method !== 'POST') {
    if (typeof res?.setHeader === 'function') {
      res.setHeader('Allow', ['POST']);
    }
    return sendJsonResponse(res, 405, {
      success: false,
      message: `Method ${req.method} Not Allowed. This endpoint only accepts POST requests.`,
    });
  }

  // Rate Limiting
  const clientIp = (req.headers && (req.headers['x-forwarded-for'] as string)) || req.socket?.remoteAddress || '127.0.0.1';
  const now = Date.now();
  const rateData = IP_SUBMIT_LOG.get(clientIp) || { count: 0, lastReset: now };

  if (now - rateData.lastReset > RATE_LIMIT_WINDOW) {
    rateData.count = 1;
    rateData.lastReset = now;
  } else {
    rateData.count += 1;
  }
  IP_SUBMIT_LOG.set(clientIp, rateData);

  if (rateData.count > MAX_SUBMISSIONS_PER_WINDOW) {
    console.warn('[API/contact:RATE_LIMIT]', { clientIp, count: rateData.count });
    return sendJsonResponse(res, 429, {
      success: false,
      message: 'Too many submissions. Please wait a few minutes before trying again.',
    });
  }

  try {
    const body = await getRequestBody(req);

    // Spam Honeypot Check
    if (body._gotcha || body.hp) {
      console.warn('[API/contact:SPAM_BOT_BLOCKED] Honeypot field triggered.');
      return sendJsonResponse(res, 400, { success: false, message: 'Invalid submission.' });
    }

    const { name, email, subject, message } = body;

    // Strict Input Validation
    if (!name || typeof name !== 'string' || name.trim().length === 0) {
      return sendJsonResponse(res, 400, {
        success: false,
        message: 'Please provide your name.',
      });
    }

    if (name.trim().length > 100) {
      return sendJsonResponse(res, 400, {
        success: false,
        message: 'Name exceeds maximum length of 100 characters.',
      });
    }

    if (!email || typeof email !== 'string' || !EMAIL_REGEX.test(email.trim())) {
      return sendJsonResponse(res, 400, {
        success: false,
        message: 'Please provide a valid email address (e.g., name@example.com).',
      });
    }

    if (email.trim().length > 254) {
      return sendJsonResponse(res, 400, {
        success: false,
        message: 'Email address exceeds maximum length of 254 characters.',
      });
    }

    if (!subject || typeof subject !== 'string' || subject.trim().length === 0) {
      return sendJsonResponse(res, 400, {
        success: false,
        message: 'Please provide a subject for your inquiry.',
      });
    }

    if (subject.trim().length > 200) {
      return sendJsonResponse(res, 400, {
        success: false,
        message: 'Subject exceeds maximum length of 200 characters.',
      });
    }

    if (!message || typeof message !== 'string' || message.trim().length < 10) {
      return sendJsonResponse(res, 400, {
        success: false,
        message: 'Message must be at least 10 characters long.',
      });
    }

    if (message.trim().length > 2500) {
      return sendJsonResponse(res, 400, {
        success: false,
        message: 'Message exceeds maximum length of 2500 characters.',
      });
    }

    // Dispatch email
    const result = await sendEmail({
      name: name.trim(),
      email: email.trim(),
      subject: subject.trim(),
      message: message.trim(),
    });

    return sendJsonResponse(res, 200, result);
  } catch (err: any) {
    const statusCode = err instanceof EmailServiceError ? err.statusCode : 500;
    const errorCode = err instanceof EmailServiceError ? err.code : 'INTERNAL_SERVER_ERROR';

    console.error('[API/contact:ERROR]', {
      statusCode,
      errorCode,
      message: err.message,
    });

    return sendJsonResponse(res, statusCode, {
      success: false,
      code: errorCode,
      message: err.message || 'An unexpected error occurred while processing your message.',
    });
  }
}
