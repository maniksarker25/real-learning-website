
"use client";

import React, { memo, useCallback } from "react";
import {
  Compass,
  BookOpen,
  Zap,
  MessageSquare,
  BarChart3,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Lock,
} from "lucide-react";
import { LearningLoopStep } from "@/types/individual";
import { cn } from "@/lib/utils";
import { useLearningLoop } from "@/context/LearningLoopContext";
import { usePathname, useRouter } from "next/navigation";

interface LearningLoopStepperProps {
  currentStep?: LearningLoopStep;
  onSelectStep?: (step: LearningLoopStep) => void;
  activePathTitle?: string;
}

const STEPS: {
  id: LearningLoopStep;
  label: string;
  subLabel: string;
  route: string;
  icon: React.ElementType;
}[] = [
  {
    id: "pathfinder",
    label: "Pathfinder",
    subLabel: "Where Am I? & Paths",
    route: "/user-dashboard/pathfinder",
    icon: Compass,
  },
  {
    id: "class",
    label: "Class",
    subLabel: "Learn Fundamentals",
    route: "/user-dashboard/classes",
    icon: BookOpen,
  },
  {
    id: "simulator",
    label: "Simulator",
    subLabel: "Practice Layer",
    route: "/user-dashboard/simulations",
    icon: Zap,
  },
  {
    id: "feedback",
    label: "AI Feedback",
    subLabel: "Performance Breakdown",
    route: "/user-dashboard/feedback",
    icon: MessageSquare,
  },
  /*
  {
    id: "skill_progress",
    label: "Skill Progress",
    subLabel: "Demonstrated Gains",
    route: "/user-dashboard/feedback#skills",
    icon: BarChart3,
  },
  {
    id: "next_step",
    label: "Next Step",
    subLabel: "GPS Guidance",
    route: "/user-dashboard/feedback#next-step",
    icon: ArrowRight,
  },
  */
];

