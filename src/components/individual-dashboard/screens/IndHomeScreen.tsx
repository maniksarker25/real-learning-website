"use client";

import React, { memo, useCallback } from "react";
import {
  BookOpen,
  Zap,
  CheckCircle2,
  Award,
  ArrowRight,
  Sparkles,
  TrendingUp,
  Clock,
  Play,
  RotateCcw,
} from "lucide-react";
import { useAccount } from "@/context/AccountContext";
import { cn } from "@/lib/utils";

interface IndHomeScreenProps {
  onNavigateToTab: (tabId: string) => void;
  onLaunchSimulation?: (scenarioTitle: string) => void;
}

export const IndHomeScreen = memo(function IndHomeScreen({
  onNavigateToTab,
  onLaunchSimulation,
}: IndHomeScreenProps) {
  const { session } = useAccount();

  const handleContinueClass = useCallback(() => {
    onNavigateToTab("classes");
  }, [onNavigateToTab]);

  const handleStartSim = useCallback(() => {
    if (onLaunchSimulation) {
      onLaunchSimulation("Handling an Upset Customer Requesting Immediate Refund");
    }
    onNavigateToTab("simulations");
  }, [onNavigateToTab, onLaunchSimulation]);

  return (
    <div className="space-y-6">
      {/* Top Welcome Banner */}
      <div className="bg-[#12131c]/90 rounded-2xl p-6 border border-white/10 shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-400/30 text-xs text-orange-300 font-medium mb-2">
            <Sparkles className="w-3.5 h-3.5 text-orange-400" />
            <span>LEARNING LOOP DASHBOARD</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            Welcome back, {session.name || "Learner"}!
          </h1>
          <p className="text-xs text-white/70 mt-1 max-w-lg">
            Track your continuous learning loop for{" "}
            <span className="text-orange-300 font-semibold">
              {session.goal || "Customer Service"}
            </span>
            : Learn in Classes → Practice in Simulations → Get AI Feedback.
          </p>
        </div>

        <button
          onClick={() => onNavigateToTab("goals")}
          className="px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-white/80 hover:text-white transition-colors cursor-pointer shrink-0"
        >
          View Goal Roadmap
        </button>
      </div>

      {/* 2 Primary Action Focus Cards: Continue Learning & Practice Your Skills */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* 1. Continue Learning (Classes = Learn) */}
        <div className="bg-gradient-to-br from-orange-500/10 via-[#12131c] to-[#0d0e14] rounded-2xl p-6 border border-orange-400/30 shadow-xl flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-orange-500/20 text-orange-300 border border-orange-400/30 flex items-center gap-1.5">
                <BookOpen className="w-3 h-3" />
                <span>Classes = Learn</span>
              </span>
              <span className="text-xs text-orange-400 font-mono font-bold">
                67% Complete
              </span>
            </div>

            <div>
              <h2 className="text-xl font-extrabold text-white leading-snug">
                Customer Communication & De-escalation
              </h2>
              <p className="text-xs text-white/60 mt-1">
                Lesson 4 of 6: Active Listening & Non-Confrontational Phrasing
              </p>
            </div>

            {/* Progress bar */}
            <div className="space-y-1">
              <div className="w-full h-2 bg-black/60 rounded-full overflow-hidden border border-white/10">
                <div className="h-full bg-gradient-to-r from-orange-500 to-amber-400 rounded-full w-[67%]" />
              </div>
              <div className="flex justify-between text-[10px] font-mono text-white/40">
                <span>Completed Lessons: 3</span>
                <span>Next: Lesson 4 Quiz</span>
              </div>
            </div>
          </div>

          <button
            onClick={handleContinueClass}
            className="w-full py-3 rounded-full bg-white text-black hover:bg-white/90 text-xs font-extrabold transition-colors shadow-lg cursor-pointer flex items-center justify-center gap-2"
          >
            <span>Continue Class</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* 2. Practice Your Skills (Simulations = Practice) */}
        <div className="bg-gradient-to-br from-rose-500/10 via-[#12131c] to-[#0d0e14] rounded-2xl p-6 border border-rose-400/30 shadow-xl flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-rose-500/20 text-rose-300 border border-rose-400/30 flex items-center gap-1.5">
                <Zap className="w-3 h-3" />
                <span>Simulations = Practice</span>
              </span>
              <span className="text-xs text-rose-400 font-mono font-bold">
                Recommended
              </span>
            </div>

            <div>
              <h2 className="text-xl font-extrabold text-white leading-snug">
                Handling an Upset Customer Requesting Refund
              </h2>
              <p className="text-xs text-white/60 mt-1">
                Practice conflict resolution & empathy with a dynamic AI scenario character.
              </p>
            </div>

            <div className="flex items-center gap-3 text-xs text-white/60 font-mono">
              <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10">
                10 mins
              </span>
              <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-emerald-400">
                Scoring: Empathy & Tone
              </span>
            </div>
          </div>

          <button
            onClick={handleStartSim}
            className="w-full py-3 rounded-full bg-gradient-to-r from-orange-500 to-rose-500 hover:opacity-95 text-white text-xs font-extrabold transition-colors shadow-lg cursor-pointer flex items-center justify-center gap-2"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>Start AI Workplace Simulation</span>
          </button>
        </div>
      </div>

      {/* Progress Summary High-Level Metrics */}
      <div className="bg-[#12131c]/90 rounded-2xl p-5 border border-white/10 shadow-lg space-y-4">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-orange-400" />
            <h3 className="text-sm font-bold text-white">
              Progress Summary & Metrics
            </h3>
          </div>
          <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
            +14.2% Growth This Month
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="bg-black/50 p-4 rounded-xl border border-white/10 space-y-1">
            <span className="text-[10px] font-mono text-white/50 uppercase">
              CLASSES COMPLETED
            </span>
            <div className="text-2xl font-extrabold text-white font-mono">3</div>
            <span className="text-[10px] text-white/40">1 in progress</span>
          </div>

          <div className="bg-black/50 p-4 rounded-xl border border-white/10 space-y-1">
            <span className="text-[10px] font-mono text-white/50 uppercase">
              SIMULATIONS PASSED
            </span>
            <div className="text-2xl font-extrabold text-white font-mono">5</div>
            <span className="text-[10px] text-white/40">3 practice sessions</span>
          </div>

          <div className="bg-black/50 p-4 rounded-xl border border-white/10 space-y-1">
            <span className="text-[10px] font-mono text-white/50 uppercase">
              AVG QUIZ SCORE
            </span>
            <div className="text-2xl font-extrabold text-white font-mono">92.5%</div>
            <span className="text-[10px] text-emerald-400">High understanding</span>
          </div>

          <div className="bg-black/50 p-4 rounded-xl border border-white/10 space-y-1">
            <span className="text-[10px] font-mono text-white/50 uppercase">
              AVG SIMULATION SCORE
            </span>
            <div className="text-2xl font-extrabold text-white font-mono">89.0%</div>
            <span className="text-[10px] text-orange-400">High performance</span>
          </div>
        </div>
      </div>

      {/* Recommended For You Section */}
      <div className="bg-[#12131c]/90 rounded-2xl p-5 border border-white/10 shadow-lg space-y-4">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-orange-400" />
          <span>Recommended Next Steps For You</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="p-4 rounded-xl bg-black/50 border border-white/10 flex items-center justify-between gap-3">
            <div>
              <span className="text-[10px] font-mono text-orange-300 uppercase">
                Recommended Lesson
              </span>
              <div className="text-xs font-bold text-white mt-0.5">
                Lesson 4: Non-Confrontational Phrasing
              </div>
              <span className="text-[10px] text-white/50">12 min reading & exercises</span>
            </div>
            <button
              onClick={() => onNavigateToTab("classes")}
              className="px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-colors cursor-pointer shrink-0"
            >
              Start Lesson
            </button>
          </div>

          <div className="p-4 rounded-xl bg-black/50 border border-white/10 flex items-center justify-between gap-3">
            <div>
              <span className="text-[10px] font-mono text-rose-300 uppercase">
                Recommended Quiz
              </span>
              <div className="text-xs font-bold text-white mt-0.5">
                Check Understanding: Conflict Protocol
              </div>
              <span className="text-[10px] text-white/50">5 Questions • Understanding Check</span>
            </div>
            <button
              onClick={() => onNavigateToTab("classes")}
              className="px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-colors cursor-pointer shrink-0"
            >
              Take Quiz
            </button>
          </div>
        </div>
      </div>
    </div>
  );
});
