"use client";

import React from "react";
import { motion } from "framer-motion";
import { Zap, TrendingUp, CheckCircle2, PlayCircle, Award } from "lucide-react";
import { cn } from "@/lib/utils";

export default function TrackProgress() {
  const stats = [
    {
      label: "Career Progress",
      value: "68%",
      subtext: "Senior Track Readiness",
      icon: TrendingUp,
      accent: {
        text: "text-orange-400",
        bg: "bg-orange-500/10",
        border: "border-orange-400/30",
        bar: "bg-orange-400",
        pct: 68,
      },
    },
    {
      label: "Modules Completed",
      value: "3 / 5",
      subtext: "Core Simulation Modules",
      icon: CheckCircle2,
      accent: {
        text: "text-emerald-400",
        bg: "bg-emerald-500/10",
        border: "border-emerald-500/30",
        bar: "bg-emerald-400",
        pct: 60,
      },
    },
    {
      label: "Simulations",
      value: "12",
      subtext: "Interactive Scenarios Completed",
      icon: PlayCircle,
      accent: {
        text: "text-rose-400",
        bg: "bg-rose-500/10",
        border: "border-rose-400/30",
        bar: "bg-rose-400",
        pct: 80,
      },
    },
    {
      label: "Average Score",
      value: "89%",
      subtext: "+5.4% growth this month",
      icon: Award,
      accent: {
        text: "text-pink-400",
        bg: "bg-pink-500/10",
        border: "border-pink-400/30",
        bar: "bg-pink-400",
        pct: 89,
      },
    },
  ];

  return (
    <section
      id="track-progress"
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
            <span>PERSONAL DASHBOARD</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight"
          >
            Track Your{" "}
            <span className="bg-gradient-to-r from-orange-400 via-rose-400 to-pink-400 bg-clip-text text-transparent font-accent">
              Progress
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="mt-4 text-base sm:text-lg text-white/70 font-normal leading-relaxed max-w-2xl mx-auto"
          >
            Monitor your skill growth, module completions, and overall career
            readiness.
          </motion.p>
        </div>

        {/* 4 Progress Metrics Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;

            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="bg-[#0f0f15]/90 rounded-3xl p-6 border border-white/10 shadow-xl backdrop-blur-md flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <span className="text-xs font-medium text-white/70">
                      {stat.label}
                    </span>
                    <div
                      className={cn(
                        "w-9 h-9 rounded-xl flex items-center justify-center border",
                        stat.accent.bg,
                        stat.accent.text,
                        stat.accent.border,
                      )}
                    >
                      <Icon className="w-4.5 h-4.5 stroke-[2.2]" />
                    </div>
                  </div>

                  <div className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-2">
                    {stat.value}
                  </div>

                  <p className="text-xs text-white/60 font-medium">
                    {stat.subtext}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/10">
                  <div className="h-1.5 bg-white/5 rounded-full overflow-hidden border border-white/10">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${stat.accent.pct}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: idx * 0.15 }}
                      className={cn("h-full rounded-full", stat.accent.bar)}
                    />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
