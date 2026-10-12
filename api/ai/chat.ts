import Groq from 'groq-sdk';
// --------------------------------------------------------------------------
// Portfolio Knowledge Base for Swati's AI Assistant
// --------------------------------------------------------------------------
const PORTFOLIO_KNOWLEDGE = `
DEVELOPER PROFILE:
- Name: Swati Baretha
- Professional Title: .NET Full Stack Developer
- Location: Indore, Madhya Pradesh, India
- Email: swatibaretha6@gmail.com
- Phone: +91 9399581248
- Experience: 1.5+ years of hands-on experience building production mobile and web applications using .NET MAUI, C#, and ASP.NET Core.

CORE TECHNICAL SKILLS:
- Backend & APIs: C#, ASP.NET Core, ASP.NET MVC, Entity Framework Core, RESTful APIs, Core Java
- Mobile & Frontend: .NET MAUI, MVVM Architecture, Reusable UI Components, Reactive Data Binding, Offline State Handling, C#, JavaScript, .NET Blazor, React, React Native, Bootstrap 5
- Databases & Cloud: SQL Server, Azure Blob Storage, MongoDB
- Tools & IDEs: Visual Studio, VS Code, Git, GitHub
- Stack Exposure: MERN Stack (React, Node.js, Express, MongoDB)
- AI Developer Tools: Claude AI, Antigravity AI, Trae AI

EMPLOYMENT HISTORY:
- Employer: Winlancer Technologies Pvt. Ltd.
- Role: Software Developer (.NET Full Stack)
- Period: March 2023 – Present
- Location: Indore, Madhya Pradesh, India
- Documented Responsibilities:
  1. Architected and shipped 2 cross-platform production apps using .NET MAUI, delivering unified UI/UX and logic across Android and iOS from a single C# codebase.
  2. Implemented MVVM Architecture across 20+ mobile screens, cleanly isolating business logic from views to boost unit testability and code maintainability.
  3. Integrated 90+ REST API endpoints built on ASP.NET Core into client-side services, implementing secure token authentication, reactive data binding, and robust offline state handling.
  4. Partnered in an Agile environment with UI/UX designers and QA teams across full software lifecycles to squash pre-release bugs and ensure zero-downtime feature rollouts.

KEY PROJECTS:

1. VIBERENT
- Category: Equipment Rental & Field Operations App
- Tech Stack: .NET MAUI, Azure Blob Storage, C#, RESTful APIs, MVVM
- Status: Production App (shipped client)
- Description: An enterprise mobile application automating field operations for equipment rentals from quote creation to return and damage inspection.
- Documented Features:
  * Equipment inspection workflows to evaluate equipment condition.
  * Custom photo capture & digital checklist modules that upload inspection media directly to Azure Blob Storage in real-time.
  * Real-time barcode & serial number scanning to instantly verify item availability and streamline warehouse check-in/check-out.
  * Built automated SMS alerts, interactive calendar scheduling, and employee timesheet tracking features directly in the mobile client.
- Swati's Contribution: Architected MVVM inspection screens, photo capture module with direct Azure Blob uploads, camera barcode scanner, and SMS/calendar scheduling.

2. MOMMYIST
- Category: Pregnancy & Baby Tracking Mobile Application
- Tech Stack: .NET MAUI, ASP.NET Core Web API, SQL Server, C#, MVVM, Dependency Injection
- Status: Production App (shipped client)
- Description: A parenting mobile platform helping users track pregnancy milestones, baby growth, feeding activities, and access educational content.
- Documented Features:
  * Due-date calculators, interactive growth charts, baby feeding logs, and custom measurement unit converters.
  * High-performance community forum and knowledge base with article bookmarking and discussion feeds.
  * Design system with 20+ custom reusable UI components (cards, popups, pickers) ensuring consistent brand aesthetics across Android and iOS.
  * Architected with Dependency Injection and a flexible, decoupled service layer targeting ASP.NET Core Web API and SQL Server backends.
- Swati's Contribution: Built 20+ reusable UI components, implemented DI and decoupled service layer, secure token auth integration, and offline caching for feeding logs.

3. THE GREAT AYURVEDA
- Category: Ayurvedic E-commerce & Doctor Consultation Platform
- Tech Stack: ASP.NET Core 10 MVC (Razor views), Entity Framework Core, SQL Server, ASP.NET Core Identity, Bootstrap 5, JavaScript
- Status: PORTFOLIO DEMO / ARCHITECTURAL BUILD (Not a live commercial platform; sample data and AI-generated sample images).
- Clean Architecture Layers:
  * Domain: Core entities (User, Doctor, Product, Order, Appointment, Prescription) with zero UI dependencies.
  * Application: Interfaces, DTOs, ViewModels, and service contracts (ICallProvider, ITelephonyProvider, IOrderService).
  * Infrastructure: EF Core DbContext, SQL Server migrations, BCrypt password hashing, audit log repository.
  * Ayurveda.Web: Public-facing MVC web app for customers (shopping, bookings) and doctor clinical desks (prescriptions).
  * Ayurveda.Admin: Separate admin web app on its own port and isolated authentication cookie for SuperAdmin, CatalogManager, SupportAgent, and FinanceManager.
- Role-Based Access Control (RBAC):
  * Roles: Customer, Doctor, SuperAdmin, CatalogManager, SupportAgent, FinanceManager.
  * Controllers protected by [Authorize].
  * Public and Admin sites are separate apps with isolated login cookies (a customer login cannot access the admin site).
  * Doctor accounts require admin approval before appearing on the public directory.
- CRITICAL PROJECT ACCURACY & DOCUMENTED LIMITATIONS:
  * Video Consultation Screen: It is a SIMULATED call screen (doctor/patient tiles, timer, mic/camera toggle buttons, chat replies). It does NOT use WebRTC yet and does not access the real camera/microphone. However, the architecture defines ICallProvider and ITelephonyProvider abstractions so real WebRTC/SignalR signaling can be plugged in.
  * Payment & OTP: Simulated demo mode. No live payment gateway (e.g. Razorpay) or live SMS/Email gateway is connected.
  * Hosting: Architectural demo; not deployed to production hosting.

EDUCATION:
1. Bachelor of Science (B.Sc.) - Vikram University, Ujjain (2021–2024)
2. MERN Stack & Core Java Certification - Infobeans Foundation (1-Year Intensive Training Program)

STRICT ACCURACY RULES FOR THE AI ASSISTANT:
- Always base answers about Swati's career, projects, and skills strictly on the above facts.
- Never invent clients, production URLs, GitHub links, awards, or certifications not listed here.
- If asked if The Great Ayurveda is live in production or uses real WebRTC, explicitly clarify that it is an architectural portfolio demo with simulated video consultation screens and demo payments.
- For general software engineering questions (e.g., MVC vs Web API, MVVM, Clean Architecture, REST APIs), provide expert, accurate explanations.
- For current events, if search results are provided in the prompt, synthesize them with clear citations. If no search results are available, state that live web search is unconfigured and answer with existing general knowledge.
`;

