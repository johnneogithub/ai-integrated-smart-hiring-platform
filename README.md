# 🧠 AI-Integrated Smart Hiring Platform

An intelligent logistics and supply-chain job-matching demo built with **Next.js 14**, **TypeScript**, and **Tailwind CSS**.
It integrates an AI career agent powered by **Claude Haiku 4.5** for matching candidate profiles to mock job listings and answering industry-specific questions.

---

## 📂 Project Structure

```text
AI-INTEGRATED-SMART-HIRING/
├── .next/                     # Next.js build output
├── css/                       # Global and component-level styles
├── node_modules/              # Dependencies
├── public/
│   ├── img/                   # Logos, icons, and images
│   │   └── smart-hiring-platform-logo.png
│   ├── vid/                   # Local video assets
│   │   └── logistics-stock-video.mp4
│   └── favicon.ico
├── src/
│   ├── app/
│   │   ├── career-agent/      # AI agent interface and chat logic
│   │   ├── job-matches/       # Job matching results and UI
│   │   ├── onboarding/        # Landing and onboarding pages
│   │   └── page.tsx           # Root page entry
│   ├── components/
│   │   ├── chat/              # Chat UI components
│   │   ├── jobs/              # JobCard, JobModal, etc.
│   │   ├── onboarding/        # Hero, Navbar, Footer, FAQ, Video, etc.
│   │   ├── data/              # Static datasets (mockJobs.ts)
│   │   ├── services/          # API integrations (careerPrompts.ts, claudeApi.ts)
│   │   ├── types/             # TypeScript interfaces (formTypes.ts, types.ts)
│   │   └── utils/             # Utility functions (dateUtils.ts, profileUtils.ts, timeUtils.ts)
│   └── ...
└── README.md
```

---

## ⚙️ Tech Stack

- **Next.js 14** – App Router architecture
- **TypeScript** – Strict typing for maintainability
- **Tailwind CSS** – Utility-first styling
- **Heroicons / Lucide React** – Iconography
- **Claude Haiku 4.5 API** – AI job-matching and industry guidance

---

## 🚀 Features

- AI-powered logistics job matching
- Industry Q&A (logistics, shipping, supply chain)
- Responsive landing and onboarding pages
- Local video and image assets
- Modular component architecture
- Dark/light mode support
- Personalized candidate profile matching
- Career agent with conversational guidance

---

## Deploy with Vercel

Deploy this template using [Vercel](https://vercel.com?utm_source=github&utm_medium=readme&utm_campaign=next-example):

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/git/external?repository-url=https://github.com/surjithctly/nextly-template&project-name=nextly-template&repository-name=nextly-template)


## Author

John Neo Lopez





