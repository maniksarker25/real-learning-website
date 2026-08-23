"use client";

import React, { useState, useMemo, memo } from "react";
import {
  BookOpen,
  CheckCircle2,
  Zap,
  Clock,
  Sparkles,
  ShieldCheck,
  UserCheck,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface LearnerProfile {
  name: string;
  avatar: string;
  score: string;
}

interface ClassCardItem {
  id: string;
  title: string;
  track: string;
  trackColor: string;
  scenarioTitle: string;
  scenarioObjective: string;
  duration: string;
  progress: number;
  isCompleted: boolean;
  evaluatedSkills: string[];
  completedBy: LearnerProfile;
}

export const OrgClassesScreen = memo(function OrgClassesScreen() {
  const [selectedTrackFilter, setSelectedTrackFilter] = useState("all");

  const classList: ClassCardItem[] = useMemo(
    () => [
      {
        id: "c1",
        title: "De-escalating High-Pressure Customer Complaints",
        track: "Customer Service",
        trackColor: "bg-orange-500/10 text-orange-300 border-orange-400/30",
        scenarioTitle: "Upset Customer Refund Request",
        scenarioObjective: "De-escalate caller, validate frustration, and agree on resolution timeline.",
        duration: "45 mins",
        progress: 100,
        isCompleted: true,
        evaluatedSkills: ["Empathy", "De-escalation", "Tone Control"],
        completedBy: {
          name: "Sarah Jenkins",
          avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80",
          score: "96%",
        },
      },
      {
        id: "c2",
        title: "L1 Technical Troubleshooting & Diagnostics",
        track: "Tech Support",
        trackColor: "bg-emerald-500/10 text-emerald-300 border-emerald-500/30",
        scenarioTitle: "Remote Office VPN Outage Triage",
        scenarioObjective: "Diagnose branch connectivity failure while guiding ops manager.",
        duration: "60 mins",
        progress: 88,
        isCompleted: false,
        evaluatedSkills: ["Diagnostics", "Step-by-step Guidance", "Clarity"],
        completedBy: {
          name: "David Chen",
          avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
          score: "88%",
        },
      },
      {
        id: "c3",
        title: "Enterprise Network Security & Incident Response",
        track: "IT Specialist",
        trackColor: "bg-rose-500/10 text-rose-300 border-rose-400/30",
        scenarioTitle: "Active Malware Containment",
        scenarioObjective: "Identify malicious vector, isolate affected subnet, and log report.",
        duration: "90 mins",
        progress: 79,
        isCompleted: false,
        evaluatedSkills: ["Incident Isolation", "Protocol Execution"],
        completedBy: {
          name: "Elena Rostova",
          avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
          score: "85%",
        },
      },
      {
        id: "c4",
        title: "Patient Triage & Empathetic Clinical Intake",
        track: "Healthcare Support",
        trackColor: "bg-purple-500/10 text-purple-300 border-purple-400/30",
        scenarioTitle: "Urgent Care Patient Intake",
        scenarioObjective: "Gather symptoms empathetically while adhering to HIPAA guidelines.",
        duration: "50 mins",
        progress: 100,
        isCompleted: true,
        evaluatedSkills: ["HIPAA Compliance", "Clinical Empathy"],
        completedBy: {
          name: "Marcus Vance",
          avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80",
          score: "91%",
        },
      },
    ],
    []
  );

  const filteredClasses = useMemo(() => {
    if (selectedTrackFilter === "all") return classList;
    return classList.filter((item) => item.track === selectedTrackFilter);
  }, [classList, selectedTrackFilter]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-[#12131c]/90 rounded-2xl p-5 border border-white/10 shadow-lg">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-orange-400" />
            <span>Classes & AI Simulation Performance</span>
          </h2>
          <p className="text-xs text-white/60 mt-0.5">
            Monitor class progress, simulation scenario objectives, and learner completion marks across tracks.
          </p>
        </div>
      </div>

      {/* Track Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {[
          { id: "all", label: "All Classes (4)" },
          { id: "Customer Service", label: "Customer Service" },
          { id: "Tech Support", label: "Tech Support" },
          { id: "IT Specialist", label: "IT Specialist" },
          { id: "Healthcare Support", label: "Healthcare Support" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setSelectedTrackFilter(tab.id)}
            className={cn(
              "px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer border",
              selectedTrackFilter === tab.id
                ? "bg-orange-500/10 border-orange-400 text-white"
                : "bg-[#0d0e14] border-white/10 text-white/60 hover:text-white hover:border-white/20"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Clean & Beautiful Class Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredClasses.map((item) => (
          <div
            key={item.id}
            className="bg-[#12131c]/90 rounded-2xl p-6 border border-white/10 shadow-xl flex flex-col justify-between space-y-4 hover:border-orange-400/40 transition-colors"
          >
            {/* Top Badges & Completion Mark */}
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-2">
                <span
                  className={cn(
                    "px-3 py-1 rounded-full text-[10px] font-semibold border",
                    item.trackColor
                  )}
                >
                  {item.track}
                </span>

                {/* Completion Mark Indicator */}
                <div className="flex items-center gap-1.5 font-mono text-[11px] font-bold">
                  {item.isCompleted ? (
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Completed</span>
                    </span>
                  ) : (
                    <span className="px-2.5 py-0.5 rounded-full bg-orange-500/10 text-orange-300 border border-orange-400/30 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-orange-400" />
                      <span>In Progress ({item.progress}%)</span>
                    </span>
                  )}
                </div>
              </div>

              {/* Class Title */}
              <h3 className="text-lg font-extrabold text-white leading-snug">
                {item.title}
              </h3>

              {/* Simulation Details Box */}
              <div className="p-3.5 rounded-xl bg-black/50 border border-white/10 space-y-2 text-xs">
                <div className="flex items-center text-white/50 font-mono text-[10px]">
                  <span className="flex items-center gap-1 text-orange-400 font-bold">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>SIMULATION SCENARIO</span>
                  </span>
                </div>

                <div className="font-bold text-white text-xs">
                  {item.scenarioTitle}
                </div>
                <p className="text-[11px] text-white/70 leading-relaxed">
                  {item.scenarioObjective}
                </p>
              </div>
            </div>

            {/* Bottom Progress Bar & Completed By User Profiles */}
            <div className="pt-3 border-t border-white/10 space-y-3">
              {/* Progress bar */}
              <div>
                <div className="flex justify-between text-[10px] font-mono text-white/50 mb-1">
                  <span>Track Class Progress</span>
                  <span className="text-orange-400 font-bold">{item.progress}%</span>
                </div>
                <div className="w-full h-1.5 bg-black/60 rounded-full overflow-hidden border border-white/10">
                  <div
                    className={cn(
                      "h-full rounded-full transition-all duration-500",
                      item.isCompleted
                        ? "bg-emerald-400"
                        : "bg-gradient-to-r from-orange-500 to-amber-400"
                    )}
                    style={{ width: `${item.progress}%` }}
                  />
                </div>
              </div>

              {/* Single Learner Profile Achievement */}
              <div className="flex items-center justify-between text-xs pt-1">
                <span className="text-[10px] font-mono text-white/40 uppercase font-semibold flex items-center gap-1">
                  <UserCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Learner Achievement</span>
                </span>

                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/5 border border-white/10">
                  <img
                    src={item.completedBy.avatar}
                    alt={item.completedBy.name}
                    className="w-5 h-5 rounded-full object-cover border border-white/20"
                  />
                  <span className="text-[10px] font-bold text-white truncate max-w-[100px]">
                    {item.completedBy.name}
                  </span>
                  <span className="text-[10px] font-mono text-emerald-400 font-bold">
                    {item.completedBy.score}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});
