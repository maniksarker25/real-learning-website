"use client";

import React, { useState, useCallback, useMemo, memo } from "react";
import { Search, UserPlus, CheckCircle2, X, ShieldCheck, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAccount } from "@/context/AccountContext";
import { OrgRole } from "@/types/account";
import { RowActionMenu } from "@/components/ui/RowActionMenu";

interface MemberUserItem {
  id: string;
  name: string;
  email: string;
  avatar: string;
  track: string;
  trackColor?: string;
  enrolledClasses: number;
  progress: number;
  score: string;
  status: "Active" | "Pending" | "Suspended";
  skillsBreakdown?: {
    communication: number;
    deEscalation: number;
    diagnostics: number;
    empathy: number;
  };
  completedClassesHistory?: { title: string; score: string; date: string }[];
}

const TRACK_FILTER_OPTIONS = [
  { id: "all", label: "All Tracks" },
  { id: "Customer Service", label: "Customer Service" },
  { id: "Tech Support", label: "Tech Support" },
  { id: "IT Specialist", label: "IT Specialist" },
  { id: "Healthcare Support", label: "Healthcare" },
] as const;

const STATUS_FILTER_OPTIONS = [
  { id: "all", label: "All Statuses" },
  { id: "Active", label: "Active" },
  { id: "Pending", label: "Pending" },
  { id: "Suspended", label: "Suspended" },
] as const;

