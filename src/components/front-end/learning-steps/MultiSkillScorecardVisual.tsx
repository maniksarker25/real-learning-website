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
    <div className="w-full h-full flex flex-col justify-between rounded-2xl bg-[#121217] border border-white/10 p-4 sm:p-6 space-y-3.5">
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div className="flex items-center gap-2">
          <BarChart3 className="w-4 h-4 text-cyan-400" />
          <span className="text-xs font-mono font-bold text-white">
            Multi-Skill Scorecard
          </span>
        </div>
        <span className="text-[10px] font-mono text-cyan-300 bg-cyan-500/10 px-2.5 py-0.5 rounded-full border border-cyan-400/30">
          Instant Scoring
        </span>
      </div>

      <div className="space-y-3">
        {SKILL_SCORES.map((item, idx) => (
          <div key={idx} className="space-y-1">
            <div className="flex justify-between text-xs font-medium">
              <span className="text-white/80">{item.skill}</span>
              <span className="font-mono font-bold text-cyan-300">
                {item.score}%
              </span>
            </div>
            <div className="w-full h-2 rounded-full bg-black/70 overflow-hidden border border-white/5">
              <div
                className={`h-full bg-gradient-to-r ${item.color} rounded-full transition-all duration-700`}
                style={{ width: `${item.score}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="p-3.5 rounded-xl bg-cyan-950/40 border border-cyan-500/25 text-[11px] text-cyan-200/90 leading-relaxed font-medium">
        "You validated the customer's frustration before proposing the fix. That
        reduced churn risk by 40%."
      </div>
    </div>
  );
}
