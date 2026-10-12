export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ContactResponse {
  success: boolean;
  message: string;
  code?: string;
  messageId?: string;
}

export async function sendContactMessage(data: ContactFormData): Promise<ContactResponse> {
  let response: Response;
  try {
    response = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  } catch {
    throw new Error(
      'Network error: Unable to reach the server. Please check your internet connection or contact swatibaretha6@gmail.com directly.'
    );
  }

  let result: any = null;
  const contentType = response.headers.get('content-type') || '';

  if (contentType.includes('application/json')) {
    try {
      result = await response.json();
    } catch {
      result = null;
    }
  } else {
    try {
      const rawText = await response.text();
      // If it's not a generic HTML document, use clean snippet
      if (rawText && !rawText.includes('<!DOCTYPE') && !rawText.includes('<html')) {
        result = { success: false, message: rawText.slice(0, 150) };
      }
    } catch {}
  }

  if (!response.ok) {
    const errorMsg =
      result?.message ||
      (response.status === 503
        ? 'Email service is temporarily unconfigured. Please contact swatibaretha6@gmail.com directly.'
        : response.status === 429
        ? 'Too many messages sent. Please wait a few minutes before trying again.'
        : response.status === 400
        ? 'Please check your form details and ensure all fields are valid.'
        : response.status === 502
        ? 'Email provider communication issue. Please reach out to swatibaretha6@gmail.com directly.'
        : `Email delivery failed (HTTP ${response.status}). Please email swatibaretha6@gmail.com directly.`);

    throw new Error(errorMsg);
  }

  return result || { success: true, message: 'Your message has been sent successfully!' };
}
