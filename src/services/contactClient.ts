export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ContactResponse {
  success: boolean;
  message: string;
  isDemo?: boolean;
}

export async function sendContactMessage(data: ContactFormData): Promise<ContactResponse> {
  const response = await fetch('/api/contact', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  const result = await response.json().catch(() => ({
    success: false,
    message: 'An unexpected response was returned by the server.',
  }));

  if (!response.ok) {
    throw new Error(result.message || `Server responded with status ${response.status}`);
  }

  return result;
}
