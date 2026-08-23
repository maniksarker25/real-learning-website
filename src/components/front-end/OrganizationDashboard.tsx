"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Users,
  Zap,
  CheckCircle2,
  Headphones,
  Stethoscope,
  Laptop,
  Server,
  ArrowUpRight,
  BarChart2,
  Download,
  Search,
  Bell,
  LayoutDashboard,
  Award,
  Settings,
  Lock,
  UserCheck,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface OrganizationDashboardProps {
  isInteractive?: boolean;
  orgName?: string;
  seats?: string;
}

export default function OrganizationDashboard({
  isInteractive = false,
  orgName,
  seats,
}: OrganizationDashboardProps = {}) {
  const [selectedTimeframe] = useState<"month" | "quarter" | "year">("month");
  const [activeNav, setActiveNav] = useState("overview");

  // 3 Primary KPI Stat Cards (Compact non-selectable preview format)
  const metrics = [
    {
      id: "total-participants",
      label: "Total Participants",
      value: "1,248",
      change: "+14.2%",
      icon: Users,
      accent: {
        text: "text-orange-400",
        bg: "bg-orange-500/10",
        border: "border-orange-400/30",
      },
    },
    {
      id: "active-participants",
      label: "Active Participants",
      value: "894",
      change: "71.6% active",
      icon: Zap,
      accent: {
        text: "text-emerald-400",
        bg: "bg-emerald-500/10",
        border: "border-emerald-500/30",
      },
    },
    {
      id: "simulation-completion",
      label: "Simulation Completion",
      value: "88.5%",
      change: "+342 this week",
      icon: CheckCircle2,
      accent: {
        text: "text-rose-400",
        bg: "bg-rose-500/10",
        border: "border-rose-400/30",
      },
    },
  ];

  // Bar chart - 4 exact career participation tracks requested by user
  const careerTracks = [
    {
      id: "customer-service",
      name: "Customer Service",
      count: 380,
      percentage: 38,
      icon: Headphones,
      color: "bg-gradient-to-r from-orange-500 to-amber-400",
      textColor: "text-orange-400",
      borderColor: "border-orange-400/30",
      bgLight: "bg-orange-500/10",
    },
    {
      id: "tech-support",
      name: "Tech Support",
      count: 290,
      percentage: 29,
      icon: Laptop,
      color: "bg-gradient-to-r from-emerald-500 to-teal-400",
      textColor: "text-emerald-400",
      borderColor: "border-emerald-500/30",
      bgLight: "bg-emerald-500/10",
    },
    {
      id: "it-specialist",
      name: "IT Specialist",
      count: 210,
      percentage: 21,
      icon: Server,
      color: "bg-gradient-to-r from-rose-500 to-pink-500",
      textColor: "text-rose-400",
      borderColor: "border-rose-400/30",
      bgLight: "bg-rose-500/10",
    },
    {
      id: "healthcare-support",
      name: "Healthcare Support",
      count: 160,
      percentage: 16,
      icon: Stethoscope,
      color: "bg-gradient-to-r from-purple-500 to-violet-400",
      textColor: "text-purple-400",
      borderColor: "border-purple-400/30",
      bgLight: "bg-purple-500/10",
    },
  ];

  // Table with 5 participant items showing participant progress (Non-selectable)
  const participantsProgress = [
    {
      id: 1,
      name: "Sarah Jenkins",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80",
      track: "Customer Service",
      trackColor: "bg-orange-500/10 text-orange-300 border-orange-400/30",
      progress: 94,
      score: "96%",
    },
    {
      id: 2,
      name: "David Chen",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
      track: "Tech Support",
      trackColor: "bg-emerald-500/10 text-emerald-300 border-emerald-500/30",
      progress: 78,
      score: "88%",
    },
    {
      id: 3,
      name: "Elena Rostova",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
      track: "IT Specialist",
      trackColor: "bg-rose-500/10 text-rose-300 border-rose-400/30",
      progress: 64,
      score: "85%",
    },
    {
      id: 4,
      name: "Marcus Vance",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80",
      track: "Healthcare Support",
      trackColor: "bg-purple-500/10 text-purple-300 border-purple-400/30",
      progress: 45,
      score: "79%",
    },
    {
      id: 5,
      name: "Aisha Khan",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80",
      track: "Customer Service",
      trackColor: "bg-orange-500/10 text-orange-300 border-orange-400/30",
      progress: 98,
      score: "94%",
    },
  ];

  return (
    <section className="relative w-full py-10 sm:py-14 bg-black text-slate-100 font-sans border-y border-white/10 overflow-hidden select-none">
      {/* Background Dot Matrix */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute inset-0 opacity-25"
          style={{
            backgroundImage:
              "radial-gradient(rgba(167,139,250,0.5) 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          }}
        />
        <div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] opacity-20 blur-3xl pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(249, 115, 22, 0.2) 0%, rgba(244, 63, 94, 0.1) 50%, transparent 70%)",
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header (Centered & Harmonized with other landing page sections) */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-400/30 backdrop-blur text-xs text-orange-300 font-medium mb-4"
          >
            <Zap className="h-3.5 w-3.5 text-orange-400" />
            <span>FOR SCHOOLS & ORGANIZATIONS</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight uppercase"
          >
            ORGANIZATION{" "}
            <span className="bg-gradient-to-r from-orange-400 via-rose-400 to-pink-400 bg-clip-text text-transparent font-accent">
              DASHBOARD
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="mt-4 text-base sm:text-lg text-white/70 font-normal leading-relaxed max-w-2xl mx-auto"
          >
            Monitor participant engagement, active learning metrics, and career track participation in real time.
          </motion.p>
        </div>

        {/* ---------------------------------------------------- */}
        {/* NON-CLICKABLE, NON-SELECTABLE macOS WINDOW MOCKUP    */}
        {/* ---------------------------------------------------- */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className={cn(
            "bg-[#0b0c10] rounded-xl sm:rounded-2xl border border-white/15 shadow-2xl overflow-hidden backdrop-blur-xl ring-1 ring-white/10",
            !isInteractive && "select-none pointer-events-none"
          )}
        >
          {/* macOS Top Bar */}
          <div className="flex items-center justify-between px-3 py-2 bg-[#13141c]/90 border-b border-white/10 text-[11px]">
            {/* Traffic Lights */}
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56] border border-[#E0443E]/60" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E] border border-[#DEA123]/60" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F] border border-[#1AAB29]/60" />
            </div>

            {/* Fake Address Bar */}
            <div className="flex items-center gap-1.5 px-3 py-0.5 rounded-md bg-black/60 border border-white/10 text-white/60 font-mono text-[10px] max-w-xs w-full justify-center truncate">
              <Lock className="w-2.5 h-2.5 text-emerald-400 shrink-0" />
              <span className="truncate">admin.reallearning.ai/dashboard</span>
            </div>

            {/* Live Sync Badge */}
            <div className="flex items-center gap-1.5 text-white/50 text-[10px]">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
              </span>
              <span className="hidden sm:inline font-mono">Live Sync</span>
            </div>
          </div>

          {/* INNER LAYOUT: HEADER + SIDEBAR + COMPACT MAIN CONTENT */}
          <div className="flex flex-col md:flex-row min-h-[480px]">
            {/* INNER SIDEBAR */}
            <aside className="w-full md:w-44 bg-[#0d0e14]/90 border-b md:border-b-0 md:border-r border-white/10 p-2.5 flex flex-row md:flex-col justify-between shrink-0 gap-1.5">
              <div className="w-full">
                {/* Workspace Title */}
                <div className="flex items-center gap-2 px-2 py-1.5 mb-2 border-b border-white/10">
                  <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-orange-500 to-rose-500 flex items-center justify-center text-white font-black text-[10px]">
                    RL
                  </div>
                  <div className="truncate">
                    <div className="text-[11px] font-bold text-white leading-none">
                      {orgName || "Acme Corp"}
                    </div>
                    <div className="text-[9px] text-white/40 leading-tight">
                      Enterprise Ops
                    </div>
                  </div>
                </div>

                {/* Nav Items */}
                <div className="flex flex-row md:flex-col gap-0.5 w-full overflow-x-auto">
                  {[
                    { id: "overview", label: "Overview", icon: LayoutDashboard },
                    { id: "participants", label: "Participants", icon: Users, count: "1.2k" },
                    { id: "careers", label: "Tracks", icon: Award, count: "4" },
                    { id: "analytics", label: "Analytics", icon: BarChart2 },
                    { id: "settings", label: "Settings", icon: Settings },
                  ].map((item) => {
                    const Icon = item.icon;
                    const isActive = activeNav === item.id;
                    return (
                      <button
                        type="button"
                        key={item.id}
                        onClick={() => isInteractive && setActiveNav(item.id)}
                        className={cn(
                          "flex items-center justify-between px-2.5 py-1.5 rounded-lg text-[11px] font-medium shrink-0 whitespace-nowrap text-left transition-colors",
                          isInteractive ? "cursor-pointer" : "cursor-default",
                          isActive
                            ? "bg-gradient-to-r from-orange-500/20 to-rose-500/20 text-orange-300 border border-orange-500/30"
                            : "text-white/60 hover:text-white hover:bg-white/5"
                        )}
                      >
                        <div className="flex items-center gap-2">
                          <Icon className={cn("w-3.5 h-3.5", isActive ? "text-orange-400" : "text-white/50")} />
                          <span>{item.label}</span>
                        </div>
                        {item.count && (
                          <span
                            className={cn(
                              "text-[9px] font-mono px-1.5 py-0.2 rounded-full hidden md:inline-block",
                              isActive ? "bg-orange-500/30 text-orange-200" : "bg-white/5 text-white/40"
                            )}
                          >
                            {item.count}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Sidebar Quota Badge */}
              <div className="hidden md:block bg-black/60 rounded-lg p-2 border border-white/10 mt-auto text-[10px]">
                <div className="flex items-center justify-between text-white/60 mb-1">
                  <span>Seats</span>
                  <span className="text-orange-400 font-mono font-bold">
                    1,248 / {seats ? `${seats}` : "1.5k"}
                  </span>
                </div>
                <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-orange-500 to-rose-500 rounded-full w-[83%]" />
                </div>
              </div>
            </aside>

            {/* MAIN CONTENT AREA */}
            <main className="flex-1 p-3.5 sm:p-5 space-y-4 bg-[#0b0c10]/95 overflow-y-auto">
              {/* INNER TOP HEADER */}
              <div className="flex items-center justify-between gap-3 pb-3 border-b border-white/10">
                <div className="relative max-w-xs w-full">
                  <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3 h-3 text-white/40" />
                  <input
                    type="text"
                    placeholder="Quick search..."
                    readOnly
                    tabIndex={-1}
                    className="w-full bg-black/50 border border-white/10 rounded-lg pl-7 pr-3 py-1 text-[11px] text-white placeholder-white/40 pointer-events-none select-none"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-white/5 text-white/70 border border-white/10">
                    <Bell className="w-3.5 h-3.5" />
                  </div>
                  <div className="flex items-center gap-2 pl-2 border-l border-white/10">
                    <img
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                      alt="User"
                      className="w-6 h-6 rounded-full object-cover border border-white/20"
                    />
                  </div>
                </div>
              </div>

              {/* 1. THREE STAT CARDS */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {metrics.map((m, idx) => {
                  const Icon = m.icon;
                  return (
                    <motion.div
                      key={m.id}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: idx * 0.05 }}
                      className="bg-[#12131c]/90 rounded-xl p-3 border border-white/10 shadow-md relative overflow-hidden"
                    >
                      <div className="flex items-center justify-between gap-2 mb-1.5">
                        <span className="text-[10px] font-semibold text-white/60 uppercase tracking-wider">
                          {m.label}
                        </span>
                        <div
                          className={cn(
                            "w-7 h-7 rounded-lg flex items-center justify-center border",
                            m.accent.bg,
                            m.accent.text,
                            m.accent.border
                          )}
                        >
                          <Icon className="w-3.5 h-3.5" />
                        </div>
                      </div>

                      <div className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                        {m.value}
                      </div>

                      <div className="mt-1 flex items-center gap-1 text-[10px] text-white/60">
                        <ArrowUpRight className="w-3 h-3 text-emerald-400 shrink-0" />
                        <span className="text-white/80 font-medium">{m.change}</span>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* 2-COLUMN PREVIEW GRID */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                {/* LEFT: CAREER PARTICIPATION BAR CHART */}
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.15 }}
                  className="lg:col-span-5 bg-[#12131c]/90 rounded-xl p-4 border border-white/10 shadow-lg space-y-3"
                >
                  <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
                    <div className="flex items-center gap-1.5">
                      <BarChart2 className="w-3.5 h-3.5 text-orange-400" />
                      <h3 className="text-xs font-bold text-white">
                        Career Track Participation
                      </h3>
                    </div>
                    <span className="text-[9px] font-mono font-medium text-orange-300 bg-orange-500/10 px-2 py-0.5 rounded-md border border-orange-400/20">
                      4 Tracks
                    </span>
                  </div>

                  <div className="space-y-2.5">
                    {careerTracks.map((track, idx) => {
                      const Icon = track.icon;
                      return (
                        <div
                          key={track.id}
                          className="bg-black/50 p-2.5 rounded-lg border border-white/10"
                        >
                          <div className="flex items-center justify-between gap-2 mb-1.5">
                            <div className="flex items-center gap-2 min-w-0">
                              <div
                                className={cn(
                                  "w-6 h-6 rounded-md flex items-center justify-center shrink-0 border",
                                  track.bgLight,
                                  track.textColor,
                                  track.borderColor
                                )}
                              >
                                <Icon className="w-3 h-3" />
                              </div>
                              <span className="text-[11px] font-bold text-white truncate">
                                {track.name}
                              </span>
                            </div>

                            <div className="text-right shrink-0">
                              <span className="text-xs font-extrabold text-white">
                                {track.count}
                              </span>
                              <span className="ml-1.5 text-[10px] font-mono text-orange-400">
                                {track.percentage}%
                              </span>
                            </div>
                          </div>

                          <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden border border-white/10">
                            <motion.div
                              initial={{ width: 0 }}
                              whileInView={{ width: `${track.percentage}%` }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.8, delay: idx * 0.1 }}
                              className={cn("h-full rounded-full", track.color)}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>

                {/* RIGHT: PARTICIPANT PROGRESS TABLE */}
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                  className="lg:col-span-7 bg-[#12131c]/90 rounded-xl p-4 border border-white/10 shadow-lg space-y-3"
                >
                  <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
                    <div className="flex items-center gap-1.5">
                      <UserCheck className="w-3.5 h-3.5 text-emerald-400" />
                      <h3 className="text-xs font-bold text-white">
                        Participant Progress
                      </h3>
                    </div>
                    <span className="text-[9px] font-mono text-white/50">
                      5 Active Learners
                    </span>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-[11px] border-collapse">
                      <thead>
                        <tr className="border-b border-white/10 text-white/40 font-mono text-[9px] uppercase">
                          <th className="py-1.5 px-2 font-semibold">Participant</th>
                          <th className="py-1.5 px-2 font-semibold">Track</th>
                          <th className="py-1.5 px-2 font-semibold">Progress</th>
                          <th className="py-1.5 px-2 font-semibold text-right">Score</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                        {participantsProgress.map((p) => (
                          <tr key={p.id}>
                            {/* Participant Name & Avatar */}
                            <td className="py-2 px-2 whitespace-nowrap">
                              <div className="flex items-center gap-2">
                                <img
                                  src={p.avatar}
                                  alt={p.name}
                                  className="w-5 h-5 rounded-full object-cover border border-white/20 shrink-0"
                                />
                                <span className="font-bold text-white text-[11px]">
                                  {p.name}
                                </span>
                              </div>
                            </td>

                            {/* Track Tag */}
                            <td className="py-2 px-2 whitespace-nowrap">
                              <span
                                className={cn(
                                  "inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-medium border",
                                  p.trackColor
                                )}
                              >
                                {p.track}
                              </span>
                            </td>

                            {/* Progress */}
                            <td className="py-2 px-2 w-28">
                              <div className="flex items-center gap-2">
                                <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                                  <div
                                    className="h-full bg-gradient-to-r from-orange-500 to-amber-400 rounded-full"
                                    style={{ width: `${p.progress}%` }}
                                  />
                                </div>
                                <span className="font-mono text-[10px] text-white/80 font-bold">
                                  {p.progress}%
                                </span>
                              </div>
                            </td>

                            {/* Score */}
                            <td className="py-2 px-2 text-right whitespace-nowrap">
                              <span className="font-mono font-bold text-[10px] text-white bg-white/5 px-1.5 py-0.5 rounded border border-white/10">
                                {p.score}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </motion.div>
              </div>
            </main>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
