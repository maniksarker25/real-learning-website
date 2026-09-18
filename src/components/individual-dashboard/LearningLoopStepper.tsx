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
  bgImage: string;
}[] = [
  {
    id: "pathfinder",
    label: "Pathfinder",
    subLabel: "Where Am I? & Paths",
    route: "/user-dashboard/pathfinder",
    icon: Compass,
    bgImage: "/bg1.jfif",
  },
  {
    id: "class",
    label: "Class",
    subLabel: "Learn Fundamentals",
    route: "/user-dashboard/classes",
    icon: BookOpen,
    bgImage: "/bg2.jfif",
  },
  {
    id: "simulator",
    label: "Simulator",
    subLabel: "Practice Layer",
    route: "/user-dashboard/simulations",
    icon: Zap,
    bgImage: "/bg3.avif",
  },
  {
    id: "feedback",
    label: "AI Feedback",
    subLabel: "Performance Breakdown",
    route: "/user-dashboard/feedback",
    icon: MessageSquare,
    bgImage: "/bg4.avif",
  },
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
    <div className="bg-white border border-stone-200 rounded-xl p-3.5 sm:p-4 space-y-3 shadow-sm">
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

      {/* Stepper Flow Cards with bg assets */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        {STEPS.map((step, idx) => {
          const Icon = step.icon;
          const isCurrent = activeStep === step.id;

          // A step is considered passed if it's before the current active step, or marked completed in context
          const isPassed =
            idx < currentStepIndex ||
            (contextValue
              ? contextValue.isStepCompleted(step.id) && !isCurrent
              : false);

          const isDeactive = !isCurrent && !isPassed;

          return (
            <button
              key={step.id}
              onClick={() => !isDeactive && handleStepClick(step, idx)}
              disabled={isDeactive}
              title={
                isDeactive
                  ? `Locked: Complete Step ${idx} first`
                  : step.label
              }
              className={cn(
                "relative overflow-hidden rounded-xl border text-left p-3.5 select-none flex flex-col justify-between min-h-[96px] w-full transition-colors",
                isCurrent
                  ? "border-orange-500 ring-2 ring-orange-400/30 cursor-pointer"
                  : isPassed
                  ? "border-emerald-300/90 hover:border-emerald-400 cursor-pointer"
                  : "border-stone-200/90 bg-stone-100/90 opacity-60 cursor-not-allowed"
              )}
            >
              {/* Background Image Layer covering 100% full card */}
              <div
                className={cn(
                  "absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat pointer-events-none",
                  isDeactive && "grayscale opacity-10"
                )}
                style={{ backgroundImage: `url('${step.bgImage}')` }}
              />

              {/* Solid / Tint Overlay Layer */}
              <div
                className={cn(
                  "absolute inset-0 w-full h-full pointer-events-none",
                  isCurrent
                    ? "bg-gradient-to-br from-orange-50/85 via-white/75 to-amber-50/65 backdrop-blur-[0.5px]"
                    : isPassed
                    ? "bg-gradient-to-br from-emerald-50/80 via-white/75 to-[#FAF8F5]/65 backdrop-blur-[0.5px]"
                    : "bg-stone-100/90 backdrop-blur-[1px]"
                )}
              />

              {/* Content Row 1: Icon + Status Pill */}
              <div className="relative z-10 flex items-center justify-between w-full">
                <div
                  className={cn(
                    "w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-colors",
                    isCurrent
                      ? "bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-xs"
                      : isPassed
                      ? "bg-emerald-100 text-emerald-700 border border-emerald-300"
                      : "bg-stone-200 text-stone-400 border border-stone-300/70"
                  )}
                >
                  {isPassed ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                  ) : isDeactive ? (
                    <Lock className="w-3.5 h-3.5 text-stone-400" />
                  ) : (
                    <Icon className="w-3.5 h-3.5" />
                  )}
                </div>

                <span
                  className={cn(
                    "text-[9px] font-mono font-bold px-1.5 py-0.5 rounded flex items-center gap-1 shrink-0",
                    isCurrent
                      ? "bg-orange-100 text-orange-900 border border-orange-300"
                      : isPassed
                      ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                      : "bg-stone-200/80 text-stone-400 border border-stone-300/60"
                  )}
                >
                  {isDeactive ? (
                    <>
                      <Lock className="w-2.5 h-2.5" />
                      #{idx + 1}
                    </>
                  ) : isPassed ? (
                    <>
                      <CheckCircle2 className="w-2.5 h-2.5" />
                      #{idx + 1}
                    </>
                  ) : (
                    `#${idx + 1} ACTIVE`
                  )}
                </span>
              </div>

              {/* Content Row 2: Step Labels */}
              <div className="relative z-10 pt-1">
                <div
                  className={cn(
                    "text-xs font-bold leading-tight",
                    isCurrent
                      ? "text-stone-950 font-black"
                      : isPassed
                      ? "text-stone-900"
                      : "text-stone-400"
                  )}
                >
                  {step.label}
                </div>
                <div
                  className={cn(
                    "text-[10px] truncate mt-0.5 font-sans",
                    isCurrent
                      ? "text-stone-600 font-medium"
                      : isPassed
                      ? "text-emerald-800 font-medium"
                      : "text-stone-400"
                  )}
                >
                  {isDeactive ? "Locked step" : step.subLabel}
                </div>
              </div>

              {/* Step Connection Indicator */}
              {idx < STEPS.length - 1 && (
                <div
                  className={cn(
                    "hidden lg:block absolute -right-2 top-1/2 -translate-y-1/2 z-20 text-[10px] font-mono",
                    isPassed ? "text-emerald-500 font-bold" : "text-stone-300"
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
