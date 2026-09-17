"use client";

import React from "react";
import { ShieldCheck, Sparkles, CheckCircle2 } from "lucide-react";

export function VerifiedCredentialVisual() {
  return (
    <div className="w-full h-full flex flex-col justify-between rounded-2xl bg-[#121217] border border-white/10 p-3.5 sm:p-6 space-y-3 sm:space-y-4">
      <div className="flex items-center justify-between border-b border-white/10 pb-2.5 sm:pb-3 gap-2">
        <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
          <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400 shrink-0" />
          <span className="text-[11px] sm:text-xs font-mono font-bold text-white truncate">
            Verified Mastery Credential
          </span>
        </div>
        <span className="text-[9px] sm:text-[10px] font-mono text-emerald-300 bg-emerald-500/10 px-2 sm:px-2.5 py-0.5 rounded-full border border-emerald-400/30 shrink-0">
          Level 4 Ready
        </span>
      </div>

      <div className="space-y-1 sm:space-y-1.5">
        <div className="flex items-center gap-1.5 sm:gap-2">
          <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400 shrink-0" />
          <h4 className="text-xs sm:text-base font-bold text-white truncate">
            Senior Support &amp; Comms Lead
          </h4>
        </div>
        <p className="text-[11px] sm:text-xs text-white/60 leading-relaxed">
          Benchmarked directly against hiring standards for top technology and
          customer operations teams.
        </p>
      </div>

      <div className="space-y-1.5 sm:space-y-2 p-2.5 sm:p-3.5 rounded-xl bg-black/50 border border-white/[0.08] text-[11px] sm:text-xs">
        <div className="flex items-center gap-1.5 sm:gap-2 text-white/85">
          <CheckCircle2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-emerald-400 shrink-0" />
          <span className="truncate">15 high-stress workplace scenarios completed</span>
        </div>
        <div className="flex items-center gap-1.5 sm:gap-2 text-white/85">
          <CheckCircle2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-emerald-400 shrink-0" />
          <span className="truncate">Diagnosed multi-tier SLA escalation incidents</span>
        </div>
        <div className="flex items-center gap-1.5 sm:gap-2 text-white/85">
          <CheckCircle2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-emerald-400 shrink-0" />
          <span className="truncate">Turn-by-turn actionable feedback verified</span>
        </div>
      </div>

      <div className="flex items-center justify-between gap-2 text-[10px] sm:text-[11px] text-white/50 pt-1 border-t border-white/5">
        <span>Weekly Growth: +24%</span>
        <span className="text-emerald-400 font-semibold font-mono truncate">
          Real Learning Certified
        </span>
      </div>
    </div>
  );
}
