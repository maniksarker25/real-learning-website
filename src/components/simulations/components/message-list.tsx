"use client";

import { memo, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MessageBubble } from "./message-bubble";
import type { SimulationMessage, SimulationScenario } from "../types";

interface MessageListProps {
  messages: SimulationMessage[];
  scenario: SimulationScenario;
  showTyping?: boolean;
  typingRole?: "ai" | "user";
  heightClass?: string;
}

export const MessageList = memo(function MessageList({
  messages,
  scenario,
  showTyping = false,
  typingRole = "ai",
  heightClass = "h-[340px] sm:h-[380px]",
}: MessageListProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Smoothly scroll container to bottom whenever messages or typing status change
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        top: containerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages, showTyping]);

  return (
    <div
      ref={containerRef}
      className={`px-3 sm:px-5 py-4 ${heightClass} overflow-y-auto scroll-smooth relative`}
      style={{
        scrollbarWidth: "thin",
        scrollbarColor: "rgba(255, 255, 255, 0.15) transparent",
      }}
    >
      <AnimatePresence initial={false}>
        {messages.map((m) => (
          <MessageBubble key={m.id} message={m} scenario={scenario} />
        ))}
      </AnimatePresence>

      {showTyping && (
        <motion.div
          key="typing-indicator"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className={`flex ${
            typingRole === "user" ? "justify-end" : "justify-start"
          } mb-3`}
        >
          {typingRole === "ai" && (
            <div
              className={`w-6 h-6 rounded-full bg-gradient-to-br ${scenario.aiGradient} flex-shrink-0 mr-2 mt-0.5 shadow-sm`}
            />
          )}

          <TypingDots />

          {typingRole === "user" && (
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-orange-400 to-amber-400 flex-shrink-0 ml-2 mt-0.5 shadow-sm" />
          )}
        </motion.div>
      )}
    </div>
  );
});

const TypingDots = memo(function TypingDots() {
  return (
    <div className="flex gap-1.5 items-center bg-white/[0.06] border border-white/10 rounded-2xl px-3.5 py-2.5 shadow-sm">
      {[0, 0.18, 0.36].map((d, i) => (
        <motion.span
          key={i}
          className="w-1.5 h-1.5 rounded-full bg-white/60"
          animate={{ y: [0, -4, 0], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 0.7, repeat: Infinity, delay: d }}
        />
      ))}
    </div>
  );
});