// --------------------------------------------------------------------------
// Web Search Types & Helper
// --------------------------------------------------------------------------
interface SearchResultItem {
  title: string;
  url: string;
  snippet: string;
  publishedDate?: string;
}

interface SearchResults {
  query: string;
  results: SearchResultItem[];
}

async function performWebSearch(query: string): Promise<SearchResults | null> {
  const apiKey = process.env.SEARCH_PROVIDER_API_KEY;
  const provider = (process.env.SEARCH_PROVIDER || 'tavily').toLowerCase();

  if (!apiKey) {
    return null;
  }

  try {
    if (provider === 'tavily') {
      const response = await fetch('https://api.tavily.com/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          api_key: apiKey,
          query,
          search_depth: 'basic',
          max_results: 3,
        }),
      });

      if (!response.ok) return null;
      const data = await response.json();
      const results: SearchResultItem[] = (data.results || []).map((r: any) => ({
        title: r.title || 'Untitled',
        url: r.url || '',
        snippet: r.content || r.snippet || '',
        publishedDate: r.published_date,
      }));

      return { query, results };
    }

    if (provider === 'serper') {
      const response = await fetch('https://google.serper.dev/search', {
        method: 'POST',
        headers: {
          'X-API-KEY': apiKey,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ q: query, num: 3 }),
      });

      if (!response.ok) return null;
      const data = await response.json();
      const organic = data.organic || [];
      const results: SearchResultItem[] = organic.slice(0, 3).map((r: any) => ({
        title: r.title || 'Untitled',
        url: r.link || '',
        snippet: r.snippet || '',
        publishedDate: r.date,
      }));

      return { query, results };
    }

    return null;
  } catch (err) {
    console.warn('[WebSearch:ERROR]', err);
    return null;
  }
}

