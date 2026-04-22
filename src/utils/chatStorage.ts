import type { ChatSession } from "@/types/chatTypes";

const STORAGE_KEY = "careerAgentSessions";
const ACTIVE_KEY = "careerAgentActiveSessionId";
const MAX_SESSIONS = 3;

export const loadSessions = (): ChatSession[] => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
};

export const saveSessions = (sessions: ChatSession[]) => {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(sessions.slice(0, MAX_SESSIONS))
  );
};

export const getActiveSessionId = (): string | null => {
  return localStorage.getItem(ACTIVE_KEY);
};

export const setActiveSessionId = (id: string) => {
  localStorage.setItem(ACTIVE_KEY, id);
};

export const clearAllSessions = () => {
  localStorage.removeItem(STORAGE_KEY);
  localStorage.removeItem(ACTIVE_KEY);
};