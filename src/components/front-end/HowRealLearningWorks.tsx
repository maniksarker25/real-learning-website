"use client";

import React, { useState, useEffect, useRef, useCallback, useSyncExternalStore } from "react";
const emptySubscribe = () => () => {};
import { motion, AnimatePresence } from "framer-motion";
import { LEARNING_STEPS } from "./learning-steps.data";
import {
  Zap,
  ArrowRight,
  CheckCircle2,
  Play,
  Pause,
  Compass,
  BookOpen,
  MessageSquare,
  BarChart3,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface PathSegment {
  fromId: string;
  toId: string;
  d: string;
  startPoint: { x: number; y: number };
  endPoint: { x: number; y: number };
}

const STEP_INTERVAL_MS = 1800; // Time in ms per step during auto-flow

export default function HowRealLearningWorks() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Map<string, HTMLDivElement>>(new Map());

  const [activeStep, setActiveStep] = useState<string>("step-01");
  const [hoveredStep, setHoveredStep] = useState<string | null>(null);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(true);
  const [pathSegments, setPathSegments] = useState<PathSegment[]>([]);
  const [isDesktop, setIsDesktop] = useState<boolean>(false);
  const mounted = useSyncExternalStore(emptySubscribe, () => true, () => false);

  const setCardRef = (id: string, el: HTMLDivElement | null) => {
    if (el) {
      cardRefs.current.set(id, el);
    } else {
      cardRefs.current.delete(id);
    }
  };

  // Automated Flow Stepper Loop (Step 01 -> 02 -> 03 -> 04 -> 05 -> 01)
  useEffect(() => {
    if (!isAutoPlaying) return;

    const timer = setInterval(() => {
      setActiveStep((prev) => {
        const currentIndex = LEARNING_STEPS.findIndex((s) => s.id === prev);
        const nextIndex = (currentIndex + 1) % LEARNING_STEPS.length;
        return LEARNING_STEPS[nextIndex].id;
      });
    }, STEP_INTERVAL_MS);

    return () => clearInterval(timer);
  }, [isAutoPlaying]);

  // Calculate dynamic Bezier workflow curves connecting cards
  const calculatePaths = useCallback(() => {
    if (!containerRef.current) return;
    const containerRect = containerRef.current.getBoundingClientRect();
    const isDesktopView = window.innerWidth >= 1024;
    setIsDesktop(isDesktopView);

    if (!isDesktopView) {
      setPathSegments([]);
      return;
    }

    const segments: PathSegment[] = [];

    for (let i = 0; i < LEARNING_STEPS.length - 1; i++) {
      const currentStep = LEARNING_STEPS[i];
      const nextStep = LEARNING_STEPS[i + 1];

      const currentEl = cardRefs.current.get(currentStep.id);
      const nextEl = cardRefs.current.get(nextStep.id);

      if (currentEl && nextEl) {
        const currentRect = currentEl.getBoundingClientRect();
        const nextRect = nextEl.getBoundingClientRect();

        const startX = currentRect.right - containerRect.left;
        const startY =
          currentRect.top + currentRect.height / 2 - containerRect.top;

        const endX = nextRect.left - containerRect.left;
        const endY = nextRect.top + nextRect.height / 2 - containerRect.top;

        let pathD = "";

        if (i === 1) {
          const loopRightX = Math.max(startX, endX) + 70;
          const loopLeftX = Math.min(startX, endX) - 70;
          const midY = (startY + endY) / 2;

          pathD = `M ${startX} ${startY} C ${loopRightX} ${startY}, ${loopRightX} ${midY}, ${loopRightX - 30} ${midY} L ${loopLeftX + 30} ${midY} C ${loopLeftX} ${midY}, ${loopLeftX} ${endY}, ${endX} ${endY}`;
        } else {
          const deltaX = Math.abs(endX - startX);
          const controlX1 = startX + deltaX * 0.4;
          const controlX2 = endX - deltaX * 0.4;

          pathD = `M ${startX} ${startY} C ${controlX1} ${startY}, ${controlX2} ${endY}, ${endX} ${endY}`;
        }

        segments.push({
          fromId: currentStep.id,
          toId: nextStep.id,
          d: pathD,
          startPoint: { x: startX, y: startY },
          endPoint: { x: endX, y: endY },
        });
      }
    }

    setPathSegments(segments);
  }, []);

  useEffect(() => {
    const rafId = requestAnimationFrame(() => {
      calculatePaths();
    });

    const handleResize = () => calculatePaths();
    window.addEventListener("resize", handleResize);

    const observer = new ResizeObserver(() => calculatePaths());
    if (containerRef.current) observer.observe(containerRef.current);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", handleResize);
      observer.disconnect();
    };
  }, [calculatePaths]);

  const activeStepIndex = LEARNING_STEPS.findIndex((s) => s.id === activeStep);

  return (
    <section className="relative w-full py-16 sm:py-20 bg-black text-slate-100 font-sans overflow-hidden">
      {/* Background Grid (Identical to page.tsx) */}
      {/* <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "radial-gradient(rgba(167,139,250,0.6) 1px, transparent 1px)",
            backgroundSize: "16px 16px",
          }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[550px] opacity-35 blur-3xl pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(249, 115, 22, 0.15) 0%, rgba(244, 63, 94, 0.1) 50%, transparent 70%)",
          }}
        />
      </div> */}

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header & Flow Controls (Synchronized with page.tsx theme) */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="flex flex-wrap items-center justify-center gap-3 mb-4">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-400/30 backdrop-blur text-xs text-orange-300 font-medium"
            >
              <Zap className="h-3.5 w-3.5 text-orange-400" />
              <span>HOW REAL LEARNING WORKS</span>
            </motion.div>

            {/* Auto-Play Toggle Badge */}
            <button
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className={cn(
                "inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-mono font-medium transition-colors border cursor-pointer backdrop-blur",
                isAutoPlaying
                  ? "bg-emerald-500/10 border-emerald-400/30 text-emerald-300"
                  : "bg-white/5 border-white/20 text-white/70 hover:text-white"
              )}
            >
              {isAutoPlaying ? (
                <>
                  <Pause className="w-3 h-3 text-emerald-400" />
                  <span>Auto-Flowing (0{activeStepIndex + 1}/05)</span>
                </>
              ) : (
                <>
                  <Play className="w-3 h-3 text-white" />
                  <span>Resume Flow</span>
                </>
              )}
            </button>
          </div>

          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight"
          >
            Learn by{" "}
            <span className="bg-gradient-to-r from-orange-400 via-rose-400 to-pink-400 bg-clip-text text-transparent font-accent">
              Doing
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="mt-4 text-base sm:text-lg text-white/70 font-normal leading-relaxed"
          >
            Build real-world skills through realistic scenarios, AI conversations, and actionable feedback.
          </motion.p>
        </div>

        {/* RL LEARNING GPS LOOP Interactive Demonstration */}
        <div className="mb-12 bg-[#0f1019]/90 border border-white/10 rounded-2xl p-5 shadow-2xl backdrop-blur-md space-y-3 max-w-5xl mx-auto">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-white/10 pb-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-orange-500/20 border border-orange-400/40 flex items-center justify-center text-orange-400">
                <Zap className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-black uppercase tracking-wider text-white flex items-center gap-2 flex-wrap">
                  <span>RL LEARNING GPS LOOP</span>
                  <span className="text-[10px] font-mono font-normal text-orange-300 bg-orange-500/10 px-2.5 py-0.5 rounded-full border border-orange-400/20">
                    ACTIVE PATH: Tech Support
                  </span>
                </h4>
              </div>
            </div>

            <div className="text-[10px] font-mono text-white/50 flex items-center gap-2">
              <span>Step 3 of 6</span>
              <div className="w-16 h-1.5 bg-black/60 rounded-full overflow-hidden border border-white/10">
                <div className="h-full bg-gradient-to-r from-orange-500 to-rose-500 rounded-full w-[50%]" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
            {[
              { num: "#1", label: "Pathfinder", sub: "Where Am I? & Paths", icon: Compass, active: false, done: true },
              { num: "#2", label: "Class", sub: "Learn Fundamentals", icon: BookOpen, active: false, done: true },
              { num: "#3", label: "Simulator", sub: "Practice Layer", icon: Zap, active: true, done: false },
              { num: "#4", label: "AI Feedback", sub: "Performance Breakdown", icon: MessageSquare, active: false, done: false },
              { num: "#5", label: "Skill Progress", sub: "Demonstrated Gains", icon: BarChart3, active: false, done: false },
              { num: "#6", label: "Next Step", sub: "GPS Guidance", icon: ArrowRight, active: false, done: false },
            ].map((st, i) => (
              <div
                key={st.num}
                className={cn(
                  "relative p-3 rounded-xl border flex flex-col justify-between space-y-2 transition-all",
                  st.active
                    ? "bg-gradient-to-br from-orange-500/20 via-[#161826] to-[#0d0e15] border-orange-400/60 shadow-lg scale-[1.02]"
                    : st.done
                    ? "bg-[#12131d]/80 border-emerald-500/30 text-emerald-300"
                    : "bg-black/40 border-white/10 text-white/60"
                )}
              >
                <div className="flex items-center justify-between">
                  <div
                    className={cn(
                      "w-6 h-6 rounded-lg flex items-center justify-center text-xs",
                      st.active
                        ? "bg-orange-500 text-white"
                        : st.done
                        ? "bg-emerald-500/20 text-emerald-400"
                        : "bg-white/5 text-white/40"
                    )}
                  >
                    {st.done ? (
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    ) : (
                      <st.icon className="w-3 h-3" />
                    )}
                  </div>
                  <span className="text-[9px] font-mono font-bold text-white/40">{st.num}</span>
                </div>
                <div>
                  <div className="text-xs font-extrabold text-white">{st.label}</div>
                  <div className="text-[9px] text-white/50 truncate font-sans">{st.sub}</div>
                </div>
                {i < 5 && (
                  <div className="hidden lg:block absolute -right-2 top-1/2 -translate-y-1/2 text-white/20 text-[10px]">
                    ➔
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Workflow Diagram Container */}
        <div ref={containerRef} className="relative w-full py-4 min-h-[240px]">
          {/* SVG Connector Line Canvas */}
          {isDesktop && mounted && (
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible"
              aria-hidden="true"
            >
              {pathSegments.map((segment, idx) => {
                const isHovered =
                  hoveredStep === segment.fromId ||
                  hoveredStep === segment.toId ||
                  activeStep === segment.fromId ||
                  activeStep === segment.toId;

                const stepHex = LEARNING_STEPS[idx]?.accent.hex || "#FB923C";

                return (
                  <g key={`path-${segment.fromId}-${segment.toId}`}>
                    {/* 1. Base Dark Connector String */}
                    <path
                      d={segment.d}
                      fill="none"
                      stroke={isHovered ? stepHex : "#F97316"}
                      strokeWidth={isHovered ? 2.5 : 1.75}
                      strokeOpacity={isHovered ? 0.9 : 0.45}
                      className="transition-colors duration-300"
                    />

                    {/* 2. Flowing Animated Dash Array along String */}
                    <motion.path
                      d={segment.d}
                      fill="none"
                      stroke={isHovered ? stepHex : "#FB923C"}
                      strokeWidth={isHovered ? 2.5 : 1.75}
                      strokeDasharray="6 6"
                      animate={{ strokeDashoffset: [0, -24] }}
                      transition={{
                        repeat: Infinity,
                        duration: 1.2,
                        ease: "linear",
                      }}
                    />

                    {/* 3. Continuous Traveling Pulse Packet along String (Card to Card) */}
                    <circle r="3.5" fill={isHovered ? stepHex : "#FB923C"}>
                      <animateMotion
                        path={segment.d}
                        dur="2.2s"
                        repeatCount="indefinite"
                        begin={`${idx * 0.45}s`}
                      />
                    </circle>

                    {/* Secondary trailing particle */}
                    <circle r="2" fill="#FDBA74" opacity="0.8">
                      <animateMotion
                        path={segment.d}
                        dur="2.2s"
                        repeatCount="indefinite"
                        begin={`${idx * 0.45 + 0.15}s`}
                      />
                    </circle>
                  </g>
                );
              })}
            </svg>
          )}

          {/* Workflow Cards Canvas Layout */}
          <div className="relative z-10 flex flex-col gap-12 max-w-5xl mx-auto">
            {/* ROW 1: Step 01 & Step 02 (Centered) */}
            <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-28">
              {LEARNING_STEPS.slice(0, 2).map((step, index) => (
                <WorkflowCard
                  key={step.id}
                  step={step}
                  index={index}
                  isSelected={activeStep === step.id}
                  isHovered={hoveredStep === step.id}
                  setRef={(el) => setCardRef(step.id, el)}
                  onMouseEnter={() => setHoveredStep(step.id)}
                  onMouseLeave={() => setHoveredStep(null)}
                  onClick={() => {
                    setActiveStep(step.id);
                  }}
                />
              ))}
            </div>

            {/* ROW 2: Step 03, Step 04, Step 05 (Centered) */}
            <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-12">
              {LEARNING_STEPS.slice(2, 5).map((step, index) => (
                <WorkflowCard
                  key={step.id}
                  step={step}
                  index={index + 2}
                  isSelected={activeStep === step.id}
                  isHovered={hoveredStep === step.id}
                  setRef={(el) => setCardRef(step.id, el)}
                  onMouseEnter={() => setHoveredStep(step.id)}
                  onMouseLeave={() => setHoveredStep(null)}
                  onClick={() => {
                    setActiveStep(step.id);
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Selected Step Feature Details Box (Fixed Responsive Height - Zero Layout Shifts) */}
        <div className="mt-10 max-w-2xl mx-auto">
          {(() => {
            const current =
              LEARNING_STEPS.find((s) => s.id === activeStep) ||
              LEARNING_STEPS[0];
            const IconComponent = current.icon;

            return (
              <div className="bg-[#0f0f15]/90 rounded-2xl p-5 sm:p-6 border border-white/10 shadow-2xl text-slate-200 backdrop-blur-md relative h-[280px] sm:h-[240px] overflow-hidden">
                {/* Top Accent Gradient Bar */}
                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-orange-400 via-rose-400 to-pink-400" />

                {/* Inner Content Cross-Fades Smoothly inside Fixed Height Container */}
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.div
                    key={current.id}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.22, ease: "easeOut" }}
                    className="h-full flex flex-col justify-between"
                  >
                    {/* Top Content Group */}
                    <div>
                      {/* macOS Window Controls Header */}
                      <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/10">
                        <div className="flex items-center gap-1.5">
                          <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
                          <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
                          <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
                        </div>
                        <span className="text-[10px] font-mono text-white/40">
                          macOS Step Inspector
                        </span>
                      </div>

                      {/* Header */}
                      <div className="flex items-center justify-between gap-3 mb-2.5 border-b border-white/10 pb-2.5">
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div className="w-8 h-8 rounded-lg flex items-center justify-center border bg-orange-500/10 border-orange-400/30 text-orange-400 shrink-0">
                            <IconComponent className="w-4 h-4" />
                          </div>
                          <div className="min-w-0">
                            <span className="text-[10px] font-mono font-bold text-white/50 uppercase tracking-wider block">
                              STEP {current.number} OF 05
                            </span>
                            <h4 className="text-sm sm:text-base font-bold text-white truncate">
                              {current.title}
                            </h4>
                          </div>
                        </div>

                        <span className="text-[11px] font-mono font-bold text-orange-300 bg-orange-500/10 px-2.5 py-0.5 rounded-md border border-orange-400/30 shrink-0">
                          {current.label}
                        </span>
                      </div>

                      {/* Tagline */}
                      <p className="text-xs text-white/70 mb-3 font-normal truncate">
                        {current.preview.tagline}
                      </p>

                      {/* Highlights Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {current.preview.highlights.map((h, i) => (
                          <div
                            key={i}
                            className="flex items-center gap-2 text-xs text-white/90 bg-white/5 px-2.5 py-1.5 rounded-lg border border-white/10 min-w-0"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                            <span className="truncate">{h}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Metrics Footer */}
                    {current.preview.metrics && (
                      <div className="flex items-center gap-6 pt-2.5 border-t border-white/10">
                        {current.preview.metrics.map((m, i) => (
                          <div key={i} className="text-xs">
                            <span className="text-white/50 text-[10px] font-mono uppercase block">
                              {m.label}
                            </span>
                            <span className="font-bold text-white text-xs sm:text-sm">
                              {m.value}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            );
          })()}
        </div>

        {/* Footer CTA (Identical button style as page.tsx) */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-3">
            <button className="group bg-white text-black hover:bg-white/90 rounded-full px-8 h-12 text-base font-semibold inline-flex items-center gap-2 cursor-pointer shadow-md transition-all">
              <span>Try a free simulation</span>
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

// Workflow Card Component (Synchronized with page.tsx theme)
interface WorkflowCardProps {
  step: (typeof LEARNING_STEPS)[0];
  index: number;
  isSelected: boolean;
  isHovered: boolean;
  setRef: (el: HTMLDivElement | null) => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onClick: () => void;
}

function WorkflowCard({
  step,
  index,
  isSelected,
  isHovered,
  setRef,
  onMouseEnter,
  onMouseLeave,
  onClick,
}: WorkflowCardProps) {
  const IconComponent = step.icon;

  return (
    <motion.div
      ref={setRef}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: index * 0.06 }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
      className={cn(
        "group relative w-full sm:w-[260px] min-h-[82px] bg-[#0f0f15]/90 rounded-2xl p-3.5 sm:p-4 shadow-[0_4px_20px_rgba(0,0,0,0.5)] border transition-all duration-300 cursor-pointer select-none backdrop-blur-md",
        isSelected
          ? "ring-2 ring-orange-500/50 border-orange-400 bg-[#14141f]"
          : isHovered
          ? "border-white/20"
          : "border-white/10"
      )}
    >
      {/* Top Left Trigger Badge */}
      {step.triggerBadge && (
        <span className="absolute -top-2.5 left-3 px-2 py-0.5 rounded-md bg-gradient-to-r from-orange-500 to-rose-500 text-white text-[10px] font-mono font-bold tracking-tight shadow-xs z-30">
          {step.triggerBadge}
        </span>
      )}

      {/* Side Connection Port Nodes */}
      <div
        className={cn(
          "w-2.5 h-2.5 rounded-full bg-black border-2 absolute -left-[5px] top-1/2 -translate-y-1/2 z-30 transition-all",
          isSelected
            ? "border-orange-400 shadow-[0_0_10px_rgba(251,146,60,0.9)] scale-110"
            : "border-orange-500/60 shadow-[0_0_6px_rgba(249,115,22,0.5)]"
        )}
      />
      <div
        className={cn(
          "w-2.5 h-2.5 rounded-full bg-black border-2 absolute -right-[5px] top-1/2 -translate-y-1/2 z-30 transition-all",
          isSelected
            ? "border-orange-400 shadow-[0_0_10px_rgba(251,146,60,0.9)] scale-110"
            : "border-orange-500/60 shadow-[0_0_6px_rgba(249,115,22,0.5)]"
        )}
      />

      {/* Inner Card Content */}
      <div className="flex items-center gap-3">
        {/* Left Icon Badge */}
        <div
          className={cn(
            "w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border transition-colors",
            isSelected
              ? "bg-orange-500/20 text-orange-300 border-orange-400/40 shadow-xs"
              : "border-white/10 bg-white/5 text-orange-400"
          )}
        >
          <IconComponent className="w-4 h-4 stroke-[2.2]" />
        </div>

        {/* Text Content */}
        <div className="flex-1 min-w-0">
          <h3
            className={cn(
              "text-sm font-bold tracking-tight leading-tight truncate transition-colors",
              isSelected ? "text-orange-300 font-extrabold" : "text-white group-hover:text-orange-300"
            )}
          >
            {step.title}
          </h3>
          <p className="text-[11px] text-white/60 font-normal leading-tight truncate mt-0.5">
            {step.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
