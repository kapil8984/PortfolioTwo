export interface AIChatRequest {
  messages: { role: 'user' | 'assistant' | 'system'; content: string }[];
}

export interface AIChatResponse {
  reply: string;
  sources?: { title: string; url?: string; snippet?: string }[];
}

export async function sendChatMessage(
  messages: { role: 'user' | 'assistant' | 'system'; content: string }[]
): Promise<AIChatResponse> {
  let response: Response;
  try {
    response = await fetch('/api/ai/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ messages }),
    });
  } catch {
    throw new Error('Network error: Unable to connect to the AI Assistant. Please check your connection.');
  }

  let data: any = null;
  const contentType = response.headers.get('content-type') || '';

  if (contentType.includes('application/json')) {
    try {
      data = await response.json();
    } catch {
      data = null;
    }
  } else {
    try {
      const rawText = await response.text();
      if (rawText && !rawText.includes('<!DOCTYPE') && !rawText.includes('<html')) {
        data = { error: rawText.slice(0, 150) };
      }
    } catch {}
  }

  if (!response.ok) {
    const errorMsg =
      data?.error ||
      data?.message ||
      (response.status === 503
        ? 'The AI Assistant is currently unconfigured. Please ensure GROQ_API_KEY is configured in Vercel.'
        : response.status === 429
        ? 'Query limit reached. Please wait a moment before sending another message.'
        : `AI Service encountered an error (HTTP ${response.status}).`);

    throw new Error(errorMsg);
  }

  return data || { reply: 'No response received from assistant.' };
}
