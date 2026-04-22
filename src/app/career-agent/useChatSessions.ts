"use client";

import { useEffect, useRef, useState } from "react";
import type { ChatSession, Message } from "@/types/chatTypes";
import { getMatchedJobs, JobListing } from "@/data/mockJobs";
import {
  loadSessions,
  saveSessions,
  getActiveSessionId,
  setActiveSessionId,
  clearAllSessions,
} from "@/utils/chatStorage";
import { FormData } from "@/types/formTypes";
import { isValidProfile, getDisplayName } from "@/utils/profileUtils";
import { formatChatTitle } from "@/utils/chatTitle";

/* Predefined AI welcome message (single source of truth) */
const createWelcomeMessage = (
  mode: "guest" | "profile",
  displayName = "there"
): Message => ({
  id: crypto.randomUUID(),
  role: "assistant",
  timestamp: new Date().toISOString(),
  content:
    mode === "profile"
      ? `👋 Hi ${displayName}! I'm **Career Agent AI**.

I can help you:
- Discover job matches
- Explain why roles fit you
- Prepare for interviews
- Plan your next career move

What would you like to explore today?`
      : `👋 Hi there! I'm **Career Agent AI**.

I can help you:
- Learn about logistics and trucking careers
- Understand certifications and requirements
- Explore salary ranges
- See example roles

Create a profile anytime for **personalized job recommendations**.

What would you like to learn about?`,
});

export function useChatSessions() {
  const [profile, setProfile] = useState<FormData | null>(null);
  const [matchedJobs, setMatchedJobs] = useState<JobListing[]>([]);

  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [activeSessionId, setActiveSessionIdState] = useState<string | null>(
    null
  );
  const [messages, setMessages] = useState<Message[]>([]);

  const [isLoading, setIsLoading] = useState(false);
  const [shouldScrollToInput, setShouldScrollToInput] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const mode: "guest" | "profile" = isValidProfile(profile)
    ? "profile"
    : "guest";

  /* Bootstrap: load profile + sessions ONCE */
  useEffect(() => {
    // Load profile
    const savedProfile = localStorage.getItem("workerProfile");
    let displayName = "there";

    if (savedProfile) {
      const parsed = JSON.parse(savedProfile);
      setProfile(parsed);
      setMatchedJobs(getMatchedJobs(parsed, 6));
      displayName = getDisplayName(parsed);
    }

    // Load sessions
    const storedSessions = loadSessions();
    const storedActiveId = getActiveSessionId();

    if (storedSessions.length > 0) {
      const active =
        storedSessions.find((s) => s.id === storedActiveId) ??
        storedSessions[0];

      setSessions(storedSessions);
      setActiveSessionIdState(active.id);
      setMessages(active.messages);
      return;
    }

    // No sessions → create first session with welcome message
    const firstSession: ChatSession = {
      id: crypto.randomUUID(),
      title: "New Conversation",
      mode,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      messages: [createWelcomeMessage(mode, displayName)],
    };

    setSessions([firstSession]);
    setActiveSessionIdState(firstSession.id);
    setActiveSessionId(firstSession.id);
    setMessages(firstSession.messages);
  }, []);

  /* Persist active session whenever messages change */
  useEffect(() => {
    if (!activeSessionId) return;

    setSessions((prev) => {
      const updated = prev.map((s) =>
        s.id === activeSessionId
          ? { ...s, messages, updatedAt: Date.now() }
          : s
      );

      saveSessions(updated);
      return updated;
    });
  }, [messages, activeSessionId]);

  /* Start a new chat (with predefined AI message) */
  const newChat = () => {
    const displayName = profile ? getDisplayName(profile) : "there";

    const session: ChatSession = {
      id: crypto.randomUUID(),
      title: formatChatTitle(Date.now()),
      mode,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      messages: [createWelcomeMessage(mode, displayName)],
    };

    setSessions((prev) => {
      const updated = [session, ...prev].slice(0, 5); // max 3
      saveSessions(updated);
      return updated;
    });

    setActiveSessionIdState(session.id);
    setActiveSessionId(session.id);
    setMessages(session.messages);
    setShouldScrollToInput(false); // do NOT scroll on welcome
  };

  /* Switch between existing sessions */
  const openSession = (id: string) => {
    const s = sessions.find((x) => x.id === id);
    if (!s) return;

    setActiveSessionIdState(id);
    setActiveSessionId(id);
    setMessages(s.messages);
  };

  /* Delete sessions (single or bulk) */
  const deleteSessions = (ids: string[]) => {
    setSessions((prev) => {
      const updated = prev.filter((s) => !ids.includes(s.id));
      saveSessions(updated);

      if (ids.includes(activeSessionId!)) {
        const next = updated[0];
        setActiveSessionIdState(next?.id ?? null);
        setMessages(next?.messages ?? []);
      }

      return updated;
    });
  };

  /* Hard reset (profile + all chats) */
  const resetProfile = () => {
    if (!confirm("Reset profile and all chats?")) return;
    localStorage.clear();
    clearAllSessions();
    window.location.href = "/onboarding";
  };

  return {
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
  };
}
