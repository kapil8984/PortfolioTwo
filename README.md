# Swati Baretha — .NET Full Stack Developer Portfolio

A complete, modern, high-performance developer portfolio website for **Swati Baretha**, a .NET Full Stack Developer. Built with React, TypeScript, Tailwind CSS, and Vercel-compatible serverless backend functions powered by the Groq AI SDK.

---

## 🌟 Highlights & Features

- **Documented & Verified Information**: Grounded strictly in Swati's resume and official project architecture documentation.
- **Initial Loading Experience**: Branded `SB` monogram with a real application/readiness progress indicator (1–100%) and safety timeout recovery.
- **Hero Section**: Typewriter animation rotating through verified roles (`.NET Full Stack Developer`, `Cross-Platform App Developer`, `Backend & API Developer`, `Software Developer`), abstract identity metrics, and immediate CTAs.
- **Real Resume Download**: One-click download of the authentic `Swati_Baretha_Resume.pdf`.
- **Categorized Skills Matrix**: Grouped by architectural discipline (Backend, Mobile, Frontend, Databases & Cloud, Tools, Stack Exposure & AI Acceleration) with clean badges—**no arbitrary percentages**.
- **Verified Employment Timeline**: Detailed production responsibilities at *Winlancer Technologies Pvt. Ltd.* (Mar 2023 – Present).
- **Project Showcase & Deep-Dive Modals**:
  - **Viberent**: Equipment Rental & Field Operations App (`.NET MAUI, Azure, C#` — *Production App*).
  - **Mommyist**: Pregnancy & Baby Tracking Mobile Application (`.NET MAUI, ASP.NET Core Web API, SQL Server` — *Production App*).
  - **The Great Ayurveda**: Ayurvedic E-commerce & Doctor Consultation Platform (`ASP.NET Core 10 MVC, EF Core, SQL Server, ASP.NET Core Identity` — *Portfolio Demo*).
- **Interactive Architecture Diagram**: Visual Clean Architecture explorer for The Great Ayurveda (Domain, Application, Infrastructure, `Ayurveda.Web`, and `Ayurveda.Admin` on separate ports and isolated cookies).
- **Swati's AI Assistant (Groq LLM)**:
  - Accessible via sticky navigation and floating trigger button.
  - Answers technical questions, project details, and general queries.
  - Transparently handles limitations (e.g., explains that video calls and payments on The Great Ayurveda are simulated).
  - Live search service abstraction for current events/news queries with graceful fallback.
- **Direct Contact System**:
  - Validated client & server-side form.
  - Serverless email dispatch to **`swatibaretha6@gmail.com`**.
  - Safe local developer fallback when email credentials are not yet configured.
  - Fallback `mailto:` generator for visitors using native email clients.
- **Theme Switching**: Dual dark (`#0B0D12` / `#121722`) and light (`#F7F8FC` / `#FFFFFF`) mode, with zero flash on load, high contrast, and `localStorage` persistence.
- **Background Motion & Microinteractions**: Performance-conscious ambient canvas with particle lattice, respecting `prefers-reduced-motion`.

---

## 🛠️ Technology Stack

| Layer | Technologies |
|---|---|
| **Frontend** | React 18, TypeScript, Vite, Tailwind CSS, Lucide Icons |
| **Backend & APIs** | TypeScript, Vercel Serverless Functions (`api/` directory) |
| **AI Inference** | Groq SDK (`groq-sdk`), configurable models (`llama-3.3-70b-versatile`, fallback candidates) |
| **Email Service** | Transactional email abstraction (Resend REST API, SendGrid/SMTP compatible) |
| **Search Service** | Live search provider abstraction (Tavily, Serper) |
| **Fonts & Design** | Google Fonts (Outfit, Inter), CSS variables, Glassmorphism, Tailwind design tokens |

---

## 📁 Folder Structure

