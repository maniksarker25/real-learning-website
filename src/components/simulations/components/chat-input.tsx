"use client";

import { memo, useCallback, useState } from "react";
import { Mic, Send } from "lucide-react";

interface ChatInputProps {
  onSendMessage?: (text: string) => void;
  disabled?: boolean;
  placeholder?: string;
}

export const ChatInput = memo(function ChatInput({
  onSendMessage,
  disabled = false,
  placeholder,
}: ChatInputProps) {
  const [text, setText] = useState("");

  const activePlaceholder =
    placeholder ??
    (disabled
      ? "Simulation preview mode"
      : "Type your response in this simulation...");

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (!text.trim() || disabled) return;
      if (onSendMessage) {
        onSendMessage(text.trim());
      }
      setText("");
    },
    [text, disabled, onSendMessage],
  );

  return (
    <form
      onSubmit={handleSubmit}
      className="border-t border-white/[0.06] bg-white/[0.02] p-2.5 sm:p-3.5 flex items-center gap-2"
    >
      <div className="relative flex-1 flex items-center">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          disabled={disabled}
          placeholder={activePlaceholder}
          className="w-full bg-white/[0.05] border border-white/10 focus:border-orange-400/50 rounded-xl px-3.5 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm text-white placeholder-white/30 outline-none transition disabled:opacity-50 disabled:cursor-not-allowed pr-9 sm:pr-10"
        />
        <button
          type="button"
          disabled={disabled}
          className="absolute right-3 text-white/30 hover:text-white/60 disabled:opacity-30 transition cursor-pointer"
          title="Voice input (Simulated)"
          aria-label="Voice input"
        >
          <Mic className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
        </button>
      </div>

      <button
        type="submit"
        disabled={disabled || !text.trim()}
        className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-orange-500 hover:bg-orange-600 disabled:bg-white/10 disabled:text-white/20 text-white font-medium transition cursor-pointer shrink-0"
        title="Send response"
        aria-label="Send message"
      >
        <Send className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
      </button>
    </form>
  );
});
