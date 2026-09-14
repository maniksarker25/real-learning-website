"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  CheckCircle2,
  Zap,
  Sparkles,
  ShieldCheck,
  BarChart3,
  Bot,
  Building2,
  Briefcase,
  TrendingUp,
  Headphones,
  Laptop,
  Network,
  HeartHandshake,
} from "lucide-react";

interface ShowcaseStep {
  id: string;
  stepNumber: string;
  shortLabel: string;
  tag: string;
  title: string;
  highlightWords: string[];
  metrics: { value: string; label: string }[];
  ctaLabel: string;
  ctaHref: string;
  bgClass: string;
  accentHex: string;
  icon: React.ComponentType<{ className?: string }>;
}

const SHOWCASE_STEPS: ShowcaseStep[] = [
  {
    id: "step-01",
    stepNumber: "01",
    shortLabel: "Career",
    tag: "CAREER // STEP 01",
    title: "Choose from 4 Career Tracks tailored to your natural strengths",
    highlightWords: ["4 Career Tracks"],
    metrics: [
      { value: "4 Tracks", label: "Specialized career pathways" },
      { value: "100%", label: "Customized skill maps" },
    ],
    ctaLabel: "Explore career tracks",
    ctaHref: "#explore-careers",
    bgClass: "bg-[#c04828]",
    accentHex: "#c04828",
    icon: Briefcase,
  },
  {
    id: "step-02",
    stepNumber: "02",
    shortLabel: "Simulation",
    tag: "SIMULATION // STEP 02",
    title: "Step into 850+ Workplace Scenarios with zero risk and maximum realism",
    highlightWords: ["850+ Workplace Scenarios"],
    metrics: [
      { value: "850+", label: "Real workplace situations" },
      { value: "0 Risk", label: "Safe environment to learn" },
    ],
    ctaLabel: "Browse simulations",
    ctaHref: "#explore-careers",
    bgClass: "bg-[#0f2b5c]",
    accentHex: "#0f2b5c",
    icon: Building2,
  },
  {
    id: "step-03",
    stepNumber: "03",
    shortLabel: "AI Roleplay",
    tag: "ADAPTIVE AI // STEP 03",
    title: "Engage with 500+ Adaptive AI Personas with authentic voice and emotions",
    highlightWords: ["500+ Adaptive AI Personas"],
    metrics: [
      { value: "500+", label: "Dynamic AI stakeholders" },
      { value: "< 250ms", label: "Real-time conversational latency" },
    ],
    ctaLabel: "Try AI interaction",
    ctaHref: "#patricia-experience",
    bgClass: "bg-[#451a70]",
    accentHex: "#451a70",
    icon: Bot,
  },
  {
    id: "step-04",
    stepNumber: "04",
    shortLabel: "Feedback",
    tag: "FEEDBACK // STEP 04",
    title: "Receive Multi-Dimensional AI Feedback scored across 12 critical workplace skills",
    highlightWords: ["Multi-Dimensional AI Feedback"],
    metrics: [
      { value: "12 Skills", label: "Soft skill dimensions scored" },
      { value: "Instant", label: "Turn-by-turn actionable insights" },
    ],
    ctaLabel: "See feedback scoring",
    ctaHref: "#feedback-section",
    bgClass: "bg-[#0e4b55]",
    accentHex: "#0e4b55",
    icon: BarChart3,
  },
  {
    id: "step-05",
    stepNumber: "05",
    shortLabel: "Progress",
    tag: "PROGRESSION // STEP 05",
    title: "Demonstrate Verifiable Skill Growth and graduate to senior industry readiness",
    highlightWords: ["Verifiable Skill Growth"],
    metrics: [
      { value: "+24%", label: "Average weekly skill gain" },
      { value: "Level 4", label: "Workplace mastery certified" },
    ],
    ctaLabel: "Start your journey",
    ctaHref: "#explore-careers",
    bgClass: "bg-[#064e3b]",
    accentHex: "#064e3b",
    icon: TrendingUp,
  },
];

