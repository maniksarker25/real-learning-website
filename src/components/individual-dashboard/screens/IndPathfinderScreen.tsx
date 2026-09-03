"use client";

import React, { memo, useState, useCallback, useMemo } from "react";
import {
  Compass,
  Sparkles,
  MapPin,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  TrendingUp,
  Target,
  Zap,
  BookOpen,
  UserCheck,
  Award,
} from "lucide-react";
import { CareerPath } from "@/types/individual";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useLearningLoop, DEFAULT_CAREER_PATHS } from "@/context/LearningLoopContext";

interface IndPathfinderScreenProps {
  onSelectPath?: (path: CareerPath) => void;
  onStartClass?: (classId: string) => void;
}

export const IndPathfinderScreen = memo(function IndPathfinderScreen({
  onSelectPath,
  onStartClass,
}: IndPathfinderScreenProps) {
  const router = useRouter();

  let contextValue: ReturnType<typeof useLearningLoop> | null = null;
  try {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    contextValue = useLearningLoop();
  } catch {
    contextValue = null;
  }
  const careerPaths: CareerPath[] = DEFAULT_CAREER_PATHS;

  const [selectedPath, setSelectedPath] = useState<CareerPath>(careerPaths[0]);

  const handleChoosePath = useCallback(
    (path: CareerPath) => {
      setSelectedPath(path);
      if (onSelectPath) {
        onSelectPath(path);
      } else if (contextValue) {
        contextValue.selectCareerPath(path);
      }
    },
    [onSelectPath, contextValue]
  );

  const handleLaunchPath = useCallback(() => {
    if (onSelectPath) {
      onSelectPath(selectedPath);
    } else if (contextValue) {
      contextValue.selectCareerPath(selectedPath);
    }

    if (onStartClass) {
      onStartClass(selectedPath.startingClassId);
    } else if (contextValue) {
      contextValue.startClass(selectedPath.startingClassId);
      router.push("/user-dashboard/classes");
    } else {
      router.push("/user-dashboard/classes");
    }
  }, [onSelectPath, onStartClass, selectedPath, contextValue, router]);

  return (
    <div className="space-y-6">
      {/* Top GPS Header Banner */}
      <div className="bg-[#12131c]/90 rounded-2xl p-6 border border-white/10 shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-400/30 text-xs text-orange-300 font-medium mb-2">
            <Compass className="w-3.5 h-3.5 text-orange-400" />
            <span>AI PATHFINDER • YOUR LEARNING GPS</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            Discover Your Career Pathway
          </h1>
          <p className="text-xs text-white/70 mt-1 max-w-xl">
            RL continuous GPS evaluates where you are today, identifies optimal growth pathways, and connects your learning directly to practical practice.
          </p>
        </div>

        <button
          onClick={handleLaunchPath}
          className="px-6 py-3 rounded-full bg-gradient-to-r from-orange-500 to-rose-500 hover:from-orange-600 hover:to-rose-600 text-white text-xs font-black transition-all shadow-lg hover:shadow-orange-500/20 cursor-pointer flex items-center gap-2 shrink-0"
        >
          <span>Start Selected Pathway</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Core Question 1: WHERE AM I? */}
      <div className="bg-[#12131c]/90 rounded-2xl p-6 border border-white/10 shadow-xl space-y-4">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-orange-400" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              1. WHERE AM I? (Baseline Skill Profile)
            </h3>
          </div>
          <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
            Profile Evaluated by RL AI
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-black/50 p-4 rounded-xl border border-white/10 space-y-1">
            <span className="text-[10px] font-mono text-white/50 uppercase">
              CURRENT LEVEL
            </span>
            <div className="text-base font-extrabold text-white">
              Entry-Level Specialist
            </div>
            <span className="text-[10px] text-white/50">
              Strong foundational communication
            </span>
          </div>

          <div className="bg-black/50 p-4 rounded-xl border border-white/10 space-y-1">
            <span className="text-[10px] font-mono text-white/50 uppercase">
              DEMONSTRATED SKILLS
            </span>
            <div className="text-base font-extrabold text-orange-300">
              Empathy & Tone Control
            </div>
            <span className="text-[10px] text-white/50">
              Verified in initial assessment
            </span>
          </div>

          <div className="bg-black/50 p-4 rounded-xl border border-white/10 space-y-1">
            <span className="text-[10px] font-mono text-white/50 uppercase">
              GROWTH TARGET
            </span>
            <div className="text-base font-extrabold text-emerald-400">
              Structured Troubleshooting
            </div>
            <span className="text-[10px] text-white/50">
              High market demand (+24% open roles)
            </span>
          </div>
        </div>
      </div>

      {/* Core Question 2: WHAT PATHS CAN I TAKE? */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Target className="w-4 h-4 text-orange-400" />
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">
            2. WHAT PATHS CAN I TAKE? (Select Your Career Track)
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {careerPaths.map((path) => {
            const isSelected = selectedPath.id === path.id;
            return (
              <div
                key={path.id}
                onClick={() => handleChoosePath(path)}
                className={cn(
                  "p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between space-y-4 group",
                  isSelected
                    ? "bg-gradient-to-br from-orange-500/15 via-[#141522] to-[#0e0f17] border-orange-400 shadow-xl scale-[1.01]"
                    : "bg-[#12131c]/90 border-white/10 hover:border-white/20 hover:bg-[#161725]"
                )}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-orange-300 bg-orange-500/10 px-2 py-0.5 rounded border border-orange-400/20">
                      {path.category}
                    </span>
                    <span className="text-xs font-mono font-black text-emerald-400 flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-emerald-400" />
                      {path.matchScore}% Match
                    </span>
                  </div>

                  <div>
                    <h4 className="text-base font-extrabold text-white group-hover:text-orange-300 transition-colors">
                      {path.title}
                    </h4>
                    <p className="text-xs text-white/60 mt-1 leading-relaxed">
                      {path.description}
                    </p>
                  </div>

                  <div className="space-y-1.5 pt-2 border-t border-white/10">
                    <div className="text-[10px] font-mono text-white/50 uppercase">
                      Core Skills You Will Build:
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {path.coreSkills.map((sk) => (
                        <span
                          key={sk}
                          className="text-[10px] px-2 py-0.5 rounded bg-white/5 border border-white/10 text-white/80"
                        >
                          {sk}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-white/10">
                  <span className="text-[10px] font-mono text-white/40">
                    Est. Salary: {path.avgSalaryRange}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleChoosePath(path);
                    }}
                    className={cn(
                      "px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer",
                      isSelected
                        ? "bg-orange-500 text-white shadow"
                        : "bg-white/5 text-white/70 hover:bg-white/10 hover:text-white"
                    )}
                  >
                    {isSelected ? "Selected" : "Select Path"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Core Question 3: WHAT SHOULD I LEARN? */}
      <div className="bg-gradient-to-br from-orange-500/10 via-[#12131c] to-[#0d0e14] rounded-2xl p-6 border border-orange-400/30 shadow-xl space-y-4">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-orange-400" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              3. WHAT SHOULD I LEARN? (AI Pathfinder Recommendation)
            </h3>
          </div>
          <span className="text-xs font-mono text-orange-300">
            Recommended Starting Pair
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Class recommendation */}
          <div className="bg-black/50 p-4 rounded-xl border border-white/10 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-orange-300 uppercase tracking-wider">
              <BookOpen className="w-4 h-4" />
              <span>Step 1: Class (Theory & Techniques)</span>
            </div>
            <h4 className="text-base font-extrabold text-white">
              Customer Communication & De-escalation Mastery
            </h4>
            <p className="text-xs text-white/60">
              Learn non-confrontational phrasing, active listening, positive framing, and establishing action agreements.
            </p>
          </div>

          {/* Connected Simulator practice layer */}
          <div className="bg-black/50 p-4 rounded-xl border border-white/10 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-rose-300 uppercase tracking-wider">
              <Zap className="w-4 h-4" />
              <span>Step 2: Simulator (Practice Layer)</span>
            </div>
            <h4 className="text-base font-extrabold text-white">
              Handling an Upset Customer Requesting Refund
            </h4>
            <p className="text-xs text-white/60">
              Directly apply your learned de-escalation techniques in a dynamic AI roleplay simulation with realistic caller persona.
            </p>
          </div>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-white/10">
          <div className="text-xs text-white/70">
            Ready to begin? Click below to enter your first Class and start the learning loop.
          </div>
          <button
            onClick={handleLaunchPath}
            className="w-full sm:w-auto px-6 py-3 rounded-full bg-white text-black hover:bg-white/90 text-xs font-black transition-colors shadow-lg cursor-pointer flex items-center justify-center gap-2"
          >
            <span>Enter Class & Begin Pathway</span>
            <ArrowRight className="w-4 h-4 text-orange-500" />
          </button>
        </div>
      </div>
    </div>
  );
});
