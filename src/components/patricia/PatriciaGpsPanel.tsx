"use client";

import React, { useState, useEffect, useCallback, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  Target,
  ShieldCheck,
  Compass,
  ArrowRight,
  HelpCircle,
  FileQuestion,
} from "lucide-react";
import { LifeGPSState } from "./patriciaDialogEngine";

interface PatriciaGpsPanelProps {
  gpsState: LifeGPSState;
}

export const PatriciaGpsPanel = memo(function PatriciaGpsPanel({
  gpsState,
}: PatriciaGpsPanelProps) {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  const stepsData = [
    {
      title: "1. Where you are right now",
      subtitle: "Current position & baseline assessment",
      value: gpsState.whereYouAre,
      icon: MapPin,
      badge: "Step 01",
      color: "text-amber-400",
      accentBg: "bg-amber-500/10 border-amber-500/20",
    },
    {
      title: "2. Where you want to go",
      subtitle: "Target career outcome & strengths alignment",
      value: gpsState.whereYouWantToGo,
      icon: Target,
      badge: "Step 02",
      color: "text-rose-400",
      accentBg: "bg-rose-500/10 border-rose-500/20",
    },
    {
      title: "3. Your next best step",
      subtitle: "5-minute low-risk practice simulation",
      value: gpsState.nextBestStep,
      icon: ShieldCheck,
      badge: "Step 03",
      color: "text-emerald-400",
      accentBg: "bg-emerald-500/10 border-emerald-500/20",
    },
  ];

  // Auto-rotate steps every 4.5 seconds, pausing on user hover
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % stepsData.length);
    }, 4500);

    return () => clearInterval(interval);
  }, [isPaused, stepsData.length]);

  const handleManualStepChange = useCallback((index: number) => {
    setActiveStep(index);
  }, []);

  const currentStep = stepsData[activeStep];
  const StepIcon = currentStep.icon;

  return (
    <div className="flex flex-col justify-center space-y-7 lg:pl-2">
      {/* Heading & Subtitle */}
      <div className="space-y-3">
        <h2 className="text-3xl sm:text-4xl lg:text-[42px] uppercase font-extrabold text-stone-950 tracking-tight leading-[1.15]">
          Yes, you even have a{" "}
          <span className="border-b-4 border-dashed border-orange-400">
            personal Life GPS.
          </span>
        </h2>
        <p className="text-sm sm:text-base text-stone-900/80 font-medium leading-relaxed max-w-xl">
          When you&apos;re trying to figure out what career to pursue or what
          skill to practice next, vague advice isn&apos;t enough. That&apos;s where
          Patricia maps your exact direction.
        </p>
      </div>

      {/* Interactive Rotating GPS Card */}
      <div
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        className="rounded-2xl bg-[#191917] border border-stone-800 shadow-2xl p-5 sm:p-6 transition-all relative overflow-hidden group"
      >
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-white/[0.06] border border-white/10 flex items-center justify-center shrink-0">
            <StepIcon className={`w-5 h-5 ${currentStep.color}`} />
          </div>

          <div className="space-y-1.5 min-w-0 flex-1">
            <div className="flex items-center justify-between gap-2">
              <h3 className="text-sm sm:text-base font-semibold text-white tracking-tight">
                {currentStep.title}
              </h3>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.08] text-orange-50 border border-white/10">
                {currentStep.badge}
              </span>
            </div>

            <p className="text-xs text-stone-400 leading-relaxed">
              {currentStep.subtitle}
            </p>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, y: 3 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -3 }}
                transition={{ duration: 0.2 }}
                className="pt-2 text-xs sm:text-sm font-medium text-orange-50/95 leading-relaxed bg-stone-800/80 p-3 rounded-xl border border-stone-700/60"
              >
                {currentStep.value}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Auto-Rotation Progress Bar */}
        <div className="mt-4 pt-3 border-t border-white/[0.08] flex items-center justify-between">
          <span className="text-[10px] font-mono text-stone-500 uppercase tracking-wider">
            {isPaused ? "Paused on Hover" : "Auto-Updating Step"}
          </span>
          <div className="flex items-center gap-1.5">
            {stepsData.map((_, idx) => {
              const isActive = activeStep === idx;
              return (
                <div
                  key={idx}
                  className={`h-1 rounded-full transition-all duration-300 ${
                    isActive ? "w-6 bg-orange-400" : "w-2 bg-white/20"
                  }`}
                />
              );
            })}
          </div>
        </div>
      </div>

      {/* Manual Step Selection Indicators */}
      <div className="flex items-center gap-2 pl-1 select-none">
        {stepsData.map((_, idx) => {
          const isActive = activeStep === idx;
          return (
            <button
              key={idx}
              type="button"
              onClick={() => handleManualStepChange(idx)}
              className={`transition-all duration-300 rounded-full cursor-pointer ${
                isActive
                  ? "w-7 h-2.5 bg-stone-950 shadow-sm"
                  : "w-2.5 h-2.5 bg-stone-900/25 hover:bg-stone-900/50"
              }`}
              title={`View ${stepsData[idx].title}`}
              aria-label={`Step ${idx + 1}`}
            />
          );
        })}
      </div>

      {/* Alternatives & Action CTA */}
      <div className="pt-2 border-t border-stone-900/15 space-y-4">
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-xs text-stone-900/70 font-semibold">
            Alternative to:
          </span>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/80 hover:bg-white text-xs text-stone-900 font-semibold border border-stone-900/10 shadow-sm backdrop-blur transition-all">
              <FileQuestion className="w-3.5 h-3.5 text-amber-600" />
              Generic Tests
            </span>
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/80 hover:bg-white text-xs text-stone-900 font-semibold border border-stone-900/10 shadow-sm backdrop-blur transition-all">
              <HelpCircle className="w-3.5 h-3.5 text-rose-600" />
              Vague Advice
            </span>
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/80 hover:bg-white text-xs text-stone-900 font-semibold border border-stone-900/10 shadow-sm backdrop-blur transition-all">
              <Compass className="w-3.5 h-3.5 text-emerald-700" />
              Guesswork
            </span>
          </div>
        </div>

        <div className="pt-1">
          <a
            href={gpsState.actionCta?.href || "#explore-careers"}
            className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl bg-stone-950 hover:bg-stone-900 text-white font-bold text-xs sm:text-sm transition-all shadow-xl hover:shadow-2xl active:scale-95 cursor-pointer"
          >
            <span>
              {gpsState.actionCta?.label || "Explore 5-Min Simulations"}
            </span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
});