export const LearningLoopStepper = memo(function LearningLoopStepper({
  currentStep: propCurrentStep,
  onSelectStep: propOnSelectStep,
  activePathTitle: propActivePathTitle,
}: LearningLoopStepperProps) {
  const router = useRouter();
  const pathname = usePathname();

  // Try consuming LearningLoopContext if available
  let contextValue: ReturnType<typeof useLearningLoop> | null = null;
  try {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    contextValue = useLearningLoop();
  } catch {
    contextValue = null;
  }

  // Derive active step from contextValue or route
  const derivedStepFromRoute: LearningLoopStep | null = React.useMemo(() => {
    if (pathname.includes("/user-dashboard/pathfinder")) return "pathfinder";
    if (pathname.includes("/user-dashboard/classes")) return "class";
    if (pathname.includes("/user-dashboard/simulations")) return "simulator";
    if (pathname.includes("/user-dashboard/feedback")) return "feedback";
    return null;
  }, [pathname]);

  const activeStep: LearningLoopStep =
    propCurrentStep ||
    (pathname === "/user-dashboard/practice" || pathname === "/user-dashboard"
      ? contextValue?.currentStep || "pathfinder"
      : derivedStepFromRoute || contextValue?.currentStep || "pathfinder");

  const activePathTitle =
    propActivePathTitle ||
    contextValue?.activePath?.title ||
    "Customer service and communication";

  const currentStepIndex = Math.max(
    0,
    STEPS.findIndex((s) => s.id === activeStep)
  );
  const maxUnlockedStepIndex = contextValue?.maxUnlockedStepIndex ?? 0;

  const handleStepClick = useCallback(
    (step: (typeof STEPS)[number], idx: number) => {
      // Prevent navigation if step is locked
      const isUnlocked = contextValue
        ? contextValue.isStepUnlocked(step.id)
        : idx <= maxUnlockedStepIndex;

      if (!isUnlocked) {
        return;
      }

      if (propOnSelectStep) {
        propOnSelectStep(step.id);
        return;
      }

      if (contextValue) {
        contextValue.setStep(step.id);
      }

      if (pathname !== "/user-dashboard/practice") {
        router.push("/user-dashboard/practice");
      }
    },
    [propOnSelectStep, contextValue, maxUnlockedStepIndex, pathname, router]
  );

  return (
    <div className="bg-white border border-stone-200 rounded-xl p-3.5 sm:p-4 space-y-3">
      {/* Top Banner Context */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-stone-100 pb-2.5">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-bold uppercase tracking-wider text-stone-900">
              Learning GPS Loop
            </span>
            <span className="text-[10px] font-mono font-semibold text-amber-900 bg-amber-100/70 border border-amber-200 px-2 py-0.5 rounded">
              Path: {activePathTitle}
            </span>
          </div>
        </div>

        <div className="text-[10px] font-mono text-stone-500 flex items-center gap-2">
          <span>
            Step {Math.max(1, currentStepIndex + 1)} of {STEPS.length}
          </span>
          <div className="w-16 h-1.5 bg-stone-100 rounded-full overflow-hidden border border-stone-200">
            <div
              className="h-full bg-gradient-to-r from-orange-500 to-amber-500 transition-all duration-300"
              style={{
                width: `${Math.min(
                  100,
                  ((Math.max(0, currentStepIndex) + 1) / STEPS.length) * 100
                )}%`,
              }}
            />
          </div>
        </div>
      </div>

      {/* Stepper Flow Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {STEPS.map((step, idx) => {
          const Icon = step.icon;
          const isActive = activeStep === step.id;
          
          const isUnlocked = contextValue
            ? contextValue.isStepUnlocked(step.id)
            : idx <= maxUnlockedStepIndex;

          const isCompleted = contextValue
            ? contextValue.isStepCompleted(step.id)
            : idx < currentStepIndex;

          const isDisabled = !isUnlocked;

          return (
            <button
              key={step.id}
              onClick={() => handleStepClick(step, idx)}
              disabled={isDisabled}
              title={
                isDisabled
                  ? `Locked: Complete Step ${idx} first`
                  : step.label
              }
              className={cn(
                "relative p-3 rounded-xl border text-left transition-all duration-200 flex flex-col justify-between space-y-2 group select-none",
                isDisabled
                  ? "bg-stone-50/60 border-stone-200 opacity-50 cursor-not-allowed pointer-events-auto"
                  : isActive
                  ? "bg-orange-50/90 border-orange-300 shadow-sm cursor-pointer"
                  : isCompleted
                  ? "bg-emerald-50/60 border-emerald-200 hover:bg-emerald-50 hover:border-emerald-300 cursor-pointer"
                  : "bg-stone-50/80 border-stone-200 hover:bg-white hover:border-stone-300 cursor-pointer"
              )}
            >
              {/* Header Icon + Status Badge */}
              <div className="flex items-center justify-between">
                <div
                  className={cn(
                    "w-7 h-7 rounded-lg flex items-center justify-center transition-colors",
                    isDisabled
                      ? "bg-stone-100 text-stone-400 border border-stone-200"
                      : isActive
                      ? "bg-gradient-to-r from-orange-500 to-amber-600 text-white shadow-xs"
                      : isCompleted
                      ? "bg-emerald-100 text-emerald-700 border border-emerald-200"
                      : "bg-white text-stone-600 border border-stone-200 group-hover:text-stone-900"
                  )}
                >
                  {isDisabled ? (
                    <Lock className="w-3.5 h-3.5 text-stone-400" />
                  ) : isCompleted ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                  ) : (
                    <Icon className="w-3.5 h-3.5" />
                  )}
                </div>

                <span
                  className={cn(
                    "text-[9px] font-mono font-bold px-1.5 py-0.5 rounded flex items-center gap-1",
                    isDisabled
                      ? "bg-stone-100 text-stone-400 border border-stone-200"
                      : isActive
                      ? "bg-orange-100 text-orange-900 border border-orange-200"
                      : isCompleted
                      ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                      : "text-stone-500 bg-white border border-stone-200"
                  )}
                >
                  {isDisabled ? (
                    <>
                      <Lock className="w-2.5 h-2.5" />
                      LOCKED
                    </>
                  ) : (
                    `#${idx + 1}`
                  )}
                </span>
              </div>

              {/* Step Labels */}
              <div>
                <div
                  className={cn(
                    "text-xs font-bold leading-tight",
                    isDisabled
                      ? "text-stone-400"
                      : isActive
                      ? "text-stone-950 font-black"
                      : isCompleted
                      ? "text-emerald-900"
                      : "text-stone-800 group-hover:text-stone-950"
                  )}
                >
                  {step.label}
                </div>
                <div
                  className={cn(
                    "text-[10px] truncate mt-0.5 font-sans",
                    isDisabled
                      ? "text-stone-400"
                      : isActive
                      ? "text-stone-600"
                      : isCompleted
                      ? "text-emerald-700"
                      : "text-stone-500"
                  )}
                >
                  {isDisabled ? "Locked step" : step.subLabel}
                </div>
              </div>

              {/* Step Connection Indicator */}
              {idx < STEPS.length - 1 && (
                <div
                  className={cn(
                    "hidden lg:block absolute -right-2.5 top-1/2 -translate-y-1/2 z-10 text-xs font-mono",
                    isDisabled ? "text-stone-300" : "text-stone-400"
                  )}
                >
                  ➔
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
});
