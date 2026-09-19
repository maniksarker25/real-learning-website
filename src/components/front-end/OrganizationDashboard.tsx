"use client";

import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Search, Lock, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { RowActionMenu } from "@/components/ui/RowActionMenu";

interface OrganizationDashboardProps {
  isInteractive?: boolean;
  orgName?: string;
  seats?: string;
}

interface Participant {
  id: number;
  name: string;
  role: string;
  email: string;
  avatar: string;
  track: string;
  status: "Certified" | "In Progress" | "Completed" | "Active";
  progress: number;
  score: string;
}

interface CareerTrack {
  id: string;
  name: string;
  count: number;
  percentage: number;
}

interface Metric {
  id: string;
  label: string;
  value: string;
  change: string;
}

const METRICS: Metric[] = [
  {
    id: "total-participants",
    label: "Total Participants",
    value: "1,248",
    change: "+14.2%",
  },
  {
    id: "total-simulations-completed",
    label: "Total Simulations Completed",
    value: "3,842",
    change: "+342 this week",
  },
  {
    id: "simulation-completion",
    label: "Simulation Completion Rate",
    value: "88.5%",
    change: "+5.2% mastery",
  },
];

const CAREER_TRACKS: CareerTrack[] = [
  {
    id: "customer-service",
    name: "Customer Service",
    count: 380,
    percentage: 38,
  },
  {
    id: "tech-support",
    name: "Tech Support",
    count: 290,
    percentage: 29,
  },
  {
    id: "it-specialist",
    name: "IT Specialist",
    count: 210,
    percentage: 21,
  },
  {
    id: "healthcare-support",
    name: "Healthcare Support",
    count: 160,
    percentage: 16,
  },
];

const PARTICIPANTS: Participant[] = [
  {
    id: 1,
    name: "Sarah Jenkins",
    role: "Senior Agent",
    email: "s.jenkins@acme.com",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80",
    track: "Customer Service",
    status: "Completed",
    progress: 94,
    score: "96%",
  },
  {
    id: 2,
    name: "David Chen",
    role: "Tier 2 Support",
    email: "d.chen@acme.com",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
    track: "Tech Support",
    status: "In Progress",
    progress: 78,
    score: "88%",
  },
  {
    id: 3,
    name: "Elena Rostova",
    role: "Systems Analyst",
    email: "e.rostova@acme.com",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
    track: "IT Specialist",
    status: "In Progress",
    progress: 64,
    score: "85%",
  },
  {
    id: 4,
    name: "Marcus Vance",
    role: "Clinical Care",
    email: "m.vance@acme.com",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80",
    track: "Healthcare Support",
    status: "Active",
    progress: 45,
    score: "79%",
  },
  {
    id: 5,
    name: "Aisha Khan",
    role: "Lead Specialist",
    email: "a.khan@acme.com",
    avatar:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80",
    track: "Customer Service",
    status: "Certified",
    progress: 98,
    score: "94%",
  },
];

const TRACK_FILTER_OPTIONS = [
  { id: "all", label: "All Tracks" },
  { id: "Customer Service", label: "Customer Service" },
  { id: "Tech Support", label: "Tech Support" },
  { id: "IT Specialist", label: "IT Specialist" },
  { id: "Healthcare Support", label: "Healthcare" },
] as const;

