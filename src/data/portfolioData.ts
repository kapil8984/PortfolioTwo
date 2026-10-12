import { Project, SkillCategory, ExperienceItem, EducationItem } from '../types/portfolio';

export const PERSONAL_INFO = {
  name: "Swati Baretha",
  title: ".NET Full Stack Developer",
  location: "Indore, Madhya Pradesh, India",
  email: "swatibaretha6@gmail.com",
  phone: "+91 9399581248",
  summary:
    "Detail-oriented .NET Full Stack Developer with 1.5+ years of hands-on experience building production mobile and web applications using .NET MAUI, C#, and ASP.NET Core. Proven track record in architecting clean MVVM codebases, building reusable UI components, and integrating robust cloud backends with Azure Blob Storage and RESTful APIs.",
  heroHeading: "Building Digital Experiences with .NET and Modern Web Technologies.",
  heroRotatingTitles: [
    ".NET Full Stack Developer",
    "Cross-Platform App Developer",
    "Backend & API Developer",
    "Software Developer"
  ],
  heroDescription:
    "I build maintainable web and mobile applications using C#, .NET MAUI, ASP.NET Core, REST APIs, and SQL Server.",
  resumeUrl: "/Swati_Baretha_Resume.pdf",
};

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    name: "Backend Development",
    iconName: "Server",
    description: "Robust enterprise services, clean architecture, and decoupled REST APIs",
    skills: ["C#", "ASP.NET Core", "ASP.NET MVC", "Entity Framework Core", "RESTful APIs", "Core Java"]
  },
  {
    name: "Mobile Development",
    iconName: "Smartphone",
    description: "Cross-platform mobile apps for Android and iOS from a single codebase",
    skills: [".NET MAUI", "MVVM Architecture", "Reusable UI Components", "Reactive Data Binding", "Offline State Handling"]
  },
  {
    name: "Frontend Development",
    iconName: "Layout",
    description: "Interactive user interfaces and responsive web applications",
    skills: ["JavaScript", ".NET Blazor", "React", "React Native", "HTML5 & Modern CSS", "Bootstrap 5"]
  },
  {
    name: "Databases & Cloud",
    iconName: "Database",
    description: "Relational persistence, cloud media storage, and document stores",
    skills: ["SQL Server", "Azure Blob Storage", "MongoDB"]
  },
  {
    name: "Tools & Platforms",
    iconName: "Wrench",
    description: "Developer tooling, source control, and collaborative workflows",
    skills: ["Visual Studio", "VS Code", "Git", "GitHub"]
  },
  {
    name: "Stack Exposure & AI Tools",
    iconName: "Cpu",
    description: "Full-stack runtime exposure and modern AI developer acceleration",
    skills: ["Node.js", "Express", "MERN Stack", "Claude AI", "Antigravity AI", "Trae AI"]
  }
];

export const EXPERIENCE_DATA: ExperienceItem[] = [
  {
    company: "Winlancer Technologies Pvt. Ltd.",
    role: "Software Developer (.NET Full Stack)",
    period: "Mar 2023 – Present",
    location: "Indore, MP, India",
    summary:
      "Core developer responsible for architecting and delivering cross-platform mobile products and backend REST API integrations in an Agile environment.",
    responsibilities: [
      "Architected and shipped 2 cross-platform production apps using .NET MAUI, delivering unified UI/UX and logic across Android and iOS from a single C# codebase.",
      "Implemented MVVM Architecture across 20+ mobile screens, cleanly isolating business logic from views to boost unit testability and code maintainability.",
      "Integrated 90+ REST API endpoints built on ASP.NET Core into client-side services, implementing secure token authentication, reactive data binding, and robust offline state handling.",
      "Partnered in an Agile environment with UI/UX designers and QA teams across full software lifecycles to squash pre-release bugs and ensure zero-downtime feature rollouts."
    ],
    technologies: [".NET MAUI", "C#", "ASP.NET Core", "RESTful APIs", "Azure Blob Storage", "SQL Server", "MVVM"]
  }
];

