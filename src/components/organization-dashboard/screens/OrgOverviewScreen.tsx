"use client";

import React, { memo, useState, useMemo } from "react";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { RowActionMenu } from "@/components/ui/RowActionMenu";

interface Participant {
  id: number;
  name: string;
  role: string;
  avatar: string;
  track: string;
  status: string;
  progress: number;
  score: string;
}

const TRACK_FILTER_OPTIONS = [
  { id: "all", label: "All Tracks" },
  { id: "Customer Service", label: "Customer Service" },
  { id: "Tech Support", label: "Tech Support" },
  { id: "IT Specialist", label: "IT Specialist" },
  { id: "Healthcare Support", label: "Healthcare" },
] as const;

export const OrgOverviewScreen = memo(function OrgOverviewScreen() {
  const [selectedTrack, setSelectedTrack] = useState<string>("all");

  const metrics = [
    {
      id: "total-participants",
      label: "TOTAL PARTICIPANTS",
      value: "1,248",
      change: "+14.2% active learners",
    },
    {
      id: "total-simulations-completed",
      label: "TOTAL SIMULATIONS COMPLETED",
      value: "3,842",
      change: "+342 this week",
    },
    {
      id: "simulation-completion",
      label: "SIMULATION COMPLETION RATE",
      value: "88.5%",
      change: "+5.2% mastery rate",
    },
  ];

  const careerTracks = [
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

  // Table with 5 participant items showing participant progress
  const participantsProgress: Participant[] = [
    {
      id: 1,
      name: "Sarah Jenkins",
      role: "Senior Agent",
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
      avatar:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80",
      track: "Customer Service",
      status: "Certified",
      progress: 98,
      score: "94%",
    },
  ];

  const filteredParticipants = useMemo(() => {
    if (selectedTrack === "all") return participantsProgress;
    return participantsProgress.filter((p) => p.track === selectedTrack);
  }, [selectedTrack, participantsProgress]);

  return (
    <div className="space-y-4">
      {/* 3 Metric Cards (Flat, no shadow) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
        {metrics.map((m) => (
          <div
            key={m.id}
            className="bg-white rounded-xl p-4 border border-stone-200 hover:bg-stone-50/50 transition-colors"
          >
            <div className="flex items-center justify-between gap-2 mb-1.5">
              <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider font-mono">
                {m.label}
              </span>
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
              {m.value}
            </div>
            <div className="flex items-center gap-1.5 text-xs text-stone-500 mt-1.5">
              <ArrowUpRight className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span className="text-stone-600 font-medium">{m.change}</span>
            </div>
          </div>
        ))}
      </div>

      {/* 2 Grid Columns (Flat, no shadow) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left: Career Track Participation */}
        <div className="lg:col-span-5 bg-white rounded-xl p-4 border border-stone-200 space-y-3">
          <div className="flex items-center justify-between border-b border-stone-100 pb-2.5">
            <h3 className="text-sm font-bold text-stone-900">
              Career Track Participation
            </h3>
            <span className="text-xs font-mono font-medium text-orange-800 bg-orange-50 px-2 py-0.5 rounded border border-orange-200">
              4 Tracks
            </span>
          </div>

          <div className="space-y-2">
            {careerTracks.map((track) => (
              <div
                key={track.id}
                onClick={() =>
                  setSelectedTrack((prev) =>
                    prev === track.name ? "all" : track.name,
                  )
                }
                className={cn(
                  "p-2.5 rounded-md border transition-colors cursor-pointer",
                  selectedTrack === track.name
                    ? "bg-orange-50/70 border-orange-300"
                    : "bg-[#FCFAF6] hover:bg-stone-100/70 border-stone-200/80",
                )}
              >
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <span className="text-xs font-semibold text-stone-900 truncate">
                    {track.name}
                  </span>
                  <div className="text-right shrink-0">
                    <span className="text-xs font-bold text-stone-900">
                      {track.count}
                    </span>
                    <span className="ml-1.5 text-xs font-mono text-orange-600 font-bold">
                      {track.percentage}%
                    </span>
                  </div>
                </div>
                <div className="w-full h-1 bg-stone-200/70 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500 bg-black"
                    style={{ width: `${track.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Participant Progress Table */}
        <div className="lg:col-span-7 bg-white rounded-xl p-4 border border-stone-200 space-y-3 overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-100 pb-2.5">
            <div>
              <h3 className="text-sm font-bold text-stone-900">
                Participant Progress
              </h3>
              <p className="text-xs text-stone-500 mt-0.5">
                Showing {filteredParticipants.length} of{" "}
                {participantsProgress.length} participants
              </p>
            </div>

            {/* Track Dropdown Filter */}
            <div className="relative shrink-0">
              <select
                value={selectedTrack}
                onChange={(e) => setSelectedTrack(e.target.value)}
                aria-label="Filter by career track"
                className="appearance-none bg-stone-50/80 hover:bg-stone-100 border border-stone-200 rounded-md pl-3 pr-7 py-1.5 text-xs font-medium text-stone-700 focus:outline-none focus:border-stone-400 transition-colors cursor-pointer"
              >
                {TRACK_FILTER_OPTIONS.map((opt) => (
                  <option key={opt.id} value={opt.id} className="bg-white text-stone-900">
                    {opt.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-stone-400 pointer-events-none" />
            </div>
          </div>
          {/* MOBILE VIEW: Clean, Responsive Card List (Visible on screens < md) */}
          <div className="md:hidden divide-y divide-stone-100 -mx-4 -mb-4">
            {filteredParticipants.length === 0 ? (
              <div className="text-center text-stone-400 text-xs py-8 px-4 leading-normal">
                No participants found.
              </div>
            ) : (
              filteredParticipants.map((p) => (
                <div
                  key={p.id}
                  className="p-4 space-y-3 hover:bg-stone-50/60 transition-colors"
                >
                  {/* Participant Avatar + Name & Actions */}
                  <div className="flex items-center justify-between gap-2.5">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <img
                        src={p.avatar}
                        alt={p.name}
                        className="w-9 h-9 rounded-full object-cover border border-stone-200 shrink-0"
                      />
                      <div className="min-w-0">
                        <div className="text-sm font-semibold text-stone-900 truncate">
                          {p.name}
                        </div>
                        <div className="text-xs text-stone-400 font-mono truncate">
                          {p.role}
                        </div>
                      </div>
                    </div>

                    <RowActionMenu
                      buttonAriaLabel={`Actions for ${p.name}`}
                      theme="light"
                      align="right"
                      items={[
                        { id: "view", label: `View ${p.name}` },
                        { id: "edit", label: "Change Track" },
                        { id: "remind", label: "Send Reminder" },
                      ]}
                    />
                  </div>

                  {/* Track Badge & Score */}
                  <div className="flex items-center justify-between gap-2 text-xs">
                    <span className="inline-flex items-center px-2.5 py-1 rounded font-mono text-stone-700 bg-stone-100 border border-stone-200">
                      {p.track}
                    </span>
                    <div className="flex items-center gap-1.5 font-mono">
                      <span className="text-stone-400 text-xs">Score:</span>
                      <span className="font-bold text-xs text-stone-900 bg-stone-100 px-2.5 py-0.5 rounded border border-stone-200">
                        {p.score}
                      </span>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="space-y-1.5 pt-0.5">
                    <div className="flex items-center justify-between text-xs text-stone-600 font-mono">
                      <span>Curriculum Progress</span>
                      <span className="font-bold text-stone-800">{p.progress}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-stone-100 rounded-full overflow-hidden border border-stone-200/60">
                      <div
                        className="h-full bg-stone-900 rounded-full"
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
                <tr className="border-b border-stone-200 text-stone-400 font-mono text-xs uppercase tracking-wider h-10">
                  <th className="px-3.5 py-2.5 font-semibold leading-normal">
                    Participant
                  </th>
                  <th className="px-3.5 py-2.5 font-semibold leading-normal">
                    Track
                  </th>
                  <th className="px-3.5 py-2.5 font-semibold leading-normal">
                    Progress
                  </th>
                  <th className="px-3.5 py-2.5 font-semibold text-right leading-normal">
                    Score
                  </th>
                  <th className="px-2 py-2.5 font-semibold text-center w-8">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredParticipants.map((p) => (
                  <tr
                    key={p.id}
                    className="h-12 border-b border-stone-100 last:border-0 hover:bg-stone-50/70 transition-colors"
                  >
                    {/* Participant: Avatar + Name */}
                    <td className="px-3.5 py-3 whitespace-nowrap align-middle">
                      <div className="flex items-center gap-2.5">
                        <img
                          src={p.avatar}
                          alt={p.name}
                          className="w-7 h-7 rounded-full object-cover border border-stone-200 shrink-0"
                        />
                        <span className="text-sm font-semibold text-stone-900 leading-normal">
                          {p.name}
                        </span>
                      </div>
                    </td>

                    <td className="px-3.5 py-3 whitespace-nowrap align-middle">
                      <span className="inline-flex items-center px-2.5 py-1 rounded text-xs font-mono text-stone-700 bg-stone-100 border border-stone-200 leading-normal">
                        {p.track}
                      </span>
                    </td>

                    <td className="px-3.5 py-3 whitespace-nowrap align-middle w-32">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-1.5 bg-stone-100 rounded-full overflow-hidden border border-stone-200/60">
                          <div
                            className="h-full bg-black rounded-full"
                            style={{ width: `${p.progress}%` }}
                          />
                        </div>
                        <span className="font-mono text-xs text-stone-700 font-bold leading-normal">
                          {p.progress}%
                        </span>
                      </div>
                    </td>

                    <td className="px-3.5 py-3 text-right whitespace-nowrap align-middle">
                      <span className="font-mono font-bold text-xs text-stone-900 bg-stone-100 px-2.5 py-1 rounded border border-stone-200 leading-normal inline-block">
                        {p.score}
                      </span>
                    </td>

                    <td className="px-1 py-3 text-center whitespace-nowrap align-middle">
                      <RowActionMenu
                        buttonAriaLabel={`Actions for ${p.name}`}
                        theme="light"
                        items={[
                          { id: "view", label: `View ${p.name}` },
                          { id: "edit", label: "Change Track" },
                          { id: "remind", label: "Send Reminder" },
                        ]}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
});
