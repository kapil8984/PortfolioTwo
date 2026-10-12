export const PORTFOLIO_KNOWLEDGE = `
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