export const PROJECTS_DATA: Project[] = [
  {
    id: "viberent",
    title: "Viberent",
    category: "Equipment Rental & Field Operations App",
    status: "Production App",
    statusDescription: "Shipped cross-platform enterprise client currently in production use.",
    shortDescription:
      "An enterprise mobile application designed to streamline equipment rental and field operations, from quote creation to equipment return and damage inspection.",
    overview:
      "Viberent addresses the complex logistics of equipment rental management. It unifies warehouse asset tracking, field inspections, customer check-out/return flows, and personnel timesheets into a seamless cross-platform mobile client.",
    problemSolution:
      "Field operators previously struggled with paper-based checklists and delayed damage reporting. Viberent solved this by digitizing the entire rental lifecycle on mobile, integrating live barcode scanning and instant Azure Blob media uploads for immediate damage proof.",
    technologies: [".NET MAUI", "C#", "Azure Blob Storage", "RESTful APIs", "MVVM"],
    features: [
      {
        title: "Equipment Inspection Workflows",
        description: "Standardized inspection steps to evaluate equipment condition before release and upon return."
      },
      {
        title: "Photo Capture & Digital Checklists",
        description: "Module enabling operators to capture evidence photos and upload inspection media directly to Azure Blob Storage in real-time."
      },
      {
        title: "Barcode & Serial Number Scanning",
        description: "Real-time camera scanner to instantly verify item availability and streamline warehouse check-in/check-out."
      },
      {
        title: "Automated Alerts & Scheduling",
        description: "Built-in SMS alerts, interactive calendar scheduling, and employee timesheet tracking features directly in the mobile client."
      }
    ],
    contributions: [
      "Architected the client-side MVVM structure for inspection screens.",
      "Engineered the custom photo capture module with asynchronous Azure Blob Storage media uploads.",
      "Integrated the camera barcode scanner for instant item verification.",
      "Built automated SMS notification triggers and interactive calendar views."
    ]
  },
  {
    id: "mommyist",
    title: "Mommyist",
    category: "Pregnancy & Baby Tracking Mobile Application",
    status: "Production App",
    statusDescription: "Shipped parenting mobile application for Android and iOS.",
    shortDescription:
      "A parenting application that helps users track pregnancy milestones, baby growth, feeding activities, and access educational content.",
    overview:
      "Mommyist is a cross-platform mobile companion designed for expectant parents and caregivers. It combines medical growth trackers, daily milestone logging, educational articles, and community discussions into an intuitive, caring interface.",
    problemSolution:
      "New parents often need multiple fragmented apps for timers, logs, and advice. Mommyist unified milestone tracking, feeding routines, and community sharing into a single decoupled mobile application powered by ASP.NET Core Web APIs.",
    technologies: [".NET MAUI", "ASP.NET Core Web API", "SQL Server", "C#", "MVVM", "Dependency Injection"],
    features: [
      {
        title: "Due-Date & Growth Tracking",
        description: "Accurate due-date calculators, interactive growth charts, and baby feeding logs."
      },
      {
        title: "Unit Converters & Tools",
        description: "Custom measurement unit converters tailored for infant health metrics."
      },
      {
        title: "Community & Knowledge Base",
        description: "High-performance community forum with article bookmarking and real-time discussion feeds."
      },
      {
        title: "Modular Design System",
        description: "Created 20+ custom reusable UI components (cards, popups, pickers) ensuring brand consistency across Android and iOS."
      }
    ],
    contributions: [
      "Engineered 20+ custom reusable UI components (custom pickers, charts, and cards).",
      "Architected the application using clean Dependency Injection and a decoupled service layer.",
      "Integrated secure token authentication and client-side reactive state with ASP.NET Core Web API endpoints.",
      "Implemented offline caching to allow parents to record feeding logs even without active cellular reception."
    ]
  },
  {
    id: "the-great-ayurveda",
    title: "The Great Ayurveda",
    category: "Ayurvedic E-commerce & Doctor Consultation Platform",
    status: "Portfolio Demo",
    statusDescription: "Architectural demo build with sample data and simulated consultation/payment workflows.",
    shortDescription:
      "A web platform that combines Ayurvedic product shopping with online doctor appointment booking, consultations, and digital prescription management.",
    overview:
      "The Great Ayurveda is a comprehensive web platform architected to solve the dual needs of holistic wellness e-commerce and telehealth. It incorporates multi-role access control, clinical desks for Ayurvedic doctors, public product browsing, and administrative operations.",
    problemSolution:
      "Patients frequently have to purchase Ayurvedic supplements on one store and consult certified practitioners on separate channels without shared records. This project bridges both in a unified ecosystem built with ASP.NET Core 10 MVC and Clean Architecture.",
    technologies: [
      "ASP.NET Core 10 MVC",
      "Razor Views",
      "Entity Framework Core",
      "SQL Server",
      "ASP.NET Core Identity",
      "Bootstrap 5",
      "JavaScript"
    ],
    features: [
      {
        title: "Customer Shopping & Booking",
        description: "Product search with suggestions, filters, wishlist, cart, coupons (e.g. festival offers), demo checkout, order tracking, and doctor appointment booking."
      },
      {
        title: "Doctor Clinical Desk",
        description: "Doctor registration, qualification & registration number verification submission, admin approval queue, availability scheduler, appointment manager, and digital prescription creation."
      },
      {
        title: "Separated Administration Application",
        description: "Dedicated admin site (Ayurveda.Admin on its own port & authentication cookie) with SuperAdmin, CatalogManager, SupportAgent, and FinanceManager roles."
      },
      {
        title: "Role-Based Access Control (RBAC)",
        description: "ASP.NET Core Identity role enforcement via [Authorize] attributes and secure cookie isolation between public customers and admin staff."
      },
      {
        title: "Simulated Video Consultation Screen",
        description: "Interactive consultation interface featuring doctor/patient tiles, session timer, mic/cam toggle buttons, and chat panel. Structured with ICallProvider and ITelephonyProvider interfaces for future WebRTC integration.",
        isSimulated: true
      },
      {
        title: "Simulated Payment & OTP Verification",
        description: "Demo checkout accepts demo OTP and simulates payment transactions without live financial gateway charges.",
        isSimulated: true
      }
    ],
    contributions: [
      "Architected the 5-layer Clean Architecture: Domain, Application, Infrastructure, Ayurveda.Web, and Ayurveda.Admin.",
      "Configured ASP.NET Core Identity role stores with distinct authentication cookie schemes for public vs admin endpoints.",
      "Implemented database transactions for inventory deduction during order creation in Entity Framework Core.",
      "Designed the consultation room UI using decoupled ICallProvider abstractions ready for real WebRTC/SignalR signaling."
    ],
    architecture: {
      summary:
        "Built following Clean Architecture principles with complete physical separation between the public portal (Ayurveda.Web) and the administrative back-office (Ayurveda.Admin).",
      layers: [
        {
          name: "Domain Layer",
          description: "Core business entities (User, Product, Order, Appointment, Prescription, Role) independent of any database or UI dependencies."
        },
        {
          name: "Application Layer",
          description: "Business logic interfaces, DTOs, view models, and service contracts (ICallProvider, ITelephonyProvider, IOrderService)."
        },
        {
          name: "Infrastructure Layer",
          description: "Entity Framework Core DbContext, SQL Server migrations, BCrypt password hashing, secure audit logging, and email/file abstractions."
        },
        {
          name: "Ayurveda.Web (Public MVC)",
          description: "Public-facing portal for customers to browse products, checkout, and book appointments, plus doctor clinical desks."
        },
        {
          name: "Ayurveda.Admin (Admin MVC)",
          description: "Separate web application running on its own port with dedicated login cookies for SuperAdmin, Catalog Managers, and Finance staff."
        }
      ],
      diagramAvailable: true
    },
    limitations: [
      "Video consultation is a simulated UI call screen; WebRTC media streams and SignalR signaling hubs are planned for future integration.",
      "Payment gateway (e.g. Razorpay) and SMS/Email OTP are in demo simulation mode.",
      "Sample product catalogs and AI-generated product images are used for demonstration purposes.",
      "Doctor license verification is simulated via admin approval queue rather than government API integration.",
      "Application is designed as an architectural portfolio demo and is not deployed to production hosting."
    ],
    sourceNote: "Information extracted strictly from The Great Ayurveda Project Summary & Interview Documentation."
  }
];

export const EDUCATION_DATA: EducationItem[] = [
  {
    degree: "Bachelor of Science (B.Sc.)",
    institution: "Vikram University, Ujjain",
    period: "2021 – 2024",
    details: "Foundational coursework in computing, scientific problem solving, and analytical methodologies.",
    badge: "Degree"
  },
  {
    degree: "MERN Stack & Core Java Certification",
    institution: "Infobeans Foundation",
    period: "1-Year Intensive Training Program",
    details: "Hands-on immersion covering JavaScript, React, Node.js, Express, MongoDB, Object-Oriented Java, and software development fundamentals.",
    badge: "Certification"
  }
];
