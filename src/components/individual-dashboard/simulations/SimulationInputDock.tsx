"use client";

import { memo } from "react";
import { ArrowUp, Check, Target } from "lucide-react";
import { Button } from "@/components/dashboard/ui";

interface SimulationInputDockProps {
  inputText: string;
  onInputChange: (value: string) => void;
  onSendMessage: (customText?: string) => void;
  isAiTyping: boolean;
  objective: string;
  prompts?: string[];
  characterName: string;
  onFinishAndGetFeedback: () => void;
}

export const SimulationInputDock = memo(function SimulationInputDock({
  inputText,
  onInputChange,
  onSendMessage,
  isAiTyping,
  objective,
  prompts,
  characterName,
  onFinishAndGetFeedback,
}: SimulationInputDockProps) {
  return (
    <div className="shrink-0 space-y-3 border-t border-white/[0.06] px-4 py-4 sm:px-6">
      {/* objective */}
      <div className="flex items-start gap-2.5 rounded-xl border border-white/[0.06] bg-white/[0.03] px-4 py-3 text-sm">
        <Target className="mt-0.5 h-4 w-4 shrink-0 text-orange-400" />
        <p className="text-zinc-400">
          <span className="font-medium text-white">Your goal: </span>
          {objective}
        </p>
      </div>

      {/* suggestions */}
      {prompts && prompts.length > 0 && (
        <div className="no-scrollbar flex gap-2 overflow-x-auto">
          {prompts.map((prompt) => (
            <button
              key={prompt}
              type="button"
              onClick={() => onSendMessage(prompt)}
              disabled={isAiTyping}
              className="max-w-[280px] shrink-0 truncate rounded-full border border-white/[0.08] px-3.5 py-2 text-sm text-zinc-300 transition-colors hover:border-white/25 hover:text-white disabled:opacity-40"
            >
              {prompt}
            </button>
          ))}
        </div>
      )}

      {/* composer */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSendMessage();
        }}
        className="flex items-center gap-2 rounded-2xl border border-white/[0.08] bg-black/40 p-1.5 pl-4 transition-colors focus-within:border-orange-500/70"
      >
        <input
          type="text"
          value={inputText}
          onChange={(e) => onInputChange(e.target.value)}
          placeholder={isAiTyping ? `${characterName} is typing...` : `Reply to ${characterName}...`}
          disabled={isAiTyping}
          aria-label={`Reply to ${characterName}`}
          className="min-w-0 flex-1 bg-transparent py-2 text-base text-white placeholder:text-zinc-500 focus:outline-none disabled:opacity-60"
        />
        <button
          type="submit"
          disabled={!inputText.trim() || isAiTyping}
          aria-label="Send"
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange-500 text-black transition-colors hover:bg-orange-400 disabled:bg-white/10 disabled:text-zinc-500"
        >
          <ArrowUp className="h-5 w-5" />
        </button>
      </form>

      <div className="flex justify-end">
        <Button variant="white" size="sm" onClick={onFinishAndGetFeedback}>
          <Check className="h-4 w-4" />
          Finish and get feedback
        </Button>
      </div>
    </div>
  );
});
