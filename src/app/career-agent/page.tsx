// app/career-agent/page.tsx

"use client";

import { useState, useEffect, useRef } from "react";
import { FormData } from "@/types/formTypes";
import { mockJobs, getMatchedJobs, JobListing } from "@/data/mockJobs";
import { Send, Loader, ChevronRight } from "lucide-react";
import Link from "next/link";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export default function CareerAgentPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [profile, setProfile] = useState<FormData | null>(null);
  const [matchedJobs, setMatchedJobs] = useState<JobListing[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Load profile and initialize
  useEffect(() => {
    const saved = localStorage.getItem("workerProfile");
    if (saved) {
      try {
        const parsedProfile = JSON.parse(saved);
        setProfile(parsedProfile);

        // Get matched jobs
        const matched = getMatchedJobs(parsedProfile, 6);
        setMatchedJobs(matched as JobListing[]);

        // Add welcome message
        const welcomeMessage = `👋 Hello ${parsedProfile.fullName}! I'm your AI Career Agent. I've reviewed your profile and I'm here to help you advance your career in logistics and transportation.

I can help you:
• Understand your strengths and career potential
• Find and evaluate job matches
• Prepare for interviews
• Plan your next career move
• Answer any career-related questions

What would you like to discuss first?`;

        setMessages([
          {
            id: "welcome",
            role: "assistant",
            content: welcomeMessage,
            timestamp: new Date(),
          },
        ]);
      } catch (error) {
        console.error("Failed to load profile:", error);
      }
    }
  }, []);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Send message to Claude Agent
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || !profile) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      // Prepare context about the candidate
      const profileContext = `
CANDIDATE PROFILE:
- Name: ${profile.fullName}
- Current Role: ${profile.currentRole}
- Years of Experience: ${profile.yearsExperience}
- Location: ${profile.currentAddressCity}, ${profile.currentAddressState}
- Desired Position: ${profile.desiredPosition}
- Salary Expectation: ${profile.salaryExpectation}
- Career Goal: ${profile.careerGoal}

CERTIFICATIONS:
- CDL Type: ${profile.cdlType}
- HAZMAT: ${profile.hazmat}
- TANKER: ${profile.tanker}
- DOT Medical: ${profile.dotMedical}
- Clean Driving Record: ${profile.cleanDrivingRecord}
- Willing to Relocate: ${profile.relocate}

WHY HIRE YOU:
${profile.employerReason}

AVAILABLE JOB OPPORTUNITIES:
${matchedJobs
  .map(
    (job, idx) => `
${idx + 1}. ${job.title} at ${job.company}
   - Type: ${job.employmentType}
   - Location: ${job.location}
   - Salary: $${job.salaryMin}-$${job.salaryMax}/${job.salaryType}
   - Match Score: ${job.matchScore}%
`
  )
  .join("\n")}
`;

    const response = await fetch("/api/claude", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messages: [
          {
            role: "user",
            content: profileContext + "\n\nUser Question: " + input,
          },
        ],
      }),
    });

    console.log("Response Status:", response.status);

    const rawText = await response.text();

    console.log("RAW RESPONSE:", rawText);

    // Safe manual JSON parsing
    let data;

    try {
      data = JSON.parse(rawText);
    } catch (err) {
      throw new Error(
        "Server returned invalid JSON. Raw response: " +
          rawText.substring(0, 300)
      );
    }

    if (!response.ok) {
      throw new Error(
        data.error || "Failed to get response from Claude Agent"
      );
    }

    // Extract message from Claude response
    let assistantText = "Unable to process response";

    if (data.content && Array.isArray(data.content)) {
      const textContent = data.content.find(
        (c: any) => c.type === "text"
      );

      if (textContent) {
        assistantText = textContent.text;
      }
    } else if (data.message) {
      assistantText = data.message;
    } else if (typeof data === "string") {
      assistantText = data;
    }

    setMessages((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        role: "assistant",
        content: assistantText,
        timestamp: new Date(),
      },
    ]);
    } catch (error) {
      console.error("Error sending message:", error);
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          role: "assistant",
          content: `Sorry, I encountered an error: ${errorMessage}. Please try again.`,
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center max-w-md">
          <div className="mb-4">
            <div className="animate-spin inline-block h-12 w-12 border-4 border-blue-600 border-t-transparent rounded-full"></div>
          </div>
          <p className="text-gray-600 mb-6">Loading your profile...</p>
          <Link
            href="/onboarding"
            className="text-blue-600 hover:underline font-medium"
          >
            Or create a profile first
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm p-4 sm:p-6">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Career Agent
            </h1>
            <p className="text-sm text-gray-600 mt-1">
              Personalized career guidance powered by Claude AI
            </p>
          </div>
          <div className="flex gap-3">
            <Link
              href="/job-matches"
              className="hidden sm:inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition"
            >
              View Jobs
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Chat Container */}
      <div className="flex-1 max-w-4xl w-full mx-auto flex flex-col overflow-hidden">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[85%] sm:max-w-2xl rounded-lg p-4 ${
                  message.role === "user"
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-900 border border-gray-200"
                }`}
              >
                <p className="text-sm sm:text-base whitespace-pre-wrap">
                  {message.content}
                </p>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white text-gray-900 border border-gray-200 rounded-lg p-4">
                <div className="flex items-center gap-2">
                  <Loader className="h-4 w-4 animate-spin text-blue-600" />
                  <span className="text-sm text-gray-600">
                    Claude is thinking...
                  </span>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="border-t border-gray-200 bg-white p-4 sm:p-6">
          <form onSubmit={handleSendMessage} className="space-y-3">
            <div className="flex gap-3">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me anything about your career..."
                disabled={isLoading}
                className="flex-1 rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:outline-none disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="rounded-lg bg-blue-600 p-3 text-white hover:bg-blue-700 disabled:opacity-50 transition"
              >
                <Send className="h-5 w-5" />
              </button>
            </div>
            <div className="text-xs text-gray-500">
              💡 Try asking: "What are my top job matches?" or "How should I prepare for interviews?"
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