// --------------------------------------------------------------------------
// Groq AI Integration Helper
// --------------------------------------------------------------------------
interface ChatMessageInput {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

interface GroqServiceResponse {
  reply: string;
  sources?: { title: string; url?: string; snippet?: string }[];
}

class GroqServiceError extends Error {
  statusCode: number;
  code: string;

  constructor(statusCode: number, code: string, message: string) {
    super(message);
    this.name = 'GroqServiceError';
    this.statusCode = statusCode;
    this.code = code;
  }
}

async function generateAIResponse(
  messages: ChatMessageInput[],
  searchResults?: SearchResults | null
): Promise<GroqServiceResponse> {
  const apiKey = (process.env.GROQ_API_KEY || '').trim();
  const configuredModel = (process.env.GROQ_MODEL || 'llama-3.3-70b-versatile').trim();

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

    const candidateModels = [
      configuredModel,
      'llama-3.3-70b-versatile',
      'llama-3.1-8b-instant',
      'llama-3.1-70b-versatile',
      'qwen-qwq-32b',
      'gemma-7b-it',
    ];
    const uniqueModels = Array.from(new Set(candidateModels));

    let lastError: any = null;
    for (const model of uniqueModels) {
      try {
        console.log('[GroqService:ATTEMPT]', { model });

        const chatCompletion = await Promise.race([
          groq.chat.completions.create({
            messages: [
              { role: 'system', content: systemPrompt },
              ...messages.map((m) => ({
                role: m.role as 'user' | 'assistant' | 'system',
                content: m.content,
              })),
            ],
            model,
            temperature: 0.6,
            max_tokens: 1024,
            top_p: 1,
            stream: false,
          }),
          new Promise<never>((_, reject) =>
            setTimeout(() => reject(new Error(`Timeout: Groq API took longer than 15s with model ${model}`)), 15000)
          ),
        ]);

        const rawReply = chatCompletion.choices?.[0]?.message?.content;
        if (!rawReply || !rawReply.trim()) {
          throw new Error(`Empty reply returned from model ${model}`);
        }

        console.log('[GroqService:SUCCESS]', {
          model,
          promptTokens: chatCompletion.usage?.prompt_tokens,
          completionTokens: chatCompletion.usage?.completion_tokens,
        });

        const sources =
          searchResults && searchResults.results.length > 0
            ? searchResults.results.map((r) => ({ title: r.title, url: r.url, snippet: r.snippet }))
            : undefined;

        return {
          reply: rawReply.trim(),
          sources,
        };
      } catch (attemptErr: any) {
        lastError = attemptErr;
        console.warn(`[GroqService:MODEL_RETRY] Model ${model} failed:`, attemptErr.message);
      }
    }

    throw lastError || new Error('All Groq candidate models failed to produce a valid response.');
  } catch (err: any) {
    if (err instanceof GroqServiceError) throw err;

    const errMsg = err?.message || 'Unknown Groq API error';
    console.error('[GroqService:FAILED]', { error: errMsg, stack: err?.stack });

    if (err?.status === 401 || errMsg.includes('API key') || errMsg.includes('401')) {
      throw new GroqServiceError(
        401,
        'INVALID_API_KEY',
        'Authentication failed with the Groq API. Please verify the GROQ_API_KEY configured in Vercel.'
      );
    }

    if (err?.status === 429 || errMsg.includes('rate limit') || errMsg.includes('429')) {
      throw new GroqServiceError(
        429,
        'RATE_LIMIT_EXCEEDED',
        'Groq AI rate limit exceeded. Please wait a moment and try again.'
      );
    }

    throw new GroqServiceError(
      502,
      'GROQ_API_ERROR',
      `Unable to reach Groq AI: ${errMsg}. Please verify that GROQ_API_KEY is active.`
    );
  }
}

