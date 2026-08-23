"use client";

import React, { memo } from "react";
import { BarChart2, TrendingUp, Award, Zap, CheckCircle2 } from "lucide-react";

export const OrgAnalyticsScreen = memo(function OrgAnalyticsScreen() {
  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-[#12131c]/90 rounded-2xl p-5 border border-white/10 shadow-lg space-y-1">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <BarChart2 className="w-5 h-5 text-orange-400" />
          <span>Organization Analytics & Skill Assessment</span>
        </h2>
        <p className="text-xs text-white/60">
          Track real-time AI scoring accuracy, weekly simulation volume, and career mastery metrics across your teams.
        </p>
      </div>

      {/* Analytics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-[#12131c]/90 rounded-2xl p-5 border border-white/10 space-y-2">
          <span className="text-[11px] font-semibold text-white/50 uppercase tracking-wider">
            AVG SIMULATION SCORE
          </span>
          <div className="text-3xl font-extrabold text-white font-mono">88.5%</div>
          <div className="text-xs text-emerald-400 font-medium flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+4.2% improvement vs last month</span>
          </div>
        </div>

        <div className="bg-[#12131c]/90 rounded-2xl p-5 border border-white/10 space-y-2">
          <span className="text-[11px] font-semibold text-white/50 uppercase tracking-wider">
            SIMULATIONS COMPLETED
          </span>
          <div className="text-3xl font-extrabold text-white font-mono">3,420</div>
          <div className="text-xs text-orange-400 font-medium flex items-center gap-1">
            <Zap className="w-3.5 h-3.5" />
            <span>342 scenarios completed this week</span>
          </div>
        </div>

        <div className="bg-[#12131c]/90 rounded-2xl p-5 border border-white/10 space-y-2">
          <span className="text-[11px] font-semibold text-white/50 uppercase tracking-wider">
            SKILL MASTERY RATE
          </span>
          <div className="text-3xl font-extrabold text-white font-mono">92.1%</div>
          <div className="text-xs text-emerald-400 font-medium flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Passed AI evaluation on 1st try</span>
          </div>
        </div>
      </div>

      {/* Detailed Skill Competency Breakdown */}
      <div className="bg-[#12131c]/90 rounded-2xl p-5 border border-white/10 shadow-lg space-y-4">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <Award className="w-4 h-4 text-orange-400" />
          <span>Core AI Evaluation Criteria & Soft Skills Scoring</span>
        </h3>

        <div className="space-y-3">
          {[
            { skill: "De-escalation & Professional Tone", score: 94, color: "bg-orange-500" },
            { skill: "Technical Accuracy & Diagnostics", score: 88, color: "bg-emerald-500" },
            { skill: "Empathetic Communication", score: 91, color: "bg-rose-500" },
            { skill: "Time-to-Resolution Efficiency", score: 84, color: "bg-purple-500" },
          ].map((item) => (
            <div key={item.skill} className="bg-black/50 p-3 rounded-xl border border-white/10 space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-white">{item.skill}</span>
                <span className="font-mono text-orange-400 font-bold">{item.score}%</span>
              </div>
              <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${item.color}`}
                  style={{ width: `${item.score}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});
