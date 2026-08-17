"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Users,
  Zap,
  CheckCircle2,
  TrendingUp,
  Headphones,
  Stethoscope,
  Target,
  UtensilsCrossed,
  ArrowUpRight,
  ChevronRight,
  BarChart2,
  ShieldCheck,
  Download,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function OrganizationDashboard() {
  const [selectedTimeframe, setSelectedTimeframe] = useState<
    "month" | "quarter" | "year"
  >("month");

  const metrics = [
    {
      id: "participants",
      label: "Participants",
      value: "248",
      change: "+12.4% this month",
      icon: Users,
      accent: {
        text: "text-orange-400",
        bg: "bg-orange-500/10",
        border: "border-orange-400/30",
      },
    },
    {
      id: "active-learners",
      label: "Active Learners",
      value: "184",
      change: "74.2% engagement rate",
      icon: Zap,
      accent: {
        text: "text-emerald-400",
        bg: "bg-emerald-500/10",
        border: "border-emerald-500/30",
      },
    },
    {
      id: "simulations-completed",
      label: "Simulations Completed",
      value: "1,426",
      change: "+342 completed this week",
      icon: CheckCircle2,
      accent: {
        text: "text-rose-400",
        bg: "bg-rose-500/10",
        border: "border-rose-400/30",
      },
    },
    {
      id: "average-performance",
      label: "Average Performance",
      value: "86%",
      change: "+4.8% skill mastery",
      icon: TrendingUp,
      accent: {
        text: "text-pink-400",
        bg: "bg-pink-500/10",
        border: "border-pink-400/30",
      },
    },
  ];

  const careerTracks = [
    {
      id: "customer-service",
      name: "Customer Service",
      count: 82,
      percentage: 33.1,
      icon: Headphones,
      color: "bg-orange-400",
      textColor: "text-orange-300",
      borderColor: "border-orange-400/30",
      bgLight: "bg-orange-500/10",
      scenariosCount: "32 Scenarios",
      avgScore: "88%",
    },
    {
      id: "healthcare",
      name: "Healthcare",
      count: 64,
      percentage: 25.8,
      icon: Stethoscope,
      color: "bg-emerald-400",
      textColor: "text-emerald-400",
      borderColor: "border-emerald-500/30",
      bgLight: "bg-emerald-500/10",
      scenariosCount: "28 Scenarios",
      avgScore: "85%",
    },
    {
      id: "sales",
      name: "Sales",
      count: 51,
      percentage: 20.6,
      icon: Target,
      color: "bg-rose-400",
      textColor: "text-rose-300",
      borderColor: "border-rose-400/30",
      bgLight: "bg-rose-500/10",
      scenariosCount: "24 Scenarios",
      avgScore: "84%",
    },
    {
      id: "hospitality",
      name: "Hospitality",
      count: 43,
      percentage: 17.3,
      icon: UtensilsCrossed,
      color: "bg-pink-400",
      textColor: "text-pink-300",
      borderColor: "border-pink-400/30",
      bgLight: "bg-pink-500/10",
      scenariosCount: "18 Scenarios",
      avgScore: "87%",
    },
  ];

  const totalParticipants = 248;

  return (
    <section className="relative w-full py-16 sm:py-20 bg-black text-slate-100 font-sans border-y border-white/10 overflow-hidden">
      {/* Background Grid (Identical to page.tsx) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
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
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header (Harmonized with page.tsx theme) */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16 border-b border-white/10 pb-8">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-400/30 backdrop-blur text-xs text-orange-300 font-medium mb-4"
            >
              <Zap className="h-3.5 w-3.5 text-orange-400" />
              <span>LIVE ORGANIZATIONAL ANALYTICS</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.08 }}
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight"
            >
              Organization{" "}
              <span className="bg-gradient-to-r from-orange-400 via-rose-400 to-pink-400 bg-clip-text text-transparent font-accent">
                Dashboard
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="mt-4 text-base sm:text-lg text-white/70 font-normal leading-relaxed"
            >
              Monitor participant engagement, active learning metrics, and career track participation in real time.
            </motion.p>
          </div>

          {/* Timeframe Controls & Actions */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-3 shrink-0"
          >
            <div className="flex items-center gap-1 bg-[#0f0f15]/90 p-1 rounded-xl border border-white/10 backdrop-blur-md">
              <button
                onClick={() => setSelectedTimeframe("month")}
                className={cn(
                  "px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer",
                  selectedTimeframe === "month"
                    ? "bg-gradient-to-r from-orange-500 to-rose-500 text-white shadow-xs"
                    : "text-white/60 hover:text-white"
                )}
              >
                This Month
              </button>
              <button
                onClick={() => setSelectedTimeframe("quarter")}
                className={cn(
                  "px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer",
                  selectedTimeframe === "quarter"
                    ? "bg-gradient-to-r from-orange-500 to-rose-500 text-white shadow-xs"
                    : "text-white/60 hover:text-white"
                )}
              >
                Quarter
              </button>
              <button
                onClick={() => setSelectedTimeframe("year")}
                className={cn(
                  "px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer",
                  selectedTimeframe === "year"
                    ? "bg-gradient-to-r from-orange-500 to-rose-500 text-white shadow-xs"
                    : "text-white/60 hover:text-white"
                )}
              >
                Year
              </button>
            </div>

            <button className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/5 border border-white/20 hover:bg-white/10 text-white text-xs font-semibold transition-colors cursor-pointer shadow-xs">
              <Download className="w-3.5 h-3.5" />
              Export Report
            </button>
          </motion.div>
        </div>

        {/* 4 Key Metrics Overview Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12 sm:mb-16">
          {metrics.map((m, idx) => {
            const Icon = m.icon;

            return (
              <motion.div
                key={m.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="group relative bg-[#0f0f15]/90 rounded-2xl p-5 border border-white/10 hover:border-white/20 shadow-xl backdrop-blur-md transition-all duration-300"
              >
                <div className="flex items-center justify-between gap-3 mb-4">
                  <span className="text-xs font-medium text-white/70">
                    {m.label}
                  </span>
                  <div
                    className={cn(
                      "w-9 h-9 rounded-xl flex items-center justify-center border transition-transform group-hover:scale-105",
                      m.accent.bg,
                      m.accent.text,
                      m.accent.border
                    )}
                  >
                    <Icon className="w-4.5 h-4.5 stroke-[2.2]" />
                  </div>
                </div>

                <div className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                  {m.value}
                </div>

                <div className="mt-2.5 flex items-center gap-1.5 text-xs text-white/60">
                  <ArrowUpRight className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span className="text-white/80 font-medium">{m.change}</span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Career Participation Main Breakdown Container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-[#0f0f15]/90 rounded-3xl p-6 sm:p-8 border border-white/10 shadow-2xl backdrop-blur-md"
        >
          {/* macOS Window Controls Header */}
          <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/10">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#FF5F56] border border-[#E0443E]/50" />
              <div className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-[#DEA123]/50" />
              <div className="w-3 h-3 rounded-full bg-[#27C93F] border border-[#1AAB29]/50" />
            </div>
            <span className="text-xs font-mono text-white/50">
              macOS Analytics Workspace
            </span>
          </div>

          {/* Card Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 border-b border-white/10 pb-6">
            <div>
              <div className="flex items-center gap-2">
                <BarChart2 className="w-4 h-4 text-orange-400" />
                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  Career Participation
                </h3>
              </div>
              <p className="mt-1.5 text-xs sm:text-sm text-white/70">
                Distribution of learners across specialized career simulation tracks ({totalParticipants} total active participants).
              </p>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs font-mono font-medium text-orange-300 bg-orange-500/10 px-3 py-1.5 rounded-xl border border-orange-400/30">
                4 Active Tracks
              </span>
            </div>
          </div>

          {/* Grid Layout: Left Progress Bars Breakdown (2 cols), Right Highlights Panel (1 col) */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {/* Left 2 Columns: Career Participation Bars */}
            <div className="lg:col-span-2 space-y-5">
              {careerTracks.map((track, idx) => {
                const Icon = track.icon;

                return (
                  <motion.div
                    key={track.id}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.08 }}
                    className="group bg-black/80 p-4 sm:p-5 rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-200"
                  >
                    {/* Header Row */}
                    <div className="flex items-center justify-between gap-4 mb-3">
                      <div className="flex items-center gap-3 min-w-0">
                        <div
                          className={cn(
                            "w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border",
                            track.bgLight,
                            track.textColor,
                            track.borderColor
                          )}
                        >
                          <Icon className="w-4.5 h-4.5 stroke-[2.2]" />
                        </div>

                        <div className="min-w-0">
                          <h4 className="text-sm sm:text-base font-bold text-white truncate group-hover:text-orange-300 transition-colors">
                            {track.name}
                          </h4>
                          <span className="text-[11px] text-white/60 font-normal">
                            {track.scenariosCount} • Avg Score:{" "}
                            <strong className="text-white">{track.avgScore}</strong>
                          </span>
                        </div>
                      </div>

                      {/* Participant Count & Percentage Badge */}
                      <div className="text-right shrink-0">
                        <div className="text-base sm:text-lg font-extrabold text-white">
                          {track.count}{" "}
                          <span className="text-xs text-white/50 font-normal">
                            learners
                          </span>
                        </div>
                        <span className="text-[11px] font-mono font-semibold text-white/60">
                          {track.percentage}% of total
                        </span>
                      </div>
                    </div>

                    {/* Progress Bar Container */}
                    <div className="w-full h-2.5 bg-white/5 rounded-full overflow-hidden border border-white/10 p-0.5">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${track.percentage}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: idx * 0.15, ease: "easeOut" }}
                        className={cn("h-full rounded-full shadow-xs", track.color)}
                      />
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Right Column: Organization Impact Highlights Panel */}
            <div className="bg-black/80 p-6 rounded-2xl border border-white/10 space-y-5">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-orange-400 uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4 text-orange-400" />
                <span>Impact Summary</span>
              </div>

              <div className="space-y-4 text-xs text-white/80">
                <div className="bg-[#0f0f15] p-3.5 rounded-xl border border-white/10">
                  <div className="text-white/50 text-[10px] font-mono uppercase mb-1">
                    Top Demand Track
                  </div>
                  <div className="font-bold text-white text-sm">
                    Customer Service (82 Learners)
                  </div>
                  <div className="text-white/60 text-[11px] mt-1">
                    Highest completion velocity with 88% avg performance score.
                  </div>
                </div>

                <div className="bg-[#0f0f15] p-3.5 rounded-xl border border-white/10">
                  <div className="text-white/50 text-[10px] font-mono uppercase mb-1">
                    Active Engagement Rate
                  </div>
                  <div className="font-bold text-emerald-400 text-sm flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5" />
                    74.2% (184 / 248 Active)
                  </div>
                  <div className="text-white/60 text-[11px] mt-1">
                    Outperforms industry benchmarks by 28%.
                  </div>
                </div>

                <div className="bg-[#0f0f15] p-3.5 rounded-xl border border-white/10">
                  <div className="text-white/50 text-[10px] font-mono uppercase mb-1">
                    Verified Skill Certificates
                  </div>
                  <div className="font-bold text-white text-sm">
                    612 Awarded
                  </div>
                </div>
              </div>

              <button className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white text-black hover:bg-white/90 text-xs font-bold transition-all cursor-pointer shadow-md group">
                <span>View Full Analytics Report</span>
                <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
