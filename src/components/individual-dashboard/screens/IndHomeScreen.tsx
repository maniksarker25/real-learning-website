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
  Compass,
} from "lucide-react";
import { useAccount } from "@/context/AccountContext";
import { useLearningLoop } from "@/context/LearningLoopContext";
import { cn } from "@/lib/utils";

import { RecentSimulationsTable } from "../RecentSimulationsTable";
import {
  VictorianCornerFlourish,
  EngravedSeal,
  LaurelEmblem,
  StarburstRosette,
} from "@/components/ui/DecorativeAssets";

interface IndHomeScreenProps {
  onNavigateToTab: (tabId: string) => void;
  onLaunchSimulation?: (scenarioTitle: string) => void;
}

export const IndHomeScreen = memo(function IndHomeScreen({
  onNavigateToTab,
  onLaunchSimulation,
}: IndHomeScreenProps) {
  const { session } = useAccount();

  let contextValue: ReturnType<typeof useLearningLoop> | null = null;
  try {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    contextValue = useLearningLoop();
  } catch {
    contextValue = null;
  }

  const activePathTitle =
    contextValue?.activePath?.title || "Technical Support Specialist";
  const currentStep = contextValue?.currentStep || "class";

  const currentStepTab =
    currentStep === "pathfinder"
      ? "pathfinder"
      : currentStep === "class"
      ? "classes"
      : currentStep === "simulator"
      ? "simulations"
      : "feedback";

  const currentStepLabel =
    currentStep === "pathfinder"
      ? "1. Discovery"
      : currentStep === "class"
      ? "2. Class"
      : currentStep === "simulator"
      ? "3. Simulator"
      : "4. AI Feedback";

  const handleContinueClass = useCallback(() => {
    onNavigateToTab("classes");
  }, [onNavigateToTab]);

  const handleStartSim = useCallback(() => {
    if (onLaunchSimulation) {
      onLaunchSimulation(
        "Handling an Upset Customer Requesting Immediate Refund",
      );
    }
    onNavigateToTab("simulations");
  }, [onNavigateToTab, onLaunchSimulation]);

  return (
    <div className="space-y-5">
      {/* Top Welcome Banner */}
      <div className="bg-white rounded-xl p-4 sm:p-5 border border-stone-200 relative overflow-hidden">
        {/* Subtle decorative corner flourish */}
        <VictorianCornerFlourish
          position="top-right"
          className="absolute top-2 right-2 text-stone-300/60 hidden sm:block"
        />

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 relative z-10">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-stone-100 to-stone-200 border border-stone-300/80 flex items-center justify-center text-amber-700 shrink-0">
              <LaurelEmblem size={24} className="text-amber-700" />
            </div>
            <div>
              <h1 className="text-lg sm:text-xl font-bold text-stone-900 tracking-tight">
                Welcome back, {session.name || "Sarah Jenkins"}
              </h1>
              <p className="text-xs text-stone-500 mt-0.5 flex items-center gap-1.5 flex-wrap">
                <span>Goal: <strong className="text-stone-800 font-semibold">{session.goal || "Customer Service"}</strong></span>
                <span className="text-stone-300">·</span>
                <span className="text-stone-600">Learn → Practice → Feedback</span>
              </p>
            </div>
          </div>

          <button
            onClick={() => onNavigateToTab("goals")}
            className="px-3.5 py-1.5 rounded-lg bg-stone-50 hover:bg-stone-100 border border-stone-200 text-xs font-semibold text-stone-700 hover:text-stone-900 transition-colors cursor-pointer shrink-0"
          >
            Goal Roadmap
          </button>
        </div>
      </div>

      {/* AI Pathfinder GPS Status Banner */}
      <div className="bg-gradient-to-r from-amber-50/70 via-white to-orange-50/50 rounded-xl p-3.5 sm:p-4 border border-amber-200/70 relative overflow-hidden">
        {/* Engraved Seal Watermark Asset */}
        <EngravedSeal
          size={84}
          className="absolute -right-4 -bottom-4 text-amber-600/15 pointer-events-none hidden sm:block"
        />
        <VictorianCornerFlourish
          position="top-left"
          className="absolute top-1.5 left-1.5 text-amber-300/40 hidden sm:block"
        />

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 relative z-10">
          <div className="flex items-center gap-3">
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-semibold text-stone-900">
                  {activePathTitle}
                </span>
              </div>
              <p className="text-xs text-stone-500 mt-0.5">
                Stage: <strong className="text-stone-800 font-semibold">{currentStepLabel}</strong> · Complete lesson to unlock simulation practice.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto justify-end">
            <button
              onClick={() => onNavigateToTab("pathfinder")}
              className="px-3 py-1.5 rounded-lg bg-white hover:bg-stone-50 text-stone-700 hover:text-stone-950 border border-stone-200 text-xs font-medium transition-colors cursor-pointer"
            >
              Change
            </button>
            <button
              onClick={() => onNavigateToTab(currentStepTab)}
              className="px-3.5 py-1.5 rounded-lg bg-stone-900 text-white hover:bg-stone-800 text-xs font-medium transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <span>Continue</span>
              <ArrowRight className="w-3.5 h-3.5 text-orange-400" />
            </button>
          </div>
        </div>
      </div>

      {/* Progress Summary Metrics */}
      <div className="bg-white rounded-xl p-4 sm:p-5 border border-stone-200 space-y-3.5 relative overflow-hidden">
        <div className="flex items-center justify-between border-b border-stone-100 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-orange-100 border border-orange-200 flex items-center justify-center text-orange-700">
              <TrendingUp className="w-3.5 h-3.5" />
            </div>
            <h3 className="text-xs sm:text-sm font-bold text-stone-900 flex items-center gap-1.5">
              <span>Progress & Metrics</span>
              <StarburstRosette size={13} className="text-orange-500/70" />
            </h3>
          </div>
          <span className="text-[10px] font-mono font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
            +14.2% this month
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {/* Metric 1 */}
          <div className="group relative overflow-hidden rounded-xl border border-stone-200/80 p-3.5 transition-all duration-300">
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-500 ease-out"
              style={{ backgroundImage: "url('/bg1.jfif')" }}
            />
            <div className="absolute inset-0 bg-gradient-to-br from-white/90 via-[#FAF8F5]/85 to-white/75 backdrop-blur-[0.5px]" />
            <div className="relative z-10 space-y-0.5">
              <span className="text-[10px] font-mono text-stone-600 uppercase font-bold tracking-wider">
                Classes
              </span>
              <div className="text-xl sm:text-2xl font-black text-stone-900 font-mono tracking-tight">
                3
              </div>
              <span className="text-[10px] text-stone-600 font-medium block">
                1 in progress
              </span>
            </div>
          </div>

          {/* Metric 2 */}
          <div className="group relative overflow-hidden rounded-xl border border-stone-200/80 p-3.5 transition-all duration-300">
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-500 ease-out"
              style={{ backgroundImage: "url('/bg2.jfif')" }}
            />
            <div className="absolute inset-0 bg-gradient-to-br from-white/90 via-[#FAF8F5]/85 to-white/75 backdrop-blur-[0.5px]" />
            <div className="relative z-10 space-y-0.5">
              <span className="text-[10px] font-mono text-stone-600 uppercase font-bold tracking-wider">
                Simulations
              </span>
              <div className="text-xl sm:text-2xl font-black text-stone-900 font-mono tracking-tight">
                5
              </div>
              <span className="text-[10px] text-stone-600 font-medium block">
                3 completed
              </span>
            </div>
          </div>

          {/* Metric 3 */}
          <div className="group relative overflow-hidden rounded-xl border border-stone-200/80 p-3.5 hover:border-emerald-200 transition-all duration-300">
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-500 ease-out"
              style={{ backgroundImage: "url('/bg3.avif')" }}
            />
            <div className="absolute inset-0 bg-gradient-to-br from-white/90 via-[#FAF8F5]/85 to-white/75 backdrop-blur-[0.5px]" />
            <div className="relative z-10 space-y-0.5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono text-stone-600 uppercase font-bold tracking-wider">
                  Quiz Avg
                </span>
                <StarburstRosette size={11} className="text-emerald-600/70" />
              </div>
              <div className="text-xl sm:text-2xl font-black text-stone-900 font-mono tracking-tight">
                92.5%
              </div>
              <span className="text-[10px] text-emerald-700 font-semibold block">
                High score
              </span>
            </div>
          </div>

          {/* Metric 4 */}
          <div className="group relative overflow-hidden rounded-xl border border-stone-200/80 p-3.5 hover:border-orange-200 transition-all duration-300">
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-500 ease-out"
              style={{ backgroundImage: "url('/bg4.avif')" }}
            />
            <div className="absolute inset-0 bg-gradient-to-br from-white/90 via-[#FAF8F5]/85 to-white/75 backdrop-blur-[0.5px]" />
            <div className="relative z-10 space-y-0.5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono text-stone-600 uppercase font-bold tracking-wider">
                  Simulation Avg
                </span>
                <StarburstRosette size={11} className="text-orange-600/70" />
              </div>
              <div className="text-xl sm:text-2xl font-black text-stone-900 font-mono tracking-tight">
                89.0%
              </div>
              <span className="text-[10px] text-orange-700 font-semibold block">
                Top tier
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 2 Primary Action Focus Cards: Continue Learning & Practice Your Skills */}
      {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
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
                Practice conflict resolution & empathy with a dynamic AI
                scenario character.
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
      </div> */}

      {/* RECENT COMPLETED SIMULATIONS TABLE WITH IN-DEPTH FEEDBACK MODAL */}
      <RecentSimulationsTable onLaunchSimulation={onLaunchSimulation} />
    </div>
  );
});
