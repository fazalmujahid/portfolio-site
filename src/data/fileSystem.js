export const FILE_SYSTEM = {
  "~": {
    type: "dir",
    children: ["about.txt", "skills/", "projects/", "contact.txt", "education.txt", "secret/"],
  },
  "~/about.txt": {
    type: "file",
    content: `╔══════════════════════════════════════════════════════════════╗
║                    IMADUDDIN MUJAHID                         ║
║                Staff Engineer @ Nagarro                       ║
╚══════════════════════════════════════════════════════════════╝

Experienced AI and Software Engineer specializing in Conversational AI,
Large Language Models (LLMs), and chatbot development.

Proficient in building intelligent virtual assistants using Microsoft
Bot Framework, OpenAI, and custom NLP solutions.

Expertise in RAG, AI function calling, API integrations, and automation
for enterprise applications.

8+ years of professional experience. Quick to adapt to emerging tech.
Skilled in mentorship, code reviews, system design, and Agile leadership.

Currently working on: Multichannel AI Bot with WhatsApp + Speech integration.`,
  },
  "~/contact.txt": {
    type: "file",
    content: `┌─────────────────────────────────────┐
│         CONTACT INFORMATION         │
├─────────────────────────────────────┤
│  Email    : imad@live.in            │
│  Phone    : +91 9555 171033         │
│  LinkedIn : linkedin.com/in/imujahid│
│  Location : Delhi, India            │
└─────────────────────────────────────┘

> Want to work together? Drop me an email.
> I don't bite. Usually.`,
  },
  "~/education.txt": {
    type: "file",
    content: `EDUCATION
─────────
  B.Tech in Electronics & Communication Engineering (ECE)
  GGSIPU, Delhi, India
  Score: 69%

  "The things I learned in college were important,
   but the things I built after were legendary."`,
  },
  "~/skills/": {
    type: "dir",
    children: ["languages.txt", "ai_ml.txt", "cloud.txt", "backend.txt", "frontend.txt", "databases.txt"],
  },
  "~/skills/languages.txt": {
    type: "file",
    content: `PROGRAMMING LANGUAGES
─────────────────────
  [████████████████████░░] C#         ██ Primary
  [██████████████████░░░░] Python     ██ Growing
  [████████████████████░░] JavaScript ██ Strong
  [██████████████████░░░░] TypeScript ██ Strong
  [████████████████░░░░░░] SQL        ██ Solid`,
  },
  "~/skills/ai_ml.txt": {
    type: "file",
    content: `AI & MACHINE LEARNING
─────────────────────
  ◆ OpenAI / GPT Models       ◆ Microsoft Bot Framework
  ◆ LLMs & RAG                ◆ Function Calling
  ◆ Prompt Engineering         ◆ Speech-to-Text / TTS
  ◆ Vector Databases           ◆ Copilot Studio
  ◆ Conversational AI          ◆ Custom NLP Solutions

  STATUS: This is where the magic happens. ⚡`,
  },
  "~/skills/cloud.txt": {
    type: "file",
    content: `CLOUD & DEVOPS
──────────────
  AZURE:
    Azure AI Studio, Azure Functions, Azure AD,
    Azure Search, Azure DevOps, Azure Storage,
    Azure Data Explorer

  GCP:
    Google Vertex AI, Chat API

  TOOLS:
    Git, CI/CD Pipelines, Docker`,
  },
  "~/skills/backend.txt": {
    type: "file",
    content: `BACKEND & APIs
──────────────
  .NET Core          REST APIs
  Azure Functions    Service Bus (Queues & Topics)
  Logic Apps         WhatsApp Business Platform

  Philosophy: "If it can be automated, it should be."`,
  },
  "~/skills/frontend.txt": {
    type: "file",
    content: `FRONTEND & UI
─────────────
  React      ██████████░░ Proficient
  Angular    ██████████░░ Proficient
  CSS        ████████░░░░ Solid

  Note: Backend is home, but I can build a mean UI too.`,
  },
  "~/skills/databases.txt": {
    type: "file",
    content: `DATABASES & BI
──────────────
  SQL Server          MongoDB
  Power BI            Azure Storage
  Azure Data Explorer

  "Data is the new oil. I'm the refinery."`,
  },
  "~/projects/": {
    type: "dir",
    children: [
      "01_multichannel_bot.txt",
      "02_wealth_assistant.txt",
      "03_edu_assistant.txt",
      "04_personal_assistant.txt",
      "05_resource_mgmt.txt",
      "06_retail_pos.txt",
      "07_event_mgmt.txt",
      "08_pos_layer.txt",
    ],
  },
  "~/projects/01_multichannel_bot.txt": {
    type: "file",
    content: `PROJECT: MULTICHANNEL BOT
════════════════════════
  Client   : University in Middle East
  Duration : Oct 2024 - Present
  Company  : Nagarro

  Conversational AI chatbot with FAQ handling and CRM integration
  using dynamic function calling in LLMs. Speech-based interactions
  via WhatsApp. Message queue architecture (Service Bus).
  Supports Teams and Google Chat expansion.

  Tech: Azure AI Studio, GPT-4o-mini, Azure Search, Python, .NET
        Service Bus, Azure Speech-to-Text

  Role: System design, architecture, dynamic function calling,
        speech transcription, approval workflows, code reviews.`,
  },
  "~/projects/02_wealth_assistant.txt": {
    type: "file",
    content: `PROJECT: VIRTUAL ASSISTANT — WEALTH MANAGEMENT
═══════════════════════════════════════════════
  Client   : Wealth Management Firm
  Duration : Jun 2024 – Oct 2024
  Company  : Nagarro

  AI-powered assistant using Bot Framework + OpenAI.
  Knowledge base updates from URLs, PDFs, Word docs, videos.
  Features: nudges, quizzes (Moodle), simulations, admin panel,
  analytics dashboard.

  Tech: Cognitive Services, Bot Framework, Azure Search, OpenAI,
        .NET, React

  Role: Lead developer. Knowledge base engine, quiz module,
        simulation tools, feedback mechanism.`,
  },
  "~/projects/03_edu_assistant.txt": {
    type: "file",
    content: `PROJECT: VIRTUAL ASSISTANT — EDUCATION
══════════════════════════════════════
  Client   : Technology & Research University
  Duration : Apr 2022 – May 2024
  Company  : Nagarro

  Virtual assistant for education domain. Integrations with LMS,
  ERP, CRM via Azure Data Factory. Context-aware responses.
  Nudge system for notifications. Multi-platform: Web, Teams,
  SharePoint.

  Tech: Cognitive Services, Bot Framework, Azure Search, .NET,
        Azure, OpenAI

  Role: Lead developer. Bot flows, API integrations, platform UIs.`,
  },
  "~/projects/04_personal_assistant.txt": {
    type: "file",
    content: `PROJECT: PERSONAL ASSISTANT (IN-HOUSE)
═══════════════════════════════════════
  Client   : Nagarro (Internal Product)
  Duration : Feb 2021 – Apr 2022

  Virtual assistant with CLU and custom QnA. Enterprise data
  training. Role-based KPI access with row-level security.
  Service ticket raising, nudges, announcements.

  Tech: Cognitive Services, Bot Framework, Azure Search, .NET,
        Azure, Angular, Logic Apps

  Role: Lead developer. KPI system, RBAC, bot interfaces.`,
  },
  "~/projects/05_resource_mgmt.txt": {
    type: "file",
    content: `PROJECT: RESOURCE MANAGEMENT
════════════════════════════
  Client   : Service-based Organization
  Duration : Jul 2020 – Feb 2021
  Company  : Nagarro

  Resource allocation app with demand creation, approval workflows,
  and tracking dashboard.

  Tech: ASP.NET WebAPI, Angular, PrimeNG, C#, SQL Server`,
  },
  "~/projects/06_retail_pos.txt": {
    type: "file",
    content: `PROJECT: RETAIL POS
═══════════════════
  Client   : Retail POS Provider
  Duration : Nov 2018 – Apr 2020
  Company  : Nagarro

  Retail application development. API, POS terminal, and
  Management Console modifications.

  Tech: ASP.NET WebAPI, WinForms, C#, SQL Server`,
  },
  "~/projects/07_event_mgmt.txt": {
    type: "file",
    content: `PROJECT: EVENT MANAGEMENT SYSTEM
════════════════════════════════
  Client   : Service-based Organization
  Duration : Apr 2018 – Oct 2018
  Company  : Infosys

  Web app for organization-level event management.
  Admin interface, registration, study materials, reporting.

  Tech: ASP.NET MVC, C#, JavaScript, SQL Server, LINQ`,
  },
  "~/projects/08_pos_layer.txt": {
    type: "file",
    content: `PROJECT: POS LAYER
══════════════════
  Client   : Leading POS Systems Provider
  Duration : Oct 2017 – Mar 2018
  Company  : Infosys

  Payment middle interface with split payment functionality.
  Agile development with TFS and Git.

  Tech: WPF, WebAPI`,
  },
  "~/secret/": {
    type: "dir",
    children: ["easter_eggs.txt", ".classified"],
  },
  "~/secret/easter_eggs.txt": {
    type: "file",
    content: `You found the secret folder! 🥚

  Try these commands:
    > matrix          - Enter the Matrix
    > hack <target>   - "Hack" something
    > sudo rm -rf /   - You wouldn't dare...
    > coffee          - Essential fuel
    > ping imad       - See if Imad is online
    > fortune         - Get a dev fortune cookie`,
  },
  "~/secret/.classified": {
    type: "file",
    content: `╔═══════════════════════════════════════╗
║  CLASSIFIED — CLEARANCE LEVEL: IMAD  ║
╠═══════════════════════════════════════╣
║                                       ║
║  Fun fact: This entire terminal was   ║
║  built with React and calls Claude    ║
║  API for the AI chat mode.            ║
║                                       ║
║  Imad builds chatbots for a living.   ║
║  You're literally inside one of his   ║
║  creations right now. Meta, huh?      ║
║                                       ║
╚═══════════════════════════════════════╝`,
  },
};
