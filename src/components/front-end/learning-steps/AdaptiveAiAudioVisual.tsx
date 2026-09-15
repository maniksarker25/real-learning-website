"use client";

import React from "react";
import { motion } from "framer-motion";
import { Bot } from "lucide-react";

export function AdaptiveAiAudioVisual() {
  return (
    <div className="w-full h-full flex flex-col justify-between rounded-2xl bg-[#121217] border border-white/10 p-4 sm:p-6 space-y-4">
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-fuchsia-500/20 border border-fuchsia-400/40 flex items-center justify-center text-fuchsia-400">
            <Bot className="w-3.5 h-3.5" />
          </div>
          <span className="text-xs font-mono font-bold text-white">
            Adaptive AI Audio Engine
          </span>
        </div>
        <span className="text-[10px] font-mono text-fuchsia-300 bg-fuchsia-500/10 px-2.5 py-0.5 rounded-full border border-fuchsia-400/30">
          Voice + Text
        </span>
      </div>

      <div className="flex items-center justify-center gap-1.5 py-3">
        {[32, 52, 22, 68, 42, 60, 26, 76, 38, 54, 28, 64, 46, 34, 58, 24].map(
          (h, i) => (
            <motion.span
              key={i}
              className="w-1.5 rounded-full bg-gradient-to-t from-fuchsia-500 to-rose-400 shadow-sm max-h-8"
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

      <div className="p-3.5 rounded-xl bg-black/50 border border-white/[0.08] space-y-1.5">
        <div className="text-[10px] font-mono text-fuchsia-300 font-semibold flex items-center justify-between">
          <span>Patricia (Simulation Lead)</span>
          <span className="text-white/40">Active speaker</span>
        </div>
        <p className="text-xs text-white/90 leading-relaxed">
          "I hear your concern about the outage. What is your immediate
          remediation plan before we speak with the executive board?"
        </p>
      </div>

      <div className="flex items-center justify-between text-[10px] font-mono text-white/40 pt-1 border-t border-white/5">
        <span>Latency: 142ms</span>
        <span className="text-fuchsia-400">Emotion: Empathetic (94%)</span>
      </div>
    </div>
  );
}
