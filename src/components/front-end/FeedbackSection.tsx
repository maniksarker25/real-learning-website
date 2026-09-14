"use client";

import React from "react";
import { motion } from "framer-motion";
import { Zap, BarChart3, CheckCircle2, Award, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export default function FeedbackSection() {
  const scores = [
    {
      label: "Communication",
      score: 92,
      description:
        "Clarity of message, active listening, and structured response.",
      color: "bg-orange-400",
      textColor: "text-orange-300",
      borderColor: "border-orange-400/30",
    },
    {
      label: "Empathy",
      score: 88,
      description:
        "Validation of stakeholder concerns and emotional awareness.",
      color: "bg-rose-400",
      textColor: "text-rose-300",
      borderColor: "border-rose-400/30",
    },
    {
      label: "Problem Solving",
      score: 84,
      description: "Root cause identification and actionable resolution steps.",
      color: "bg-pink-400",
      textColor: "text-pink-300",
      borderColor: "border-pink-400/30",
    },
    {
      label: "Professionalism",
      score: 95,
      description: "Tone composure under stress and brand standard alignment.",
      color: "bg-emerald-400",
      textColor: "text-emerald-300",
      borderColor: "border-emerald-400/30",
    },
  ];

  return (
    <section
      id="feedback-section"
      className="relative w-full py-16 sm:py-20 bg-black text-slate-100 font-sans border-y border-white/10 overflow-hidden"
    >
      {/* Background Grid */}

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
            <span>ACTIONABLE INSIGHTS</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight"
          >
            Get Feedback That{" "}
            <span className="bg-gradient-to-r from-orange-400 via-rose-400 to-pink-400 bg-clip-text text-transparent font-accent">
              Helps You Grow
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="mt-4 text-base sm:text-lg text-white/70 font-normal leading-relaxed max-w-2xl mx-auto"
          >
            Receive instant multi-dimensional evaluation on every conversation
            so you understand your exact strengths.
          </motion.p>
        </div>

        {/* 4 Score Breakdown Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {scores.map((item, idx) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="bg-[#0f0f15]/90 rounded-3xl p-6 border border-white/10 shadow-xl backdrop-blur-md flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-3 mb-4">
                  <span className="text-xs font-mono font-bold text-white/50">
                    METRIC 0{idx + 1}
                  </span>
                  <span
                    className={cn(
                      "text-2xl font-extrabold font-mono",
                      item.textColor,
                    )}
                  >
                    {item.score}%
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white tracking-tight mb-2">
                  {item.label}
                </h3>

                <p className="text-xs text-white/70 leading-relaxed mb-6">
                  {item.description}
                </p>
              </div>

              {/* Progress Bar Meter */}
              <div className="space-y-2">
                <div className="h-2 bg-white/5 rounded-full overflow-hidden border border-white/10">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${item.score}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: idx * 0.15 }}
                    className={cn("h-full rounded-full", item.color)}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
