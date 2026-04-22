export type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
};

export type ChatSession = {
  id: string;
  title: string;
  mode: "guest" | "profile";
  createdAt: number;
  updatedAt: number;
  messages: Message[];
};