// --------------------------------------------------------------------------
// Request & Response Helpers
// --------------------------------------------------------------------------
function sendJsonResponse(res: any, statusCode: number, payload: any) {
  if (res && typeof res.status === 'function' && typeof res.json === 'function') {
    return res.status(statusCode).json(payload);
  }
  if (res && typeof res.writeHead === 'function' && typeof res.end === 'function') {
    res.writeHead(statusCode, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(payload));
    return;
  }
  return new Response(JSON.stringify(payload), {
    status: statusCode,
    headers: { 'Content-Type': 'application/json' },
  });
}

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

// Basic in-memory rate limiter per warm container (25 queries per minute per IP)
const IP_REQUEST_LOG = new Map<string, { count: number; lastReset: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 25;

// --------------------------------------------------------------------------
// Vercel Serverless Function Handler
// --------------------------------------------------------------------------
export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    if (typeof res?.setHeader === 'function') {
      res.setHeader('Allow', ['POST']);
    }
    return sendJsonResponse(res, 405, { error: `Method ${req.method} Not Allowed` });
  }

  // Rate Limiting Check
  const clientIp = (req.headers && (req.headers['x-forwarded-for'] as string)) || req.socket?.remoteAddress || '127.0.0.1';
  const now = Date.now();
  const rateData = IP_REQUEST_LOG.get(clientIp) || { count: 0, lastReset: now };

  if (now - rateData.lastReset > RATE_LIMIT_WINDOW) {
    rateData.count = 1;
    rateData.lastReset = now;
  } else {
    rateData.count += 1;
  }
  IP_REQUEST_LOG.set(clientIp, rateData);

  if (rateData.count > MAX_REQUESTS_PER_WINDOW) {
    console.warn('[API/ai/chat:RATE_LIMIT]', { clientIp });
    return sendJsonResponse(res, 429, {
      error: 'Rate limit exceeded. Please wait a moment before sending more messages.',
    });
  }

  try {
    const body = await getRequestBody(req);
    const { messages } = body || {};

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return sendJsonResponse(res, 400, { error: 'Please provide a valid messages array.' });
    }

    const lastMessage = messages[messages.length - 1];
    if (!lastMessage || typeof lastMessage.content !== 'string' || !lastMessage.content.trim()) {
      return sendJsonResponse(res, 400, { error: 'Empty message content.' });
    }

    if (lastMessage.content.length > 2000) {
      return sendJsonResponse(res, 400, { error: 'Message exceeds maximum length of 2000 characters.' });
    }

    // Check if query is asking for current news / real-time updates
    const lowerContent = lastMessage.content.toLowerCase();
    const needsSearch =
      /\b(news|latest|today|currently|president|election|updates? from|weather)\b/i.test(
        lowerContent
      ) &&
      !lowerContent.includes('swati') &&
      !lowerContent.includes('viberent') &&
      !lowerContent.includes('mommyist') &&
      !lowerContent.includes('ayurveda');

    let searchResults = null;
    if (needsSearch) {
      try {
        searchResults = await performWebSearch(lastMessage.content);
      } catch (searchErr) {
        console.warn('[API/ai/chat:SEARCH_FAILED]', searchErr);
      }
    }

    // Call Groq AI service with portfolio knowledge and search context
    const aiResponse = await generateAIResponse(messages, searchResults);

    return sendJsonResponse(res, 200, aiResponse);
  } catch (err: any) {
    const statusCode = err instanceof GroqServiceError ? err.statusCode : 500;
    const errorCode = err instanceof GroqServiceError ? err.code : 'INTERNAL_SERVER_ERROR';

    console.error('[API/ai/chat:ERROR]', {
      statusCode,
      errorCode,
      message: err.message,
    });

    return sendJsonResponse(res, statusCode, {
      error: err.message || 'An error occurred while generating the assistant response.',
    });
  }
}