```text
SwatiPortfolio/
├── api/                             # Serverless API endpoints & services
│   ├── ai/
│   │   └── chat.ts                  # POST /api/ai/chat (Groq AI handler + rate limiter)
│   ├── contact.ts                   # POST /api/contact (Email dispatch handler)
│   └── lib/
│       ├── emailService.ts          # Email provider abstraction (Resend / Dev mode)
│       ├── groqService.ts           # Groq SDK client with candidate model fallback
│       ├── knowledgeBase.ts         # Server-side verified portfolio knowledge
│       └── searchService.ts         # Live web search abstraction (Tavily / Serper)
├── public/
│   ├── favicon.svg                  # Brand monogram favicon
│   ├── robots.txt                   # Search crawler directives
│   ├── sitemap.xml                  # Canonical XML sitemap
│   └── Swati_Baretha_Resume.pdf     # Authentic resume PDF
├── src/
│   ├── components/
│   │   ├── About.tsx                # Professional narrative & candidate card
│   │   ├── AIChatModal.tsx          # Interactive Groq AI assistant chat interface
│   │   ├── AIFloatingButton.tsx     # Floating assistant trigger launcher
│   │   ├── ArchitectureDiagram.tsx  # Interactive Clean Architecture diagram
│   │   ├── BackgroundCanvas.tsx     # Ambient particle & glowing orb canvas
│   │   ├── Contact.tsx              # Contact form & direct contact panel
│   │   ├── Education.tsx            # B.Sc. degree & Infobeans certification
│   │   ├── Experience.tsx           # Winlancer Technologies timeline card
│   │   ├── Footer.tsx               # Footer with links and scroll-to-top
│   │   ├── Hero.tsx                 # Viewport hero, typewriter titles, CTAs
│   │   ├── InitialLoader.tsx        # Branded loading sequence (1-100%)
│   │   ├── Navbar.tsx               # Sticky navigation, theme toggle, drawer
│   │   ├── ProjectDetailModal.tsx   # Detailed modal with architecture & limits
│   │   ├── Projects.tsx             # Project cards with status badges
│   │   └── Skills.tsx               # Categorized technology cards & badges
│   ├── context/
│   │   └── ThemeContext.tsx         # Dark/Light theme provider & listener
│   ├── data/
│   │   └── portfolioData.ts         # Structured portfolio dataset
│   ├── services/
│   │   ├── aiClient.ts              # Frontend AI chat API client
│   │   └── contactClient.ts         # Frontend contact form API client
│   ├── styles/
│   │   └── index.css                # Tailwind directives & design utilities
│   ├── types/
│   │   └── portfolio.ts             # TypeScript domain definitions
│   ├── App.tsx                      # App root assembly
│   └── main.tsx                     # React DOM entry point
├── .env.example                     # Environment variables template
├── .gitignore                       # Git exclusion list
├── index.html                       # HTML head, SEO metadata, theme pre-init
├── package.json                     # Scripts & project dependencies
├── postcss.config.js                # PostCSS configuration
├── tailwind.config.js               # Tailored theme tokens & color palettes
├── tsconfig.json                    # TypeScript compiler options
├── vercel.json                      # Vercel deployment & routing config
└── vite.config.ts                   # Vite configuration + local API dev middleware
```

---

## ⚙️ Prerequisites

- **Node.js**: v18.0.0 or newer (tested on Node v22.11.0)
- **NPM**: v9.0.0 or newer

---

## 🚀 Installation & Local Development

1. **Clone or navigate to the workspace**:
   ```bash
   cd d:/SwatiPortfolio
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
   *(See the Environment Variables section below for configuration details.)*

4. **Start the local development server**:
   ```bash
   npm run dev
   ```
   The local Vite dev server starts at `http://localhost:3000/`. The custom dev middleware automatically routes `/api/contact` and `/api/ai/chat` requests to the TypeScript handlers locally!

5. **Run the production build & type check**:
   ```bash
   npm run build
   ```
   Validates complete TypeScript correctness and outputs the optimized production bundle into `dist/`.

---

## 🔑 Environment Variables

Create a `.env` file in the project root:

```env
# ==========================================
# Groq AI Inference Configuration
# ==========================================
# Get your API key at: https://console.groq.com/keys
GROQ_API_KEY=your_groq_api_key_here
GROQ_MODEL=llama-3.3-70b-versatile

# ==========================================
# Transactional Email Provider (Contact Form)
# ==========================================
# Supported providers: resend (default)
# Get your API key at: https://resend.com/api-keys
EMAIL_PROVIDER=resend
EMAIL_PROVIDER_API_KEY=your_resend_api_key_here
CONTACT_RECIPIENT_EMAIL=swatibaretha6@gmail.com
CONTACT_SENDER_EMAIL=onboarding@resend.dev

# ==========================================
# Live Web Search Provider (Optional for News)
# ==========================================
# Supported providers: tavily (default) or serper
# Get API key at: https://tavily.com or https://serper.dev
SEARCH_PROVIDER=tavily
SEARCH_PROVIDER_API_KEY=your_search_api_key_here

# ==========================================
# Application Canonical Base URL
# ==========================================
APP_BASE_URL=https://swati-baretha.vercel.app
```

