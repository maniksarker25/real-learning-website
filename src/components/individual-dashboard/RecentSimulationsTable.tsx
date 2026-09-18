"use client";

import React, { useState, useMemo, memo } from "react";
import {
  Zap,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Clock,
  Award,
  Eye,
  MessageSquare,
  X,
  TrendingUp,
  ShieldCheck,
  RotateCcw,
  BookOpen,
  ArrowRight,
  Star,
  ChevronRight,
  Filter,
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface RecentSimulationItem {
  id: string;
  scenarioTitle: string;
  careerTrack: "Customer Service" | "Tech Support" | "IT Specialist" | "Healthcare Support";
  trackColor: string;
  score: number;
  scoreGrade: "Mastery" | "Proficient" | "Good";
  date: string;
  duration: string;
  status: "Completed" | "Needs Review";
  aiPersona: {
    name: string;
    role: string;
    avatar: string;
  };
  skills: {
    communication: number;
    empathy: number;
    activeListening: number;
    problemSolving: number;
    conflictResolution: number;
  };
  positiveHighlights: string[];
  improvementPoints: string[];
  keyMoments: {
    timestamp: string;
    note: string;
    quality: "good" | "improve";
  }[];
  recommendedLessons: string[];
  recommendedSimulations: string[];
}

interface RecentSimulationsTableProps {
  onLaunchSimulation?: (scenarioTitle: string) => void;
}

export const RecentSimulationsTable = memo(function RecentSimulationsTable({
  onLaunchSimulation,
}: RecentSimulationsTableProps) {
  const [selectedSimFeedback, setSelectedSimFeedback] =
    useState<RecentSimulationItem | null>(null);
  const [trackFilter, setTrackFilter] = useState("all");

  const recentSimulations: RecentSimulationItem[] = useMemo(
    () => [
      {
        id: "r-sim-1",
        scenarioTitle: "Handling an Upset Customer Requesting Immediate Refund",
        careerTrack: "Customer Service",
        trackColor: "bg-orange-500/10 text-orange-300 border-orange-400/30",
        score: 92,
        scoreGrade: "Mastery",
        date: "Today, 2:30 PM",
        duration: "6m 20s",
        status: "Completed",
        aiPersona: {
          name: "Alex Rivera",
          role: "Frustrated VIP Customer",
          avatar:
            "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
        },
        skills: {
          communication: 95,
          empathy: 94,
          activeListening: 92,
          problemSolving: 90,
          conflictResolution: 89,
        },
        positiveHighlights: [
          "Immediate Emotional Validation: You validated the caller's frustration within the first 10 seconds before discussing policies.",
          "Positive Framing: Used 'What I can do right now...' instead of 'We can't...'.",
          "Explicit Action Agreement: Set a clear 2 PM email update follow-up timestamp.",
        ],
        improvementPoints: [
          "Speed of Agreement: State the specific resolution credit option ~30 seconds earlier in the interaction.",
          "Summarizing Facts: Confirm order invoice # before confirming the credit amount.",
        ],
        keyMoments: [
          {
            timestamp: "00:15",
            note: "Customer expressed anger over 5-day delay. You responded with empathy ('I completely understand how frustrating that delay is...'). Excellent tone control.",
            quality: "good",
          },
          {
            timestamp: "01:20",
            note: "Customer demanded immediate refund. You framed available credit options positively ('What I can do right now...').",
            quality: "good",
          },
          {
            timestamp: "02:10",
            note: "Opportunity missed: State invoice verification earlier to lock in protocol accuracy.",
            quality: "improve",
          },
        ],
        recommendedLessons: [
          "Lesson 4: Establishing Control & Action Agreements",
          "Lesson 3: Non-Confrontational Phrasing & Positive Framing",
        ],
        recommendedSimulations: [
          "L1 Network Diagnostics Under High SLA Pressure",
          "Omnichannel Live Chat Resolution",
        ],
      },
      {
        id: "r-sim-2",
        scenarioTitle: "Remote Office VPN Outage SLA Triage",
        careerTrack: "Tech Support",
        trackColor: "bg-emerald-500/10 text-emerald-300 border-emerald-500/30",
        score: 91,
        scoreGrade: "Proficient",
        date: "Aug 24, 11:15 AM",
        duration: "8m 45s",
        status: "Completed",
        aiPersona: {
          name: "David Vance",
          role: "Branch Manager",
          avatar:
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
        },
        skills: {
          communication: 92,
          empathy: 88,
          activeListening: 90,
          problemSolving: 96,
          conflictResolution: 89,
        },
        positiveHighlights: [
          "Fast Diagnostic Path: Successfully narrowed down issue to gateway DNS table mismatch.",
          "Clear Non-Technical Language: Explained router reboot sequence without confusing terminology.",
        ],
        improvementPoints: [
          "Estimated Restoration SLA: Give a concrete SLA window earlier in the conversation.",
        ],
        keyMoments: [
          {
            timestamp: "00:30",
            note: "Accurately gathered branch IP subnet and gateway status without delaying the call.",
            quality: "good",
          },
          {
            timestamp: "03:15",
            note: "Communicated workaround tunnel configuration clearly.",
            quality: "good",
          },
        ],
        recommendedLessons: [
          "Lesson 2: Managing Anxious Stakeholders in SLA Incidents",
        ],
        recommendedSimulations: [
          "Active Ransomware Vector Containment",
        ],
      },
      {
        id: "r-sim-3",
        scenarioTitle: "Active Ransomware Vector Containment & Isolation",
        careerTrack: "IT Specialist",
        trackColor: "bg-rose-500/10 text-rose-300 border-rose-400/30",
        score: 89,
        scoreGrade: "Good",
        date: "Aug 22, 4:00 PM",
        duration: "11m 10s",
        status: "Completed",
        aiPersona: {
          name: "SecOps Bot",
          role: "Incident Lead",
          avatar:
            "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80",
        },
        skills: {
          communication: 86,
          empathy: 82,
          activeListening: 88,
          problemSolving: 95,
          conflictResolution: 92,
        },
        positiveHighlights: [
          "Strict NIST Incident Adherence: Isolated host subnet immediately before memory dump.",
        ],
        improvementPoints: [
          "Chain of Custody: Export hash log prior to terminating rogue background process.",
        ],
        keyMoments: [
          {
            timestamp: "01:05",
            note: "Segregated VLAN 14 port 24 immediately. Excellent incident isolation speed.",
            quality: "good",
          },
        ],
        recommendedLessons: [
          "Lesson 5: SOC Incident Protocols & Evidence Logging",
        ],
        recommendedSimulations: [
          "Remote Office VPN Outage SLA Triage",
        ],
      },
      {
        id: "r-sim-4",
        scenarioTitle: "Urgent Care Clinical Intake & Empathetic Triage",
        careerTrack: "Healthcare Support",
        trackColor: "bg-purple-500/10 text-purple-300 border-purple-400/30",
        score: 94,
        scoreGrade: "Mastery",
        date: "Aug 20, 10:30 AM",
        duration: "7m 15s",
        status: "Completed",
        aiPersona: {
          name: "Maria Santos",
          role: "Anxious Patient",
          avatar:
            "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80",
        },
        skills: {
          communication: 95,
          empathy: 98,
          activeListening: 96,
          problemSolving: 91,
          conflictResolution: 93,
        },
        positiveHighlights: [
          "Compassionate Tone: Maintained a soothing vocal tone that calmed patient breathing.",
          "HIPAA Privacy Compliance: Verified identity discreetly and securely.",
        ],
        improvementPoints: [
          "Contact Verification: Confirm primary emergency phone number twice before nurse handoff.",
        ],
        keyMoments: [
          {
            timestamp: "00:45",
            note: "Patient was anxious; you established reassuring presence before asking symptom questions.",
            quality: "good",
          },
        ],
        recommendedLessons: [
          "Lesson 1: Patient-Centric Communication in High-Stress Clinical Settings",
        ],
        recommendedSimulations: [
          "Handling an Upset Customer Requesting Immediate Refund",
        ],
      },
    ],
    []
  );

  const filteredSimulations = useMemo(() => {
    if (trackFilter === "all") return recentSimulations;
    return recentSimulations.filter((s) => s.careerTrack === trackFilter);
  }, [recentSimulations, trackFilter]);

  return (
    <div className="space-y-3">
      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-1.5">
        {[
          { id: "all", label: "All Tracks" },
          { id: "Customer Service", label: "Customer Service" },
          { id: "Tech Support", label: "Tech Support" },
          { id: "IT Specialist", label: "IT Specialist" },
          { id: "Healthcare Support", label: "Healthcare Support" },
        ].map((f) => {
          const isActive = trackFilter === f.id;
          return (
            <button
              key={f.id}
              onClick={() => setTrackFilter(f.id)}
              className={cn(
                "px-3 py-1 rounded-full text-xs font-medium transition-colors cursor-pointer border",
                isActive
                  ? "bg-stone-900 text-white border-stone-900 font-semibold"
                  : "bg-white text-stone-600 border-stone-200 hover:bg-stone-50 hover:text-stone-900"
              )}
            >
              {f.label}
            </button>
          );
        })}
      </div>

      {/* Recent Simulations Table */}
      <div className="bg-white rounded-xl border border-stone-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-stone-200 text-stone-500 font-mono text-[10px] uppercase bg-stone-50/80">
                <th className="py-3 px-4 font-semibold">SIMULATION SCENARIO</th>
                <th className="py-3 px-4 font-semibold">CAREER TRACK</th>
                <th className="py-3 px-4 font-semibold">SCORE</th>
                <th className="py-3 px-4 font-semibold">DATE & DURATION</th>
                <th className="py-3 px-4 font-semibold">STATUS</th>
                <th className="py-3 px-4 font-semibold text-right">FEEDBACK & ACTION</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {filteredSimulations.map((sim) => (
                <tr
                  key={sim.id}
                  className="hover:bg-stone-50/70 transition-colors group"
                >
                  {/* Scenario Title & AI Persona */}
                  <td className="py-3.5 px-4">
                    <div className="space-y-0.5 max-w-sm">
                      <div className="font-bold text-stone-900 text-xs group-hover:text-orange-700 transition-colors">
                        {sim.scenarioTitle}
                      </div>
                      <div className="text-[11px] text-stone-500 flex items-center gap-1.5">
                        <span>AI Persona:</span>
                        <span className="text-stone-800 font-medium">{sim.aiPersona.name}</span>
                        <span className="text-[10px] text-stone-400">({sim.aiPersona.role})</span>
                      </div>
                    </div>
                  </td>

                  {/* Career Track */}
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <span
                      className={cn(
                        "inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold border",
                        sim.careerTrack === "Customer Service"
                          ? "bg-orange-50 text-orange-900 border-orange-200"
                          : sim.careerTrack === "Tech Support"
                          ? "bg-emerald-50 text-emerald-900 border-emerald-200"
                          : sim.careerTrack === "IT Specialist"
                          ? "bg-rose-50 text-rose-900 border-rose-200"
                          : "bg-purple-50 text-purple-900 border-purple-200"
                      )}
                    >
                      {sim.careerTrack}
                    </span>
                  </td>

                  {/* Score */}
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <div className="flex items-center gap-1.5">
                      <span className="font-mono text-sm font-black text-stone-900">
                        {sim.score}%
                      </span>
                      <span
                        className={cn(
                          "text-[9px] font-mono font-bold px-1.5 py-0.2 rounded border",
                          sim.scoreGrade === "Mastery"
                            ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                            : "bg-amber-50 text-amber-800 border-amber-200"
                        )}
                      >
                        {sim.scoreGrade}
                      </span>
                    </div>
                  </td>

                  {/* Date & Duration */}
                  <td className="py-3.5 px-4 whitespace-nowrap font-mono text-xs">
                    <div className="text-stone-800 font-medium">{sim.date}</div>
                    <div className="text-[10px] text-stone-400">{sim.duration}</div>
                  </td>

                  {/* Status */}
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      <span>{sim.status}</span>
                    </span>
                  </td>

                  {/* Feedback Button */}
                  <td className="py-3.5 px-4 text-right whitespace-nowrap">
                    <button
                      onClick={() => setSelectedSimFeedback(sim)}
                      className="inline-flex items-center gap-1.5 text-xs text-orange-800 hover:text-white bg-orange-50 hover:bg-orange-600 border border-orange-200 hover:border-orange-600 px-3 py-1.5 rounded-full font-bold transition-colors cursor-pointer"
                    >
                      <MessageSquare className="w-3.5 h-3.5 text-orange-600 group-hover:text-white" />
                      <span>Feedback</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* FULL SIMULATION FEEDBACK MODAL (EXACT SAME AS FEEDBACK TAB SCREEN) */}
      {selectedSimFeedback && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-stone-900/50 backdrop-blur-xs overflow-y-auto">
          <div className="relative w-full max-w-4xl bg-[#FCFAF6] border border-stone-200 rounded-3xl p-6 sm:p-8 space-y-6 text-left max-h-[92vh] overflow-y-auto shadow-xl">
            <button
              onClick={() => setSelectedSimFeedback(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 hover:text-stone-900 cursor-pointer transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header Banner */}
            <div className="bg-white rounded-2xl p-5 border border-stone-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100 border border-orange-200 text-xs text-orange-900 font-bold mb-1.5">
                  <span>FEEDBACK = UNDERSTAND YOUR PERFORMANCE</span>
                </div>
                <h2 className="text-xl font-bold text-stone-900">
                  Simulation Result & AI Evaluation
                </h2>
                <p className="text-xs text-stone-600">
                  Scenario: {selectedSimFeedback.scenarioTitle}
                </p>
              </div>

              <button
                onClick={() => {
                  const title = selectedSimFeedback.scenarioTitle;
                  setSelectedSimFeedback(null);
                  if (onLaunchSimulation) {
                    onLaunchSimulation(title);
                  }
                }}
                className="px-5 py-2.5 rounded-full bg-stone-900 text-white hover:bg-stone-800 text-xs font-bold transition-colors cursor-pointer flex items-center gap-2 shrink-0"
              >
                <RotateCcw className="w-3.5 h-3.5 text-orange-400" />
                <span>Practice Again</span>
              </button>
            </div>

            {/* Overall Score & Skill Scores Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
              {/* Left: Overall Score Card */}
              <div className="lg:col-span-4 bg-gradient-to-br from-amber-500/10 via-white to-orange-50 rounded-2xl p-6 border border-amber-200 text-center flex flex-col justify-center space-y-3">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-900">
                  Overall Simulation Score
                </span>
                <div className="text-5xl sm:text-6xl font-black text-stone-900 font-mono tracking-tight">
                  {selectedSimFeedback.score}%
                </div>
                <div className="inline-flex items-center justify-center gap-1.5 text-xs text-emerald-800 font-bold bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 max-w-xs mx-auto">
                  <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
                  <span>High Workplace Performance</span>
                </div>
              </div>

              {/* Right: Evaluated Skill Breakdown */}
              <div className="lg:col-span-8 bg-white rounded-2xl p-6 border border-stone-200 space-y-4">
                <h3 className="text-sm font-bold text-stone-900 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-orange-600" />
                  <span>Skill Level Evaluation Breakdown</span>
                </h3>

                <div className="space-y-3">
                  {[
                    {
                      name: "Communication & Clarity",
                      score: selectedSimFeedback.skills.communication,
                      color: "bg-orange-500",
                    },
                    {
                      name: "Empathy & Tone",
                      score: selectedSimFeedback.skills.empathy,
                      color: "bg-emerald-500",
                    },
                    {
                      name: "Active Listening",
                      score: selectedSimFeedback.skills.activeListening,
                      color: "bg-rose-500",
                    },
                    {
                      name: "Problem Solving & Logic",
                      score: selectedSimFeedback.skills.problemSolving,
                      color: "bg-purple-500",
                    },
                    {
                      name: "Conflict Resolution",
                      score: selectedSimFeedback.skills.conflictResolution,
                      color: "bg-amber-500",
                    },
                  ].map((sk) => (
                    <div key={sk.name} className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="font-bold text-stone-800">{sk.name}</span>
                        <span className="font-mono text-orange-700 font-bold">{sk.score}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-stone-100 rounded-full overflow-hidden border border-stone-200">
                        <div
                          className={cn("h-full rounded-full", sk.color)}
                          style={{ width: `${sk.score}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* What You Did Well vs What to Improve */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Positive Highlights */}
              <div className="bg-white rounded-2xl p-5 border border-emerald-200 space-y-3">
                <h3 className="text-sm font-bold text-emerald-900 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>What You Did Well</span>
                </h3>
                <ul className="space-y-2.5">
                  {selectedSimFeedback.positiveHighlights.map((point) => (
                    <li key={point} className="flex items-start gap-2 text-xs text-stone-700 leading-relaxed">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 mt-1.5" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Improvement Points */}
              <div className="bg-white rounded-2xl p-5 border border-orange-200 space-y-3">
                <h3 className="text-sm font-bold text-orange-950 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-orange-600" />
                  <span>What You Could Improve</span>
                </h3>
                <ul className="space-y-2.5">
                  {selectedSimFeedback.improvementPoints.map((point) => (
                    <li key={point} className="flex items-start gap-2 text-xs text-stone-700 leading-relaxed">
                      <span className="w-1.5 h-1.5 rounded-full bg-orange-500 shrink-0 mt-1.5" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Key Conversation Moments & AI Analysis */}
            <div className="bg-white rounded-2xl p-5 border border-stone-200 space-y-4">
              <h3 className="text-sm font-bold text-stone-900 flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-orange-600" />
                <span>Key Conversation Moments & AI Analysis</span>
              </h3>

              <div className="space-y-3">
                {selectedSimFeedback.keyMoments.map((moment, idx) => (
                  <div
                    key={idx}
                    className={cn(
                      "p-4 rounded-xl border text-xs space-y-1 leading-relaxed",
                      moment.quality === "good"
                        ? "bg-emerald-50/70 border-emerald-200 text-stone-800"
                        : "bg-orange-50/70 border-orange-200 text-stone-800"
                    )}
                  >
                    <div className="flex items-center justify-between font-mono text-[10px]">
                      <span className="font-bold text-stone-700">Timestamp {moment.timestamp}</span>
                      <span
                        className={
                          moment.quality === "good"
                            ? "text-emerald-800 font-bold"
                            : "text-orange-800 font-bold"
                        }
                      >
                        {moment.quality === "good" ? "Effective Response" : "Improvement Opportunity"}
                      </span>
                    </div>
                    <p className="text-stone-700">{moment.note}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommended Next Actions to Improve */}
            <div className="bg-white rounded-2xl p-5 border border-stone-200 space-y-4">
              <h3 className="text-sm font-bold text-stone-900 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-orange-600" />
                <span>Recommended Next Actions to Improve</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {selectedSimFeedback.recommendedLessons.map((lesson) => (
                  <div
                    key={lesson}
                    className="p-4 rounded-xl bg-stone-50 border border-stone-200 flex items-center justify-between gap-3 text-xs"
                  >
                    <div>
                      <span className="text-[10px] font-mono text-orange-800 uppercase font-bold">
                        Recommended Class Lesson
                      </span>
                      <div className="font-bold text-stone-900 mt-0.5">{lesson}</div>
                    </div>
                    <a
                      href="/user-dashboard/classes"
                      className="px-3.5 py-1.5 rounded-full bg-white hover:bg-stone-100 text-stone-900 border border-stone-300 font-bold text-xs transition-colors cursor-pointer shrink-0"
                    >
                      Review Lesson
                    </a>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-2 flex items-center justify-between gap-3 border-t border-stone-200">
              <button
                onClick={() => {
                  const title = selectedSimFeedback.scenarioTitle;
                  setSelectedSimFeedback(null);
                  if (onLaunchSimulation) {
                    onLaunchSimulation(title);
                  }
                }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-orange-600 to-amber-600 text-white font-extrabold text-xs hover:opacity-95 transition-opacity cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Retake Simulation</span>
              </button>

              <button
                onClick={() => setSelectedSimFeedback(null)}
                className="px-6 py-2.5 rounded-full bg-stone-900 text-white font-bold text-xs hover:bg-stone-800 transition-colors cursor-pointer"
              >
                Close Feedback
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
});

