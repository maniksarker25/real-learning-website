"use client";

import React from "react";
import { BarChart3 } from "lucide-react";

const SKILL_SCORES = [
  {
    skill: "Empathy & Active Listening",
    score: 94,
    color: "from-cyan-400 to-teal-400",
  },
  {
    skill: "Tactical Problem Solving",
    score: 89,
    color: "from-blue-400 to-cyan-400",
  },
  {
    skill: "Tone & Professional Clarity",
    score: 96,
    color: "from-teal-400 to-emerald-400",
  },
  {
    skill: "Conflict De-escalation",
    score: 91,
    color: "from-emerald-400 to-cyan-400",
  },
];

export function MultiSkillScorecardVisual() {
  return (
    <div className="w-full h-full flex flex-col justify-between rounded-2xl bg-[#121217] border border-white/10 p-3.5 sm:p-6 space-y-3 sm:space-y-3.5">
      <div className="flex items-center justify-between border-b border-white/10 pb-2.5 sm:pb-3 gap-2">
        <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
          <BarChart3 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
          <span className="text-[11px] sm:text-xs font-mono font-bold text-white truncate">
            Multi-Skill Scorecard
          </span>
        </div>
        <span className="text-[9px] sm:text-[10px] font-mono text-cyan-300 bg-cyan-500/10 px-2 sm:px-2.5 py-0.5 rounded-full border border-cyan-400/30 shrink-0">
          Instant Scoring
        </span>
      </div>

      <div className="space-y-2 sm:space-y-3">
        {SKILL_SCORES.map((item, idx) => (
          <div key={idx} className="space-y-0.5 sm:space-y-1">
            <div className="flex justify-between gap-2 text-[11px] sm:text-xs font-medium">
              <span className="text-white/80 truncate">{item.skill}</span>
              <span className="font-mono font-bold text-cyan-300 shrink-0">
                {item.score}%
              </span>
            </div>
            <div className="w-full h-1.5 sm:h-2 rounded-full bg-black/70 overflow-hidden border border-white/5">
              <div
                className={`h-full bg-gradient-to-r ${item.color} rounded-full transition-all duration-700`}
                style={{ width: `${item.score}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="p-2.5 sm:p-3.5 rounded-xl bg-cyan-950/40 border border-cyan-500/25 text-[10px] sm:text-[11px] text-cyan-200/90 leading-relaxed font-medium">
        &quot;You validated the customer&apos;s frustration before proposing the fix. That
        reduced churn risk by 40%.&quot;
      </div>
    </div>
  );
}
