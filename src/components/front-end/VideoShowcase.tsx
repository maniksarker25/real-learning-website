"use client";

import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Zap,
  Bot,
  BarChart3,
  Film,
  CheckCircle2,
  MessageSquare,
  Award,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface VideoShowcaseProps {
  videoUrl?: string;
}

export default function VideoShowcase({
  videoUrl = "/flow.mp4",
}: VideoShowcaseProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, []);

  const evaluationScores = [
    {
      label: "Communication",
      score: 92,
      color: "bg-orange-400",
      textColor: "text-orange-300",
    },
    {
      label: "Empathy",
      score: 88,
      color: "bg-rose-400",
      textColor: "text-rose-300",
    },
    {
      label: "Problem Solving",
      score: 84,
      color: "bg-pink-400",
      textColor: "text-pink-300",
    },
    {
      label: "Professionalism",
      score: 95,
      color: "bg-emerald-400",
      textColor: "text-emerald-300",
    },
  ];

  return (
    <section className="relative w-full bg-black text-slate-100 font-sans overflow-hidden py-16 sm:py-20 border-y border-white/10">
      {/* Background Grid & Ambient Glow (Identical to page.tsx) */}

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-400/30 backdrop-blur text-xs text-orange-300 font-medium mb-4"
          >
            <Zap className="h-3.5 w-3.5 text-orange-400" />
            <span>SEE IT IN ACTION</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight"
          >
            Real Conversations.{" "}
            <span className="bg-gradient-to-r from-orange-400 via-rose-400 to-pink-400 bg-clip-text text-transparent font-accent">
              Real Decisions.
            </span>{" "}
            Real Feedback.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="mt-4 text-base sm:text-lg text-white/70 font-normal leading-relaxed max-w-2xl mx-auto"
          >
            Every simulation puts you into a workplace situation where your
            responses matter.
          </motion.p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
          {/* BENTO ITEM 1: macOS Video Window (Spans 2 Columns) */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2 bg-[#0f0f15]/90 rounded-3xl p-3.5 sm:p-4 border border-white/10 shadow-2xl backdrop-blur-md flex flex-col justify-between select-none overflow-hidden group"
          >
            {/* macOS Window Title Bar */}
            <div className="flex items-center justify-between gap-3 px-4 py-2.5 bg-black/90 rounded-t-2xl border-b border-white/10 mb-2 z-30">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#FF5F56] border border-[#E0443E]/50" />
                <div className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-[#DEA123]/50" />
                <div className="w-3 h-3 rounded-full bg-[#27C93F] border border-[#1AAB29]/50" />
                <span className="ml-2 text-xs font-mono font-semibold text-white/80 flex items-center gap-1.5">
                  <Film className="w-3.5 h-3.5 text-orange-400" />
                  Scenario: Unhappy Customer Support Request
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-orange-500/10 border border-orange-400/30 text-orange-300 text-[10px] font-mono font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-ping" />
                  macOS LIVE DEMO
                </span>
              </div>
            </div>

            {/* Video Viewport */}
            <div
              className="relative aspect-video w-full bg-black rounded-2xl overflow-hidden flex items-center justify-center select-none"
              onContextMenu={(e) => e.preventDefault()}
            >
              <video
                ref={videoRef}
                src={videoUrl}
                autoPlay
                loop
                muted
                playsInline
                controls={false}
                onContextMenu={(e) => e.preventDefault()}
                className="w-full h-full object-cover select-none pointer-events-none"
              />

              {/* Protective Glass Overlay */}
              <div
                className="absolute inset-0 pointer-events-none z-20 bg-gradient-to-t from-black/80 via-transparent to-black/30 select-none"
                onContextMenu={(e) => e.preventDefault()}
              />

              {/* Live AI Status Pill */}
              <div className="absolute top-4 right-4 z-30 pointer-events-none flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-black/80 border border-white/20 text-white text-xs font-semibold backdrop-blur-md shadow-md">
                <Zap className="w-3.5 h-3.5 text-orange-400 animate-pulse" />
                <span>AI Simulation in Progress</span>
              </div>

              {/* Bottom Ticker: Current Dialogue Stream */}
              <div className="absolute bottom-4 left-4 right-4 z-30 pointer-events-none flex items-center justify-between gap-4 px-4 py-2.5 rounded-xl bg-black/90 border border-white/10 text-white text-xs backdrop-blur-md shadow-lg">
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className="w-2 h-2 rounded-full bg-orange-400 animate-pulse shrink-0" />
                  <span className="text-white/80 font-medium text-xs truncate">
                    AI Character: “I&apos;ve already contacted support twice.
                    Why hasn&apos;t anyone fixed this?”
                  </span>
                </div>
                <span className="text-[10px] font-mono text-white/50 uppercase tracking-wider shrink-0 bg-white/5 px-2 py-0.5 rounded border border-white/10">
                  Live Chat UI
                </span>
              </div>
            </div>
          </motion.div>

          {/* BENTO ITEM 2: Real Conversations Card */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-[#0f0f15]/90 rounded-3xl p-6 border border-white/10 shadow-xl backdrop-blur-md flex flex-col justify-between hover:border-white/20 transition-all duration-300"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-orange-500/10 text-orange-400 border border-orange-400/30 flex items-center justify-center mb-4">
                <Bot className="w-5 h-5 stroke-[2.2]" />
              </div>

              <span className="text-[10px] font-mono font-bold text-orange-300 uppercase tracking-wider block mb-1">
                STEP 01 • STAKEHOLDER PROMPT
              </span>
              <h3 className="text-xl font-bold text-white tracking-tight mb-2">
                Real Conversations
              </h3>
              <p className="text-xs text-white/70 leading-relaxed font-normal mb-5">
                Stepping into challenging workplace interactions with adaptive
                AI characters that push back realistically.
              </p>
            </div>

            {/* AI Character Speech Bubble Mockup */}
            <div className="bg-black/80 p-4 rounded-2xl border border-white/10 space-y-2">
              <div className="flex items-center justify-between text-[11px] font-mono text-white/50">
                <span className="text-orange-400 font-bold">AI Customer</span>
                <span>00:14</span>
              </div>
              <p className="text-xs text-white/90 font-medium italic leading-snug">
                “I&apos;ve already contacted support twice. Why hasn&apos;t
                anyone fixed this?”
              </p>
            </div>
          </motion.div>

          {/* BENTO ITEM 3: Real Decisions Card */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="bg-[#0f0f15]/90 rounded-3xl p-6 border border-white/10 shadow-xl backdrop-blur-md flex flex-col justify-between hover:border-white/20 transition-all duration-300"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mb-4">
                <MessageSquare className="w-5 h-5 stroke-[2.2]" />
              </div>

              <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-wider block mb-1">
                STEP 02 • YOUR RESPONSE
              </span>
              <h3 className="text-xl font-bold text-white tracking-tight mb-2">
                Real Decisions
              </h3>
              <p className="text-xs text-white/70 leading-relaxed font-normal mb-5">
                Formulate your response under real pressure. Every word choice
                directly alters the scenario outcome.
              </p>
            </div>

            {/* User Response Speech Bubble Mockup */}
            <div className="bg-black/80 p-4 rounded-2xl border border-white/10 space-y-2">
              <div className="flex items-center justify-between text-[11px] font-mono text-white/50">
                <span className="text-emerald-400 font-bold">
                  Your Response
                </span>
                <span className="text-emerald-400">Submitted</span>
              </div>
              <p className="text-xs text-white/90 font-medium leading-snug">
                “I&apos;m sorry you&apos;ve had to contact us multiple times.
                Let me review your order and resolve this immediately.”
              </p>
            </div>
          </motion.div>

          {/* BENTO ITEM 4: Real Feedback & AI Evaluation Scores Card */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-[#0f0f15]/90 rounded-3xl p-6 border border-white/10 shadow-xl backdrop-blur-md flex flex-col justify-between hover:border-white/20 transition-all duration-300"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-rose-500/10 text-rose-400 border border-rose-500/30 flex items-center justify-center mb-4">
                <BarChart3 className="w-5 h-5 stroke-[2.2]" />
              </div>

              <span className="text-[10px] font-mono font-bold text-rose-400 uppercase tracking-wider block mb-1">
                STEP 03 • AI SCORING
              </span>
              <h3 className="text-xl font-bold text-white tracking-tight mb-2">
                AI Evaluation
              </h3>
              <p className="text-xs text-white/70 leading-relaxed font-normal mb-4">
                Instant multi-dimensional scoring evaluating communication
                clarity, empathy, problem-solving, and professionalism.
              </p>
            </div>

            {/* AI Evaluation Scores Meter Widget */}
            <div className="space-y-2.5 bg-black/80 p-4 rounded-2xl border border-white/10">
              {evaluationScores.map((score, i) => (
                <div key={i}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-white/80 text-[11px] font-medium">
                      {score.label}
                    </span>
                    <span className={cn("font-bold text-xs", score.textColor)}>
                      {score.score}%
                    </span>
                  </div>
                  <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <div
                      className={cn("h-full rounded-full", score.color)}
                      style={{ width: `${score.score}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* BENTO ITEM 5: Visual Centerpiece Summary Card */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="bg-[#0f0f15]/90 rounded-3xl p-6 border border-white/10 shadow-xl backdrop-blur-md flex flex-col justify-between hover:border-white/20 transition-all duration-300"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-pink-500/10 text-pink-400 border border-pink-500/30 flex items-center justify-center mb-4">
                <Award className="w-5 h-5 stroke-[2.2]" />
              </div>

              <span className="text-[10px] font-mono font-bold text-pink-300 uppercase tracking-wider block mb-1">
                PLATFORM PROMISE
              </span>
              <h3 className="text-xl font-bold text-white tracking-tight mb-2">
                Ready Before Day One
              </h3>
              <p className="text-xs text-white/70 leading-relaxed font-normal mb-5">
                Practice complex workplace scenarios without risk. Build
                confidence, refine tone, and master soft skills through
                continuous doing.
              </p>
            </div>

            <div className="flex items-center justify-between p-4 rounded-2xl bg-black/80 border border-white/10">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-bold text-white">
                  Job-Ready Competency
                </span>
              </div>
              <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
                VERIFIED
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
