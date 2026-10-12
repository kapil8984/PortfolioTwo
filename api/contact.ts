// Self-contained Vercel Serverless Function for Contact Email Dispatch
// Zero relative imports to prevent ERR_MODULE_NOT_FOUND in Node ESM runtimes

export class EmailServiceError extends Error {
  statusCode: number;
  code: string;

  constructor(statusCode: number, code: string, message: string) {
    super(message);
    this.name = 'EmailServiceError';
    this.statusCode = statusCode;
    this.code = code;
  }
}

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

function sanitizeHeader(val: string): string {
  return val.replace(/[\r\n\t]/g, ' ').replace(/\s+/g, ' ').trim();
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

async function executeEmailSend(msg: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) {
  const apiKey = (process.env.EMAIL_PROVIDER_API_KEY || '').trim();
  const recipientEmail = (process.env.CONTACT_RECIPIENT_EMAIL || 'swatibaretha6@gmail.com').trim();
  const configuredSender = (process.env.CONTACT_SENDER_EMAIL || '').trim();
  const provider = (process.env.EMAIL_PROVIDER || (apiKey.startsWith('SG.') ? 'sendgrid' : 'resend')).toLowerCase();

  console.log('[EmailService:START] Dispatching contact message', {
    hasApiKey: !!apiKey,
    provider,
    recipientEmail,
    hasConfiguredSender: !!configuredSender,
  });

  if (!apiKey) {
    console.error('[EmailService:CONFIG_ERROR] EMAIL_PROVIDER_API_KEY is not configured.');
    throw new EmailServiceError(
      503,
      'CONFIGURATION_MISSING',
      'The contact email service is not configured. Please set EMAIL_PROVIDER_API_KEY in Vercel environment variables or contact swatibaretha6@gmail.com directly.'
    );
  }

  const cleanName = sanitizeHeader(msg.name);
  const cleanSubject = sanitizeHeader(msg.subject);
  const cleanReplyTo = sanitizeHeader(msg.email);

  const timestampIso = new Date().toISOString();
  const timestampFormatted = new Date().toLocaleString('en-US', {
    timeZone: 'Asia/Kolkata',
    dateStyle: 'full',
    timeStyle: 'long',
  });

  const emailSubject = `[Portfolio Contact] ${cleanSubject} - from ${cleanName}`;
  const textBody = `New portfolio contact submission received:
--------------------------------------------------
Sender Name:  ${cleanName}
Sender Email: ${cleanReplyTo}
Subject:      ${cleanSubject}
Timestamp:    ${timestampFormatted} (${timestampIso})
--------------------------------------------------

Message:
${msg.message.trim()}

--------------------------------------------------
Destination: ${recipientEmail}
`;

  const htmlBody = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #ffffff; color: #1e293b;">
      <div style="border-bottom: 2px solid #7C5CFC; padding-bottom: 12px; margin-bottom: 20px;">
        <h2 style="color: #7C5CFC; margin: 0; font-size: 20px;">New Portfolio Contact Message</h2>
        <span style="font-size: 12px; color: #64748b;">Delivered via Swati Baretha Portfolio</span>
      </div>

      <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 14px;">
        <tr>
          <td style="padding: 6px 0; color: #64748b; width: 120px;"><strong>Sender Name:</strong></td>
          <td style="padding: 6px 0; color: #0f172a; font-weight: 600;">${escapeHtml(cleanName)}</td>
        </tr>
        <tr>
          <td style="padding: 6px 0; color: #64748b;"><strong>Sender Email:</strong></td>
          <td style="padding: 6px 0;"><a href="mailto:${escapeHtml(cleanReplyTo)}" style="color: #7C5CFC; text-decoration: none;">${escapeHtml(cleanReplyTo)}</a></td>
        </tr>
        <tr>
          <td style="padding: 6px 0; color: #64748b;"><strong>Subject:</strong></td>
          <td style="padding: 6px 0; color: #0f172a;">${escapeHtml(cleanSubject)}</td>
        </tr>
        <tr>
          <td style="padding: 6px 0; color: #64748b;"><strong>Date & Time:</strong></td>
          <td style="padding: 6px 0; color: #475569; font-size: 13px;">${escapeHtml(timestampFormatted)}</td>
        </tr>
      </table>

      <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px; margin-bottom: 20px;">
        <h4 style="margin: 0 0 8px 0; color: #475569; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Message Content:</h4>
        <p style="margin: 0; white-space: pre-wrap; line-height: 1.6; color: #0f172a; font-size: 14px;">${escapeHtml(msg.message.trim())}</p>
      </div>

      <div style="border-top: 1px solid #e2e8f0; padding-top: 12px; font-size: 12px; color: #94a3b8; text-align: center;">
        Direct reply to this email will send your response to <strong>${escapeHtml(cleanReplyTo)}</strong>.
      </div>
    </div>
  `;

  // Resend / SendGrid dispatch
  if (provider === 'sendgrid') {
    const sgSender = configuredSender || 'portfolio@swatibaretha.dev';
    console.log('[EmailService:SENDGRID] Initiating SendGrid request');

    const sgResponse = await fetch('https://api.sendgrid.com/v3/mail/send', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        personalizations: [{ to: [{ email: recipientEmail }], subject: emailSubject }],
        from: { email: sgSender, name: 'Swati Baretha Portfolio' },
        reply_to: { email: cleanReplyTo, name: cleanName },
        content: [
          { type: 'text/plain', value: textBody },
          { type: 'text/html', value: htmlBody },
        ],
      }),
    });

    if (!sgResponse.ok) {
      const errorText = await sgResponse.text().catch(() => '');
      console.error('[EmailService:SENDGRID_ERROR]', { status: sgResponse.status });
      throw new EmailServiceError(
        502,
        'PROVIDER_REJECTION',
        `SendGrid provider error (${sgResponse.status}): ${errorText || 'Failed to dispatch email'}`
      );
    }

    return { success: true, message: 'Message delivered successfully to swatibaretha6@gmail.com.' };
  }

  // Resend Provider (default)
  let resendSender = 'Swati Portfolio <onboarding@resend.dev>';
  if (configuredSender) {
    const lower = configuredSender.toLowerCase();
    if (lower.includes('@gmail.com') || lower.includes('@yahoo.com') || lower.includes('@outlook.com') || lower.includes('@hotmail.com')) {
      console.warn('[EmailService:RESEND_SENDER_WARNING] SENDER_EMAIL cannot be a public webmail domain in Resend. Using onboarding@resend.dev.');
    } else {
      resendSender = configuredSender.includes('<') ? configuredSender : `Swati Portfolio <${configuredSender}>`;
    }
  }

  console.log('[EmailService:RESEND] Initiating Resend API request', {
    senderUsed: resendSender,
    toRecipient: recipientEmail,
  });

  const resendResponse = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: resendSender,
      to: [recipientEmail],
      reply_to: cleanReplyTo,
      subject: emailSubject,
      text: textBody,
      html: htmlBody,
    }),
  });

  const resendData = await resendResponse.json().catch(() => ({}));

  if (!resendResponse.ok) {
    const providerMsg = resendData.message || `Resend HTTP error ${resendResponse.status}`;
    console.error('[EmailService:RESEND_ERROR]', {
      status: resendResponse.status,
      name: resendData.name,
      message: providerMsg,
    });

    // Actionable detection of Resend's free sandbox recipient restriction:
    if (resendResponse.status === 403 && (providerMsg.includes('testing emails') || providerMsg.includes('own email address'))) {
      throw new EmailServiceError(
        403,
        'RESEND_TEST_DOMAIN_RESTRICTION',
        `Resend test domain policy: ${providerMsg}. (Action required: To send directly to swatibaretha6@gmail.com, verify a custom domain in Resend dashboard at resend.com/domains, or temporarily change CONTACT_RECIPIENT_EMAIL in Vercel to your Resend account email).`
      );
    }

    throw new EmailServiceError(
      resendResponse.status === 401 ? 401 : 502,
      'PROVIDER_REJECTION',
      `Email provider rejected dispatch: ${providerMsg}`
    );
  }

  console.log('[EmailService:SUCCESS] Resend accepted message', { messageId: resendData.id });
  return {
    success: true,
    message: 'Your message has been successfully delivered to swatibaretha6@gmail.com!',
    messageId: resendData.id,
  };
}

// In-memory rate limiter per warm container (25 submissions per 5 minutes per IP)
const IP_SUBMIT_LOG = new Map<string, { count: number; lastReset: number }>();
const RATE_LIMIT_WINDOW = 5 * 60 * 1000;
const MAX_SUBMISSIONS_PER_WINDOW = 25;
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    if (typeof res?.setHeader === 'function') {
      res.setHeader('Allow', ['POST']);
    }
    return sendJsonResponse(res, 405, {
      success: false,
      message: `Method ${req.method} Not Allowed. This endpoint only accepts POST requests.`,
    });
  }

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

    if (body._gotcha || body.hp) {
      console.warn('[API/contact:SPAM_BOT_BLOCKED] Honeypot triggered.');
      return sendJsonResponse(res, 400, { success: false, message: 'Invalid submission.' });
    }

    const { name, email, subject, message } = body;

    if (!name || typeof name !== 'string' || name.trim().length === 0) {
      return sendJsonResponse(res, 400, { success: false, message: 'Please provide your name.' });
    }

    if (name.trim().length > 100) {
      return sendJsonResponse(res, 400, { success: false, message: 'Name exceeds maximum length of 100 characters.' });
    }

    if (!email || typeof email !== 'string' || !EMAIL_REGEX.test(email.trim())) {
      return sendJsonResponse(res, 400, { success: false, message: 'Please provide a valid email address (e.g., name@example.com).' });
    }

    if (email.trim().length > 254) {
      return sendJsonResponse(res, 400, { success: false, message: 'Email address exceeds maximum length of 254 characters.' });
    }

    if (!subject || typeof subject !== 'string' || subject.trim().length === 0) {
      return sendJsonResponse(res, 400, { success: false, message: 'Please provide a subject for your inquiry.' });
    }

    if (subject.trim().length > 200) {
      return sendJsonResponse(res, 400, { success: false, message: 'Subject exceeds maximum length of 200 characters.' });
    }

    if (!message || typeof message !== 'string' || message.trim().length < 10) {
      return sendJsonResponse(res, 400, { success: false, message: 'Message must be at least 10 characters long.' });
    }

    if (message.trim().length > 2500) {
      return sendJsonResponse(res, 400, { success: false, message: 'Message exceeds maximum length of 2500 characters.' });
    }

    const result = await executeEmailSend({
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
