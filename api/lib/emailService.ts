export interface EmailMessage {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface EmailResult {
  success: boolean;
  message: string;
  messageId?: string;
}

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

export async function sendEmail(msg: EmailMessage): Promise<EmailResult> {
  const apiKey = (process.env.EMAIL_PROVIDER_API_KEY || '').trim();
  const recipientEmail = (process.env.CONTACT_RECIPIENT_EMAIL || 'swatibaretha6@gmail.com').trim();
  const configuredSender = (process.env.CONTACT_SENDER_EMAIL || '').trim();
  const provider = (process.env.EMAIL_PROVIDER || (apiKey.startsWith('SG.') ? 'sendgrid' : 'resend')).toLowerCase();

  // Safe server-side diagnostic logging (NO secrets, NO message payload)
  console.log('[EmailService:START] Processing email dispatch', {
    hasApiKey: !!apiKey,
    provider,
    hasConfiguredSender: !!configuredSender,
    recipientConfigured: recipientEmail,
  });

  // Strict check: Never simulate success in production
  if (!apiKey) {
    console.error('[EmailService:CONFIG_ERROR] EMAIL_PROVIDER_API_KEY is not configured.');
    throw new EmailServiceError(
      503,
      'CONFIGURATION_MISSING',
      'The contact email service is not configured. Please contact swatibaretha6@gmail.com directly or set EMAIL_PROVIDER_API_KEY in Vercel.'
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
Recipient: ${recipientEmail}
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

  // Provider Dispatch
  try {
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
          personalizations: [
            {
              to: [{ email: recipientEmail }],
              subject: emailSubject,
            },
          ],
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

      console.log('[EmailService:SUCCESS] SendGrid accepted message');
      return {
        success: true,
        message: 'Message delivered successfully to swatibaretha6@gmail.com.',
      };
    }

    // Default Provider: Resend (REST API)
    // Domain safety: If configuredSender is a webmail address (e.g. @gmail.com), Resend rejects with 422 because webmail domains cannot be verified.
    let resendSender = 'Swati Portfolio <onboarding@resend.dev>';
    if (configuredSender) {
      const lower = configuredSender.toLowerCase();
      if (lower.includes('@gmail.com') || lower.includes('@yahoo.com') || lower.includes('@outlook.com') || lower.includes('@hotmail.com')) {
        console.warn('[EmailService:RESEND_SENDER_WARNING] SENDER_EMAIL cannot be a public webmail domain in Resend. Using "onboarding@resend.dev".');
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
        errorCategory: 'PROVIDER_REJECTION',
        message: providerMsg,
      });

      // Special handling for Resend testing domain restriction:
      if (resendResponse.status === 403 && providerMsg.includes('testing emails')) {
        throw new EmailServiceError(
          403,
          'RESEND_TEST_DOMAIN_RESTRICTION',
          `Resend test domain notice: ${providerMsg}. (Action required: verify your domain in Resend or ensure recipient matches your Resend account email).`
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
  } catch (err: any) {
    if (err instanceof EmailServiceError) {
      throw err;
    }
    console.error('[EmailService:UNEXPECTED_ERROR]', { errorName: err.name, message: err.message });
    throw new EmailServiceError(
      502,
      'PROVIDER_COMMUNICATION_ERROR',
      `Failed to communicate with email provider: ${err.message}`
    );
  }
}
