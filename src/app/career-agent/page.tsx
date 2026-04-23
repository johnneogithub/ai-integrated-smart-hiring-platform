"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import { useChatSessions } from "./useChatSessions";
import { isValidProfile, getDisplayName } from "@/utils/profileUtils";
import { formatDayLabel } from "@/utils/dateUtils";
import ModeSwitcher  from "@/components/navigation/ModeSwitcher";


import ConversationsSidebar from "./ConversationsSidebar";
import ChatHeader from "./ChatHeader";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";

export default function CareerAgentPage() {
  const {
    profile,
    matchedJobs,

    sessions,
    activeSessionId,
    messages,
    setMessages,

    newChat,
    openSession,
    deleteSessions,
    resetProfile,

    isLoading,
    setIsLoading,
    messagesEndRef,
    shouldScrollToInput,
    setShouldScrollToInput,
  } = useChatSessions();

  const inputFormRef = useRef<HTMLFormElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const hasValid = isValidProfile(profile);
  const displayName = hasValid ? getDisplayName(profile) : "there";

  const [sidebarOpen, setSidebarOpen] = useState(true);

const handleSendMessage = async (text: string) => {
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

  const reply =
    data?.content?.[0]?.text ||
    data?.reply ||
    data?.choices?.[0]?.message?.content ||
    "I'm here and ready to help. Could you rephrase your question?";

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

const groupedMessages = useMemo(() => {
  return messages.reduce((acc, message) => {
    const day = formatDayLabel(new Date(message.timestamp));
    acc[day] = acc[day] || [];
    acc[day].push(message);
    return acc;
  }, {} as Record<string, typeof messages>);
}, [messages]);

  // Scroll only after user sends a message
  useEffect(() => {
    if (!shouldScrollToInput) return;
    if (messages.length <= 1) return;

    inputFormRef.current?.scrollIntoView({ behavior: "smooth" });
    inputRef.current?.focus();
    setShouldScrollToInput(false);
  }, [shouldScrollToInput, messages.length, setShouldScrollToInput]);

  return (
    <>
      <main className="flex h-[85vh] md:h-[70vh] lg:h-[80vh] bg-gray-100 overflow-hidden">
        {sidebarOpen && (
          <ConversationsSidebar
            sessions={sessions}
            activeSessionId={activeSessionId}
            onOpenSession={openSession}
            onDeleteCurrent={() =>
              activeSessionId && deleteSessions([activeSessionId])
            }
          />
        )}

        <section className="flex flex-1 flex-col overflow-hidden">
          <ChatHeader
            hasProfile={hasValid}
            onNewChat={newChat}
            onResetProfile={resetProfile}
            onToggleSidebar={() => setSidebarOpen((v) => !v)}
          />

          <div className="flex-1 overflow-y-auto px-4 py-2">
            <ChatMessages
              messages={messages}
              isLoading={isLoading}
              messagesEndRef={messagesEndRef}
            />
          </div>

          <div className="border-t bg-white">
            <ChatInput
              ref={inputRef}
              formRef={inputFormRef}
              onSend={handleSendMessage}
            />
          </div>
        </section>
      </main>

      <ModeSwitcher />
    </>
  );
}
