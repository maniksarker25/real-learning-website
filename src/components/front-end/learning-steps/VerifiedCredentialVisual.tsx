"use client";

import React from "react";
import { ShieldCheck, Sparkles, CheckCircle2 } from "lucide-react";

export function VerifiedCredentialVisual() {
  return (
    <div className="w-full h-full flex flex-col justify-between rounded-2xl bg-[#121217] border border-white/10 p-4 sm:p-6 space-y-4">
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span className="text-xs font-mono font-bold text-white">
            Verified Mastery Credential
          </span>
        </div>
        <span className="text-[10px] font-mono text-emerald-300 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-400/30">
          Level 4 Ready
        </span>
      </div>

      <div className="space-y-1.5">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-emerald-400" />
          <h4 className="text-sm sm:text-base font-bold text-white">
            Senior Support & Comms Lead
          </h4>
        </div>
        <p className="text-xs text-white/60 leading-relaxed">
          Benchmarked directly against hiring standards for top technology and
          customer operations teams.
        </p>
      </div>

      <div className="space-y-2 p-3.5 rounded-xl bg-black/50 border border-white/[0.08] text-xs">
        <div className="flex items-center gap-2 text-white/85">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
          <span>15 high-stress workplace scenarios completed</span>
        </div>
        <div className="flex items-center gap-2 text-white/85">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
          <span>Diagnosed multi-tier SLA escalation incidents</span>
        </div>
        <div className="flex items-center gap-2 text-white/85">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
          <span>Turn-by-turn actionable feedback verified</span>
        </div>
      </div>

      <div className="flex items-center justify-between text-[11px] text-white/50 pt-1 border-t border-white/5">
        <span>Weekly Growth: +24%</span>
        <span className="text-emerald-400 font-semibold font-mono">
          Real Learning Certified
        </span>
      </div>
    </div>
  );
}
