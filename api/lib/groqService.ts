import Groq from 'groq-sdk';
import { PORTFOLIO_KNOWLEDGE } from './knowledgeBase';
import { SearchResults } from './searchService';

interface ChatMessageInput {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export interface GroqServiceResponse {
  reply: string;
  sources?: { title: string; url?: string; snippet?: string }[];
}

export class GroqServiceError extends Error {
  statusCode: number;
  code: string;

  constructor(statusCode: number, code: string, message: string) {
    super(message);
    this.name = 'GroqServiceError';
    this.statusCode = statusCode;
    this.code = code;
  }
}

export async function generateAIResponse(
  messages: ChatMessageInput[],
  searchResults?: SearchResults | null
): Promise<GroqServiceResponse> {
  const apiKey = (process.env.GROQ_API_KEY || '').trim();
  const configuredModel = (process.env.GROQ_MODEL || 'llama-3.3-70b-versatile').trim();

  // Safe server logging (NO secrets)
  console.log('[GroqService:START]', {
    hasApiKey: !!apiKey,
    configuredModel,
    messageCount: messages.length,
    hasSearchResults: !!(searchResults && searchResults.results.length > 0),
  });

  if (!apiKey) {
    console.error('[GroqService:CONFIG_ERROR] GROQ_API_KEY is missing.');
    throw new GroqServiceError(
      503,
      'GROQ_KEY_MISSING',
      'The AI Assistant service is not configured. Please ensure GROQ_API_KEY is configured in Vercel environment variables.'
    );
  }

  const systemPrompt = `You are Swati's AI Assistant, representing Swati Baretha (.NET Full Stack Developer) on her portfolio website.
Your role is to assist visitors, recruiters, and technical interviewers by providing clear, accurate, and insightful answers.

VERIFIED PORTFOLIO KNOWLEDGE:
${PORTFOLIO_KNOWLEDGE}

${
  searchResults && searchResults.results.length > 0
    ? `LIVE WEB SEARCH RESULTS FOR "${searchResults.query}":
${searchResults.results
  .map((r, i) => `[${i + 1}] Title: ${r.title}\nURL: ${r.url}\nSummary: ${r.snippet}\nDate: ${r.publishedDate || 'N/A'}`)
  .join('\n\n')}

INSTRUCTIONS FOR LIVE SEARCH:
Synthesize the above sources into a readable response. Always cite sources appropriately. Do not invent links or news.`
    : `NOTE ON CURRENT NEWS & REAL-TIME SEARCH:
Live web search API is currently not active. If the user asks about current events, breaking news, or today's updates, clearly state that live web search is not configured on this server, then answer using your trained general knowledge while acknowledging timeliness.`
}

RESPONSE GUIDELINES:
1. When asked about Swati Baretha, her skills, or her projects (Viberent, Mommyist, The Great Ayurveda), adhere strictly to the verified facts above.
2. If asked whether The Great Ayurveda uses real WebRTC or is live in production, be completely honest: explain that it is an architectural portfolio demo with simulated video consultation screens (using ICallProvider abstraction) and simulated payments/OTP.
3. For general technical questions (e.g. "Difference between MVC and Web API", "Explain MVVM", "What are REST APIs?"), give authoritative, well-structured software engineering explanations with code snippets or bullet points when helpful.
4. Keep tone professional, welcoming, concise, and helpful.
5. If someone asks for server secrets, passwords, or internal API keys, politely decline.`;

  try {
    const groq = new Groq({ apiKey });

    // Models to try in order of preference if the specified model is retired or unavailable
    const candidateModels = [
      configuredModel,
      'llama-3.3-70b-versatile',
      'llama-3.1-8b-instant',
      'qwen/qwen3.6-27b',
      'mixtral-8x7b-32768',
      'gemma2-9b-it',
    ];

    const uniqueModels = Array.from(new Set(candidateModels));

    let lastError: any = null;
    for (const model of uniqueModels) {
      try {
        console.log('[GroqService:ATTEMPT]', { model });

        // Set a 15-second timeout for the completion request
        const chatCompletion = await Promise.race([
          groq.chat.completions.create({
            messages: [
              { role: 'system', content: systemPrompt },
              ...messages.map((m) => ({
                role: m.role as 'user' | 'assistant' | 'system',
                content: m.content,
              })),
            ],
            model: model,
            temperature: 0.6,
            max_tokens: 1024,
          }),
          new Promise<never>((_, reject) =>
            setTimeout(() => reject(new Error('Groq request timed out after 15 seconds')), 15000)
          ),
        ]);

        const reply = chatCompletion.choices[0]?.message?.content || 'No response generated.';
        console.log('[GroqService:SUCCESS]', { model, responseLength: reply.length });

        return {
          reply,
          sources: searchResults?.results.map((r) => ({ title: r.title, url: r.url, snippet: r.snippet })),
        };
      } catch (err: any) {
        lastError = err;
        console.warn(`[GroqService:MODEL_RETRY] Model ${model} failed:`, err.message);

        // If it's an authentication error, don't retry models - the key is invalid
        if (err?.status === 401 || err?.message?.includes('API key')) {
          throw new GroqServiceError(
            401,
            'INVALID_API_KEY',
            'Invalid Groq API key configured in Vercel environment variables.'
          );
        }

        // If model not found or decommissioned, continue loop to next candidate
        if (err?.message?.includes('model') || err?.status === 404 || err?.status === 400) {
          continue;
        }

        throw err;
      }
    }

    throw lastError || new Error('All candidate models failed to respond.');
  } catch (err: any) {
    if (err instanceof GroqServiceError) {
      throw err;
    }
    console.error('[GroqService:ERROR]', { errorName: err.name, message: err.message });
    throw new GroqServiceError(
      err?.status === 429 ? 429 : 502,
      'GROQ_PROVIDER_ERROR',
      `Groq AI provider error: ${err.message || 'Inference failed'}`
    );
  }
}