function RenderHeadline({
  text,
  highlights,
}: {
  text: string;
  highlights: string[];
}) {
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;

  highlights.forEach((hl) => {
    const idx = text.indexOf(hl, lastIndex);
    if (idx !== -1) {
      if (idx > lastIndex) {
        parts.push(text.substring(lastIndex, idx));
      }
      parts.push(
        <span
          key={idx}
          className="font-extrabold text-white underline decoration-white/40 decoration-2 underline-offset-4"
        >
          {hl}
        </span>
      );
      lastIndex = idx + hl.length;
    }
  });

  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }

  return <>{parts.length > 0 ? parts : text}</>;
}

export default function HowRealLearningWorks() {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollToIndex = (index: number) => {
    const nextIdx = Math.max(0, Math.min(SHOWCASE_STEPS.length - 1, index));
    setActiveIndex(nextIdx);

    if (scrollContainerRef.current) {
      const card = scrollContainerRef.current.children[nextIdx] as HTMLElement;
      if (card) {
        card.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "start",
        });
      }
    }
  };

  const handleNext = () => scrollToIndex(activeIndex + 1);
  const handlePrev = () => scrollToIndex(activeIndex - 1);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    let timeoutId: NodeJS.Timeout;
    const handleScroll = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        const scrollLeft = container.scrollLeft;
        const children = Array.from(container.children) as HTMLElement[];
        let closestIdx = 0;
        let minDiff = Infinity;

        children.forEach((child, i) => {
          const diff = Math.abs(child.offsetLeft - container.offsetLeft - scrollLeft);
          if (diff < minDiff) {
            minDiff = diff;
            closestIdx = i;
          }
        });

        setActiveIndex(closestIdx);
      }, 100);
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      clearTimeout(timeoutId);
      container.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section className="relative w-full py-20 sm:py-28 bg-[#09090b] text-white overflow-hidden select-none border-t border-white/[0.08]">
      <div className="absolute inset-0 pointer-events-none opacity-25">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "radial-gradient(rgba(255,255,255,0.18) 1.2px, transparent 1.2px)",
            backgroundSize: "24px 24px",
          }}
        />
      </div>

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div className="max-w-2xl space-y-3.5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.05] border border-white/10 text-xs font-mono text-orange-400">
              <Zap className="w-3.5 h-3.5 text-orange-400" />
              <span>HOW REAL LEARNING WORKS</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold tracking-tight text-white leading-[1.15] uppercase">
              Learn by{" "}
              <span className="border-b-4 border-dashed border-orange-400 text-white">
                Doing.
              </span>
            </h2>

            <p className="text-sm sm:text-base text-white/60 font-medium leading-relaxed max-w-xl">
              Build verifiable workplace skills through realistic scenarios, adaptive AI dialogues, and real-time coaching feedback.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-1.5 p-1 rounded-full bg-white/[0.04] border border-white/10">
              {SHOWCASE_STEPS.map((step, idx) => (
                <button
                  key={step.id}
                  onClick={() => scrollToIndex(idx)}
                  className={`px-3 sm:px-3.5 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
                    activeIndex === idx
                      ? "bg-white text-black font-bold shadow-md"
                      : "text-white/60 hover:text-white"
                  }`}
                >
                  <span className="font-mono">{step.stepNumber}</span>
                  <span className="hidden sm:inline">{step.shortLabel}</span>
                </button>
              ))}
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={handlePrev}
                disabled={activeIndex === 0}
                className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 disabled:opacity-25 disabled:hover:bg-white/5 cursor-pointer transition-all"
                title="Previous step"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNext}
                disabled={activeIndex === SHOWCASE_STEPS.length - 1}
                className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 disabled:opacity-25 disabled:hover:bg-white/5 cursor-pointer transition-all"
                title="Next step"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <div
          ref={scrollContainerRef}
          className="flex gap-6 sm:gap-8 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-8 pt-2 no-scrollbar"
          style={{ scrollbarWidth: "none" }}
        >
          {SHOWCASE_STEPS.map((step, index) => {
            const isCurrent = activeIndex === index;
            return (
              <div
                key={step.id}
                onClick={() => {
                  if (!isCurrent) scrollToIndex(index);
                }}
                className={`snap-start w-[88vw] sm:w-[80vw] lg:w-[980px] shrink-0 rounded-[28px] overflow-hidden shadow-[0_25px_60px_-15px_rgba(0,0,0,0.85)] border transition-all duration-300 ${
                  isCurrent
                    ? "border-white/20 opacity-100 scale-100"
                    : "border-white/[0.08] opacity-75 hover:opacity-90 scale-[0.99] cursor-pointer"
                }`}
              >
                <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] min-h-[480px] lg:h-[500px]">
                  <div
                    className={`relative ${step.bgClass} p-8 sm:p-11 flex flex-col justify-between overflow-hidden`}
                  >
                    <div
                      className="absolute inset-0 pointer-events-none opacity-20"
                      style={{
                        backgroundImage: "radial-gradient(rgba(255,255,255,0.75) 1.2px, transparent 1.2px)",
                        backgroundSize: "18px 18px",
                      }}
                    />

                    <div className="relative z-10 space-y-6">
                      <div className="flex items-center justify-between text-xs font-mono font-bold tracking-widest text-white/90">
                        <span>{step.tag}</span>
                        <span className="px-2.5 py-0.5 rounded-full bg-black/25 border border-white/15 text-[10px] font-mono text-white/80">
                          {step.stepNumber} OF 05
                        </span>
                      </div>

                      <h3 className="text-2xl sm:text-3xl lg:text-[32px] font-normal text-white/95 leading-[1.2] max-w-md tracking-tight">
                        <RenderHeadline text={step.title} highlights={step.highlightWords} />
                      </h3>
                    </div>

                    <div className="relative z-10 space-y-8 pt-8">
                      <div className="grid grid-cols-2 gap-6">
                        {step.metrics.map((m, mIdx) => (
                          <div key={mIdx} className="space-y-1">
                            <div className="text-4xl sm:text-5xl font-black tracking-tight text-white font-mono">
                              {m.value}
                            </div>
                            <div className="text-xs sm:text-sm text-white/80 font-medium leading-snug">
                              {m.label}
                            </div>
                          </div>
                        ))}
                      </div>

                      <div>
                        <a
                          href={step.ctaHref}
                          className="group/btn inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-stone-950 font-bold text-xs sm:text-sm hover:bg-white/95 active:scale-95 transition-all shadow-xl cursor-pointer"
                        >
                          <span>{step.ctaLabel}</span>
                          <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover/btn:translate-x-1" />
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="relative bg-[#0c0c10] flex items-center justify-center overflow-hidden p-6 sm:p-8 border-t lg:border-t-0 lg:border-l border-white/10">
                    {step.id === "step-01" && (
                      <div className="relative w-full h-full min-h-[300px] rounded-2xl overflow-hidden shadow-inner flex flex-col justify-between p-6 sm:p-7">
                        <div
                          className="absolute inset-0 bg-cover bg-center"
                          style={{ backgroundImage: "url('/images/step-career.jpg')" }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 to-black/30" />

                        <div className="relative z-10 flex items-center justify-between">
                          <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-[11px] font-mono text-white/90 flex items-center gap-1.5 shadow-sm">
                            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                            Live Tracks
                          </span>
                          <span className="text-[10px] font-mono text-white/70">4 Specialized Paths</span>
                        </div>

                        <div className="relative z-10 space-y-2.5">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {[
                              { label: "Customer Service & Comms", icon: Headphones },
                              { label: "Tech & Data Support", icon: Laptop },
                              { label: "IT & Systems Specialist", icon: Network },
                              { label: "Healthcare Patient Care", icon: HeartHandshake },
                            ].map((track, tIdx) => (
                              <div
                                key={tIdx}
                                className="flex items-center gap-2 px-3 py-2 rounded-xl bg-black/75 backdrop-blur-md border border-white/15 text-xs font-semibold text-white/95 shadow-sm hover:border-orange-400/50 transition-colors"
                              >
                                <track.icon className="w-3.5 h-3.5 text-orange-400 shrink-0" />
                                <span className="truncate">{track.label}</span>
                              </div>
                            ))}
                          </div>

                          <p className="text-[11px] text-white/70 leading-relaxed pt-1 font-medium">
                            Choose the pathway that matches your natural instincts, communication style, and target income.
                          </p>
                        </div>
                      </div>
                    )}

                    {step.id === "step-02" && (
                      <div className="w-full h-full flex flex-col justify-between rounded-2xl bg-[#121217] border border-white/10 p-5 sm:p-6 space-y-4">
                        <div className="flex items-center justify-between border-b border-white/10 pb-3">
                          <div className="flex items-center gap-2">
                            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse" />
                            <span className="text-xs font-mono font-bold text-white tracking-wide">
                              SIMULATION #408
                            </span>
                          </div>
                          <span className="px-2.5 py-0.5 rounded-full bg-rose-500/10 border border-rose-500/30 text-[10px] font-mono font-medium text-rose-300">
                            Critical Incident
                          </span>
                        </div>

                        <div className="space-y-2">
                          <h4 className="text-sm sm:text-base font-bold text-white leading-snug">
                            High-Stakes Escalation: Team System Outage
                          </h4>
                          <p className="text-xs text-white/60 leading-relaxed">
                            A major customer tier experiences service interruption minutes before executive quarterly reviews.
                          </p>
                        </div>

                        <div className="p-3.5 rounded-xl bg-black/50 border border-white/[0.08] space-y-2.5">
                          <div className="text-[10px] font-mono text-white/40 uppercase tracking-wider flex items-center justify-between">
                            <span>Active Stakeholders</span>
                            <span className="text-emerald-400">● 2 Online</span>
                          </div>
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-white/90">Sarah Chen (VP Customer Ops)</span>
                            <span className="text-amber-400 font-mono text-[11px] px-2 py-0.5 rounded bg-amber-500/10 border border-amber-400/20">
                              Frustrated
                            </span>
                          </div>
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-white/90">Marcus Vance (Lead SRE)</span>
                            <span className="text-blue-400 font-mono text-[11px] px-2 py-0.5 rounded bg-blue-500/10 border border-blue-400/20">
                              Investigating
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between text-[11px] text-white/50 pt-1 border-t border-white/5">
                          <span>Elapsed: 04:12</span>
                          <span className="text-emerald-400 font-medium">100% Risk-free sandbox</span>
                        </div>
                      </div>
                    )}

                    {step.id === "step-03" && (
                      <div className="w-full h-full flex flex-col justify-between rounded-2xl bg-[#121217] border border-white/10 p-5 sm:p-6 space-y-4">
                        <div className="flex items-center justify-between border-b border-white/10 pb-3">
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-lg bg-fuchsia-500/20 border border-fuchsia-400/40 flex items-center justify-center text-fuchsia-400">
                              <Bot className="w-3.5 h-3.5" />
                            </div>
                            <span className="text-xs font-mono font-bold text-white">
                              Adaptive AI Audio Engine
                            </span>
                          </div>
                          <span className="text-[10px] font-mono text-fuchsia-300 bg-fuchsia-500/10 px-2.5 py-0.5 rounded-full border border-fuchsia-400/30">
                            Voice + Text
                          </span>
                        </div>

                        <div className="flex items-center justify-center gap-1.5 py-3">
                          {[32, 52, 22, 68, 42, 60, 26, 76, 38, 54, 28, 64, 46, 34, 58, 24].map((h, i) => (
                            <motion.span
                              key={i}
                              className="w-1.5 rounded-full bg-gradient-to-t from-fuchsia-500 to-rose-400 shadow-sm"
                              animate={{ height: [h * 0.35, h, h * 0.35] }}
                              transition={{
                                repeat: Infinity,
                                duration: 0.75 + (i % 4) * 0.18,
                                ease: "easeInOut",
                              }}
                              style={{ height: `${h}px` }}
                            />
                          ))}
                        </div>

                        <div className="p-3.5 rounded-xl bg-black/50 border border-white/[0.08] space-y-1.5">
                          <div className="text-[10px] font-mono text-fuchsia-300 font-semibold flex items-center justify-between">
                            <span>Patricia (Simulation Lead)</span>
                            <span className="text-white/40">Active speaker</span>
                          </div>
                          <p className="text-xs text-white/90 leading-relaxed">
                            "I hear your concern about the outage. What is your immediate remediation plan before we speak with the executive board?"
                          </p>
                        </div>

                        <div className="flex items-center justify-between text-[10px] font-mono text-white/40 pt-1 border-t border-white/5">
                          <span>Latency: 142ms</span>
                          <span className="text-fuchsia-400">Emotion: Empathetic (94%)</span>
                        </div>
                      </div>
                    )}

                    {step.id === "step-04" && (
                      <div className="w-full h-full flex flex-col justify-between rounded-2xl bg-[#121217] border border-white/10 p-5 sm:p-6 space-y-3.5">
                        <div className="flex items-center justify-between border-b border-white/10 pb-3">
                          <div className="flex items-center gap-2">
                            <BarChart3 className="w-4 h-4 text-cyan-400" />
                            <span className="text-xs font-mono font-bold text-white">
                              Multi-Skill Scorecard
                            </span>
                          </div>
                          <span className="text-[10px] font-mono text-cyan-300 bg-cyan-500/10 px-2.5 py-0.5 rounded-full border border-cyan-400/30">
                            Instant Scoring
                          </span>
                        </div>

                        <div className="space-y-3">
                          {[
                            { skill: "Empathy & Active Listening", score: 94, color: "from-cyan-400 to-teal-400" },
                            { skill: "Tactical Problem Solving", score: 89, color: "from-blue-400 to-cyan-400" },
                            { skill: "Tone & Professional Clarity", score: 96, color: "from-teal-400 to-emerald-400" },
                            { skill: "Conflict De-escalation", score: 91, color: "from-emerald-400 to-cyan-400" },
                          ].map((item, idx) => (
                            <div key={idx} className="space-y-1">
                              <div className="flex justify-between text-xs font-medium">
                                <span className="text-white/80">{item.skill}</span>
                                <span className="font-mono font-bold text-cyan-300">{item.score}%</span>
                              </div>
                              <div className="w-full h-2 rounded-full bg-black/70 overflow-hidden border border-white/5">
                                <div
                                  className={`h-full bg-gradient-to-r ${item.color} rounded-full transition-all duration-700`}
                                  style={{ width: `${item.score}%` }}
                                />
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="p-3.5 rounded-xl bg-cyan-950/40 border border-cyan-500/25 text-[11px] text-cyan-200/90 leading-relaxed font-medium">
                          "You validated the customer's frustration before proposing the fix. That reduced churn risk by 40%."
                        </div>
                      </div>
                    )}

                    {step.id === "step-05" && (
                      <div className="w-full h-full flex flex-col justify-between rounded-2xl bg-[#121217] border border-white/10 p-5 sm:p-6 space-y-4">
                        <div className="flex items-center justify-between border-b border-white/10 pb-3">
                          <div className="flex items-center gap-2">
                            <ShieldCheck className="w-4 h-4 text-emerald-400" />
                            <span className="text-xs font-mono font-bold text-white">
                              Verified Mastery Credential
                            </span>
                          </div>
                          <span className="text-[10px] font-mono text-emerald-300 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-400/30">
                            Level 4 Ready
                          </span>
                        </div>

                        <div className="space-y-1.5">
                          <div className="flex items-center gap-2">
                            <Sparkles className="w-4 h-4 text-emerald-400" />
                            <h4 className="text-sm sm:text-base font-bold text-white">
                              Senior Support & Comms Lead
                            </h4>
                          </div>
                          <p className="text-xs text-white/60 leading-relaxed">
                            Benchmarked directly against hiring standards for top technology and customer operations teams.
                          </p>
                        </div>

                        <div className="space-y-2 p-3.5 rounded-xl bg-black/50 border border-white/[0.08] text-xs">
                          <div className="flex items-center gap-2 text-white/85">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                            <span>15 high-stress workplace scenarios completed</span>
                          </div>
                          <div className="flex items-center gap-2 text-white/85">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                            <span>Diagnosed multi-tier SLA escalation incidents</span>
                          </div>
                          <div className="flex items-center gap-2 text-white/85">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                            <span>Turn-by-turn actionable feedback verified</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between text-[11px] text-white/50 pt-1 border-t border-white/5">
                          <span>Weekly Growth: +24%</span>
                          <span className="text-emerald-400 font-semibold font-mono">Real Learning Certified</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex items-center justify-center gap-2.5 pt-4">
          {SHOWCASE_STEPS.map((step, idx) => {
            const isCurrent = activeIndex === idx;
            return (
              <button
                key={idx}
                onClick={() => scrollToIndex(idx)}
                className={`transition-all duration-300 rounded-full cursor-pointer flex items-center justify-center text-[10px] font-mono ${
                  isCurrent
                    ? "w-8 h-2.5 bg-white text-black font-bold shadow-md"
                    : "w-2.5 h-2.5 bg-white/20 hover:bg-white/50"
                }`}
                title={`Jump to step ${idx + 1}`}
                aria-label={`Slide ${idx + 1}`}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
