import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { formatDayLabel } from "@/utils/dateUtils";
import { formatTime } from "@/utils/timeUtils";
import { markdownComponents } from "./markdownComponents";
import { Loader } from "lucide-react";
import type { Message } from "@/types/chatTypes";
import { RefObject, useMemo } from "react";

export default function ChatMessages({
  messages,
  isLoading,
  messagesEndRef,
}: {
  messages: Message[];
  isLoading: boolean;
  messagesEndRef: RefObject<HTMLDivElement>;
}) {
  const grouped = useMemo(() => {
    return messages.reduce((acc, msg) => {
      const day = formatDayLabel(new Date(msg.timestamp));
      acc[day] = acc[day] || [];
      acc[day].push(msg);
      return acc;
    }, {} as Record<string, Message[]>);
  }, [messages]);

  return (
    <div className="flex-1 space-y-6 overflow-y-auto">
      {Object.entries(grouped).map(([day, msgs]) => (
        <div key={day}>
          <div className="my-4 text-center text-xs text-gray-500">{day}</div>

          {msgs.map((m) => (
            <div
              key={m.id}
              className={m.role === "user" ? "flex justify-end" : "flex justify-start"}
            >
              <div
                className={`rounded-xl px-5 py-3 mt-3 max-w-[80%] ${
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
  );
}
