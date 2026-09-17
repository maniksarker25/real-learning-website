"use client";

import React from "react";
import { motion } from "framer-motion";
import { Bot } from "lucide-react";

export function AdaptiveAiAudioVisual() {
  return (
    <div className="w-full h-full flex flex-col justify-between rounded-2xl bg-[#121217] border border-white/10 p-3.5 sm:p-6 space-y-3 sm:space-y-4">
      <div className="flex items-center justify-between border-b border-white/10 pb-2.5 sm:pb-3 gap-2">
        <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
          <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-lg bg-fuchsia-500/20 border border-fuchsia-400/40 flex items-center justify-center text-fuchsia-400 shrink-0">
            <Bot className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
          </div>
          <span className="text-[11px] sm:text-xs font-mono font-bold text-white truncate">
            Adaptive AI Audio Engine
          </span>
        </div>
        <span className="text-[9px] sm:text-[10px] font-mono text-fuchsia-300 bg-fuchsia-500/10 px-2 sm:px-2.5 py-0.5 rounded-full border border-fuchsia-400/30 shrink-0">
          Voice + Text
        </span>
      </div>

      <div className="flex items-center justify-center gap-1 sm:gap-1.5 py-2 sm:py-3 overflow-hidden">
        {[32, 52, 22, 68, 42, 60, 26, 76, 38, 54, 28, 64, 46, 34, 58, 24].map(
          (h, i) => (
            <motion.span
              key={i}
              className="w-1 sm:w-1.5 rounded-full bg-gradient-to-t from-fuchsia-500 to-rose-400 shadow-sm max-h-8 shrink-0"
              animate={{ height: [h * 0.35, h, h * 0.35] }}
              transition={{
                repeat: Infinity,
                duration: 0.75 + (i % 4) * 0.18,
                ease: "easeInOut",
              }}
              style={{ height: `${h}px` }}
            />
          ),
        )}
      </div>

      <div className="p-2.5 sm:p-3.5 rounded-xl bg-black/50 border border-white/[0.08] space-y-1.5">
        <div className="text-[9px] sm:text-[10px] font-mono text-fuchsia-300 font-semibold flex items-center justify-between gap-2">
          <span>Patricia (Simulation Lead)</span>
          <span className="text-white/40 shrink-0">Active speaker</span>
        </div>
        <p className="text-[11px] sm:text-xs text-white/90 leading-relaxed">
          &quot;I hear your concern about the outage. What is your immediate
          remediation plan before we speak with the executive board?&quot;
        </p>
      </div>

      <div className="flex items-center justify-between gap-2 text-[9px] sm:text-[10px] font-mono text-white/40 pt-1 border-t border-white/5">
        <span>Latency: 142ms</span>
        <span className="text-fuchsia-400 truncate">Emotion: Empathetic (94%)</span>
      </div>
    </div>
  );
}