> **Security Note**: Never prefix server secrets with `VITE_`. Variables like `GROQ_API_KEY` and `EMAIL_PROVIDER_API_KEY` are read exclusively on the server side (`api/` handlers) and are never bundled into client JavaScript.

---

## 🧪 Testing the Integrations

### 1. Contact Form Testing
- **With API Key**:
  Configure `EMAIL_PROVIDER_API_KEY` in `.env`. Submitting the contact form will send a transactional email directly to `swatibaretha6@gmail.com`.
- **Without API Key (Local Dev Mode)**:
  If `EMAIL_PROVIDER_API_KEY` is empty, the server automatically enters safe development mode. The message is validated, safely logged on the terminal console, and returns:
  `Message received! (Local dev mode: EMAIL_PROVIDER_API_KEY is not configured in .env, so message was safely simulated).`
  This guarantees that recruiters and developers can test the form without hitting errors.
- **Direct Mailto Fallback**:
  Visitors can also click *"Prefer your email app? Open mailto"* to launch their native email client with pre-filled fields.

### 2. AI Assistant Testing
- **With Groq API Key**:
  Set `GROQ_API_KEY` in `.env`. The assistant performs inference using Groq's high-speed LPU infrastructure with candidates (`llama-3.3-70b-versatile`, `llama-3.1-8b-instant`, `openai/gpt-oss-120b`).
- **Without Groq API Key (Local Dev Mode)**:
  If `GROQ_API_KEY` is empty, the assistant employs a built-in knowledge engine grounded in Swati's portfolio. It accurately answers questions regarding:
  - Swati's experience at Winlancer Technologies
  - Viberent project features (.NET MAUI, Azure Blob, barcode scanning)
  - Mommyist project architecture (MVVM, Dependency Injection, UI components)
  - The Great Ayurveda Clean Architecture, RBAC, and simulated WebRTC/payment limitations
  - .NET technical concepts (e.g., MVC vs Web API)

---

## 🚢 Preparing for Future Vercel Deployment

When ready to deploy to Vercel:

1. **Push repository to GitHub/GitLab/Bitbucket** (ensure `.env` is ignored by `.gitignore`).
2. **Import project into Vercel**:
   - Framework Preset: **Vite**
   - Build Command: `npm run build`
   - Output Directory: `dist`
3. **Configure Environment Variables in Vercel Project Settings**:
   - `GROQ_API_KEY`
   - `GROQ_MODEL` (e.g. `llama-3.3-70b-versatile`)
   - `EMAIL_PROVIDER_API_KEY`
   - `CONTACT_RECIPIENT_EMAIL` (`swatibaretha6@gmail.com`)
   - `CONTACT_SENDER_EMAIL` (your verified sender address or `onboarding@resend.dev`)
   - `SEARCH_PROVIDER_API_KEY` (optional)
   - `APP_BASE_URL` (your production Vercel domain)
4. Vercel automatically detects the `api/` directory and deploys `api/contact.ts` and `api/ai/chat.ts` as serverless functions with zero configuration required.

---

## 🔒 Security & Privacy Practices

- **Zero Client Key Exposure**: No API secrets are exposed to the browser.
- **Input Sanitization & Length Limits**: Contact inputs and AI chat messages enforce strict size boundaries (max 2,000–2,500 characters) to prevent memory abuse and prompt injection.
- **Serverless Rate Limiting**: Built-in IP-based rate limiting on `/api/ai/chat` (25 requests per minute).
- **Anti-Hallucination Guardrails**: The AI Assistant system instructions strictly mandate grounded adherence to documented facts, forbidding the fabrication of GitHub URLs, employment dates, or production claims.

---

## 📋 Documented Project Statuses & Known Limitations

- **Viberent**: Production equipment rental app shipped to client.
- **Mommyist**: Production parenting tracking app shipped to client.
- **The Great Ayurveda**: Architectural portfolio demo. Video consultation room is simulated (`ICallProvider` abstraction; real WebRTC is not yet implemented). Payment gateway and OTP verification are in demo simulation mode.

---

## 📄 License & Credits

Designed and developed for **Swati Baretha**.
All rights reserved © 2026.
