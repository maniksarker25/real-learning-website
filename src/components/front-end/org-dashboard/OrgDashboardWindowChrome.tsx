"use client";

import React, { memo } from "react";
import { Lock } from "lucide-react";

export const OrgDashboardWindowChrome = memo(
  function OrgDashboardWindowChrome() {
    return (
      <div className="flex items-center justify-between px-3.5 py-2 bg-[#12131b] border-b border-white/10 text-xs">
        {/* macOS Traffic Lights */}
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56] border border-[#E0443E]/60" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E] border border-[#DEA123]/60" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F] border border-[#1AAB29]/60" />
        </div>

        {/* Address Bar */}
        <div className="flex items-center gap-1.5 px-3 py-0.5 rounded bg-black/60 border border-white/10 text-white/60 font-mono text-xs max-w-xs w-full justify-center truncate">
          <Lock className="w-3 h-3 text-emerald-400 shrink-0" />
          <span className="truncate">admin.reallearning.ai/dashboard</span>
        </div>

        {/* Live Sync Badge */}
        <div className="flex items-center gap-1.5 text-white/50 text-xs">
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
          </span>
          <span className="hidden sm:inline font-mono">Live</span>
        </div>
      </div>
    );
  }
);
