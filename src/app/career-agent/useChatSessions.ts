"use client";

import { useEffect, useRef, useState } from "react";
import { FormData } from "@/types/formTypes";
import { getMatchedJobs, JobListing } from "@/data/mockJobs";

export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

export interface ChatSession {
  id: string;
  title: string;
  createdAt: string;
  messages: Message[];
}

const CHAT_SESSIONS_KEY = "careerAgentChatSessions";
const ACTIVE_SESSION_KEY = "careerAgentActiveSession";

export function useChatSessions() {
  const [profile, setProfile] = useState<FormData | null>(null);
  const [matchedJobs, setMatchedJobs] = useState<JobListing[]>([]);
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [activeSessionId, setActiveSessionId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [shouldScrollToInput, setShouldScrollToInput] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // ---------- bootstrap ----------
  useEffect(() => {
    const savedProfile = localStorage.getItem("workerProfile");
    if (!savedProfile) return;

    const parsedProfile = JSON.parse(savedProfile);
    setProfile(parsedProfile);
    setMatchedJobs(getMatchedJobs(parsedProfile, 6));

    const storedSessions = sessionStorage.getItem(CHAT_SESSIONS_KEY);
    const storedActive = sessionStorage.getItem(ACTIVE_SESSION_KEY);

    if (storedSessions) {
      const parsed: ChatSession[] = JSON.parse(storedSessions);
      setSessions(parsed);

      const active =
        parsed.find((s) => s.id === storedActive) ?? parsed[0];

      setActiveSessionId(active.id);
      setMessages(active.messages);
    } else {
      const initialSession: ChatSession = {
        id: crypto.randomUUID(),
        title: "New Conversation",
        createdAt: new Date().toISOString(),
        messages: [
          {
            id: crypto.randomUUID(),
            role: "assistant",
            timestamp: new Date().toISOString(),
            content: `👋 Hello ${parsedProfile.fullName}!\n\nHow can I help you today?`,
          },
        ],
      };

      setSessions([initialSession]);
      setActiveSessionId(initialSession.id);
      setMessages(initialSession.messages);
    }
  }, []);

  // ---------- persist sessions ----------
  useEffect(() => {
    if (!activeSessionId) return;

    setSessions((prev) => {
      const updated = prev.map((s) =>
        s.id === activeSessionId ? { ...s, messages } : s
      );

      sessionStorage.setItem(
        CHAT_SESSIONS_KEY,
        JSON.stringify(updated)
      );
      sessionStorage.setItem(ACTIVE_SESSION_KEY, activeSessionId);

      return updated;
    });
  }, [messages, activeSessionId]);

  // ---------- auto scroll ----------
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // ---------- handlers ----------
    const newChat = () => {
    const session: ChatSession = {
        id: crypto.randomUUID(),
        title: "New Conversation",
        createdAt: new Date().toISOString(),
        messages: [],
    };

    setSessions((prev) => [session, ...prev]);
    setActiveSessionId(session.id);
    setMessages([]);

    // tell React what we want to do next
    setShouldScrollToInput(true);
    };

    const clearChat = () => {
        setMessages([
        {
            id: crypto.randomUUID(),
            role: "assistant",
            timestamp: new Date().toISOString(),
            content: "Conversation cleared. How can I help you next?",
        },
        ]);
    };

    const resetProfile = () => {
        if (!confirm("Reset profile and all chats?")) return;
        localStorage.clear();
        sessionStorage.clear();
        window.location.href = "/onboarding";
    };

  return {
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

  };
}
``