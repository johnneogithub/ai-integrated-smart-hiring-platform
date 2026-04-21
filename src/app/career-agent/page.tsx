"use client";

import { useEffect, useRef, useMemo } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Link from "next/link";

import { markdownComponents } from "./markdownComponents";
import { useChatSessions } from "./useChatSessions";

import { formatDayLabel } from "@/utils/dateUtils";
import { formatTime } from "@/utils/timeUtils";
import { isValidProfile, getDisplayName } from "@/utils/profileUtils";

import {
  ChevronRight,
  Briefcase,
  Plus,
  Trash2,
  RotateCcw,
  Send,
  Loader,
} from "lucide-react";

export default function CareerAgentPage() {
  const {
    profile,
    matchedJobs,
    messages,
    setMessages,
    isLoading,
    setIsLoading,
    newChat,
    clearChat,
    resetProfile,
    messagesEndRef,
    shouldScrollToInput,
    setShouldScrollToInput,
  } = useChatSessions();

  const inputFormRef = useRef<HTMLFormElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const hasValid = isValidProfile(profile);
  const displayName = hasValid ? getDisplayName(profile) : "there";

  /* Scroll + focus when new chat starts */
  useEffect(() => {
    if (!shouldScrollToInput) return;

    inputFormRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });

    inputRef.current?.focus();
    setShouldScrollToInput(false);
  }, [shouldScrollToInput, setShouldScrollToInput]);

  /* ✅ Group messages by day */
  const groupedMessages = useMemo(() => {
    return messages.reduce((acc, message) => {
      const day = formatDayLabel(new Date(message.timestamp));
      acc[day] = acc[day] || [];
      acc[day].push(message);
      return acc;
    }, {} as Record<string, typeof messages>);
  }, [messages]);

  /* ✅ Send message (guest OR personalized) */
  const sendMessage = async (text: string) => {
    setMessages((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        role: "user",
        timestamp: new Date().toISOString(),
        content: text,
      },
    ]);

    setIsLoading(true);

    const aiPrompt = hasValid
      ? `
 You are in CAREER AGENT CHAT MODE.

            Name yourself "Career Agent AI". You are a helpful assistant that provides career advice 
            and job recommendations based on the candidate's profile and context.

            CRITICAL UI RULES (must follow exactly):

            - When recommending, listing, or showing jobs, you MUST render Job Cards.
            - Job Cards are rendered ONLY using the following Markdown format:

            \`\`\`job
            job-001
            \`\`\`

            - Use ONE job ID per \`\`\`job block.
            - NEVER list job IDs as plain text.
            - NEVER use bullet lists for job IDs.
            - If the user asks for best jobs, available jobs, or recommendations,
              you MUST respond with job cards.

            Available job IDs (you may ONLY use these):
            ${matchedJobs.map((j) => j.id).join(", ")}

            Candidate context:
            - Name: ${profile ? getDisplayName(profile) : "N/A"}
            - Experience: ${profile?.yearsExperience ?? "N/A"} years
            - Desired role: ${profile?.desiredPosition ?? "N/A"}
            - Location: ${
              profile?.currentAddressCity && profile?.currentAddressState
                ? `${profile.currentAddressCity}, ${profile.currentAddressState}`
                : "N/A"
            }

            User question:
            ${text}

            If the question is about jobs or recommendations,
            you MUST include Job Cards using \`\`\`job blocks.
`
      : `
        You are Career Agent AI in GUEST MODE.

        The user has no profile yet.

        Rules:
        - Give general career guidance only
        - Explain logistics roles, certifications, and career paths
        - Do NOT assume experience or location
        - Do NOT calculate job matches
        - You MAY reference example jobs, clearly labeled as examples

        User question:
        ${text}

        At the end, gently suggest creating a profile for personalized recommendations.
        `;

    const res = await fetch("/api/claude", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        messages: [{ role: "user", content: aiPrompt }],
      }),
    });

    const data = await res.json();
    const reply = data?.content?.[0]?.text ?? "No response";

    setMessages((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        role: "assistant",
        timestamp: new Date().toISOString(),
        content: reply,
      },
    ]);

    setIsLoading(false);
  };

  /* Initial welcome (guest vs personalized) */
  useEffect(() => {
    if (messages.length > 0) return;

    setMessages([
      {
        id: crypto.randomUUID(),
        role: "assistant",
        timestamp: new Date().toISOString(),
        content: hasValid
? `👋 Hi ${displayName}! I'm **Career Agent AI**.

I can help you:
- Discover job matches
- Explain why roles fit you
- Prepare for interviews
- Plan your next career move

What would you like to explore today?`
.trim(): `👋 Hi there! I'm **Career Agent AI**.

I can help you:
- Learn about logistics and trucking careers
- Understand certifications and requirements
- Explore typical salary ranges
- See example job roles

Create a profile anytime for **personalized job recommendations**.

What would you like to learn about?`.trim(),
      },
    ]);
  }, [hasValid, displayName, messages.length, setMessages]);

  return (
    <main className="flex min-h-screen flex-col bg-gray-100">
      {/* Header */}
      <header className="border-b bg-white p-4">
        <div className="mx-auto flex max-w-4xl justify-between items-center">
          <h1 className="font-bold">Career Agent AI</h1>

          {!hasValid && (
            <span className="ml-3 rounded-full bg-yellow-100 text-yellow-800 px-3 py-1 text-xs">
              Guest mode — create a profile for personalized matches
            </span>
          )}

          <div className="flex items-center gap-1 ml-auto">
            <Link
              href="/job-matches"
              className="flex items-center gap-1 rounded-md px-3 py-2 text-xs font-medium text-blue-600 hover:bg-blue-50"
            >
              <Briefcase className="h-3.5 w-3.5" />
              View Jobs
              <ChevronRight className="h-3.5 w-3.5" />
            </Link>

            <button
              onClick={newChat}
              className="flex items-center gap-1 rounded-md border px-3 py-2 text-xs hover:bg-gray-50"
            >
              <Plus className="h-3.5 w-3.5" />
              New
            </button>

            <button
              onClick={clearChat}
              className="flex items-center gap-1 rounded-md border px-3 py-2 text-xs text-gray-600 hover:bg-gray-100"
            >
              <Trash2 className="h-3.5 w-3.5" />
              Clear
            </button>

            <button
              onClick={resetProfile}
              className="flex items-center gap-1 rounded-md bg-red-600 px-3 py-2 text-xs text-white hover:bg-red-700"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              Reset
            </button>
          </div>
        </div>
      </header>

      {/* Chat */}
      <section className="mx-auto flex w-full max-w-6xl flex-1 flex-col p-2">
        <div className="flex-1 space-y-6 overflow-y-auto">
          {Object.entries(groupedMessages).map(([day, msgs]) => (
            <div key={day}>
              <div className="my-4 text-center text-xs text-gray-500">{day}</div>

              {msgs.map((m) => (
                <div
                  key={m.id}
                  className={m.role === "user" ? "flex justify-end" : "flex justify-start"}
                >
                  <div
                    className={`rounded-xl px-5 mt-3 py-3 max-w-[80%] ${
                      m.role === "user"
                        ? "bg-blue-600 text-white"
                        : "bg-white border text-gray-900"
                    }`}
                  >
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      components={markdownComponents}
                    >
                      {m.content}
                    </ReactMarkdown>

                    <div
                      className={`mt-3 text-[10px] ${
                        m.role === "user"
                          ? "text-blue-100 text-right"
                          : "text-gray-400 text-left"
                      }`}
                    >
                      {formatTime(m.timestamp)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}

          {isLoading && (
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Loader className="h-4 w-4 animate-spin text-blue-600" />
              Career Agent AI is thinking…
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <form
          ref={inputFormRef}
          onSubmit={(e) => {
            e.preventDefault();
            const input = (e.target as any).message.value;
            (e.target as any).reset();
            sendMessage(input);
          }}
          className="flex gap-2 pt-4"
        >
          <input
            ref={inputRef}
            name="message"
            className="flex-1 rounded border px-3 py-2"
            placeholder="Ask about your career…"
          />
          <button
            type="submit"
            aria-label="Send message"
            className="rounded bg-blue-600 px-4 text-white"
          >
            <Send className="h-5 w-5" />
          </button>
        </form>
      </section>
    </main>
  );
}