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
  isDemoFallback?: boolean;
}

export async function generateAIResponse(
  messages: ChatMessageInput[],
  searchResults?: SearchResults | null
): Promise<GroqServiceResponse> {
  const apiKey = process.env.GROQ_API_KEY;
  const configuredModel = process.env.GROQ_MODEL || 'llama-3.3-70b-versatile';

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

  // Safe developer fallback if no Groq API key is present
  if (!apiKey) {
    console.log('[GroqService:DEV_MODE] No GROQ_API_KEY provided. Formulating grounded response from portfolio knowledge.');
    return generateFallbackResponse(messages[messages.length - 1]?.content || '', searchResults);
  }

  try {
    const groq = new Groq({ apiKey });

    // Models to try in order of preference if the specified model is retired or unavailable
    const candidateModels = [
      configuredModel,
      'llama-3.3-70b-versatile',
      'llama-3.1-8b-instant',
      'openai/gpt-oss-120b',
      'qwen/qwen3.6-27b',
      'mixtral-8x7b-32768'
    ];

    // Filter duplicates
    const uniqueModels = Array.from(new Set(candidateModels));

    let lastError: any = null;
    for (const model of uniqueModels) {
      try {
        const chatCompletion = await groq.chat.completions.create({
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
        });

        const reply = chatCompletion.choices[0]?.message?.content || 'No response generated.';
        return {
          reply,
          sources: searchResults?.results.map((r) => ({ title: r.title, url: r.url, snippet: r.snippet })),
        };
      } catch (err: any) {
        lastError = err;
        // If it's a model not found / deprecated error, loop to next candidate
        if (err?.message?.includes('model') || err?.status === 404 || err?.status === 400) {
          console.warn(`[GroqService] Model ${model} failed, attempting next fallback model...`);
          continue;
        }
        throw err;
      }
    }

    throw lastError || new Error('All Groq candidate models failed to respond.');
  } catch (err: any) {
    console.error('[GroqService:ERROR]', err.message);
    throw new Error(
      `Groq AI provider error: ${err.message}. (Tip: Ensure GROQ_API_KEY is configured in your environment).`
    );
  }
}

// Transparent local knowledge handler when GROQ_API_KEY is absent during local development
function generateFallbackResponse(query: string, searchResults?: SearchResults | null): GroqServiceResponse {
  const q = query.toLowerCase();

  if (q.includes('viberent')) {
    return {
      reply: `**Viberent** is an enterprise equipment rental and field operations mobile application built by Swati Baretha using **.NET MAUI, C#, and Azure Blob Storage**.\n\n**Key Features & Documented Contributions:**\n• **Equipment Inspection Workflows:** Standardized checklists for equipment condition before release and upon return.\n• **Real-Time Azure Uploads:** Photo capture & digital checklist modules that upload inspection media directly to Azure Blob Storage.\n• **Barcode & Serial Scanning:** Camera-based scanning to verify item availability during warehouse check-in/check-out.\n• **Operational Automation:** Built-in automated SMS alerts, calendar scheduling, and timesheet tracking.`,
      isDemoFallback: true,
    };
  }

  if (q.includes('mommyist')) {
    return {
      reply: `**Mommyist** is a cross-platform parenting and pregnancy tracking mobile application built by Swati Baretha using **.NET MAUI, ASP.NET Core Web API, and SQL Server**.\n\n**Key Highlights:**\n• **Parenting Milestones:** Due-date calculators, interactive growth charts, and baby feeding logs.\n• **Design System:** Engineered 20+ custom reusable UI components (cards, popups, pickers) ensuring brand consistency across Android and iOS.\n• **Architecture:** Built with clean Dependency Injection and a decoupled service layer.\n• **Resilience:** Secure token authentication and offline caching so parents can log activities without cell reception.`,
      isDemoFallback: true,
    };
  }

  if (q.includes('ayurveda') || q.includes('webrtc') || q.includes('great ayurveda')) {
    return {
      reply: `**The Great Ayurveda** is a web platform combining Ayurvedic product e-commerce with online doctor consultation booking, built with **ASP.NET Core 10 MVC, Entity Framework Core, SQL Server, and ASP.NET Core Identity**.\n\n**Architecture & Documented Status:**\n• **Status:** It is documented as a **Portfolio Demo / Architectural Build** with sample data and AI sample images.\n• **Clean Architecture:** 5 distinct layers (Domain, Application, Infrastructure, Ayurveda.Web public site, and Ayurveda.Admin separate back-office on its own port and cookie).\n• **Simulated Video Screen:** The consultation room is a **simulated screen** (doctor/patient tiles, timer, mic/camera buttons) designed with \`ICallProvider\` and \`ITelephonyProvider\` abstractions. It does **not** yet use real WebRTC or access physical cameras.\n• **Simulated Payments & OTP:** Checkout and OTP are simulated in demo mode (no live payment gateway like Razorpay).`,
      isDemoFallback: true,
    };
  }

  if (q.includes('experience') || q.includes('winlancer') || q.includes('.net')) {
    return {
      reply: `Swati Baretha is a **.NET Full Stack Developer** with **1.5+ years of hands-on experience** currently working at **Winlancer Technologies Pvt. Ltd.** in Indore, India (Mar 2023 – Present).\n\n**Verified Career Accomplishments:**\n• Architected and shipped **2 cross-platform production apps** using .NET MAUI from a single C# codebase.\n• Implemented **MVVM Architecture across 20+ mobile screens** cleanly isolating UI from business logic.\n• Integrated **90+ REST API endpoints** built on ASP.NET Core with token authentication, reactive bindings, and offline state handling.\n• Collaborated in full-lifecycle Agile workflows with UI/UX and QA teams ensuring zero-downtime rollouts.`,
      isDemoFallback: true,
    };
  }

  if (q.includes('mvc') && q.includes('api')) {
    return {
      reply: `**Key Differences between ASP.NET MVC and ASP.NET Core Web API:**\n\n1. **Purpose & Output:**\n   • **ASP.NET MVC:** Designed for full-stack web applications rendering HTML views (Razor views with \`ViewResult\`).\n   • **ASP.NET Core Web API:** Designed to build RESTful HTTP services that return structured data formats (JSON/XML) for consumption by mobile apps (.NET MAUI, React Native) or SPAs (React, Blazor).\n\n2. **Content Negotiation & Serialization:**\n   • Web API automatically handles content negotiation (Accept headers) and serializes data models.\n   • MVC returns ActionResults that map to \`.cshtml\` templates.\n\n3. **Client Architecture:**\n   • MVC relies on browser page reloads or partial views.\n   • Web API powers decoupled architectures, enabling cross-platform clients like Swati's .NET MAUI applications (Viberent and Mommyist).`,
      isDemoFallback: true,
    };
  }

  if (searchResults && searchResults.results.length > 0) {
    return {
      reply: `Based on current information:\n\n${searchResults.results[0]?.snippet}\n\n*(Sourced from live search)*`,
      sources: searchResults.results.map((r) => ({ title: r.title, url: r.url, snippet: r.snippet })),
    };
  }

  return {
    reply: `I am Swati's AI Assistant. Swati Baretha is a .NET Full Stack Developer specializing in C#, .NET MAUI, ASP.NET Core, and REST APIs.\n\n*(Note: To connect live Groq LLM inference, configure \`GROQ_API_KEY\` in your \`.env\` file. In local development mode, I can provide detailed answers about Swati's projects, experience, architecture, and .NET fundamentals.)*`,
    isDemoFallback: true,
  };
}
