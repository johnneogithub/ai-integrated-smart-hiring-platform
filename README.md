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

## 🧩 Setup

### Install Dependencies

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

Then open:

```text
http://localhost:3000
```

in your browser.

---

## 🖼 Assets

### Logo

```text
/public/img/smart-hiring-platform-logo.png
```

### Video

```text
/public/vid/logistics-stock-video.mp4
```

### Favicon

```text
/public/favicon.ico
```

---

## 🧠 Development Guide

## 1. Adding New Job Listings

Edit:

```text
src/components/data/mockJobs.ts
```

Follow the existing JSON format for job entries:

```ts
{
  id: "job-007",
  title: "Warehouse Operations Lead",
  company: "Global Freight Logistics",
  location: "Dallas, TX",
  salaryMin: 40,
  salaryMax: 55,
  salaryType: "hour",
  employmentType: "Full-time",
  requirements: [
    "3+ yrs logistics",
    "forklift certification",
    "inventory management"
  ]
}
```

---

## 2. Connecting the Claude API

Configure your API key inside:

```text
.env.local
```

Example:

```env
ANTHROPIC_API_KEY=your_api_key_here
NEXT_PUBLIC_AGENT_ID=your_agent_id_here
NEXT_PUBLIC_API_URL=http://localhost:3000
```

The integration logic lives in:

```text
src/components/services/claudeApi.ts
```

---

## 3. Managing Environment Variables

- Use `.env.local` for local development
- Never commit secrets to GitHub
- Keep API keys private and secure

---

## 🔮 Future Enhancements

| Feature | Description |
|---|---|
| Backend Integration | Add a Node.js or Laravel backend for persistent job listings, user data, and analytics |
| User Authentication | Implement secure login/signup using NextAuth or Firebase Auth |
| Resume Uploader | Allow users to upload resumes (PDF/DOCX) for AI parsing |
| AI Resume Insights | Claude analyzes resumes and suggests improvements |
| Admin Dashboard | Manage job listings, monitor AI matches, and view analytics |
| Database Support | Integrate PostgreSQL or MongoDB for scalable data storage |
| Email Notifications | Send automated job match summaries to users |

---

## 🧾 License

This project is licensed under the **MIT License** — feel free to use, modify, and distribute with attribution.

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch

```bash
git checkout -b feature/new-feature
```

3. Commit your changes

```bash
git commit -m "Add new feature"
```

4. Push to the branch

```bash
git push origin feature/new-feature
```

5. Open a Pull Request

---

## ✨ Portfolio Ready

This project is designed to be investor-ready, demo-friendly, and suitable for portfolio presentation. It showcases:

- AI integration in real-world hiring workflows
- Strong frontend architecture using Next.js App Router
- Practical logistics and supply-chain domain knowledge
- Career-focused conversational UX powered by Claude AI

---

Built with passion for smarter hiring and better career matching.

