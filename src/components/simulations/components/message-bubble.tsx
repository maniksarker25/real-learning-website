"use client";

import { memo } from "react";
import { motion } from "framer-motion";
import type { SimulationMessage, SimulationScenario } from "../types";

interface MessageBubbleProps {
  message: SimulationMessage;
  scenario: SimulationScenario;
}

export const MessageBubble = memo(function MessageBubble({
  message,
  scenario,
}: MessageBubbleProps) {
  const isUser = message.role === "user";

  return (
    <motion.div
      initial={{ opacity: 0, y: 8, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className={`flex ${isUser ? "justify-end" : "justify-start"} mb-3`}
    >
      {!isUser && (
        <div
          className={`w-6 h-6 rounded-full bg-gradient-to-br ${scenario.aiGradient} flex-shrink-0 mr-2 mt-0.5 flex items-center justify-center text-[10px] font-bold text-white shadow-sm`}
        >
          {scenario.aiInitial}
        </div>
      )}

      <div
        className={`max-w-[85%] sm:max-w-[75%] rounded-2xl px-3.5 sm:px-4 py-2.5 text-xs sm:text-sm leading-relaxed ${
          isUser
            ? "bg-orange-500/20 border border-orange-400/25 text-white rounded-tr-sm shadow-sm"
            : "bg-white/[0.06] border border-white/10 text-white/90 rounded-tl-sm shadow-sm"
        }`}
      >
        <div
          className={`text-[9px] uppercase tracking-wider mb-1 font-semibold ${
            isUser ? "text-orange-300/80" : "text-white/40"
          }`}
        >
          {isUser
            ? "Your response"
            : `${scenario.title.split(" ")[0]} Character`}
        </div>
        <div>{message.text}</div>
      </div>

      {isUser && (
        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-orange-400 to-amber-400 flex-shrink-0 ml-2 mt-0.5 flex items-center justify-center text-[10px] font-bold text-white shadow-sm">
          Y
        </div>
      )}
    </motion.div>
  );
});