export default function OrganizationDashboard({
  isInteractive = false,
  orgName,
  seats,
}: OrganizationDashboardProps = {}) {
  const [activeNav, setActiveNav] = useState("overview");
  const [selectedTrack, setSelectedTrack] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Live filter participants
  const filteredParticipants = useMemo(() => {
    return PARTICIPANTS.filter((p) => {
      const matchesTrack = selectedTrack === "all" || p.track === selectedTrack;
      const matchesSearch =
        !searchQuery.trim() ||
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.track.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesTrack && matchesSearch;
    });
  }, [selectedTrack, searchQuery]);

  return (
    <section className="relative w-full py-10 sm:py-14 bg-black text-slate-100 font-sans border-y border-white/10 overflow-hidden select-none">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center px-3.5 py-1 rounded-full bg-orange-500/10 border border-orange-400/30 text-xs text-orange-400 font-medium mb-3.5"
          >
            <span>FOR SCHOOLS & ORGANIZATIONS</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight uppercase"
          >
            ORGANIZATION <span className="text-orange-400">DASHBOARD</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="mt-3 text-sm sm:text-base text-white/60 font-normal leading-relaxed max-w-2xl mx-auto"
          >
            Monitor participant engagement, active learning metrics, and career
            track participation in real time.
          </motion.p>
        </div>

        {/* ---------------------------------------------------- */}
        {/* macOS WINDOW CONTAINER (FLAT, NO SHADOW)             */}
        {/* ---------------------------------------------------- */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className={cn(
            "bg-[#0a0b10] rounded-xl border border-white/15 overflow-hidden",
            !isInteractive && "select-none pointer-events-none",
          )}
        >
          {/* Window Top Chrome Bar */}
          <div className="flex items-center justify-between px-3.5 py-2 bg-[#12131b] border-b border-white/10 text-xs">
            {/* Traffic Lights */}
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56] border border-[#E0443E]/60" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E] border border-[#DEA123]/60" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F] border border-[#1AAB29]/60" />
            </div>

            {/* Address Bar */}
            <div className="flex items-center gap-1.5 px-3 py-0.5 rounded bg-black/60 border border-white/10 text-white/60 font-mono text-xs max-w-xs w-full justify-center truncate">
              <Lock className="w-3 h-3 text-emerald-400 shrink-0" />
              <span className="truncate">admin.reallearning.ai/dashboard</span>
            </div>

            {/* Live Sync Badge */}
            <div className="flex items-center gap-1.5 text-white/50 text-xs">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
              </span>
              <span className="hidden sm:inline font-mono">Live</span>
            </div>
          </div>

          {/* INNER LAYOUT: SIDEBAR + MAIN WORKSPACE */}
          <div className="flex flex-col md:flex-row min-h-[500px]">
            {/* INNER SIDEBAR */}
            <aside className="w-full md:w-48 bg-[#0d0e14] border-b md:border-b-0 md:border-r border-white/10 p-3 flex flex-row md:flex-col justify-between shrink-0 gap-3">
              <div className="w-full">
                {/* Workspace Title */}
                <div className="flex items-center gap-2.5 px-2 py-2 mb-2.5 border-b border-white/10">
                  <div className="w-7 h-7 rounded bg-orange-500 flex items-center justify-center text-white font-black text-xs shrink-0">
                    RL
                  </div>
                  <div className="truncate">
                    <div className="text-sm font-bold text-white leading-tight">
                      {orgName || "Acme Corp"}
                    </div>
                    <div className="text-xs text-white/50 leading-tight mt-0.5">
                      Enterprise Ops
                    </div>
                  </div>
                </div>

                {/* Nav Items */}
                <div className="flex flex-row md:flex-col gap-1 w-full overflow-x-auto">
                  {[
                    { id: "overview", label: "Overview" },
                    {
                      id: "participants",
                      label: "Participants",
                      count: "1.2k",
                    },
                    { id: "careers", label: "Tracks", count: "4" },
                    { id: "analytics", label: "Analytics" },
                    { id: "settings", label: "Settings" },
                  ].map((item) => {
                    const isActive = activeNav === item.id;
                    return (
                      <button
                        type="button"
                        key={item.id}
                        onClick={() => isInteractive && setActiveNav(item.id)}
                        className={cn(
                          "flex items-center justify-between px-3 py-2 rounded-md text-xs font-medium shrink-0 whitespace-nowrap text-left transition-colors",
                          isInteractive ? "cursor-pointer" : "cursor-default",
                          isActive
                            ? "bg-white/10 text-white font-semibold border border-white/15"
                            : "text-white/60 hover:bg-white/5",
                        )}
                      >
                        <span>{item.label}</span>
                        {item.count && (
                          <span
                            className={cn(
                              "text-xs font-mono px-1.5 py-0.5 rounded hidden md:inline-block",
                              isActive
                                ? "bg-white/15 text-white"
                                : "bg-white/5 text-white/40",
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
              <div className="hidden md:block bg-black/60 rounded-lg p-2.5 border border-white/10 mt-auto text-xs">
                <div className="flex items-center justify-between text-white/60 mb-1.5">
                  <span>Seats</span>
                  <span className="text-orange-400 font-mono font-bold">
                    1,248 / {seats ? `${seats}` : "1.5k"}
                  </span>
                </div>
                <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-orange-500 rounded-full w-[83%]" />
                </div>
              </div>
            </aside>

            {/* MAIN WORKSPACE CONTENT */}
            <main className="flex-1 p-4 sm:p-5 space-y-4 bg-[#0a0b10] overflow-y-auto">
              {/* TOP WORKSPACE SEARCH BAR */}
              <div className="flex items-center justify-between gap-3 pb-3.5 border-b border-white/10">
                <div className="relative max-w-sm w-full">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/40" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Filter participant or track..."
                    readOnly={!isInteractive}
                    tabIndex={isInteractive ? 0 : -1}
                    className="w-full bg-black/60 border border-white/10 rounded-md pl-9 pr-3 py-1.5 text-xs text-white placeholder-white/40 focus:outline-none focus:border-white/25 transition-colors leading-normal"
                  />
                </div>

                <div className="flex items-center gap-2 pl-2">
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                    alt="User"
                    className="w-7 h-7 rounded-full object-cover border border-white/20"
                  />
                </div>
              </div>

              {/* 1. THREE STAT CARDS (FLAT, NO SHADOW) */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                {METRICS.map((m, idx) => (
                  <motion.div
                    key={m.id}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: idx * 0.05 }}
                    className="bg-[#11121a] rounded-lg p-3.5 border border-white/10 hover:bg-white/[0.02] transition-colors"
                  >
                    <div className="mb-1.5">
                      <span className="text-xs font-semibold text-white/60 uppercase tracking-wider font-mono">
                        {m.label}
                      </span>
                    </div>

                    <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                      {m.value}
                    </div>

                    <div className="mt-1.5 flex items-center gap-1.5 text-xs text-white/60">
                      <ArrowUpRight className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span className="text-white/80 font-medium">
                        {m.change}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* 2. TWO COLUMN WORKSPACE GRID */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5">
                {/* LEFT: CAREER TRACK PARTICIPATION (FLAT) */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                  className="lg:col-span-4 bg-[#11121a] rounded-lg p-3.5 border border-white/10 space-y-3"
                >
                  <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
                    <h3 className="text-sm font-bold text-white">
                      Career Track Participation
                    </h3>
                    <span className="text-xs font-mono text-orange-400 bg-orange-500/10 px-2 py-0.5 rounded border border-orange-400/20 font-medium">
                      4 Tracks
                    </span>
                  </div>

                  <div className="space-y-2">
                    {CAREER_TRACKS.map((track) => (
                      <div
                        key={track.id}
                        onClick={() =>
                          setSelectedTrack((prev) =>
                            prev === track.name ? "all" : track.name,
                          )
                        }
                        className={cn(
                          "bg-black/50 p-2.5 rounded-md border transition-colors cursor-pointer",
                          selectedTrack === track.name
                            ? "border-orange-500/40 bg-white/[0.04]"
                            : "border-white/10 hover:bg-white/[0.03]",
                        )}
                      >
                        <div className="flex items-center justify-between gap-2 mb-1.5">
                          <span className="text-xs font-semibold text-white truncate">
                            {track.name}
                          </span>

                          <div className="text-right shrink-0">
                            <span className="text-xs font-bold text-white">
                              {track.count}
                            </span>
                            <span className="ml-1.5 text-xs font-mono text-orange-400 font-bold">
                              {track.percentage}%
                            </span>
                          </div>
                        </div>

                        <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden border border-white/5">
                          <div
                            className="h-full bg-orange-500 rounded-full"
                            style={{ width: `${track.percentage}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* RIGHT: PARTICIPANT PROGRESS TABLE WITH FILTER (FLAT) */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.15 }}
                  className="lg:col-span-8 bg-[#11121a] rounded-lg p-3.5 border border-white/10 space-y-3 overflow-hidden"
                >
                  {/* Table Header Row: Title + Count + Track Dropdown Filter */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-2.5">
                    <div>
                      <h3 className="text-sm font-bold text-white">
                        Participant Progress
                      </h3>
                      <p className="text-xs text-white/50 mt-0.5">
                        Showing {filteredParticipants.length} of{" "}
                        {PARTICIPANTS.length} participants
                      </p>
                    </div>

                    {/* Track Dropdown Filter */}
                    <div className="relative shrink-0">
                      <select
                        value={selectedTrack}
                        onChange={(e) => setSelectedTrack(e.target.value)}
                        aria-label="Filter by career track"
                        className="appearance-none bg-white/5 hover:bg-white/10 border border-white/10 rounded-md pl-3 pr-7 py-1.5 text-xs font-medium text-white focus:outline-none focus:border-white/30 transition-colors cursor-pointer"
                      >
                        {TRACK_FILTER_OPTIONS.map((opt) => (
                          <option key={opt.id} value={opt.id} className="bg-[#181926] text-white">
                            {opt.label}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/40 pointer-events-none" />
                    </div>
                  </div>

                  {/* MOBILE VIEW: Clean, Responsive Card List (Visible on screens < md) */}
                  <div className="md:hidden divide-y divide-white/10 -mx-3.5 -mb-3.5">
                    {filteredParticipants.length === 0 ? (
                      <div className="text-center text-white/40 text-xs py-8 px-4 leading-normal">
                        No participants found matching current filter.
                      </div>
                    ) : (
                      filteredParticipants.map((p) => (
                        <div
                          key={p.id}
                          className="p-3.5 space-y-3 hover:bg-white/[0.03] transition-colors"
                        >
                          {/* Participant Avatar + Name & Actions */}
                          <div className="flex items-start justify-between gap-2.5">
                            <div className="flex items-center gap-2.5 min-w-0">
                              <img
                                src={p.avatar}
                                alt={p.name}
                                className="w-9 h-9 rounded-full object-cover border border-white/20 shrink-0"
                              />
                              <div className="min-w-0">
                                <div className="text-sm font-semibold text-white truncate">
                                  {p.name}
                                </div>
                                <div className="text-xs text-white/40 font-mono truncate">
                                  {p.role}
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center gap-1.5 shrink-0">
                              <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-mono text-white/80 bg-white/5 border border-white/10">
                                {p.status}
                              </span>
                              <RowActionMenu
                                buttonAriaLabel={`Actions for ${p.name}`}
                                theme="dark"
                                align="right"
                                items={[
                                  { id: "view", label: `View Profile` },
                                  { id: "cert", label: "Certification" },
                                  { id: "remind", label: "Send Reminder" },
                                ]}
                              />
                            </div>
                          </div>

                          {/* Track Badge & Score */}
                          <div className="flex items-center justify-between gap-2 text-xs">
                            <span className="inline-flex items-center px-2.5 py-1 rounded font-mono text-white/80 bg-white/5 border border-white/10">
                              {p.track}
                            </span>
                            <div className="flex items-center gap-1.5 font-mono">
                              <span className="text-white/40 text-xs">Score:</span>
                              <span className="font-bold text-xs text-white bg-white/10 px-2.5 py-0.5 rounded border border-white/15">
                                {p.score}
                              </span>
                            </div>
                          </div>

                          {/* Progress Bar */}
                          <div className="space-y-1.5 pt-0.5">
                            <div className="flex items-center justify-between text-xs text-white/60 font-mono">
                              <span>Curriculum Progress</span>
                              <span className="font-bold text-white/90">{p.progress}%</span>
                            </div>
                            <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden border border-white/10">
                              <div
                                className="h-full bg-orange-500 rounded-full"
                                style={{ width: `${p.progress}%` }}
                              />
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>

                  {/* DESKTOP VIEW: Comfortable Breathing Space Table (Visible on md and above) */}
                  <div className="hidden md:block overflow-x-auto">
                    <table className="w-full text-left text-xs leading-normal border-collapse">
                      <thead>
                        <tr className="border-b border-white/10 text-white/40 font-mono text-xs uppercase tracking-wider h-10">
                          <th className="px-3.5 py-2.5 font-medium leading-normal">
                            Participant
                          </th>
                          <th className="px-3.5 py-2.5 font-medium leading-normal">
                            Track
                          </th>
                          <th className="px-3.5 py-2.5 font-medium leading-normal">
                            Status
                          </th>
                          <th className="px-3.5 py-2.5 font-medium leading-normal">
                            Progress
                          </th>
                          <th className="px-3.5 py-2.5 font-medium text-right leading-normal">
                            Score
                          </th>
                          <th className="px-2 py-2.5 font-medium text-center w-8">
                            <span className="sr-only">Actions</span>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredParticipants.length === 0 ? (
                          <tr className="h-12">
                            <td
                              colSpan={6}
                              className="text-center text-white/40 text-xs py-8 leading-normal"
                            >
                              No participants found matching current filter.
                            </td>
                          </tr>
                        ) : (
                          filteredParticipants.map((p) => (
                            <tr
                              key={p.id}
                              className="h-12 border-b border-white/5 last:border-0 hover:bg-white/[0.05] transition-colors"
                            >
                              {/* Participant: Avatar + Name + Role */}
                              <td className="px-3.5 py-3 whitespace-nowrap align-middle">
                                <div className="flex items-center gap-2.5">
                                  <img
                                    src={p.avatar}
                                    alt={p.name}
                                    className="w-7 h-7 rounded-full object-cover border border-white/20 shrink-0"
                                  />
                                  <div className="flex items-baseline gap-2 truncate">
                                    <span className="text-sm font-semibold text-white truncate leading-normal">
                                      {p.name}
                                    </span>
                                    <span className="text-xs text-white/45 truncate hidden sm:inline leading-normal">
                                      {p.role}
                                    </span>
                                  </div>
                                </div>
                              </td>

                              {/* Track Tag (Fixed Neutral Color) */}
                              <td className="px-3.5 py-3 whitespace-nowrap align-middle">
                                <span className="text-xs font-mono text-white/70 bg-white/5 px-2.5 py-1 rounded border border-white/10 leading-normal inline-block">
                                  {p.track}
                                </span>
                              </td>

                              {/* Status Indicator */}
                              <td className="px-3.5 py-3 whitespace-nowrap align-middle text-xs text-white/70 leading-normal">
                                {p.status}
                              </td>

                              {/* Progress Bar (Solid Orange) */}
                              <td className="px-3.5 py-3 whitespace-nowrap align-middle w-32">
                                <div className="flex items-center gap-2">
                                  <div className="w-16 h-1.5 bg-white/10 rounded-full overflow-hidden">
                                    <div
                                      className="h-full bg-orange-500 rounded-full"
                                      style={{ width: `${p.progress}%` }}
                                    />
                                  </div>
                                  <span className="font-mono text-xs text-white/80 font-bold leading-normal">
                                    {p.progress}%
                                  </span>
                                </div>
                              </td>

                              {/* Score */}
                              <td className="px-3.5 py-3 text-right whitespace-nowrap align-middle">
                                <span className="font-mono font-bold text-xs text-white bg-white/5 px-2.5 py-1 rounded border border-white/10 leading-normal inline-block">
                                  {p.score}
                                </span>
                              </td>

                              {/* 3-Dot Reusable Action Menu */}
                              <td className="px-1 py-3 text-center whitespace-nowrap align-middle">
                                <RowActionMenu
                                  buttonAriaLabel={`Actions for ${p.name}`}
                                  theme="dark"
                                  align="right"
                                  items={[
                                    {
                                      id: "view",
                                      label: `View ${p.name}`,
                                    },
                                    {
                                      id: "edit",
                                      label: "Change Track",
                                    },
                                    {
                                      id: "remind",
                                      label: "Send Reminder",
                                    },
                                    {
                                      id: "export",
                                      label: "Export Progress",
                                    },
                                  ]}
                                />
                              </td>
                            </tr>
                          ))
                        )}
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
