export interface AIChatRequest {
  messages: { role: 'user' | 'assistant' | 'system'; content: string }[];
}

export interface AIChatResponse {
  reply: string;
  sources?: { title: string; url?: string; snippet?: string }[];
  isDemoFallback?: boolean;
}

export async function sendChatMessage(messages: { role: 'user' | 'assistant' | 'system'; content: string }[]): Promise<AIChatResponse> {
  const response = await fetch('/api/ai/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ messages }),
  });

  const data = await response.json().catch(() => ({
    reply: 'Server communication error. Please verify connection and retry.',
  }));

  if (!response.ok) {
    throw new Error(data.error || data.reply || `API returned status ${response.status}`);
  }

  return data;
}
