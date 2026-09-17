"use client";

import React from "react";

export function IncidentSimulationVisual() {
  return (
    <div className="w-full h-full flex flex-col justify-between rounded-2xl bg-[#121217] border border-white/10 p-3.5 sm:p-6 space-y-3 sm:space-y-4">
      <div className="flex items-center justify-between border-b border-white/10 pb-2.5 sm:pb-3 gap-2">
        <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
          <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-rose-500 animate-pulse shrink-0" />
          <span className="text-[11px] sm:text-xs font-mono font-bold text-white tracking-wide truncate">
            SIMULATION #408
          </span>
        </div>
        <span className="px-2 sm:px-2.5 py-0.5 rounded-full bg-rose-500/10 border border-rose-500/30 text-[9px] sm:text-[10px] font-mono font-medium text-rose-300 shrink-0">
          Critical Incident
        </span>
      </div>

      <div className="space-y-1.5 sm:space-y-2">
        <h4 className="text-xs sm:text-base font-bold text-white leading-snug">
          High-Stakes Escalation: Team System Outage
        </h4>
        <p className="text-[11px] sm:text-xs text-white/60 leading-relaxed">
          A major customer tier experiences service interruption minutes before
          executive quarterly reviews.
        </p>
      </div>

      <div className="p-2.5 sm:p-3.5 rounded-xl bg-black/50 border border-white/[0.08] space-y-2 sm:space-y-2.5">
        <div className="text-[9px] sm:text-[10px] font-mono text-white/40 uppercase tracking-wider flex items-center justify-between gap-2">
          <span>Active Stakeholders</span>
          <span className="text-emerald-400 shrink-0">● 2 Online</span>
        </div>
        <div className="flex items-center justify-between gap-2 text-[11px] sm:text-xs">
          <span className="text-white/90 truncate">Sarah Chen (VP Ops)</span>
          <span className="text-amber-400 font-mono text-[9px] sm:text-[11px] px-1.5 sm:px-2 py-0.5 rounded bg-amber-500/10 border border-amber-400/20 shrink-0">
            Frustrated
          </span>
        </div>
        <div className="flex items-center justify-between gap-2 text-[11px] sm:text-xs">
          <span className="text-white/90 truncate">Marcus Vance (Lead SRE)</span>
          <span className="text-blue-400 font-mono text-[9px] sm:text-[11px] px-1.5 sm:px-2 py-0.5 rounded bg-blue-500/10 border border-blue-400/20 shrink-0">
            Investigating
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between gap-2 text-[10px] sm:text-[11px] text-white/50 pt-1 border-t border-white/5">
        <span>Elapsed: 04:12</span>
        <span className="text-emerald-400 font-medium truncate">
          100% Risk-free sandbox
        </span>
      </div>
    </div>
  );
}
