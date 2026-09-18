"use client";

import React, { memo } from "react";
import {
  BarChart3,
  TrendingUp,
  Award,
  CheckCircle2,
  Flame,
  Trophy,
  ShieldCheck,
  BookOpen,
  Zap,
  Target,
  Sparkles,
} from "lucide-react";
import { useAccount } from "@/context/AccountContext";
import { cn } from "@/lib/utils";
import { RecentSimulationsTable } from "../RecentSimulationsTable";
import { SkillMatrixEqualizer } from "../SkillMatrixEqualizer";
import {
  VictorianCornerFlourish,
  EngravedSeal,
  LaurelEmblem,
  StarburstRosette,
} from "@/components/ui/DecorativeAssets";
import { UserProgressSummary } from "@/types/individual";
import { DEFAULT_USER_PROGRESS } from "@/data/mockUserProgress";

interface IndProgressScreenProps {
  /**
   * Optional progress data payload. When API is connected,
   * pass the fetched UserProgressSummary directly.
   */
  progressData?: UserProgressSummary;
}

export const IndProgressScreen = memo(function IndProgressScreen({
  progressData,
}: IndProgressScreenProps) {
  const { session } = useAccount();

  // Use passed data or fallback to standard DEFAULT_USER_PROGRESS
  const data: UserProgressSummary = progressData || DEFAULT_USER_PROGRESS;
  const { metrics, skills, milestones } = data;

  return (
    <div className="space-y-5">
      {/* Top Banner */}
      <div className="bg-white rounded-xl p-4 sm:p-5 border border-stone-200 relative overflow-hidden">
        <VictorianCornerFlourish
          position="top-right"
          className="absolute top-2 right-2 text-stone-300/60 hidden sm:block"
        />

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 relative z-10">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 border border-amber-400 flex items-center justify-center text-white shrink-0">
              <BarChart3 className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg sm:text-xl font-bold text-stone-900 tracking-tight">
                  Skill & Performance Progress
                </h1>
                <StarburstRosette size={14} className="text-orange-500/70" />
              </div>
              <p className="text-xs text-stone-500 mt-0.5">
                Track your skill mastery, practice consistency, and simulation growth over time.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono text-stone-500 uppercase font-semibold">Track:</span>
            <span className="px-2.5 py-1 rounded-full bg-orange-50 border border-orange-200 text-xs font-bold text-orange-900">
              {data.careerTrackTitle || session.goal || "Customer Service"}
            </span>
          </div>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-white p-3.5 sm:p-4 rounded-xl border border-stone-200 space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono text-stone-500 uppercase font-semibold">
              Learning Streak
            </span>
            <Flame className="w-3.5 h-3.5 text-orange-500" />
          </div>
          <div className="text-xl sm:text-2xl font-extrabold text-stone-900 font-mono">
            {metrics.learningStreakDays} Days
          </div>
          <span className="text-[10px] text-stone-500 block">
            Active daily practice
          </span>
        </div>

        <div className="bg-white p-3.5 sm:p-4 rounded-xl border border-stone-200 space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono text-stone-500 uppercase font-semibold">
              Classes Done
            </span>
            <BookOpen className="w-3.5 h-3.5 text-amber-600" />
          </div>
          <div className="text-xl sm:text-2xl font-extrabold text-stone-900 font-mono">
            {metrics.classesCompleted} / {metrics.totalClasses}
          </div>
          <span className="text-[10px] text-stone-500 block">
            {Math.round((metrics.classesCompleted / metrics.totalClasses) * 100)}% modules finished
          </span>
        </div>

        <div className="bg-white p-3.5 sm:p-4 rounded-xl border border-stone-200 space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono text-stone-500 uppercase font-semibold">
              Simulations
            </span>
            <Zap className="w-3.5 h-3.5 text-emerald-600" />
          </div>
          <div className="text-xl sm:text-2xl font-extrabold text-stone-900 font-mono">
            {metrics.simulationsPassed} Passed
          </div>
          <span className="text-[10px] text-stone-500 block">
            Average verified score
          </span>
        </div>

        <div className="bg-white p-3.5 sm:p-4 rounded-xl border border-stone-200 space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono text-stone-500 uppercase font-semibold">
              Overall Accuracy
            </span>
            <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
          </div>
          <div className="text-xl sm:text-2xl font-extrabold text-stone-900 font-mono">
            {metrics.overallAccuracy}%
          </div>
          <span className="text-[10px] text-emerald-700 font-bold block">
            +{metrics.monthlyAccuracyGain}% this month
          </span>
        </div>
      </div>

      {/* Skill Level Mastery Equalizer Matrix (Hero Graphic representation) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h3 className="text-xs sm:text-sm font-bold text-stone-900 flex items-center gap-1.5">
              <span>Skill Level Mastery Progress</span>
              <StarburstRosette size={14} className="text-orange-500/70" />
            </h3>
          </div>
          <span className="text-[10px] font-mono text-stone-500">
            Real-time simulation skill breakdown
          </span>
        </div>

        <SkillMatrixEqualizer
          skills={skills}
          title="Skill Level Mastery Matrix"
          subtitle="AI evaluates each competency across live simulation roleplays and benchmark metrics."
        />
      </div>

      {/* Milestones & Achievement Goals Card */}
      <div className="bg-white rounded-xl p-4 sm:p-5 border border-stone-200 space-y-4 relative overflow-hidden">
        <VictorianCornerFlourish
          position="top-right"
          className="absolute top-2 right-2 text-stone-300/60 hidden sm:block"
        />

        <div className="flex items-center justify-between border-b border-stone-100 pb-3 relative z-10">
          <div className="flex items-center gap-2">
            <Trophy className="w-4 h-4 text-amber-600" />
            <h3 className="text-xs sm:text-sm font-bold text-stone-900">
              Milestones & Target Goals
            </h3>
          </div>
          <span className="text-[10px] font-mono font-semibold text-amber-800 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full">
            {data.levelTier || "Level 2 Specialist"}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 relative z-10">
          {milestones.map((m) => (
            <div
              key={m.id || m.title}
              className="bg-[#FAF8F5] p-3.5 rounded-lg border border-stone-200 space-y-1.5 flex flex-col justify-between"
            >
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-stone-900 flex items-center gap-1.5">
                    {m.status === "completed" ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    ) : (
                      <Target className="w-3.5 h-3.5 text-orange-500 shrink-0" />
                    )}
                    <span>{m.title}</span>
                  </span>
                  <span
                    className={cn(
                      "text-[10px] font-mono font-bold px-1.5 py-0.5 rounded",
                      m.status === "completed"
                        ? "text-emerald-800 bg-emerald-50 border border-emerald-200"
                        : "text-amber-800 bg-amber-50 border border-amber-200"
                    )}
                  >
                    {m.progress}
                  </span>
                </div>
                <p className="text-[11px] text-stone-500 leading-tight">
                  {m.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {data.nextBadgeHint && (
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-3 rounded-lg border border-amber-200/80 text-xs text-stone-700 flex items-center gap-2.5 relative z-10">
            <Sparkles className="w-4 h-4 text-orange-600 shrink-0" />
            <span className="text-[11px] leading-tight">
              {data.nextBadgeHint}
            </span>
          </div>
        )}
      </div>

      {/* Recent Practice Simulations & Feedback History */}
      <div className="space-y-3 pt-1">
        <div className="flex items-center justify-between">
          <h3 className="text-xs sm:text-sm font-bold text-stone-900 flex items-center gap-1.5">
            <span>Recent Simulation History</span>
            <LaurelEmblem size={16} className="text-stone-400" />
          </h3>
          <span className="text-[10px] font-mono text-stone-500">
            Click Feedback to view AI analysis
          </span>
        </div>
        <RecentSimulationsTable />
      </div>
    </div>
  );
});
