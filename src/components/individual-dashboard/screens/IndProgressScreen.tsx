"use client";

import React, { memo } from "react";
import { BarChart3, TrendingUp, Award, CheckCircle2, Flame, Trophy, ShieldCheck } from "lucide-react";
import { useAccount } from "@/context/AccountContext";
import { cn } from "@/lib/utils";
import { RecentSimulationsTable } from "../RecentSimulationsTable";

export const IndProgressScreen = memo(function IndProgressScreen() {
  const { session } = useAccount();

  const skillLevels = [
    { name: "Empathy & Communication", level: 94, category: "Soft Skills" },
    { name: "De-escalation Tactics", level: 91, category: "Conflict Management" },
    { name: "Problem Diagnostics", level: 88, category: "Technical Logic" },
    { name: "Active Listening", level: 95, category: "Comprehension" },
  ];

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-[#12131c]/90 rounded-2xl p-5 border border-white/10 shadow-lg space-y-1">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-orange-400" />
          <span>Progress = Track Improvement Over Time</span>
        </h2>
        <p className="text-xs text-white/60">
          Understand your skill development, quiz scores, and simulation performance trends for{" "}
          <span className="text-orange-300 font-semibold">{session.goal || "Customer Service"}</span>.
        </p>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-[#12131c]/90 rounded-2xl p-4 border border-white/10 space-y-1">
          <div className="flex items-center gap-1.5 text-orange-400 text-xs font-bold">
            <Flame className="w-4 h-4" />
            <span>LEARNING STREAK</span>
          </div>
          <div className="text-2xl font-extrabold text-white font-mono">7 Days</div>
          <span className="text-[10px] text-white/40">Active practice streak</span>
        </div>

        <div className="bg-[#12131c]/90 rounded-2xl p-4 border border-white/10 space-y-1">
          <div className="flex items-center gap-1.5 text-emerald-400 text-xs font-bold">
            <CheckCircle2 className="w-4 h-4" />
            <span>CLASSES COMPLETED</span>
          </div>
          <div className="text-2xl font-extrabold text-white font-mono">3 / 4</div>
          <span className="text-[10px] text-white/40">Modules completed</span>
        </div>

        <div className="bg-[#12131c]/90 rounded-2xl p-4 border border-white/10 space-y-1">
          <div className="flex items-center gap-1.5 text-rose-400 text-xs font-bold">
            <Trophy className="w-4 h-4" />
            <span>SIMULATIONS PASSED</span>
          </div>
          <div className="text-2xl font-extrabold text-white font-mono">5 Passed</div>
          <span className="text-[10px] text-white/40">Average score: 89%</span>
        </div>

        <div className="bg-[#12131c]/90 rounded-2xl p-4 border border-white/10 space-y-1">
          <div className="flex items-center gap-1.5 text-purple-400 text-xs font-bold">
            <TrendingUp className="w-4 h-4" />
            <span>OVERALL ACCURACY</span>
          </div>
          <div className="text-2xl font-extrabold text-white font-mono">92.8%</div>
          <span className="text-[10px] text-emerald-400 font-bold">+14.2% this month</span>
        </div>
      </div>

      {/* Skill Level Mastery Bars */}
      <div className="bg-[#12131c]/90 rounded-2xl p-5 border border-white/10 shadow-lg space-y-4">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-orange-400" />
          <span>Skill Level Mastery Progress</span>
        </h3>

        <div className="space-y-3">
          {skillLevels.map((sk) => (
            <div key={sk.name} className="bg-black/50 p-3.5 rounded-xl border border-white/10 space-y-1.5">
              <div className="flex justify-between text-xs">
                <div>
                  <span className="font-bold text-white">{sk.name}</span>
                  <span className="ml-2 text-[10px] font-mono text-white/40">({sk.category})</span>
                </div>
                <span className="font-mono text-orange-400 font-bold">{sk.level}%</span>
              </div>
              <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-orange-500 to-amber-400"
                  style={{ width: `${sk.level}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Practice Simulations & Feedback History */}
      <div className="space-y-3 pt-2">
        <RecentSimulationsTable />
      </div>
    </div>
  );
});