export const OrgMembersScreen = memo(function OrgMembersScreen() {
  const { session } = useAccount();
  const currentOrgRole: OrgRole = session.orgRole || "owner";
  const isOwner = currentOrgRole === "owner";

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTrack, setSelectedTrack] = useState("all");
  const [selectedStatusFilter, setSelectedStatusFilter] = useState("all");

  // Modals state
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [selectedUserDetails, setSelectedUserDetails] =
    useState<MemberUserItem | null>(null);

  // Invite Modal Form State
  const [inviteName, setInviteName] = useState("");
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteTrack, setInviteTrack] = useState("Customer Service");
  const [inviteSuccess, setInviteSuccess] = useState(false);

  // Toast feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  }, []);

  const [members, setMembers] = useState<MemberUserItem[]>([
    {
      id: "u1",
      name: "Sarah Jenkins",
      email: "sarah.j@acmecorp.com",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80",
      track: "Customer Service",
      enrolledClasses: 4,
      progress: 94,
      score: "96%",
      status: "Active",
      skillsBreakdown: {
        communication: 98,
        deEscalation: 96,
        diagnostics: 90,
        empathy: 97,
      },
      completedClassesHistory: [
        {
          title: "De-escalating High-Pressure Customer Complaints",
          score: "96%",
          date: "Aug 21, 2026",
        },
        {
          title: "Active Listening & Echo Statements",
          score: "95%",
          date: "Aug 18, 2026",
        },
        {
          title: "Omnichannel Chat & Support Protocol",
          score: "94%",
          date: "Aug 14, 2026",
        },
      ],
    },
    {
      id: "u2",
      name: "David Chen",
      email: "david.c@acmecorp.com",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
      track: "Tech Support",
      enrolledClasses: 3,
      progress: 78,
      score: "88%",
      status: "Active",
      skillsBreakdown: {
        communication: 86,
        deEscalation: 84,
        diagnostics: 92,
        empathy: 88,
      },
      completedClassesHistory: [
        {
          title: "L1 Technical Troubleshooting & Diagnostics",
          score: "88%",
          date: "Aug 20, 2026",
        },
        {
          title: "Remote Desktop SLA Management",
          score: "87%",
          date: "Aug 15, 2026",
        },
      ],
    },
    {
      id: "u3",
      name: "Elena Rostova",
      email: "elena.r@acmecorp.com",
      avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
      track: "IT Specialist",
      enrolledClasses: 3,
      progress: 64,
      score: "85%",
      status: "Active",
      skillsBreakdown: {
        communication: 82,
        deEscalation: 80,
        diagnostics: 90,
        empathy: 85,
      },
      completedClassesHistory: [
        {
          title: "Enterprise Network Security & Incident Response",
          score: "85%",
          date: "Aug 19, 2026",
        },
      ],
    },
    {
      id: "u4",
      name: "Aisha Khan",
      email: "aisha.k@acmecorp.com",
      avatar:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80",
      track: "Customer Service",
      enrolledClasses: 5,
      progress: 98,
      score: "94%",
      status: "Active",
      skillsBreakdown: {
        communication: 95,
        deEscalation: 94,
        diagnostics: 92,
        empathy: 96,
      },
      completedClassesHistory: [
        {
          title: "De-escalating High-Pressure Customer Complaints",
          score: "94%",
          date: "Aug 22, 2026",
        },
        {
          title: "Active Listening & Echo Statements",
          score: "95%",
          date: "Aug 19, 2026",
        },
      ],
    },
    {
      id: "u5",
      name: "Liam O'Connor",
      email: "liam.o@acmecorp.com",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80",
      track: "Healthcare Support",
      enrolledClasses: 2,
      progress: 45,
      score: "81%",
      status: "Active",
      skillsBreakdown: {
        communication: 80,
        deEscalation: 78,
        diagnostics: 82,
        empathy: 84,
      },
      completedClassesHistory: [
        {
          title: "Patient Intake & Empathetic Communication",
          score: "81%",
          date: "Aug 16, 2026",
        },
      ],
    },
  ]);

  const filteredMembers = useMemo(() => {
    return members.filter((member) => {
      const matchesSearch =
        member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesTrack =
        selectedTrack === "all" || member.track === selectedTrack;
      const matchesStatus =
        selectedStatusFilter === "all" ||
        member.status === selectedStatusFilter;
      return matchesSearch && matchesTrack && matchesStatus;
    });
  }, [members, searchTerm, selectedTrack, selectedStatusFilter]);

  const handleRemoveMember = useCallback(
    (memberId: string, memberName: string) => {
      setMembers((prev) => prev.filter((m) => m.id !== memberId));
      showToast(`${memberName} removed from organization workspace.`);
    },
    [showToast]
  );

  const handleInviteSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const newMember: MemberUserItem = {
        id: `u-${Date.now()}`,
        name: inviteName,
        email: inviteEmail,
        avatar:
          "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80",
        track: inviteTrack,
        enrolledClasses: 1,
        progress: 0,
        score: "Pending",
        status: "Pending",
      };

      setMembers((prev) => [newMember, ...prev]);
      setInviteSuccess(true);
      setTimeout(() => {
        setInviteSuccess(false);
        setIsInviteModalOpen(false);
        setInviteName("");
        setInviteEmail("");
        showToast(`Member invite sent to ${inviteName}`);
      }, 1500);
    },
    [inviteName, inviteEmail, inviteTrack, showToast],
  );

  return (
    <div className="space-y-4">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-stone-900 text-white text-xs font-bold px-4 py-2.5 rounded-lg border border-stone-800 flex items-center gap-2 animate-in fade-in slide-in-from-top-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Banner (Flat, No Shadow) */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white rounded-xl p-4 sm:p-5 border border-stone-200">
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-stone-900">
            Organization Members & Learner Participants
          </h2>
          <p className="text-xs text-stone-500 mt-0.5">
            View enrolled learner performance, track completion progress,
            evaluate AI simulation scores, and manage access.
          </p>
        </div>

        <button
          onClick={() => setIsInviteModalOpen(true)}
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-md bg-stone-900 text-white font-medium text-xs hover:bg-stone-800 transition-colors cursor-pointer shrink-0"
        >
          <UserPlus className="w-4 h-4 text-orange-400" />
          <span>Invite New Member</span>
        </button>
      </div>

      {/* Quick Metric Cards (1 Primary Big Card + 2 Child Small Cards) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 items-stretch">
        {/* PRIMARY BIG CARD: AVG SIMULATION SCORE (DARK BACKGROUND, WHITE TEXT) */}
        <div className="lg:col-span-7 bg-stone-900 text-white rounded-xl p-5 sm:p-6 border border-stone-800 hover:bg-stone-900/95 transition-colors flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="text-xs font-semibold text-stone-400 uppercase tracking-wider font-mono">
                Avg Simulation Score
              </span>
              <span className="text-xs font-mono font-medium text-emerald-400 bg-emerald-950/70 px-2 py-0.5 rounded border border-emerald-800/60">
                +3.8% Cycle
              </span>
            </div>

            <div className="text-4xl sm:text-5xl font-black text-white tracking-tight font-mono mt-1">
              91.4%
            </div>

            <p className="text-xs text-stone-400 mt-2">
              Evaluated across real-time AI simulations, customer de-escalations, and technical diagnostics.
            </p>
          </div>

          <div className="pt-4 mt-4 border-t border-stone-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-3 text-xs text-stone-400 font-mono">
              <span>
                Top: <strong className="text-white font-bold">98%</strong>
              </span>
              <span className="text-stone-700">•</span>
              <span>
                Median: <strong className="text-white font-bold">88%</strong>
              </span>
              <span className="text-stone-700">•</span>
              <span>
                Passing: <strong className="text-white font-bold">100%</strong>
              </span>
            </div>

            <div className="w-full sm:w-28 h-1.5 bg-stone-800 rounded-full overflow-hidden border border-stone-700/60">
              <div className="h-full bg-emerald-500 rounded-full w-[91%]" />
            </div>
          </div>
        </div>

        {/* 2 CHILD SMALL CARDS */}
        <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3.5">
          {/* Child Card 1: Total Enrolled Learners */}
          <div className="bg-white rounded-xl p-4 sm:p-4.5 border border-stone-200 hover:bg-stone-50/50 transition-colors flex flex-col justify-between">
            <div className="flex items-center justify-between gap-2 mb-1.5">
              <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider font-mono">
                Total Enrolled Learners
              </span>
              <span className="text-xs font-mono font-medium text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                100% Utilization
              </span>
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight font-mono">
              {members.length}
            </div>
            <div className="text-xs text-stone-500 font-medium mt-1">
              Active learner participants in workspace
            </div>
          </div>

          {/* Child Card 2: Active Career Tracks */}
          <div className="bg-white rounded-xl p-4 sm:p-4.5 border border-stone-200 hover:bg-stone-50/50 transition-colors flex flex-col justify-between">
            <div className="flex items-center justify-between gap-2 mb-1.5">
              <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider font-mono">
                Active Career Tracks
              </span>
              <span className="text-xs font-mono font-medium text-orange-800 bg-orange-50 px-2 py-0.5 rounded border border-orange-200">
                Assigned
              </span>
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
              4 Tracks
            </div>
            <div className="text-xs text-stone-500 font-medium mt-1">
              Customer Service, Tech Support, IT & Healthcare
            </div>
          </div>
        </div>
      </div>

      {/* Members Table Card (Flat, No Shadow) */}
      <div className="bg-white rounded-xl p-4 border border-stone-200 space-y-3 overflow-hidden">
        {/* Table Header: Title + Count + Search & Dropdown Filters */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 border-b border-stone-100 pb-3">
          <div>
            <h3 className="text-sm font-bold text-stone-900">
              Participant Members
            </h3>
            <p className="text-xs text-stone-500 mt-0.5">
              Showing {filteredMembers.length} of {members.length} participants
            </p>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-2 w-full lg:w-auto">
            {/* Search Input */}
            <div className="relative w-full sm:w-56">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-stone-400 pointer-events-none" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by name or email..."
                className="w-full bg-stone-50/80 border border-stone-200 rounded-md pl-8 pr-3 py-1.5 text-xs text-stone-900 placeholder-stone-400 focus:outline-none focus:border-stone-400 transition-colors"
              />
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              {/* Track Dropdown Filter */}
              <div className="relative flex-1 sm:flex-initial">
                <select
                  value={selectedTrack}
                  onChange={(e) => setSelectedTrack(e.target.value)}
                  aria-label="Filter by career track"
                  className="w-full sm:w-auto appearance-none bg-stone-50/80 hover:bg-stone-100 border border-stone-200 rounded-md pl-3 pr-7 py-1.5 text-xs font-medium text-stone-700 focus:outline-none focus:border-stone-400 transition-colors cursor-pointer"
                >
                  {TRACK_FILTER_OPTIONS.map((opt) => (
                    <option key={opt.id} value={opt.id} className="bg-white text-stone-900">
                      {opt.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-stone-400 pointer-events-none" />
              </div>

              {/* Status Dropdown Filter */}
              <div className="relative flex-1 sm:flex-initial">
                <select
                  value={selectedStatusFilter}
                  onChange={(e) => setSelectedStatusFilter(e.target.value)}
                  aria-label="Filter by status"
                  className="w-full sm:w-auto appearance-none bg-stone-50/80 hover:bg-stone-100 border border-stone-200 rounded-md pl-3 pr-7 py-1.5 text-xs font-medium text-stone-700 focus:outline-none focus:border-stone-400 transition-colors cursor-pointer"
                >
                  {STATUS_FILTER_OPTIONS.map((opt) => (
                    <option key={opt.id} value={opt.id} className="bg-white text-stone-900">
                      {opt.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-stone-400 pointer-events-none" />
              </div>

              {/* Reset Filter Button (if filtered) */}
              {(selectedTrack !== "all" || selectedStatusFilter !== "all" || searchTerm) && (
                <button
                  type="button"
                  onClick={() => {
                    setSelectedTrack("all");
                    setSelectedStatusFilter("all");
                    setSearchTerm("");
                  }}
                  className="text-xs text-stone-500 hover:text-stone-900 font-medium underline underline-offset-2 transition-colors px-1 shrink-0"
                >
                  Reset
                </button>
              )}
            </div>
          </div>
        </div>

        {/* MOBILE VIEW: Clean, Responsive Card List (Visible on screens < md) */}
        <div className="md:hidden divide-y divide-stone-100 -mx-4 -mb-4">
          {filteredMembers.length === 0 ? (
            <div className="text-center text-stone-400 text-xs py-8 px-4 leading-normal">
              No members found matching current filter.
            </div>
          ) : (
            filteredMembers.map((member) => (
              <div
                key={member.id}
                className="p-4 space-y-3 hover:bg-stone-50/60 transition-colors"
              >
                {/* Mobile Card Row 1: Participant Info & 3-Dot Actions */}
                <div className="flex items-start justify-between gap-2.5">
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={member.avatar}
                      alt={member.name}
                      className="w-10 h-10 rounded-full object-cover border border-stone-200 shrink-0"
                    />
                    <div className="min-w-0">
                      <div className="text-sm font-semibold text-stone-900 truncate">
                        {member.name}
                      </div>
                      <div className="text-xs text-stone-400 font-mono truncate">
                        {member.email}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-mono text-stone-700 bg-stone-100 border border-stone-200">
                      {member.status}
                    </span>
                    <RowActionMenu
                      buttonAriaLabel={`Actions for ${member.name}`}
                      theme="light"
                      align="right"
                      items={[
                        {
                          id: "details",
                          label: "View Details",
                          onClick: () => setSelectedUserDetails(member),
                        },
                        {
                          id: "remind",
                          label: "Send Reminder",
                          onClick: () =>
                            showToast(`Reminder sent to ${member.name}`),
                        },
                        {
                          id: "remove",
                          label: "Remove Member",
                          danger: true,
                          onClick: () =>
                            handleRemoveMember(member.id, member.name),
                        },
                      ]}
                    />
                  </div>
                </div>

                {/* Mobile Card Row 2: Track Badge & Score */}
                <div className="flex items-center justify-between gap-2 text-xs">
                  <span className="inline-flex items-center px-2.5 py-1 rounded font-mono text-stone-700 bg-stone-100 border border-stone-200">
                    {member.track}
                  </span>
                  <div className="flex items-center gap-1.5 font-mono">
                    <span className="text-stone-400 text-xs">Avg Score:</span>
                    <span className="font-bold text-xs text-stone-900 bg-stone-100 px-2.5 py-0.5 rounded border border-stone-200">
                      {member.score}
                    </span>
                  </div>
                </div>

                {/* Mobile Card Row 3: Class Count & Progress */}
                <div className="space-y-1.5 pt-0.5">
                  <div className="flex items-center justify-between text-xs text-stone-600 font-mono">
                    <span>{member.enrolledClasses} Classes enrolled</span>
                    <span className="font-bold text-stone-800">{member.progress}% Complete</span>
                  </div>
                  <div className="w-full h-1.5 bg-stone-100 rounded-full overflow-hidden border border-stone-200/60">
                    <div
                      className="h-full bg-orange-500 rounded-full"
                      style={{ width: `${member.progress}%` }}
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
                <th className="px-2.5 lg:px-3.5 py-2.5 font-semibold leading-normal">
                  Participant
                </th>
                <th className="px-2.5 lg:px-3.5 py-2.5 font-semibold leading-normal">
                  Track
                </th>
                <th className="px-2.5 lg:px-3.5 py-2.5 font-semibold leading-normal">
                  Classes
                </th>
                <th className="px-2.5 lg:px-3.5 py-2.5 font-semibold leading-normal">
                  Progress
                </th>
                <th className="px-2.5 lg:px-3.5 py-2.5 font-semibold text-right leading-normal">
                  Score
                </th>
                <th className="px-2.5 lg:px-3.5 py-2.5 font-semibold leading-normal">
                  Status
                </th>
                <th className="px-1.5 lg:px-2 py-2.5 font-semibold text-center w-8">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredMembers.length === 0 ? (
                <tr className="h-12">
                  <td
                    colSpan={7}
                    className="text-center text-stone-400 text-xs py-8 leading-normal"
                  >
                    No members found matching current filter.
                  </td>
                </tr>
              ) : (
                filteredMembers.map((member) => (
                  <tr
                    key={member.id}
                    className="h-12 border-b border-stone-100 last:border-0 hover:bg-stone-50/70 transition-colors"
                  >
                    {/* Participant: Avatar + Name + Email */}
                    <td className="px-2.5 lg:px-3.5 py-3 whitespace-nowrap align-middle">
                      <div className="flex items-center gap-2.5">
                        <img
                          src={member.avatar}
                          alt={member.name}
                          className="w-7 h-7 rounded-full object-cover border border-stone-200 shrink-0"
                        />
                        <div className="flex items-baseline gap-2 truncate">
                          <span className="text-sm font-semibold text-stone-900 leading-normal">
                            {member.name}
                          </span>
                          <span className="text-xs text-stone-400 font-mono hidden xl:inline leading-normal">
                            {member.email}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Track Badge (Fixed Neutral Color) */}
                    <td className="px-2.5 lg:px-3.5 py-3 whitespace-nowrap align-middle">
                      <span className="inline-flex items-center px-2 lg:px-2.5 py-1 rounded text-xs font-mono text-stone-700 bg-stone-100 border border-stone-200 leading-normal">
                        {member.track}
                      </span>
                    </td>

                    {/* Enrolled Classes */}
                    <td className="px-2.5 lg:px-3.5 py-3 text-stone-700 font-mono text-xs whitespace-nowrap font-medium align-middle leading-normal">
                      {member.enrolledClasses} Classes
                    </td>

                    {/* Progress Bar (Solid Orange) */}
                    <td className="px-2.5 lg:px-3.5 py-3 whitespace-nowrap align-middle w-24 lg:w-32">
                      <div className="flex items-center gap-1.5 lg:gap-2">
                        <div className="w-12 lg:w-16 h-1.5 bg-stone-100 rounded-full overflow-hidden border border-stone-200/60">
                          <div
                            className="h-full bg-orange-500 rounded-full"
                            style={{ width: `${member.progress}%` }}
                          />
                        </div>
                        <span className="font-mono text-xs text-stone-700 font-bold leading-normal">
                          {member.progress}%
                        </span>
                      </div>
                    </td>

                    {/* AI Score */}
                    <td className="px-2.5 lg:px-3.5 py-3 text-right whitespace-nowrap align-middle">
                      <span className="font-mono font-bold text-xs text-stone-900 bg-stone-100 px-2 lg:px-2.5 py-1 rounded border border-stone-200 leading-normal inline-block">
                        {member.score}
                      </span>
                    </td>

                    {/* Status */}
                    <td className="px-2.5 lg:px-3.5 py-3 whitespace-nowrap align-middle text-xs font-mono text-stone-700 leading-normal">
                      {member.status}
                    </td>

                    {/* Reusable 3-Dot Action Menu */}
                    <td className="px-1 py-3 text-center whitespace-nowrap align-middle">
                      <RowActionMenu
                        buttonAriaLabel={`Actions for ${member.name}`}
                        theme="light"
                        align="right"
                        items={[
                          {
                            id: "details",
                            label: "View Details",
                            onClick: () => setSelectedUserDetails(member),
                          },
                          {
                            id: "remind",
                            label: "Send Reminder",
                            onClick: () =>
                              showToast(`Reminder sent to ${member.name}`),
                          },
                          {
                            id: "remove",
                            label: "Remove Member",
                            danger: true,
                            onClick: () =>
                              handleRemoveMember(member.id, member.name),
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
      </div>

      {/* FULL USER DETAILS MODAL (Flat, No Shadows) */}
      {selectedUserDetails && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/40 backdrop-blur-xs overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-white border border-stone-200 rounded-xl p-6 sm:p-7 space-y-5 text-left max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedUserDetails(null)}
              className="absolute top-4 right-4 p-2 rounded-md bg-stone-100 hover:bg-stone-200 text-stone-500 hover:text-stone-900 cursor-pointer transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Profile Header */}
            <div className="flex items-center gap-3.5 border-b border-stone-100 pb-4">
              <img
                src={selectedUserDetails.avatar}
                alt={selectedUserDetails.name}
                className="w-12 h-12 rounded-xl object-cover border border-stone-200 shrink-0"
              />
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-bold text-stone-900">
                    {selectedUserDetails.name}
                  </h3>
                  <span className="px-2 py-0.5 rounded text-xs font-mono text-stone-700 bg-stone-100 border border-stone-200">
                    {selectedUserDetails.track}
                  </span>
                </div>
                <div className="text-xs text-stone-500 font-mono mt-0.5">
                  {selectedUserDetails.email}
                </div>
              </div>
            </div>

            {/* AI Score & Skill Breakdown Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-3.5">
              <div className="sm:col-span-4 bg-orange-50/70 rounded-xl p-4 border border-orange-200 text-center flex flex-col justify-center space-y-1">
                <span className="text-xs font-mono uppercase text-stone-500 font-semibold">
                  OVERALL AI SCORE
                </span>
                <div className="text-3xl font-extrabold text-stone-900 font-mono">
                  {selectedUserDetails.score}
                </div>
                <span className="text-xs text-emerald-700 font-bold">
                  Evaluated via Simulations
                </span>
              </div>

              <div className="sm:col-span-8 bg-[#FCFAF6] rounded-xl p-4 border border-stone-200 space-y-2.5">
                <span className="text-xs font-bold text-stone-900 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-orange-600" />
                  <span>Evaluated Skill Competencies</span>
                </span>

                {selectedUserDetails.skillsBreakdown && (
                  <div className="space-y-2 text-xs">
                    <div>
                      <div className="flex justify-between text-xs font-mono text-stone-600 font-medium mb-1">
                        <span>Communication Tone</span>
                        <span className="text-orange-600 font-bold">
                          {selectedUserDetails.skillsBreakdown.communication}%
                        </span>
                      </div>
                      <div className="w-full h-1.5 bg-stone-200/80 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-orange-500 rounded-full"
                          style={{
                            width: `${selectedUserDetails.skillsBreakdown.communication}%`,
                          }}
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-mono text-stone-600 font-medium mb-1">
                        <span>De-escalation & Conflict</span>
                        <span className="text-emerald-700 font-bold">
                          {selectedUserDetails.skillsBreakdown.deEscalation}%
                        </span>
                      </div>
                      <div className="w-full h-1.5 bg-stone-200/80 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-emerald-500 rounded-full"
                          style={{
                            width: `${selectedUserDetails.skillsBreakdown.deEscalation}%`,
                          }}
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-mono text-stone-600 font-medium mb-1">
                        <span>Technical Triage & Logic</span>
                        <span className="text-purple-700 font-bold">
                          {selectedUserDetails.skillsBreakdown.diagnostics}%
                        </span>
                      </div>
                      <div className="w-full h-1.5 bg-stone-200/80 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-purple-500 rounded-full"
                          style={{
                            width: `${selectedUserDetails.skillsBreakdown.diagnostics}%`,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Completed Classes & Simulations History */}
            <div className="space-y-2.5">
              <h4 className="text-xs font-bold text-stone-900">
                Completed Classes & Simulation History
              </h4>

              <div className="space-y-2">
                {selectedUserDetails.completedClassesHistory ? (
                  selectedUserDetails.completedClassesHistory.map((item) => (
                    <div
                      key={item.title}
                      className="p-3 rounded-lg bg-white border border-stone-200 flex items-center justify-between text-xs"
                    >
                      <div>
                        <div className="font-semibold text-stone-900">
                          {item.title}
                        </div>
                        <div className="text-xs text-stone-500 font-mono mt-0.5">
                          Completed: {item.date}
                        </div>
                      </div>
                      <span className="font-mono font-bold text-xs text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200">
                        Score: {item.score}
                      </span>
                    </div>
                  ))
                ) : (
                  <div className="p-4 text-xs text-stone-500 text-center bg-stone-50 rounded-lg border border-stone-200">
                    No completed simulations yet.
                  </div>
                )}
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setSelectedUserDetails(null)}
                className="px-4 py-2 rounded-md bg-stone-900 text-white font-medium text-xs hover:bg-stone-800 transition-colors cursor-pointer"
              >
                Close Profile Details
              </button>
            </div>
          </div>
        </div>
      )}

      {/* INVITE USER MODAL (Flat, No Shadows) */}
      {isInviteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/40 backdrop-blur-xs">
          <div className="relative w-full max-w-md bg-white border border-stone-200 rounded-xl p-6 sm:p-7 space-y-5 text-left">
            <button
              onClick={() => setIsInviteModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-md bg-stone-100 hover:bg-stone-200 text-stone-500 hover:text-stone-900 cursor-pointer transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div>
              <h3 className="text-base font-bold text-stone-900">
                Invite Team Learner
              </h3>
              <p className="text-xs text-stone-500 mt-0.5">
                Send an onboarding invite key to join your organization pilot.
              </p>
            </div>

            {inviteSuccess ? (
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 text-center space-y-2">
                <CheckCircle2 className="w-6 h-6 text-emerald-600 mx-auto" />
                <div className="text-sm font-bold text-stone-900">
                  Invite Sent Successfully!
                </div>
                <p className="text-xs text-stone-600">
                  {inviteName} has been invited to the {inviteTrack} track.
                </p>
              </div>
            ) : (
              <form onSubmit={handleInviteSubmit} className="space-y-3.5">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Participant Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={inviteName}
                    onChange={(e) => setInviteName(e.target.value)}
                    placeholder="e.g. Alex Morgan"
                    className="w-full bg-stone-50/70 border border-stone-200 rounded-md px-3 py-2 text-xs text-stone-900 placeholder-stone-400 focus:bg-white focus:outline-none focus:border-stone-400 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Work Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={inviteEmail}
                    onChange={(e) => setInviteEmail(e.target.value)}
                    placeholder="alex@acmecorp.com"
                    className="w-full bg-stone-50/70 border border-stone-200 rounded-md px-3 py-2 text-xs text-stone-900 placeholder-stone-400 focus:bg-white focus:outline-none focus:border-stone-400 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Assign Primary Career Track
                  </label>
                  <select
                    value={inviteTrack}
                    onChange={(e) => setInviteTrack(e.target.value)}
                    className="w-full bg-stone-50/70 border border-stone-200 rounded-md px-3 py-2 text-xs text-stone-900 focus:bg-white focus:outline-none focus:border-stone-400 font-medium transition-colors"
                  >
                    <option value="Customer Service">Customer Service</option>
                    <option value="Tech Support">Tech Support</option>
                    <option value="IT Specialist">IT Specialist</option>
                    <option value="Healthcare Support">
                      Healthcare Support
                    </option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-md bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold transition-colors cursor-pointer mt-2"
                >
                  Send Invitation Key
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
});
