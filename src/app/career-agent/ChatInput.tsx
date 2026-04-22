import { Send } from "lucide-react";
import { forwardRef, ForwardedRef } from "react";

type Props = {
  formRef: React.RefObject<HTMLFormElement>;
  onSend: (text: string) => void;
};

const ChatInput = forwardRef(function ChatInput(
  { formRef, onSend }: Props,
  inputRef: ForwardedRef<HTMLInputElement>
) {
  return (
    <form
      ref={formRef}
      onSubmit={(e) => {
        e.preventDefault();
        const input = (e.target as any).message.value?.trim();
        if (!input) return;

        (e.target as any).reset();
        onSend(input);
      }}
      className="flex gap-2 pt-4"
    >
      <input
        ref={inputRef}
        name="message"
        className="flex-1 rounded border px-3 py-2"
        placeholder="Ask about your career…"
        autoComplete="off"
      />

      <button
        type="submit"
        aria-label="Send message"
        className="rounded bg-blue-600 px-4 text-white hover:bg-blue-700 transition"
      >
        <Send className="h-5 w-5" />
      </button>
    </form>
  );
});

export default ChatInput;
