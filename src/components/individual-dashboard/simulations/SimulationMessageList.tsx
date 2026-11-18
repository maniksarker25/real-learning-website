"use client";

import { memo, RefObject } from "react";
import { cn } from "@/lib/utils";
import { ChatMessage, SimulationScenario } from "@/types/individual";
import { PatriciaFace } from "@/components/dashboard/ui";

interface SimulationMessageListProps {
  messages: ChatMessage[];
  scenario: SimulationScenario;
  isAiTyping: boolean;
  messagesEndRef: RefObject<HTMLDivElement | null>;
}

/** Chat transcript: Patricia on the left (grey bubble), learner on the right (orange bubble). */
export const SimulationMessageList = memo(function SimulationMessageList({
  messages,
  scenario,
  isAiTyping,
  messagesEndRef,
}: SimulationMessageListProps) {
  return (
    <div data-lenis-prevent className="min-h-0 flex-1 space-y-5 overflow-y-auto px-4 py-6 sm:px-6">
      {messages.map((m) => {
        const mine = m.sender === "user";
        return (
          <div key={m.id} className={cn("flex items-end gap-2.5", mine && "justify-end")}>
            {!mine && <PatriciaFace face="normal" size={32} />}
            <div className={cn("flex max-w-[82%] flex-col gap-1 sm:max-w-[70%]", mine && "items-end")}>
              <span className="px-1 text-sm text-zinc-500">
                {mine ? "You" : scenario.characterName} · {m.timestamp}
              </span>
              <p
                className={cn(
                  "whitespace-pre-wrap rounded-2xl px-4 py-3 text-base leading-relaxed sm:px-5",
                  mine ? "rounded-br-sm bg-orange-500 text-black" : "rounded-bl-sm bg-white/[0.06] text-zinc-100",
                )}
              >
                {m.text}
              </p>
            </div>
          </div>
        );
      })}

      {isAiTyping && (
        <div className="flex items-end gap-2.5" aria-live="polite">
          <PatriciaFace face="thinking" size={32} />
          <div className="flex items-center gap-1.5 rounded-2xl rounded-bl-sm bg-white/[0.06] px-5 py-4">
            <span className="sr-only">{scenario.characterName} is typing</span>
            {[0, 0.15, 0.3].map((d) => (
              <span
                key={d}
                className="h-2 w-2 animate-bounce rounded-full bg-zinc-400"
                style={{ animationDelay: `${d}s` }}
              />
            ))}
          </div>
        </div>
      )}

      <div ref={messagesEndRef} />
    </div>
  );
});
