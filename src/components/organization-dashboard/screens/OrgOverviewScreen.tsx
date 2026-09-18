"use client";

import React, { memo } from "react";
import { motion } from "framer-motion";
import {
  Users,
  Zap,
  CheckCircle2,
  Headphones,
  Laptop,
  Server,
  Stethoscope,
  ArrowUpRight,
  BarChart2,
  UserCheck,
} from "lucide-react";
import { cn } from "@/lib/utils";

export const OrgOverviewScreen = memo(function OrgOverviewScreen() {
  const metrics = [
    {
      id: "total-participants",
      label: "TOTAL PARTICIPANTS",
      value: "1,248",
      change: "+14.2% active learners",
      icon: Users,
      accent: {
        text: "text-orange-600",
        bg: "bg-orange-50",
        border: "border-orange-200",
      },
    },
    {
      id: "total-simulations-completed",
      label: "TOTAL SIMULATIONS COMPLETED",
      value: "3,842",
      change: "+342 this week",
      icon: Zap,
      accent: {
        text: "text-emerald-700",
        bg: "bg-emerald-50",
        border: "border-emerald-200",
      },
    },
    {
      id: "simulation-completion",
      label: "SIMULATION COMPLETION RATE",
      value: "88.5%",
      change: "+5.2% mastery rate",
      icon: CheckCircle2,
      accent: {
        text: "text-rose-700",
        bg: "bg-rose-50",
        border: "border-rose-200",
      },
    },
  ];

  const careerTracks = [
    {
      id: "customer-service",
      name: "Customer Service",
      count: 380,
      percentage: 38,
      icon: Headphones,
      color: "bg-gradient-to-r from-orange-500 to-amber-500",
      textColor: "text-orange-600",
      borderColor: "border-orange-200",
      bgLight: "bg-orange-50",
    },
    {
      id: "tech-support",
      name: "Tech Support",
      count: 290,
      percentage: 29,
      icon: Laptop,
      color: "bg-gradient-to-r from-emerald-500 to-teal-500",
      textColor: "text-emerald-700",
      borderColor: "border-emerald-200",
      bgLight: "bg-emerald-50",
    },
    {
      id: "it-specialist",
      name: "IT Specialist",
      count: 210,
      percentage: 21,
      icon: Server,
      color: "bg-gradient-to-r from-rose-500 to-pink-500",
      textColor: "text-rose-700",
      borderColor: "border-rose-200",
      bgLight: "bg-rose-50",
    },
    {
      id: "healthcare-support",
      name: "Healthcare Support",
      count: 160,
      percentage: 16,
      icon: Stethoscope,
      color: "bg-gradient-to-r from-purple-500 to-violet-500",
      textColor: "text-purple-700",
      borderColor: "border-purple-200",
      bgLight: "bg-purple-50",
    },
  ];

  const participantsProgress = [
    {
      id: 1,
      name: "Sarah Jenkins",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80",
      track: "Customer Service",
      trackColor: "bg-orange-50 text-orange-800 border-orange-200",
      progress: 94,
      score: "96%",
    },
    {
      id: 2,
      name: "David Chen",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
      track: "Tech Support",
      trackColor: "bg-emerald-50 text-emerald-800 border-emerald-200",
      progress: 78,
      score: "88%",
    },
    {
      id: 3,
      name: "Elena Rostova",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
      track: "IT Specialist",
      trackColor: "bg-rose-50 text-rose-800 border-rose-200",
      progress: 64,
      score: "85%",
    },
    {
      id: 4,
      name: "Marcus Vance",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80",
      track: "Healthcare Support",
      trackColor: "bg-purple-50 text-purple-800 border-purple-200",
      progress: 45,
      score: "79%",
    },
    {
      id: 5,
      name: "Aisha Khan",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80",
      track: "Customer Service",
      trackColor: "bg-orange-50 text-orange-800 border-orange-200",
      progress: 98,
      score: "94%",
    },
  ];

  return (
    <div className="space-y-5">
      {/* 3 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {metrics.map((m) => {
          const Icon = m.icon;
          return (
            <div
              key={m.id}
              className="bg-white rounded-2xl p-4 sm:p-5 border border-stone-200 shadow-sm space-y-2 hover:border-stone-300 transition-colors"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider font-mono">
                  {m.label}
                </span>
                <div
                  className={cn(
                    "w-8 h-8 rounded-xl flex items-center justify-center border",
                    m.accent.bg,
                    m.accent.text,
                    m.accent.border
                  )}
                >
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
                {m.value}
              </div>
              <div className="flex items-center gap-1 text-xs text-stone-500">
                <ArrowUpRight className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span className="text-stone-600 font-medium">{m.change}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* 2 Grid Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left: Career Track Participation */}
        <div className="lg:col-span-5 bg-white rounded-2xl p-5 border border-stone-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-stone-100 pb-3">
            <div className="flex items-center gap-2">
              <BarChart2 className="w-4 h-4 text-orange-600" />
              <h3 className="text-sm font-bold text-stone-900">
                Career Track Participation
              </h3>
            </div>
            <span className="text-[10px] font-mono font-bold text-orange-800 bg-orange-50 px-2 py-0.5 rounded-md border border-orange-200">
              4 Tracks
            </span>
          </div>

          <div className="space-y-3">
            {careerTracks.map((track) => {
              const Icon = track.icon;
              return (
                <div
                  key={track.id}
                  className="bg-[#FCFAF6] hover:bg-stone-50 p-3 rounded-xl border border-stone-200/80 space-y-2 transition-colors"
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div
                        className={cn(
                          "w-7 h-7 rounded-lg flex items-center justify-center shrink-0 border",
                          track.bgLight,
                          track.textColor,
                          track.borderColor
                        )}
                      >
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-xs font-bold text-stone-900 truncate">
                        {track.name}
                      </span>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="text-xs font-extrabold text-stone-900">
                        {track.count}
                      </span>
                      <span className="ml-1.5 text-[11px] font-mono text-orange-600 font-bold">
                        {track.percentage}%
                      </span>
                    </div>
                  </div>
                  <div className="w-full h-1.5 bg-stone-200/70 rounded-full overflow-hidden">
                    <div
                      className={cn("h-full rounded-full transition-all duration-500", track.color)}
                      style={{ width: `${track.percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Participant Progress Table */}
        <div className="lg:col-span-7 bg-white rounded-2xl p-5 border border-stone-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-stone-100 pb-3">
            <div className="flex items-center gap-2">
              <UserCheck className="w-4 h-4 text-emerald-600" />
              <h3 className="text-sm font-bold text-stone-900">
                Participant Progress
              </h3>
            </div>
            <span className="text-[10px] font-mono text-stone-500 font-medium">
              5 Active Learners
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-stone-200 text-stone-400 font-mono text-[10px] uppercase font-semibold">
                  <th className="py-2 px-2.5">PARTICIPANT</th>
                  <th className="py-2 px-2.5">TRACK</th>
                  <th className="py-2 px-2.5">PROGRESS</th>
                  <th className="py-2 px-2.5 text-right">SCORE</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {participantsProgress.map((p) => (
                  <tr key={p.id} className="hover:bg-stone-50/70 transition-colors">
                    <td className="py-3 px-2.5 whitespace-nowrap">
                      <div className="flex items-center gap-2.5">
                        <img
                          src={p.avatar}
                          alt={p.name}
                          className="w-6 h-6 rounded-full object-cover border border-stone-200 shrink-0"
                        />
                        <span className="font-bold text-stone-900 text-xs">
                          {p.name}
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-2.5 whitespace-nowrap">
                      <span
                        className={cn(
                          "inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium border font-mono",
                          p.trackColor
                        )}
                      >
                        {p.track}
                      </span>
                    </td>
                    <td className="py-3 px-2.5 w-32">
                      <div className="flex items-center gap-2">
                        <div className="w-full h-1.5 bg-stone-100 rounded-full overflow-hidden border border-stone-200/60">
                          <div
                            className="h-full bg-gradient-to-r from-orange-500 to-amber-500 rounded-full"
                            style={{ width: `${p.progress}%` }}
                          />
                        </div>
                        <span className="font-mono text-[11px] text-stone-700 font-bold">
                          {p.progress}%
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-2.5 text-right whitespace-nowrap">
                      <span className="font-mono font-bold text-xs text-stone-900 bg-stone-100 px-2 py-0.5 rounded border border-stone-200">
                        {p.score}
                      </span>
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
