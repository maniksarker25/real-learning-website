"use client";

import React, { memo, RefObject } from "react";
import { User, Bot } from "lucide-react";
import { cn } from "@/lib/utils";
import { ChatMessage, SimulationScenario } from "@/types/individual";

interface SimulationMessageListProps {
  messages: ChatMessage[];
  scenario: SimulationScenario;
  isAiTyping: boolean;
  messagesEndRef: RefObject<HTMLDivElement | null>;
}

export const SimulationMessageList = memo(function SimulationMessageList({
  messages,
  scenario,
  isAiTyping,
  messagesEndRef,
}: SimulationMessageListProps) {
  return (
    <div
      data-lenis-prevent
      className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3 bg-[#FBF9F5] min-h-0"
    >
      {messages.map((m) => (
        <div
          key={m.id}
          className={cn(
            "flex items-start gap-2.5 max-w-[85%] sm:max-w-[75%] md:max-w-[65%] text-xs sm:text-sm",
            m.sender === "user" ? "ml-auto flex-row-reverse" : ""
          )}
        >
          {/* Avatar */}
          <div
            className={cn(
              "w-7 h-7 rounded-full flex items-center justify-center font-bold text-[10px] shrink-0 border",
              m.sender === "user"
                ? "bg-stone-900 text-white border-stone-900"
                : "bg-white text-stone-700 border-stone-200"
            )}
          >
            {m.sender === "user" ? (
              <User className="w-3.5 h-3.5" />
            ) : (
              <Bot className="w-3.5 h-3.5 text-amber-700" />
            )}
          </div>

          {/* Message Bubble Body */}
          <div
            className={cn(
              "p-3.5 rounded-xl leading-relaxed font-sans space-y-1",
              m.sender === "user"
                ? "bg-stone-900 text-white rounded-tr-xs"
                : "bg-white text-stone-900 border border-stone-200 rounded-tl-xs shadow-xs"
            )}
          >
            <div className="flex items-center justify-between gap-3 text-[10px] opacity-60 font-mono">
              <span className="font-semibold">
                {m.sender === "user" ? "You" : scenario.characterName}
              </span>
              <span>{m.timestamp}</span>
            </div>
            <p className="text-xs sm:text-sm whitespace-pre-wrap">{m.text}</p>
          </div>
        </div>
      ))}

      {/* Typing Indicator */}
      {isAiTyping && (
        <div className="flex items-start gap-2.5 max-w-md text-xs">
          <div className="w-7 h-7 rounded-full bg-white border border-stone-200 flex items-center justify-center text-amber-700 shrink-0">
            <Bot className="w-3.5 h-3.5" />
          </div>
          <div className="px-3.5 py-2.5 rounded-xl rounded-tl-xs bg-white border border-stone-200 text-stone-600 flex items-center gap-2 shadow-xs">
            <span className="text-xs text-stone-700 font-medium">
              {scenario.characterName} is replying
            </span>
            <div className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-stone-400 animate-bounce" />
              <span
                className="w-1.5 h-1.5 rounded-full bg-stone-400 animate-bounce"
                style={{ animationDelay: "0.15s" }}
              />
              <span
                className="w-1.5 h-1.5 rounded-full bg-stone-400 animate-bounce"
                style={{ animationDelay: "0.3s" }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Scroll Anchor */}
      <div ref={messagesEndRef} />
    </div>
  );
});
