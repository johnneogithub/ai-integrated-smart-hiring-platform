import type { ChatSession } from "@/types/chatTypes";
import { Trash2 } from "lucide-react";

export default function ConversationsSidebar({
  sessions,
  activeSessionId,
  onOpenSession,
  onDeleteCurrent,
}: {
  sessions: ChatSession[];
  activeSessionId: string | null;
  onOpenSession: (id: string) => void;
  onDeleteCurrent: () => void;
}) {
  return (
    <aside className="hidden md:block w-64 border-r bg-white px-4 py-6">
      <h3 className="mb-3 text-sm font-semibold text-gray-500 uppercase">
        Conversations
      </h3>

      {sessions.map((s) => (
        <button
          key={s.id}
          onClick={() => onOpenSession(s.id)}
          className={`w-full text-left px-3 py-2 rounded-md mb-1 ${
            s.id === activeSessionId
              ? "bg-blue-100"
              : "hover:bg-gray-100"
          }`}
        >
          <div className="text-sm font-medium truncate">{s.title}</div>
          <div className="text-xs text-gray-500">
            {s.mode === "guest" ? "Guest" : "Personalized"}
          </div>
        </button>
      ))}

        <button
        onClick={onDeleteCurrent}
        disabled={!activeSessionId}
        className="mt-6 flex items-center gap-2 rounded-md px-3 py-2 text-sm
                    text-red-700 hover:bg-red-50
                    disabled:opacity-40"
        >
        <Trash2 className="h-4 w-4" />
        Delete conversation
        </button>

    </aside>
  );
}
``