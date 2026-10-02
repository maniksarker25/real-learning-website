"use client";

import React, { memo } from "react";
import { Send, Sparkles, ChevronRight } from "lucide-react";

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
    <>
      {/* Quick Suggestions Chips Bar */}
      {prompts && prompts.length > 0 && (
        <div className="px-4 py-2 bg-[#FAF8F5] border-t border-stone-200 flex items-center gap-2 overflow-x-auto shrink-0 no-scrollbar">
          <span className="text-[10px] font-mono text-stone-500 uppercase font-bold shrink-0 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-amber-600" />
            <span>Suggestions:</span>
          </span>
          {prompts.map((prompt, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => onSendMessage(prompt)}
              disabled={isAiTyping}
              className="px-2.5 py-1 rounded-full bg-white hover:bg-stone-50 text-stone-700 hover:text-stone-950 border border-stone-200 text-xs transition-colors cursor-pointer whitespace-nowrap shrink-0 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
            >
              <span className="truncate max-w-[240px]">{prompt}</span>
              <ChevronRight className="w-3 h-3 text-stone-400" />
            </button>
          ))}
        </div>
      )}

      {/* Input Form & Action Bar */}
      <div className="p-3 bg-white border-t border-stone-200 space-y-2 shrink-0">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSendMessage();
          }}
          className="flex items-center gap-2"
        >
          <div className="relative flex-1">
            <input
              type="text"
              value={inputText}
              onChange={(e) => onInputChange(e.target.value)}
              placeholder={`Reply to ${characterName}...`}
              disabled={isAiTyping}
              className="w-full bg-stone-50 border border-stone-200 rounded-lg px-3.5 py-2 pr-10 text-xs sm:text-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:border-amber-500 focus:bg-white transition-colors disabled:opacity-60"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-mono text-stone-400 hidden sm:inline-block">
              ↵
            </span>
          </div>

          <button
            type="submit"
            disabled={!inputText.trim() || isAiTyping}
            className="px-4 py-2 rounded-lg bg-stone-900 hover:bg-stone-800 text-white text-xs sm:text-sm font-semibold transition-colors cursor-pointer flex items-center gap-1.5 shrink-0 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <span>Send</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-0.5 text-xs">
          <div className="flex items-center gap-1.5 text-stone-500 text-[11px] truncate">
            <span className="font-mono font-semibold text-stone-700 shrink-0">
              Goal:
            </span>
            <span className="truncate">{objective}</span>
          </div>

          <button
            type="button"
            onClick={onFinishAndGetFeedback}
            className="px-3 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs transition-colors cursor-pointer flex items-center justify-center gap-1.5 shrink-0 self-end sm:self-auto"
          >
            <Sparkles className="w-3.5 h-3.5 fill-current" />
            <span>Finish & Get Feedback</span>
          </button>
        </div>
      </div>
    </>
  );
});
