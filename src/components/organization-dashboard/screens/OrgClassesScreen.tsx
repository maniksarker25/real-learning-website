"use client";

import React, { useState, useCallback, useMemo, memo } from "react";
import {
  BookOpen,
  PlayCircle,
  Users,
  CheckCircle2,
  Plus,
  Zap,
  Clock,
  Layers,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ClassItem {
  id: string;
  title: string;
  track: string;
  trackColor: string;
  duration: string;
  scenarios: number;
  enrolledLearners: number;
  completionRate: number;
  status: "Active" | "Draft";
}

export const OrgClassesScreen = memo(function OrgClassesScreen() {
  const [selectedTrackFilter, setSelectedTrackFilter] = useState("all");
  const [assignNotification, setAssignNotification] = useState<string | null>(null);

  const classes: ClassItem[] = useMemo(
    () => [
      {
        id: "c1",
        title: "De-escalating High-Pressure Customer Complaints",
        track: "Customer Service",
        trackColor: "bg-orange-500/10 text-orange-300 border-orange-400/30",
        duration: "45 mins",
        scenarios: 6,
        enrolledLearners: 380,
        completionRate: 94,
        status: "Active",
      },
      {
        id: "c2",
        title: "L1 Technical Troubleshooting & Diagnostics",
        track: "Tech Support",
        trackColor: "bg-emerald-500/10 text-emerald-300 border-emerald-500/30",
        duration: "60 mins",
        scenarios: 8,
        enrolledLearners: 290,
        completionRate: 88,
        status: "Active",
      },
      {
        id: "c3",
        title: "Enterprise Network Security & Incident Response",
        track: "IT Specialist",
        trackColor: "bg-rose-500/10 text-rose-300 border-rose-400/30",
        duration: "90 mins",
        scenarios: 10,
        enrolledLearners: 210,
        completionRate: 79,
        status: "Active",
      },
      {
        id: "c4",
        title: "Patient Triage & Empathetic Clinical Intake",
        track: "Healthcare Support",
        trackColor: "bg-purple-500/10 text-purple-300 border-purple-400/30",
        duration: "50 mins",
        scenarios: 5,
        enrolledLearners: 160,
        completionRate: 91,
        status: "Active",
      },
      {
        id: "c5",
        title: "Omnichannel Chat & Live Support Communication",
        track: "Customer Service",
        trackColor: "bg-orange-500/10 text-orange-300 border-orange-400/30",
        duration: "40 mins",
        scenarios: 4,
        enrolledLearners: 210,
        completionRate: 85,
        status: "Active",
      },
      {
        id: "c6",
        title: "Active Directory & IAM Access Management",
        track: "IT Specialist",
        trackColor: "bg-rose-500/10 text-rose-300 border-rose-400/30",
        duration: "75 mins",
        scenarios: 7,
        enrolledLearners: 145,
        completionRate: 72,
        status: "Active",
      },
    ],
    []
  );

  const filteredClasses = useMemo(() => {
    if (selectedTrackFilter === "all") return classes;
    return classes.filter((item) => item.track === selectedTrackFilter);
  }, [classes, selectedTrackFilter]);

  const handleAssign = useCallback((title: string) => {
    setAssignNotification(`Assigned "${title}" to all participants in this track.`);
    setTimeout(() => {
      setAssignNotification(null);
    }, 3000);
  }, []);

  return (
    <div className="space-y-6">
      {/* Top Header Row */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-[#12131c]/90 rounded-2xl p-5 border border-white/10 shadow-lg">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-orange-400" />
            <span>Manage Classes & AI Workplace Simulations</span>
          </h2>
          <p className="text-xs text-white/60 mt-0.5">
            Assign interactive career classes and realistic workplace simulation scenarios to your learners.
          </p>
        </div>

        <button className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white text-black font-extrabold text-xs hover:bg-white/90 transition-colors shadow-md cursor-pointer shrink-0">
          <Plus className="w-4 h-4" />
          <span>Create Custom Class</span>
        </button>
      </div>

      {/* Notification Toast */}
      {assignNotification && (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{assignNotification}</span>
        </div>
      )}

      {/* Track Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {[
          { id: "all", label: "All Classes (6)" },
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

      {/* Class Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredClasses.map((item) => (
          <div
            key={item.id}
            className="bg-[#12131c]/90 rounded-2xl p-5 border border-white/10 shadow-lg flex flex-col justify-between space-y-4 hover:border-orange-400/40 transition-colors"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-2">
                <span
                  className={cn(
                    "px-2.5 py-0.5 rounded-full text-[10px] font-semibold border",
                    item.trackColor
                  )}
                >
                  {item.track}
                </span>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                  {item.status}
                </span>
              </div>

              <h3 className="text-base font-bold text-white leading-snug">
                {item.title}
              </h3>

              <div className="flex flex-wrap items-center gap-4 text-xs text-white/60">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-orange-400" />
                  <span>{item.duration}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <PlayCircle className="w-3.5 h-3.5 text-rose-400" />
                  <span>{item.scenarios} AI Simulations</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{item.enrolledLearners} Enrolled</span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-3">
              <div>
                <span className="block text-[10px] text-white/40 font-mono">
                  Completion Rate
                </span>
                <span className="text-sm font-extrabold text-white font-mono">
                  {item.completionRate}%
                </span>
              </div>

              <button
                onClick={() => handleAssign(item.title)}
                className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <Zap className="w-3.5 h-3.5 text-orange-400" />
                <span>Assign Class to Team</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});
