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
  Loader2,
} from "lucide-react";
import { CareerPath } from "@/types/individual";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useLearningLoop, DEFAULT_CAREER_PATHS } from "@/context/LearningLoopContext";

import {
  VictorianCornerFlourish,
  EngravedSeal,
  LaurelEmblem,
  StarburstRosette,
} from "@/components/ui/DecorativeAssets";

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
  const [isStarting, setIsStarting] = useState(false);
  const [startingPathId, setStartingPathId] = useState<string | null>(null);

  const handleSelectCard = useCallback((path: CareerPath) => {
    setSelectedPath(path);
  }, []);

  const handleLaunchPath = useCallback(
    (targetPath?: CareerPath) => {
      const pathToStart = targetPath || selectedPath;
      setStartingPathId(pathToStart.id);
      setIsStarting(true);

      setTimeout(() => {
        if (onSelectPath) {
          onSelectPath(pathToStart);
        } else if (contextValue) {
          contextValue.selectCareerPath(pathToStart);
        }

        if (onStartClass) {
          onStartClass(pathToStart.startingClassId);
        } else if (contextValue) {
          contextValue.startClass(pathToStart.startingClassId);
          router.push("/user-dashboard/classes");
        } else {
          router.push("/user-dashboard/classes");
        }
      }, 600);
    },
    [onSelectPath, onStartClass, selectedPath, contextValue, router]
  );

  return (
    <div className="space-y-5">
      {/* Top GPS Header Banner */}
      <div className="bg-white rounded-xl p-4 sm:p-5 border border-stone-200 relative overflow-hidden">
        <VictorianCornerFlourish
          position="top-right"
          className="absolute top-2 right-2 text-stone-300/60 hidden sm:block"
        />

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 relative z-10">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 border border-amber-400 flex items-center justify-center text-white shrink-0">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-lg sm:text-xl font-bold text-stone-900 tracking-tight">
                Career Pathfinder
              </h1>
              <p className="text-xs text-stone-500 mt-0.5">
                AI matches your skills to target roles with structured classes and practice simulations.
              </p>
            </div>
          </div>

          <button
            onClick={() => handleLaunchPath()}
            disabled={isStarting}
            className="px-4 py-2 rounded-lg bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1.5 shrink-0 disabled:opacity-80"
          >
            <span>{isStarting ? "Starting..." : "Start Pathway"}</span>
            {isStarting ? (
              <Loader2 className="w-3.5 h-3.5 text-white animate-spin" />
            ) : (
              <ArrowRight className="w-3.5 h-3.5 text-orange-400" />
            )}
          </button>
        </div>
      </div>

      {/* Core Question 1: WHERE AM I? */}
      <div className="bg-white rounded-xl p-4 sm:p-5 border border-stone-200 space-y-3.5 relative overflow-hidden">
        <div className="flex items-center justify-between border-b border-stone-100 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-orange-100 border border-orange-200 flex items-center justify-center text-orange-700">
              <MapPin className="w-3.5 h-3.5" />
            </div>
            <h3 className="text-xs sm:text-sm font-bold text-stone-900 flex items-center gap-1.5">
              <span>1. Where Am I? (Baseline Profile)</span>
              <StarburstRosette size={12} className="text-orange-500/70" />
            </h3>
          </div>
          <span className="text-[10px] font-mono font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
            AI Evaluated
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="bg-[#FAF8F5] p-3.5 rounded-lg border border-stone-200 space-y-0.5">
            <span className="text-[10px] font-mono text-stone-500 uppercase font-semibold">
              Current Level
            </span>
            <div className="text-sm font-bold text-stone-900">
              Entry-Level Specialist
            </div>
            <span className="text-[10px] text-stone-500 block">
              Strong communication foundation
            </span>
          </div>

          <div className="bg-[#FAF8F5] p-3.5 rounded-lg border border-stone-200 space-y-0.5">
            <span className="text-[10px] font-mono text-stone-500 uppercase font-semibold">
              Demonstrated Skills
            </span>
            <div className="text-sm font-bold text-amber-800">
              Empathy & Tone Control
            </div>
            <span className="text-[10px] text-stone-500 block">
              Verified in baseline assessment
            </span>
          </div>

          <div className="bg-[#FAF8F5] p-3.5 rounded-lg border border-stone-200 space-y-0.5">
            <span className="text-[10px] font-mono text-stone-500 uppercase font-semibold">
              Growth Target
            </span>
            <div className="text-sm font-bold text-emerald-800">
              Structured Troubleshooting
            </div>
            <span className="text-[10px] text-stone-500 block">
              High market demand (+24% roles)
            </span>
          </div>
        </div>
      </div>

      {/* Core Question 2: WHAT PATHS CAN I TAKE? */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h3 className="text-xs sm:text-sm font-bold text-stone-900 flex items-center gap-1.5">
              <span>2. Career Tracks</span>
              <LaurelEmblem size={18} className="text-stone-400" />
            </h3>
          </div>
          <span className="text-[10px] font-mono text-stone-500">
            Select a track below
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {careerPaths.map((path) => {
            const isSelected = selectedPath.id === path.id;
            const isThisPathStarting =
              isStarting && (startingPathId === path.id || isSelected);

            return (
              <div
                key={path.id}
                onClick={() => {
                  if (isSelected) {
                    handleLaunchPath(path);
                  } else {
                    handleSelectCard(path);
                  }
                }}
                className={cn(
                  "p-4 rounded-xl border transition-colors duration-150 cursor-pointer flex flex-col justify-between space-y-3 relative overflow-hidden",
                  isSelected
                    ? "bg-amber-50/60 border-amber-300 shadow-sm"
                    : "bg-white border-stone-200 hover:border-stone-300 hover:bg-stone-50/50"
                )}
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span
                      className={cn(
                        "text-[10px] font-mono px-2 py-0.5 rounded font-semibold border",
                        isSelected
                          ? "text-amber-900 bg-amber-100 border-amber-200"
                          : "text-stone-600 bg-stone-100 border-stone-200"
                      )}
                    >
                      {path.category}
                    </span>
                    <span className="text-xs font-mono font-bold text-emerald-700 flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-emerald-600" />
                      {path.matchScore}% Match
                    </span>
                  </div>

                  <div>
                    <h4
                      className={cn(
                        "text-sm font-bold transition-colors",
                        isSelected ? "text-amber-950" : "text-stone-900"
                      )}
                    >
                      {path.title}
                    </h4>
                    <p className="text-xs text-stone-500 mt-1 leading-relaxed">
                      {path.description}
                    </p>
                  </div>

                  <div className="space-y-1 pt-2 border-t border-stone-100">
                    <div className="text-[10px] font-mono text-stone-400 uppercase font-semibold">
                      Core Skills:
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {path.coreSkills.map((sk) => (
                        <span
                          key={sk}
                          className="text-[10px] px-1.5 py-0.5 rounded bg-stone-100 border border-stone-200 text-stone-700 font-medium"
                        >
                          {sk}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-2 pt-2.5 border-t border-stone-100">
                  <div className="flex items-center justify-between text-[10px] font-mono text-stone-500">
                    <span>Est. Salary:</span>
                    <span className="text-stone-800 font-semibold">{path.avgSalaryRange}</span>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (isSelected) {
                        handleLaunchPath(path);
                      } else {
                        handleSelectCard(path);
                      }
                    }}
                    disabled={isStarting}
                    className={cn(
                      "w-full h-8 px-3 rounded-lg text-xs font-semibold border transition-colors cursor-pointer flex items-center justify-center gap-1.5 shrink-0 disabled:opacity-80",
                      isSelected
                        ? "bg-stone-900 hover:bg-stone-800 text-white border-stone-900"
                        : "bg-white hover:bg-stone-50 text-stone-700 border-stone-200"
                    )}
                  >
                    {isThisPathStarting ? (
                      <>
                        <span>Starting...</span>
                        <Loader2 className="w-3 h-3 text-white animate-spin" />
                      </>
                    ) : (
                      <>
                        <span>{isSelected ? "Start Track" : "Select Track"}</span>
                        {isSelected && <ArrowRight className="w-3 h-3 text-orange-400" />}
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Core Question 3: WHAT SHOULD I LEARN? */}
      <div className="bg-gradient-to-r from-amber-50/60 via-white to-orange-50/40 rounded-xl p-4 sm:p-5 border border-amber-200/70 space-y-3.5 relative overflow-hidden">
        <EngravedSeal
          size={84}
          className="absolute -right-4 -bottom-4 text-amber-600/15 pointer-events-none hidden sm:block"
        />

        <div className="flex items-center justify-between border-b border-stone-100 pb-2.5 relative z-10">
          <div className="flex items-center gap-2">
            <h3 className="text-xs sm:text-sm font-bold text-stone-900">
              3. Recommended Starting Pair
            </h3>
          </div>
          <span className="text-[10px] font-mono text-amber-800 bg-amber-100/70 border border-amber-200 px-2 py-0.5 rounded font-semibold">
            Classes + Simulator
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 relative z-10">
          {/* Class recommendation */}
          <div className="bg-white p-3.5 rounded-lg border border-stone-200 space-y-1.5">
            <div className="flex items-center gap-1.5 text-[10px] font-bold text-amber-800 uppercase tracking-wider">
              <BookOpen className="w-3 h-3 text-amber-600" />
              <span>Step 1: Class (Theory)</span>
            </div>
            <h4 className="text-xs sm:text-sm font-bold text-stone-900">
              Customer Communication & De-escalation
            </h4>
            <p className="text-xs text-stone-500 leading-relaxed">
              Master active listening, tone control, and positive framing.
            </p>
          </div>

          {/* Connected Simulator practice layer */}
          <div className="bg-white p-3.5 rounded-lg border border-stone-200 space-y-1.5">
            <div className="flex items-center gap-1.5 text-[10px] font-bold text-orange-800 uppercase tracking-wider">
              <Zap className="w-3 h-3 text-orange-600" />
              <span>Step 2: Simulator (Practice)</span>
            </div>
            <h4 className="text-xs sm:text-sm font-bold text-stone-900">
              Handling an Upset Customer Refund
            </h4>
            <p className="text-xs text-stone-500 leading-relaxed">
              De-escalate an upset customer in an interactive AI roleplay simulation.
            </p>
          </div>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-stone-100 relative z-10">
          <div className="text-xs text-stone-500">
            Ready to begin? Enter your class to start your learning loop.
          </div>
          <button
            onClick={() => handleLaunchPath()}
            disabled={isStarting}
            className="w-full sm:w-auto px-4 py-2 rounded-lg bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold transition-colors cursor-pointer flex items-center justify-center gap-1.5 disabled:opacity-80 shrink-0"
          >
            <span>{isStarting ? "Starting..." : "Enter Class & Start Loop"}</span>
            {isStarting ? (
              <Loader2 className="w-3.5 h-3.5 text-white animate-spin" />
            ) : (
              <ArrowRight className="w-3.5 h-3.5 text-orange-400" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
});
