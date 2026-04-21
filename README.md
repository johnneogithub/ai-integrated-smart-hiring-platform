# Smart Hiring Platform

AI-Driven Application Analysis and Candidate Matching

Smart Hiring Platform is an investor-ready demo prototype built to showcase how artificial intelligence can transform hiring workflows through intelligent candidate evaluation, automated profile analysis, and AI-powered matching between workers and employers.

This platform is designed as a modern hiring ecosystem where AI acts as both a career agent for workers and a smart screening assistant for employers—helping both sides make faster, better decisions.

Built using **Next.js**, **TypeScript**, and **TailwindCSS**, this project focuses on real AI integration using Claude API and a polished demo experience suitable for fundraising presentations, stakeholder meetings, and product validation.

---

## Project Objective

Build a pitch-ready AI hiring platform that demonstrates how an intelligent system can:

- onboard candidates efficiently
- analyze applicant profiles using AI
- generate personalized career guidance
- surface high-quality job matches
- explain match quality using AI-generated reasoning
- provide real-time career coaching through multi-turn conversations
- support employer-side talent review and candidate ranking

The goal is not simply automation—it is building an **agentic hiring platform** where AI proactively supports career growth and recruitment decisions.

---

## Core Demo Flow

### Step 1 — Candidate Onboarding

A new worker creates a professional profile by providing:

- current role
- years of experience
- location
- skills
- certifications
- career goals
- desired next position

### Example Persona

> Port Truck Driver with 8 years of experience in Wilmington, NC looking to transition into Operations Supervisor roles.

This step establishes the worker’s AI profile foundation.

---

### Step 2 — AI Career Agent Activation

The personal AI Career Agent introduces itself and generates a live Claude-powered summary of:

- professional strengths
- skill gap analysis
- career progression opportunities
- recommended next career move

This is powered by a real Claude API call—not static content.

---

### Step 3 — Smart Job Match Surface

The platform surfaces 3–5 curated job opportunities matched to the candidate profile.

Each opportunity includes:

- role title
- company
- location
- salary range
- job requirements
- AI-generated match rationale

The listings may use mock data, but the match explanation is generated live using Claude.

---

### Step 4 — Career Agent Chat

Candidates can ask questions such as:

> Should I apply for the Operations Supervisor role?

The AI responds intelligently by referencing:

- candidate profile
- selected job details
- career trajectory logic
- readiness analysis

This supports live multi-turn conversations and agentic recommendations.

---

### Step 5 — Employer View (Bonus)

A simple employer-side dashboard showing:

- matched worker pool
- AI-generated candidate summaries
- ranking recommendations
- application quality scoring

This provides strong investor differentiation and product scalability.

---

## Tech Stack

### Frontend

- Next.js
- TypeScript
- TailwindCSS
- React Hook Form
- Zustand
- Framer Motion
- Lucide React
- ShadCN UI

### Backend / AI Integration

- Claude API (Anthropic)
- Next.js API Routes
- Axios
- Prompt Engineering System

### Deployment

- Vercel (Recommended)

---

## Project Structure

```bash
src/
│
├── app/
│   ├── page.tsx
│   ├── onboarding/
│   │   └── page.tsx
│   ├── career-agent/
│   │   └── page.tsx
│   ├── job-matches/
│   │   └── page.tsx
│   ├── chat/
│   │   └── page.tsx
│   ├── employer-view/
│   │   └── page.tsx
│   └── api/
│       └── claude/
│           └── route.ts
│
├── components/
│   ├── layout/
│   ├── landing/
│   ├── onboarding/
│   ├── career-agent/
│   ├── jobs/
│   └── employer/
│
├── services/
│   ├── claudeApi.ts
│   ├── prompts.ts
│   └── mockJobs.ts
│
├── store/
│   └── useAppStore.ts
│
├── hooks/
│   ├── useClaude.ts
│   └── useWorkerProfile.ts
│
├── types/
│   ├── worker.ts
│   ├── job.ts
│   └── chat.ts
│
├── utils/
│   ├── constants.ts
│   └── formatters.ts
│
├── lib/
│   └── axios.ts
│
└── styles/
    └── globals.css
```

---

## Routes

```tsx
/
/onboarding
/career-agent
/job-matches
/chat
/employer-view
/api/claude
```

| Route | Purpose |
|---|---|
| `/` | Landing Page |
| `/onboarding` | Candidate onboarding |
| `/career-agent` | AI-generated candidate summary |
| `/job-matches` | Smart job matches |
| `/chat` | Career Agent conversation |
| `/employer-view` | Employer dashboard |
| `/api/claude` | Claude API integration |

---

## Installation

### Create Next.js App

```bash
npx create-next-app@latest smart-hiring-platform
cd smart-hiring-platform
```

### Install Dependencies

```bash
npm install axios zustand framer-motion lucide-react react-hook-form
```

### Install Tailwind + ShadCN UI

```bash
npx shadcn@latest init
```

---

## Run Development Server

```bash
npm run dev
```

---

## Production Build

```bash
npm run build
npm start
```

---

## Priority Build Strategy (24-Hour Execution)

### Must Ship First

1. Landing Page
2. Candidate Onboarding
3. Claude Career Summary
4. Job Match Surface
5. Career Agent Chat

### Bonus After Core Completion

6. Employer View
7. AI Candidate Ranking
8. UI Polish + Animations
9. Investor Presentation Improvements

---

## Evaluation Focus

### AI Integration Quality

Real Claude API calls with thoughtful prompt engineering.

### Agentic Behavior

The system proactively recommends and acts—not just responds.

### Investor-Ready UI/UX

Conference-room quality polished experience.

### Technical Architecture

Scalable and maintainable Next.js architecture.

### Execution Speed

Strong prioritization under a strict 24-hour challenge.

---

## Future Scaling Vision

Future versions may include:

- resume parsing automation
- interview scheduling agent
- employer ATS integration
- skill certification recommendations
- predictive retention analysis
- labor market forecasting
- multilingual hiring workflows
- proactive AI application submissions

---

## Author

**John Neo Lopez**  
BS Computer Science  
AI Support Specialist Applicant

Built for the AI Labor Platform Fundraising Demo Challenge

---

## Final Note

This is not just a job board.

This is an AI-powered hiring operating system designed to help workers grow their careers while helping employers discover the right talent faster.

### Mission

> Build an AI hiring agent that works harder than traditional recruitment systems.

