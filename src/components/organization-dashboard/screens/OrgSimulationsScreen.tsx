"use client";

import React, { useState, useMemo, memo } from "react";
import {
  Sparkles,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  Award,
  Zap,
  TrendingUp,
  MessageSquare,
  ShieldCheck,
  Eye,
  X,
  User,
  Star,
  Flame,
  ArrowUpRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SkillScores {
  communication: number;
  empathy: number;
  problemSolving: number;
  ownership: number;
  resolution: number;
}

interface CompletedSimulationItem {
  id: string;
  scenarioTitle: string;
  careerTrack: "Customer Service" | "Tech Support" | "IT Specialist" | "Healthcare Support";
  trackColor: string;
  aiCharacterName: string;
  aiCharacterRole: string;
  completedAt: string;
  overallScore: number;
  duration: string;
  member: {
    name: string;
    email: string;
    avatar: string;
  };
  skills: SkillScores;
  highlightQuote: string;
  dialoguePreview: { role: "ai" | "user"; text: string }[];
  feedbackHighlights: string[];
}

export const OrgSimulationsScreen = memo(function OrgSimulationsScreen() {
  const [selectedTrackFilter, setSelectedTrackFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSimulationDetails, setSelectedSimulationDetails] =
    useState<CompletedSimulationItem | null>(null);

  const completedSimulations: CompletedSimulationItem[] = useMemo(
    () => [
      {
        id: "sim-1",
        scenarioTitle: "Handling an Upset Customer Requesting Immediate Refund",
        careerTrack: "Customer Service",
        trackColor: "bg-orange-50 text-orange-800 border-orange-200",
        aiCharacterName: "Karen Miller",
        aiCharacterRole: "VIP Customer",
        completedAt: "15 mins ago",
        duration: "6m 20s",
        overallScore: 96,
        member: {
          name: "Sarah Jenkins",
          email: "sarah.j@acmecorp.com",
          avatar:
            "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80",
        },
        skills: {
          communication: 98,
          empathy: 97,
          problemSolving: 94,
          ownership: 96,
          resolution: 95,
        },
        highlightQuote:
          "\"I completely understand — 45 minutes on hold is unacceptable. Let me personally handle this right now.\"",
        dialoguePreview: [
          {
            role: "ai",
            text: "I've been on hold for 45 minutes. This is completely unacceptable!",
          },
          {
            role: "user",
            text: "I completely understand — 45 minutes is too long. Let me personally handle this right now with no more holds.",
          },
          {
            role: "ai",
            text: "Fine. But I just want this fixed. I'm a paying customer.",
          },
          {
            role: "user",
            text: "You deserve that. Walk me through what happened — I will stay on the line until it's done.",
          },
        ],
        feedbackHighlights: [
          "Exceptional emotional de-escalation in the first 15 seconds.",
          "Took immediate single-point ownership without passing blame.",
          "High empathy tone score (97/100).",
        ],
      },
      {
        id: "sim-2",
        scenarioTitle: "Remote Office VPN Outage SLA Triage",
        careerTrack: "Tech Support",
        trackColor: "bg-emerald-50 text-emerald-800 border-emerald-200",
        aiCharacterName: "David Sterling",
        aiCharacterRole: "Regional Branch Manager",
        completedAt: "1 hour ago",
        duration: "8m 45s",
        overallScore: 91,
        member: {
          name: "David Chen",
          email: "david.c@acmecorp.com",
          avatar:
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
        },
        skills: {
          communication: 90,
          empathy: 88,
          problemSolving: 96,
          ownership: 92,
          resolution: 90,
        },
        highlightQuote:
          "\"Let's run a fast traceroute while I isolate the tunnel interface to confirm DNS resolution.\"",
        dialoguePreview: [
          {
            role: "ai",
            text: "Our entire Austin office just lost VPN connection during client demos!",
          },
          {
            role: "user",
            text: "Understood. I am on the core gateway right now. Let's run a fast traceroute while I check IPsec tunnel health.",
          },
          {
            role: "ai",
            text: "How quickly can this be back up? We have 40 people waiting.",
          },
        ],
        feedbackHighlights: [
          "Fast diagnostic methodology and clear SLA containment.",
          "Calm technical communication under pressure.",
        ],
      },
      {
        id: "sim-3",
        scenarioTitle: "Active Ransomware Vector Containment & Isolation",
        careerTrack: "IT Specialist",
        trackColor: "bg-rose-50 text-rose-800 border-rose-200",
        aiCharacterName: "Alert Bot & SecOps Lead",
        aiCharacterRole: "Security Operations",
        completedAt: "3 hours ago",
        duration: "11m 10s",
        overallScore: 89,
        member: {
          name: "Elena Rostova",
          email: "elena.r@acmecorp.com",
          avatar:
            "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
        },
        skills: {
          communication: 86,
          empathy: 82,
          problemSolving: 95,
          ownership: 91,
          resolution: 92,
        },
        highlightQuote:
          "\"VLAN 14 segregated immediately. Revoking compromised Kerberos ticket grants.\"",
        dialoguePreview: [
          {
            role: "ai",
            text: "Heuristic alert: Unauthorized encryptor process detected on FileServer-03.",
          },
          {
            role: "user",
            text: "Severing switch port 24 and segregating VLAN 14 immediately. Revoking Kerberos ticket grants.",
          },
        ],
        feedbackHighlights: [
          "Strict adherence to NIST cybersecurity response protocol.",
          "Quick network segment isolation.",
        ],
      },
      {
        id: "sim-4",
        scenarioTitle: "Urgent Care Clinical Intake & Empathetic Triage",
        careerTrack: "Healthcare Support",
        trackColor: "bg-purple-50 text-purple-800 border-purple-200",
        aiCharacterName: "Maria Santos",
        aiCharacterRole: "Anxious Patient",
        completedAt: "4 hours ago",
        duration: "7m 15s",
        overallScore: 94,
        member: {
          name: "Liam O'Connor",
          email: "liam.o@acmecorp.com",
          avatar:
            "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80",
        },
        skills: {
          communication: 96,
          empathy: 98,
          problemSolving: 91,
          ownership: 92,
          resolution: 93,
        },
        highlightQuote:
          "\"You are in safe hands, Maria. Let's take a deep breath together while I record your symptoms.\"",
        dialoguePreview: [
          {
            role: "ai",
            text: "My chest feels tight and I'm really scared. What is happening to me?",
          },
          {
            role: "user",
            text: "You are in safe hands, Maria. Let's take a deep breath together. I'm alerting the triage nurse right now.",
          },
        ],
        feedbackHighlights: [
          "Outstanding empathy and patient de-escalation.",
          "Adherence to HIPAA protocols while reassuring patient.",
        ],
      },
      {
        id: "sim-5",
        scenarioTitle: "Billing Dispute & Unauthorized Subscription Charge",
        careerTrack: "Customer Service",
        trackColor: "bg-orange-50 text-orange-800 border-orange-200",
        aiCharacterName: "Robert Vance",
        aiCharacterRole: "Frustrated Customer",
        completedAt: "Yesterday",
        duration: "5m 40s",
        overallScore: 95,
        member: {
          name: "Aisha Khan",
          email: "aisha.k@acmecorp.com",
          avatar:
            "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80",
        },
        skills: {
          communication: 96,
          empathy: 94,
          problemSolving: 95,
          ownership: 97,
          resolution: 96,
        },
        highlightQuote:
          "\"I will reverse the $89 fee right now and send the email confirmation while we talk.\"",
        dialoguePreview: [
          {
            role: "ai",
            text: "There is an $89 fee on my account that I never authorized!",
          },
          {
            role: "user",
            text: "I completely own this. Let me pull up your account and reverse this right now.",
          },
        ],
        feedbackHighlights: [
          "First-contact resolution achieved in under 6 minutes.",
          "High ownership score (97/100).",
        ],
      },
      {
        id: "sim-6",
        scenarioTitle: "Critical Server Kernel Panic & Database Recovery",
        careerTrack: "Tech Support",
        trackColor: "bg-emerald-50 text-emerald-800 border-emerald-200",
        aiCharacterName: "Tom Walker",
        aiCharacterRole: "DevOps Engineer",
        completedAt: "Yesterday",
        duration: "9m 10s",
        overallScore: 88,
        member: {
          name: "David Chen",
          email: "david.c@acmecorp.com",
          avatar:
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
        },
        skills: {
          communication: 86,
          empathy: 84,
          problemSolving: 92,
          ownership: 90,
          resolution: 89,
        },
        highlightQuote:
          "\"Mounted read-only snapshot. Restoring WAL logs from secondary replica.\"",
        dialoguePreview: [
          {
            role: "ai",
            text: "Database primary is in kernel panic reboot loop!",
          },
          {
            role: "user",
            text: "Failover triggered. Mounting read-only snapshot while restoring WAL logs.",
          },
        ],
        feedbackHighlights: [
          "Zero data loss achieved during recovery scenario.",
        ],
      },
    ],
    []
  );

  const filteredSimulations = useMemo(() => {
    return completedSimulations.filter((sim) => {
      const matchesTrack =
        selectedTrackFilter === "all" || sim.careerTrack === selectedTrackFilter;
      const matchesSearch =
        sim.scenarioTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sim.member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sim.member.email.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesTrack && matchesSearch;
    });
  }, [completedSimulations, selectedTrackFilter, searchTerm]);

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white rounded-2xl p-5 border border-stone-200 shadow-sm">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-50 border border-orange-200 text-xs text-orange-900 font-bold mb-2">
            <Sparkles className="w-3.5 h-3.5 text-orange-600" />
            <span>MEMBER SIMULATION LOGS</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-stone-900 flex items-center gap-2">
            <span>Completed AI Workplace Simulations</span>
          </h2>
          <p className="text-xs text-stone-500 mt-0.5 max-w-xl">
            Live feed and detailed score evaluations of real-time AI simulations recently completed by your team members across all 4 career tracks.
          </p>
        </div>

        {/* Quick KPI Stat Pill */}
        <div className="flex items-center gap-3 bg-[#FCFAF6] p-3 rounded-2xl border border-stone-200 shrink-0">
          <div className="text-right">
            <div className="text-[10px] font-mono text-stone-500 uppercase font-semibold">
              Avg Team Score
            </div>
            <div className="text-xl font-black text-emerald-700 font-mono">
              92.2%
            </div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700">
            <TrendingUp className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* 4 Career Track Filter Tabs & Search Bar */}
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Career Track Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1">
            {[
              { id: "all", label: `All Simulations (${completedSimulations.length})` },
              { id: "Customer Service", label: "Customer Service" },
              { id: "Tech Support", label: "Tech Support" },
              { id: "IT Specialist", label: "IT Specialist" },
              { id: "Healthcare Support", label: "Healthcare Support" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedTrackFilter(tab.id)}
                className={cn(
                  "px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer border",
                  selectedTrackFilter === tab.id
                    ? "bg-stone-900 border-stone-900 text-white font-bold shadow-xs"
                    : "bg-white border-stone-200 text-stone-600 hover:text-stone-900 hover:bg-stone-50 shadow-xs"
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full sm:w-72 shrink-0">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by member or scenario..."
              className="w-full bg-white border border-stone-200 rounded-xl pl-10 pr-4 py-2 text-xs text-stone-900 placeholder-stone-400 focus:outline-none focus:border-orange-500 transition-colors"
            />
          </div>
        </div>
      </div>

      {/* Completed Simulations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredSimulations.map((sim) => (
          <div
            key={sim.id}
            className="bg-white rounded-2xl p-5 sm:p-6 border border-stone-200 shadow-sm flex flex-col justify-between space-y-4 hover:border-stone-300 transition-colors group"
          >
            {/* Top Row: Career Track & Score */}
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-2">
                <span
                  className={cn(
                    "px-3 py-1 rounded-full text-[10px] font-bold border font-mono",
                    sim.trackColor
                  )}
                >
                  {sim.careerTrack}
                </span>

                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-stone-400 font-mono">
                    {sim.completedAt}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 font-mono text-xs font-bold">
                    Score: {sim.overallScore}%
                  </span>
                </div>
              </div>

              {/* Scenario Title */}
              <h3 className="text-base sm:text-lg font-extrabold text-stone-900 leading-snug group-hover:text-orange-600 transition-colors">
                {sim.scenarioTitle}
              </h3>

              {/* Highlight Quote Box */}
              <div className="p-3.5 rounded-xl bg-[#FCFAF6] border border-stone-200 space-y-1.5 text-xs">
                <div className="text-[10px] font-mono uppercase text-orange-700 font-bold flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-orange-600" />
                  <span>KEY MEMBER RESPONSE</span>
                </div>
                <p className="text-stone-700 italic text-xs leading-relaxed">
                  {sim.highlightQuote}
                </p>
              </div>

              {/* Evaluated Competency Bar Breakdown */}
              <div className="space-y-1.5 pt-1">
                <div className="flex justify-between text-[10px] font-mono text-stone-500">
                  <span>Empathy: <strong className="text-stone-800">{sim.skills.empathy}%</strong></span>
                  <span>Ownership: <strong className="text-stone-800">{sim.skills.ownership}%</strong></span>
                  <span>Problem Solving: <strong className="text-stone-800">{sim.skills.problemSolving}%</strong></span>
                </div>
                <div className="w-full h-1.5 bg-stone-100 rounded-full overflow-hidden border border-stone-200/60">
                  <div
                    className="h-full bg-gradient-to-r from-orange-500 via-amber-500 to-emerald-500 rounded-full"
                    style={{ width: `${sim.overallScore}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Bottom Row: Member Info & Details Button */}
            <div className="pt-3 border-t border-stone-100 flex items-center justify-between gap-3">
              {/* Member Card */}
              <div className="flex items-center gap-2.5 truncate">
                <img
                  src={sim.member.avatar}
                  alt={sim.member.name}
                  className="w-8 h-8 rounded-full object-cover border border-stone-200 shrink-0"
                />
                <div className="truncate">
                  <div className="font-bold text-stone-900 text-xs truncate">
                    {sim.member.name}
                  </div>
                  <div className="text-[10px] text-stone-500 font-mono truncate">
                    {sim.member.email}
                  </div>
                </div>
              </div>

              {/* View Transcript & Scoring Button */}
              <button
                onClick={() => setSelectedSimulationDetails(sim)}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-800 border border-stone-200 text-xs font-semibold transition-colors cursor-pointer shrink-0"
              >
                <Eye className="w-3.5 h-3.5 text-orange-600" />
                <span>Transcript</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* FULL SIMULATION TRANSCRIPT & FEEDBACK MODAL */}
      {selectedSimulationDetails && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/50 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-white border border-stone-200 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 text-left max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedSimulationDetails(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-500 hover:text-stone-900 cursor-pointer transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="space-y-2 border-b border-stone-100 pb-4">
              <div className="flex items-center gap-2">
                <span
                  className={cn(
                    "px-2.5 py-0.5 rounded-full text-[10px] font-bold border font-mono",
                    selectedSimulationDetails.trackColor
                  )}
                >
                  {selectedSimulationDetails.careerTrack}
                </span>
                <span className="text-xs text-stone-500 font-mono">
                  {selectedSimulationDetails.completedAt} • Duration: {selectedSimulationDetails.duration}
                </span>
              </div>
              <h3 className="text-xl font-extrabold text-stone-900">
                {selectedSimulationDetails.scenarioTitle}
              </h3>
            </div>

            {/* Member & Score Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
              <div className="sm:col-span-4 bg-gradient-to-br from-orange-50 via-amber-50 to-orange-50/50 rounded-2xl p-4 border border-orange-200 text-center flex flex-col justify-center space-y-1">
                <span className="text-[10px] font-mono uppercase text-stone-500 font-bold">
                  OVERALL AI SCORE
                </span>
                <div className="text-4xl font-extrabold text-stone-900 font-mono">
                  {selectedSimulationDetails.overallScore}%
                </div>
                <span className="text-[10px] text-emerald-700 font-bold">
                  Verified Simulation
                </span>
              </div>

              <div className="sm:col-span-8 bg-[#FCFAF6] rounded-2xl p-4 border border-stone-200 space-y-2.5">
                <span className="text-xs font-bold text-stone-900 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-orange-600" />
                  <span>Participant Performance</span>
                </span>
                <div className="flex items-center gap-3">
                  <img
                    src={selectedSimulationDetails.member.avatar}
                    alt={selectedSimulationDetails.member.name}
                    className="w-10 h-10 rounded-full object-cover border border-stone-200"
                  />
                  <div>
                    <div className="font-bold text-stone-900 text-xs">
                      {selectedSimulationDetails.member.name}
                    </div>
                    <div className="text-[11px] text-stone-500 font-mono">
                      {selectedSimulationDetails.member.email}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 pt-2 border-t border-stone-200 text-center">
                  <div className="bg-white border border-stone-200 p-2 rounded-xl">
                    <div className="text-[9px] text-stone-500 font-mono font-bold">EMPATHY</div>
                    <div className="font-bold text-orange-600 text-xs">
                      {selectedSimulationDetails.skills.empathy}%
                    </div>
                  </div>
                  <div className="bg-white border border-stone-200 p-2 rounded-xl">
                    <div className="text-[9px] text-stone-500 font-mono font-bold">OWNERSHIP</div>
                    <div className="font-bold text-emerald-700 text-xs">
                      {selectedSimulationDetails.skills.ownership}%
                    </div>
                  </div>
                  <div className="bg-white border border-stone-200 p-2 rounded-xl">
                    <div className="text-[9px] text-stone-500 font-mono font-bold">RESOLUTION</div>
                    <div className="font-bold text-blue-700 text-xs">
                      {selectedSimulationDetails.skills.resolution}%
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* AI Simulation Dialogue Transcript */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-stone-900 flex items-center gap-1.5">
                <MessageSquare className="w-4 h-4 text-orange-600" />
                <span>Simulation Dialogue Transcript</span>
              </h4>

              <div className="space-y-2.5 max-h-52 overflow-y-auto pr-1">
                {selectedSimulationDetails.dialoguePreview.map((turn, index) => (
                  <div
                    key={index}
                    className={cn(
                      "p-3 rounded-2xl text-xs leading-relaxed max-w-[85%]",
                      turn.role === "user"
                        ? "bg-orange-50 border border-orange-200 text-stone-900 ml-auto"
                        : "bg-stone-100 border border-stone-200 text-stone-800 mr-auto"
                    )}
                  >
                    <div className="text-[9px] font-mono font-bold mb-1 opacity-70 uppercase">
                      {turn.role === "user"
                        ? `${selectedSimulationDetails.member.name} (Member)`
                        : `${selectedSimulationDetails.aiCharacterName} (AI Character)`}
                    </div>
                    {turn.text}
                  </div>
                ))}
              </div>
            </div>

            {/* AI Feedback Highlights */}
            <div className="space-y-2 bg-[#FCFAF6] p-4 rounded-2xl border border-stone-200 text-xs">
              <h4 className="font-bold text-stone-900 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>AI Rubric Feedback Highlights</span>
              </h4>
              <ul className="space-y-1 text-stone-600 list-disc list-inside">
                {selectedSimulationDetails.feedbackHighlights.map((point, i) => (
                  <li key={i}>{point}</li>
                ))}
              </ul>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setSelectedSimulationDetails(null)}
                className="px-5 py-2.5 rounded-full bg-stone-900 text-white font-bold text-xs hover:bg-stone-800 transition-colors cursor-pointer shadow-sm"
              >
                Close Transcript
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
});
