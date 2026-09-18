"use client";

import React, { useState, useCallback, useMemo, memo } from "react";
import {
  Users,
  Search,
  UserPlus,
  Filter,
  CheckCircle2,
  Mail,
  BookOpen,
  X,
  Eye,
  Sparkles,
  ShieldCheck,
  Award,
  Zap,
  Clock,
  TrendingUp,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAccount } from "@/context/AccountContext";
import { OrgRole } from "@/types/account";


interface MemberUserItem {
  id: string;
  name: string;
  email: string;
  avatar: string;
  track: string;
  trackColor: string;
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

export const OrgMembersScreen = memo(function OrgMembersScreen() {
  const { session } = useAccount();
  const currentOrgRole: OrgRole = session.orgRole || "owner";
  const isOwner = currentOrgRole === "owner";

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTrack, setSelectedTrack] = useState("all");
  const [selectedStatusFilter, setSelectedStatusFilter] = useState("all");

  // Modals state
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [selectedUserDetails, setSelectedUserDetails] = useState<MemberUserItem | null>(null);

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
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80",
      track: "Customer Service",
      trackColor: "bg-orange-50 text-orange-800 border-orange-200",
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
        { title: "De-escalating High-Pressure Customer Complaints", score: "96%", date: "Aug 21, 2026" },
        { title: "Active Listening & Echo Statements", score: "95%", date: "Aug 18, 2026" },
        { title: "Omnichannel Chat & Support Protocol", score: "94%", date: "Aug 14, 2026" },
      ],
    },
    {
      id: "u2",
      name: "David Chen",
      email: "david.c@acmecorp.com",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
      track: "Tech Support",
      trackColor: "bg-emerald-50 text-emerald-800 border-emerald-200",
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
        { title: "L1 Technical Troubleshooting & Diagnostics", score: "88%", date: "Aug 20, 2026" },
        { title: "Remote Desktop SLA Management", score: "87%", date: "Aug 15, 2026" },
      ],
    },
    {
      id: "u3",
      name: "Elena Rostova",
      email: "elena.r@acmecorp.com",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
      track: "IT Specialist",
      trackColor: "bg-rose-50 text-rose-800 border-rose-200",
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
        { title: "Enterprise Network Security & Incident Response", score: "85%", date: "Aug 19, 2026" },
      ],
    },
    {
      id: "u4",
      name: "Aisha Khan",
      email: "aisha.k@acmecorp.com",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80",
      track: "Customer Service",
      trackColor: "bg-orange-50 text-orange-800 border-orange-200",
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
        { title: "De-escalating High-Pressure Customer Complaints", score: "94%", date: "Aug 22, 2026" },
        { title: "Active Listening & Echo Statements", score: "95%", date: "Aug 19, 2026" },
      ],
    },
    {
      id: "u5",
      name: "Liam O'Connor",
      email: "liam.o@acmecorp.com",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80",
      track: "Healthcare Support",
      trackColor: "bg-purple-50 text-purple-800 border-purple-200",
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
        { title: "Patient Intake & Empathetic Communication", score: "81%", date: "Aug 16, 2026" },
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
        selectedStatusFilter === "all" || member.status === selectedStatusFilter;
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
        trackColor:
          inviteTrack === "Customer Service"
            ? "bg-orange-50 text-orange-800 border-orange-200"
            : inviteTrack === "Tech Support"
            ? "bg-emerald-50 text-emerald-800 border-emerald-200"
            : inviteTrack === "IT Specialist"
            ? "bg-rose-50 text-rose-800 border-rose-200"
            : "bg-purple-50 text-purple-800 border-purple-200",
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
    [inviteName, inviteEmail, inviteTrack, showToast]
  );

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-stone-900 text-white text-xs font-bold px-4 py-3 rounded-2xl shadow-xl flex items-center gap-2 animate-in fade-in slide-in-from-top-2 border border-stone-800">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white rounded-2xl p-5 border border-stone-200 shadow-sm">
        <div>
          <h2 className="text-xl font-bold text-stone-900 flex items-center gap-2">
            <Users className="w-5 h-5 text-orange-600" />
            <span>Organization Members & Learner Participants</span>
          </h2>
          <p className="text-xs text-stone-500 mt-0.5">
            View enrolled learner performance, track completion progress, evaluate AI simulation scores, and manage access.
          </p>
        </div>

        <button
          onClick={() => setIsInviteModalOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-stone-900 text-white font-bold text-xs hover:bg-stone-800 transition-colors shadow-sm cursor-pointer shrink-0"
        >
          <UserPlus className="w-4 h-4 text-orange-400" />
          <span>Invite New Member</span>
        </button>
      </div>

      {/* Quick Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl p-4 border border-stone-200 shadow-xs flex items-center justify-between">
          <div>
            <div className="text-[10px] font-mono text-stone-500 uppercase font-semibold">
              Total Enrolled Learners
            </div>
            <div className="text-2xl font-black text-stone-900 font-mono mt-0.5">
              {members.length}
            </div>
            <span className="text-[10px] text-emerald-700 font-medium">100% active seat utilization</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-orange-50 border border-orange-200 flex items-center justify-center text-orange-600">
            <Users className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-stone-200 shadow-xs flex items-center justify-between">
          <div>
            <div className="text-[10px] font-mono text-stone-500 uppercase font-semibold">
              Avg Simulation Score
            </div>
            <div className="text-2xl font-black text-emerald-700 font-mono mt-0.5">
              91.4%
            </div>
            <span className="text-[10px] text-emerald-700 font-medium">+3.8% from last cycle</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700">
            <Award className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-stone-200 shadow-xs flex items-center justify-between">
          <div>
            <div className="text-[10px] font-mono text-stone-500 uppercase font-semibold">
              Active Career Tracks
            </div>
            <div className="text-2xl font-black text-stone-900 font-mono mt-0.5">
              4 Tracks
            </div>
            <span className="text-[10px] text-stone-500 font-medium">All tracks assigned</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-purple-50 border border-purple-200 flex items-center justify-center text-purple-700">
            <Zap className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Search & Filter Controls */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 bg-[#FCFAF6] p-3 rounded-2xl border border-stone-200">
        <div className="sm:col-span-6 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search members by name or email..."
            className="w-full bg-white border border-stone-200 rounded-xl pl-9 pr-4 py-2 text-xs text-stone-900 placeholder-stone-400 focus:outline-none focus:border-orange-500 transition-colors"
          />
        </div>

        <div className="sm:col-span-3 flex items-center gap-2">
          <Filter className="w-4 h-4 text-stone-400 shrink-0" />
          <select
            value={selectedTrack}
            onChange={(e) => setSelectedTrack(e.target.value)}
            className="w-full bg-white border border-stone-200 rounded-xl px-3 py-2 text-xs text-stone-800 focus:outline-none focus:border-orange-500 transition-colors font-medium"
          >
            <option value="all">All Career Tracks (4)</option>
            <option value="Customer Service">Customer Service</option>
            <option value="Tech Support">Tech Support</option>
            <option value="IT Specialist">IT Specialist</option>
            <option value="Healthcare Support">Healthcare Support</option>
          </select>
        </div>

        <div className="sm:col-span-3 flex items-center gap-2">
          <select
            value={selectedStatusFilter}
            onChange={(e) => setSelectedStatusFilter(e.target.value)}
            className="w-full bg-white border border-stone-200 rounded-xl px-3 py-2 text-xs text-stone-800 focus:outline-none focus:border-orange-500 transition-colors font-medium"
          >
            <option value="all">All Statuses</option>
            <option value="Active">Active</option>
            <option value="Pending">Pending Invite</option>
            <option value="Suspended">Suspended</option>
          </select>
        </div>
      </div>

      {/* Members Table */}
      <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-stone-200 text-stone-400 font-mono text-[10px] uppercase bg-stone-50/70">
                <th className="py-3 px-4 font-semibold">PARTICIPANT</th>
                <th className="py-3 px-4 font-semibold">CAREER TRACK</th>
                <th className="py-3 px-4 font-semibold">CLASSES</th>
                <th className="py-3 px-4 font-semibold">PROGRESS</th>
                <th className="py-3 px-4 font-semibold">AI SCORE</th>
                <th className="py-3 px-4 font-semibold">STATUS</th>
                <th className="py-3 px-4 font-semibold text-right">MANAGE & ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {filteredMembers.map((member) => (
                <tr key={member.id} className="hover:bg-stone-50/70 transition-colors">
                  {/* Participant Name & Avatar */}
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <img
                        src={member.avatar}
                        alt={member.name}
                        className="w-8 h-8 rounded-full object-cover border border-stone-200 shrink-0"
                      />
                      <div>
                        <div className="font-bold text-stone-900 text-xs">
                          {member.name}
                        </div>
                        <div className="text-[11px] text-stone-500 font-mono">
                          {member.email}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Career Track Badge */}
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <span
                      className={cn(
                        "inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-medium border font-mono",
                        member.trackColor
                      )}
                    >
                      {member.track}
                    </span>
                  </td>

                  {/* Enrolled Classes */}
                  <td className="py-3.5 px-4 text-stone-700 font-mono whitespace-nowrap font-medium">
                    <div className="flex items-center gap-1.5">
                      <BookOpen className="w-3.5 h-3.5 text-orange-600" />
                      <span>{member.enrolledClasses} Classes</span>
                    </div>
                  </td>

                  {/* Progress Bar */}
                  <td className="py-3.5 px-4 w-32">
                    <div className="flex items-center gap-2">
                      <div className="w-full h-1.5 bg-stone-100 rounded-full overflow-hidden border border-stone-200/60">
                        <div
                          className="h-full bg-gradient-to-r from-orange-500 to-amber-500 rounded-full"
                          style={{ width: `${member.progress}%` }}
                        />
                      </div>
                      <span className="font-mono text-[11px] text-stone-700 font-bold">
                        {member.progress}%
                      </span>
                    </div>
                  </td>

                  {/* AI Score */}
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <span className="font-mono font-bold text-xs text-stone-900 bg-stone-100 px-2 py-0.5 rounded border border-stone-200">
                      {member.score}
                    </span>
                  </td>

                  {/* Status */}
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <span
                      className={cn(
                        "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold border font-mono",
                        member.status === "Active"
                          ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                          : member.status === "Suspended"
                          ? "bg-rose-50 text-rose-800 border-rose-200"
                          : "bg-amber-50 text-amber-800 border-amber-200"
                      )}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-current" />
                      {member.status}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="py-3.5 px-4 text-right whitespace-nowrap">
                    <div className="inline-flex items-center gap-1.5 justify-end">
                      {/* View Details */}
                      <button
                        onClick={() => setSelectedUserDetails(member)}
                        className="inline-flex items-center gap-1 text-xs text-orange-700 hover:text-orange-800 bg-orange-50 hover:bg-orange-100 border border-orange-200 px-3 py-1.5 rounded-full font-bold transition-colors cursor-pointer"
                        title="View detailed skill scores and history"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Details</span>
                      </button>

                      {/* Remove from Organization */}
                      <button
                        onClick={() => handleRemoveMember(member.id, member.name)}
                        className="inline-flex items-center gap-1 text-xs text-rose-600 hover:text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 px-3 py-1.5 rounded-full font-bold transition-colors cursor-pointer"
                        title="Remove member from workspace"
                      >
                        <X className="w-3.5 h-3.5" />
                        <span>Remove</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* FULL USER DETAILS MODAL */}
      {selectedUserDetails && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/50 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-white border border-stone-200 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 text-left max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedUserDetails(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-500 hover:text-stone-900 cursor-pointer transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Profile Header */}
            <div className="flex items-center gap-4 border-b border-stone-100 pb-5">
              <img
                src={selectedUserDetails.avatar}
                alt={selectedUserDetails.name}
                className="w-14 h-14 rounded-2xl object-cover border-2 border-stone-200 shadow-sm shrink-0"
              />
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-extrabold text-stone-900">
                    {selectedUserDetails.name}
                  </h3>
                  <span
                    className={cn(
                      "px-2.5 py-0.5 rounded-full text-[10px] font-bold border font-mono",
                      selectedUserDetails.trackColor
                    )}
                  >
                    {selectedUserDetails.track}
                  </span>
                </div>
                <div className="text-xs text-stone-500 font-mono mt-0.5">
                  {selectedUserDetails.email}
                </div>
              </div>
            </div>

            {/* AI Score & Skill Breakdown Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
              <div className="sm:col-span-4 bg-gradient-to-br from-orange-50 via-amber-50 to-orange-50/50 rounded-2xl p-4 border border-orange-200 text-center flex flex-col justify-center space-y-1">
                <span className="text-[10px] font-mono uppercase text-stone-500 font-bold">
                  OVERALL AI SCORE
                </span>
                <div className="text-4xl font-extrabold text-stone-900 font-mono">
                  {selectedUserDetails.score}
                </div>
                <span className="text-[10px] text-emerald-700 font-bold">
                  Evaluated via Simulations
                </span>
              </div>

              <div className="sm:col-span-8 bg-[#FCFAF6] rounded-2xl p-4 border border-stone-200 space-y-2.5">
                <span className="text-xs font-bold text-stone-900 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-orange-600" />
                  <span>Evaluated Skill Competencies</span>
                </span>

                {selectedUserDetails.skillsBreakdown && (
                  <div className="space-y-2 text-xs">
                    <div>
                      <div className="flex justify-between text-[11px] font-mono text-stone-600 font-medium">
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
                      <div className="flex justify-between text-[11px] font-mono text-stone-600 font-medium">
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
                      <div className="flex justify-between text-[11px] font-mono text-stone-600 font-medium">
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
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-stone-900 flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-orange-600" />
                <span>Completed Classes & Simulation History</span>
              </h4>

              <div className="space-y-2">
                {selectedUserDetails.completedClassesHistory ? (
                  selectedUserDetails.completedClassesHistory.map((item) => (
                    <div
                      key={item.title}
                      className="p-3.5 rounded-xl bg-white border border-stone-200 flex items-center justify-between text-xs shadow-xs"
                    >
                      <div>
                        <div className="font-bold text-stone-900">{item.title}</div>
                        <div className="text-[10px] text-stone-500 font-mono mt-0.5">
                          Completed: {item.date}
                        </div>
                      </div>
                      <span className="font-mono font-bold text-xs text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200">
                        Score: {item.score}
                      </span>
                    </div>
                  ))
                ) : (
                  <div className="p-4 text-xs text-stone-500 text-center bg-stone-50 rounded-xl border border-stone-200">
                    No completed simulations yet.
                  </div>
                )}
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setSelectedUserDetails(null)}
                className="px-5 py-2.5 rounded-full bg-stone-900 text-white font-bold text-xs hover:bg-stone-800 transition-colors cursor-pointer shadow-sm"
              >
                Close Profile Details
              </button>
            </div>
          </div>
        </div>
      )}

      {/* INVITE USER MODAL */}
      {isInviteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/50 backdrop-blur-sm">
          <div className="relative w-full max-w-md bg-white border border-stone-200 rounded-3xl p-6 sm:p-7 shadow-2xl space-y-5 text-left">
            <button
              onClick={() => setIsInviteModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-500 hover:text-stone-900 cursor-pointer transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-orange-50 border border-orange-200 flex items-center justify-center text-orange-600">
                <UserPlus className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-stone-900">Invite Team Learner</h3>
                <p className="text-xs text-stone-500">
                  Send an onboarding invite key to join your organization pilot.
                </p>
              </div>
            </div>

            {inviteSuccess ? (
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5 text-center space-y-2">
                <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                <div className="text-sm font-bold text-stone-900">Invite Sent Successfully!</div>
                <p className="text-xs text-stone-600">
                  {inviteName} has been invited to the {inviteTrack} track.
                </p>
              </div>
            ) : (
              <form onSubmit={handleInviteSubmit} className="space-y-4">
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
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-2.5 text-xs text-stone-900 placeholder-stone-400 focus:bg-white focus:outline-none focus:border-orange-500"
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
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-2.5 text-xs text-stone-900 placeholder-stone-400 focus:bg-white focus:outline-none focus:border-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Assign Primary Career Track
                  </label>
                  <select
                    value={inviteTrack}
                    onChange={(e) => setInviteTrack(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-2.5 text-xs text-stone-900 focus:bg-white focus:outline-none focus:border-orange-500 font-medium"
                  >
                    <option value="Customer Service">Customer Service</option>
                    <option value="Tech Support">Tech Support</option>
                    <option value="IT Specialist">IT Specialist</option>
                    <option value="Healthcare Support">Healthcare Support</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-full bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold transition-colors shadow-sm cursor-pointer mt-2"
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
