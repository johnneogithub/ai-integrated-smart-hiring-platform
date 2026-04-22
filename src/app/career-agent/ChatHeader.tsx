import Link from "next/link";
import { Briefcase, Plus, RotateCcw } from "lucide-react";

export default function ChatHeader({
  hasProfile,
  onNewChat,
  onResetProfile,
  onToggleSidebar,
}: {
  hasProfile: boolean;
  onNewChat: () => void;
  onResetProfile: () => void;
  onToggleSidebar: () => void;
}) {

  return (
    <header className="border-b bg-white p-4 rounded-md mb-4 flex items-center">
      <h1 className="font-bold">Career Agent AI</h1>

      {!hasProfile && (
        <span className="ml-3 rounded-full bg-yellow-100 text-yellow-800 px-3 py-1 text-xs">
          Guest mode — create a profile for personalized matches
        </span>
      )}

      <div className="ml-auto flex gap-1">
        <Link
          href="/job-matches"
          className="flex items-center gap-1 rounded-md px-3 py-2 text-xs font-medium text-blue-600 hover:bg-blue-50"
        >
          <Briefcase className="h-3.5 w-3.5" />
          View Jobs
        </Link>

        <button
            onClick={onToggleSidebar}
            className="flex items-center gap-1 rounded-md border px-2 py-2 text-xs hover:bg-gray-50"
        >
        ☰ Toggle Conversations
        </button>

        <button
          onClick={onNewChat}
          className="flex items-center gap-1 rounded-md border px-3 py-2 text-xs hover:bg-gray-50"
        >
          <Plus className="h-3.5 w-3.5" />
          New
        </button>

        <button
          onClick={onResetProfile}
          className="flex items-center gap-1 rounded-md bg-red-600 px-3 py-2 text-xs text-white hover:bg-red-700"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          Reset
        </button>
      </div>
    </header>
  );
}
