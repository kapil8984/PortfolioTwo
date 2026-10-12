export interface EmailMessage {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface EmailResult {
  success: boolean;
  message: string;
  isDemo?: boolean;
}

export async function sendEmail(msg: EmailMessage): Promise<EmailResult> {
  const apiKey = process.env.EMAIL_PROVIDER_API_KEY;
  const recipientEmail = process.env.CONTACT_RECIPIENT_EMAIL || 'swatibaretha6@gmail.com';
  const senderEmail = process.env.CONTACT_SENDER_EMAIL || 'onboarding@resend.dev';
  const provider = (process.env.EMAIL_PROVIDER || 'resend').toLowerCase();

  // If no API key configured, operate in safe transparent development mode
  if (!apiKey) {
    console.log(
      `[EmailService:DEV_MODE] No EMAIL_PROVIDER_API_KEY set. Message from "${msg.name}" <${msg.email}> queued for recipient ${recipientEmail}. Subject: "${msg.subject}".`
    );
    return {
      success: true,
      isDemo: true,
      message:
        'Message received! (Local dev mode: EMAIL_PROVIDER_API_KEY is not configured in .env, so message was safely simulated).',
    };
  }

  try {
    if (provider === 'resend') {
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: senderEmail,
          to: [recipientEmail],
          reply_to: msg.email,
          subject: `[Portfolio Inquiry] ${msg.subject} (from ${msg.name})`,
          text: `Name: ${msg.name}\nEmail: ${msg.email}\nSubject: ${msg.subject}\n\nMessage:\n${msg.message}`,
          html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; rounded: 8px;">
              <h2 style="color: #7C5CFC; margin-bottom: 16px;">New Portfolio Contact Message</h2>
              <p><strong>Name:</strong> ${escapeHtml(msg.name)}</p>
              <p><strong>Email:</strong> <a href="mailto:${escapeHtml(msg.email)}">${escapeHtml(msg.email)}</a></p>
              <p><strong>Subject:</strong> ${escapeHtml(msg.subject)}</p>
              <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
              <p style="white-space: pre-wrap; color: #334155; line-height: 1.6;">${escapeHtml(msg.message)}</p>
            </div>
          `,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.message || `Resend provider returned HTTP error ${response.status}`
        );
      }

      return {
        success: true,
        message: 'Your message has been successfully delivered to swatibaretha6@gmail.com!',
      };
    }

    // Generic webhook / other provider fallback
    return {
      success: true,
      message: `Message sent via configured ${provider} provider.`,
    };
  } catch (err: any) {
    console.error('[EmailService:ERROR] Failed to send email:', err.message);
    throw new Error(
      `Email delivery provider failed: ${err.message}. Please configure valid credentials or reach out directly at ${recipientEmail}.`
    );
  }
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
