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
  ShieldAlert,
  Award,
  Zap,
  Clock,
  TrendingUp,
  Crown,
  Shield,
  User,
  MoreVertical,
  ArrowRightLeft,
  UserX,
  UserCheck,
  AlertTriangle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAccount } from "@/context/AccountContext";
import { OrgRole } from "@/types/account";

interface UserItem {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: OrgRole;
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

export const OrgUsersScreen = memo(function OrgUsersScreen() {
  const { session } = useAccount();
  const currentOrgRole: OrgRole = session.orgRole || "owner";

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTrack, setSelectedTrack] = useState("all");
  const [selectedRoleFilter, setSelectedRoleFilter] = useState<string>("all");

  // Modals state
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [selectedUserDetails, setSelectedUserDetails] = useState<UserItem | null>(null);
  const [transferOwnershipTarget, setTransferOwnershipTarget] = useState<UserItem | null>(null);
  const [transferSuccess, setTransferSuccess] = useState(false);

  // Invite Modal Form State
  const [inviteName, setInviteName] = useState("");
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState<"admin" | "member">("member");
  const [inviteTrack, setInviteTrack] = useState("Customer Service");
  const [inviteSuccess, setInviteSuccess] = useState(false);

  // Action feedback toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  }, []);

  const [users, setUsers] = useState<UserItem[]>([
    {
      id: "u-owner",
      name: session.name || "Hosain Ali (You)",
      email: session.email || "hosain.owner@acmecorp.com",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
      role: "owner",
      track: "Executive Ops",
      trackColor: "bg-amber-500/10 text-amber-300 border-amber-400/30",
      enrolledClasses: 6,
      progress: 100,
      score: "99%",
      status: "Active",
      skillsBreakdown: {
        communication: 99,
        deEscalation: 98,
        diagnostics: 97,
        empathy: 99,
      },
      completedClassesHistory: [
        { title: "Strategic Leadership & Conflict Negotiation", score: "99%", date: "Aug 24, 2026" },
        { title: "Team Performance Coaching & SLA Delivery", score: "98%", date: "Aug 20, 2026" },
      ],
    },
    {
      id: "u-admin-1",
      name: "Marcus Vance",
      email: "marcus.admin@acmecorp.com",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80",
      role: "admin",
      track: "Tech Support",
      trackColor: "bg-blue-500/10 text-blue-300 border-blue-400/30",
      enrolledClasses: 4,
      progress: 92,
      score: "94%",
      status: "Active",
      skillsBreakdown: {
        communication: 92,
        deEscalation: 90,
        diagnostics: 96,
        empathy: 91,
      },
      completedClassesHistory: [
        { title: "Enterprise Incident Response Protocol", score: "96%", date: "Aug 22, 2026" },
        { title: "Technical Leadership & Triage", score: "93%", date: "Aug 17, 2026" },
      ],
    },
    {
      id: "u1",
      name: "Sarah Jenkins",
      email: "sarah.j@acmecorp.com",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80",
      role: "member",
      track: "Customer Service",
      trackColor: "bg-orange-500/10 text-orange-300 border-orange-400/30",
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
      role: "member",
      track: "Tech Support",
      trackColor: "bg-emerald-500/10 text-emerald-300 border-emerald-500/30",
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
      role: "member",
      track: "IT Specialist",
      trackColor: "bg-rose-500/10 text-rose-300 border-rose-400/30",
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
      role: "member",
      track: "Customer Service",
      trackColor: "bg-orange-500/10 text-orange-300 border-orange-400/30",
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
  ]);

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchesSearch =
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesTrack =
        selectedTrack === "all" || user.track === selectedTrack;
      const matchesRole =
        selectedRoleFilter === "all" || user.role === selectedRoleFilter;
      return matchesSearch && matchesTrack && matchesRole;
    });
  }, [users, searchTerm, selectedTrack, selectedRoleFilter]);

  // Actions
  const handleToggleRole = useCallback(
    (userId: string, currentRole: OrgRole) => {
      if (currentRole === "owner") return;
      const newRole: OrgRole = currentRole === "admin" ? "member" : "admin";
      setUsers((prev) =>
        prev.map((u) => (u.id === userId ? { ...u, role: newRole } : u))
      );
      showToast(
        `User role updated to ${newRole === "admin" ? "Admin" : "Member"}`
      );
    },
    [showToast]
  );

  const handleToggleStatus = useCallback(
    (userId: string, currentStatus: "Active" | "Pending" | "Suspended") => {
      const newStatus = currentStatus === "Active" ? "Suspended" : "Active";
      setUsers((prev) =>
        prev.map((u) => (u.id === userId ? { ...u, status: newStatus } : u))
      );
      showToast(
        `Member status changed to ${newStatus}`
      );
    },
    [showToast]
  );

  const handleRemoveUser = useCallback(
    (userId: string) => {
      setUsers((prev) => prev.filter((u) => u.id !== userId));
      showToast("Member successfully removed from organization workspace.");
    },
    [showToast]
  );

  const handleConfirmTransferOwnership = useCallback(() => {
    if (!transferOwnershipTarget) return;
    setUsers((prev) =>
      prev.map((u) => {
        if (u.id === transferOwnershipTarget.id) {
          return { ...u, role: "owner" };
        }
        if (u.role === "owner") {
          return { ...u, role: "admin" };
        }
        return u;
      })
    );
    setTransferSuccess(true);
    setTimeout(() => {
      setTransferSuccess(false);
      setTransferOwnershipTarget(null);
      showToast(`Ownership successfully transferred to ${transferOwnershipTarget.name}!`);
    }, 1500);
  }, [transferOwnershipTarget, showToast]);

  const handleInviteSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const newUser: UserItem = {
        id: `u-${Date.now()}`,
        name: inviteName,
        email: inviteEmail,
        role: inviteRole,
        avatar:
          "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80",
        track: inviteTrack,
        trackColor:
          inviteTrack === "Customer Service"
            ? "bg-orange-500/10 text-orange-300 border-orange-400/30"
            : inviteTrack === "Tech Support"
            ? "bg-emerald-500/10 text-emerald-300 border-emerald-500/30"
            : inviteTrack === "IT Specialist"
            ? "bg-rose-500/10 text-rose-300 border-rose-400/30"
            : "bg-purple-500/10 text-purple-300 border-purple-400/30",
        enrolledClasses: 1,
        progress: 0,
        score: "Pending",
        status: "Pending",
      };

      setUsers((prev) => [newUser, ...prev]);
      setInviteSuccess(true);
      setTimeout(() => {
        setInviteSuccess(false);
        setIsInviteModalOpen(false);
        setInviteName("");
        setInviteEmail("");
        setInviteRole("member");
        showToast(`Invitation sent to ${inviteName} as ${inviteRole.toUpperCase()}`);
      }, 1500);
    },
    [inviteName, inviteEmail, inviteRole, inviteTrack, showToast]
  );

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-orange-500 text-white text-xs font-bold px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-2 animate-in fade-in slide-in-from-top-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Header Row */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-[#12131c]/90 rounded-2xl p-5 border border-white/10 shadow-lg">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span
              className={cn(
                "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider border",
                currentOrgRole === "owner"
                  ? "bg-amber-500/10 text-amber-300 border-amber-400/30"
                  : "bg-blue-500/10 text-blue-300 border-blue-400/30"
              )}
            >
              {currentOrgRole === "owner" ? (
                <>
                  <Crown className="w-3 h-3 text-amber-400" />
                  <span>Owner View (Full Control)</span>
                </>
              ) : (
                <>
                  <Shield className="w-3 h-3 text-blue-400" />
                  <span>Admin View (Member Management)</span>
                </>
              )}
            </span>
          </div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Users className="w-5 h-5 text-orange-400" />
            <span>Organization Members & Role Permissions</span>
          </h2>
          <p className="text-xs text-white/60 mt-0.5">
            {currentOrgRole === "owner"
              ? "Manage all members, promote/demote admins, transfer ownership, and view AI simulation progress."
              : "Invite and manage regular members, assign learning tracks, and evaluate simulation scores."}
          </p>
        </div>

        <button
          onClick={() => setIsInviteModalOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white text-black font-extrabold text-xs hover:bg-white/90 transition-colors shadow-md cursor-pointer shrink-0"
        >
          <UserPlus className="w-4 h-4" />
          <span>Invite New Member</span>
        </button>
      </div>

      {/* Filter & Search Controls */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 bg-[#0d0e14] p-3 rounded-2xl border border-white/10">
        <div className="sm:col-span-6 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by name, email, or role..."
            className="w-full bg-black/60 border border-white/10 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-white/40 focus:outline-none focus:border-orange-400 transition-colors"
          />
        </div>

        <div className="sm:col-span-3 flex items-center gap-2">
          <Filter className="w-4 h-4 text-white/40 shrink-0" />
          <select
            value={selectedRoleFilter}
            onChange={(e) => setSelectedRoleFilter(e.target.value)}
            className="w-full bg-black/60 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-orange-400 transition-colors"
          >
            <option value="all">All Roles (Owner, Admin, Member)</option>
            <option value="owner">👑 Owner</option>
            <option value="admin">🛡️ Admin</option>
            <option value="member">👤 Member</option>
          </select>
        </div>

        <div className="sm:col-span-3 flex items-center gap-2">
          <select
            value={selectedTrack}
            onChange={(e) => setSelectedTrack(e.target.value)}
            className="w-full bg-black/60 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-orange-400 transition-colors"
          >
            <option value="all">All Tracks</option>
            <option value="Customer Service">Customer Service</option>
            <option value="Tech Support">Tech Support</option>
            <option value="IT Specialist">IT Specialist</option>
            <option value="Healthcare Support">Healthcare Support</option>
          </select>
        </div>
      </div>

      {/* User Table with RBAC Controls */}
      <div className="bg-[#12131c]/90 rounded-2xl border border-white/10 shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-white/10 text-white/40 font-mono text-[10px] uppercase bg-black/40">
                <th className="py-3 px-4 font-semibold">PARTICIPANT</th>
                <th className="py-3 px-4 font-semibold">ORG ROLE</th>
                <th className="py-3 px-4 font-semibold">CAREER TRACK</th>
                <th className="py-3 px-4 font-semibold">PROGRESS</th>
                <th className="py-3 px-4 font-semibold">AI SCORE</th>
                <th className="py-3 px-4 font-semibold">STATUS</th>
                <th className="py-3 px-4 font-semibold text-right">MANAGE & ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredUsers.map((user) => {
                const isOwnerRow = user.role === "owner";
                const isAdminRow = user.role === "admin";
                const isCurrentSelf = user.id === "u-owner";

                // Can current user manage this target user?
                const canManageRole = currentOrgRole === "owner" && !isOwnerRow;
                const canSuspendOrRemove =
                  (currentOrgRole === "owner" && !isOwnerRow) ||
                  (currentOrgRole === "admin" && user.role === "member");

                return (
                  <tr
                    key={user.id}
                    className="hover:bg-white/[0.02] transition-colors"
                  >
                    {/* Participant Column */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <img
                          src={user.avatar}
                          alt={user.name}
                          className="w-8 h-8 rounded-full object-cover border border-white/20 shrink-0"
                        />
                        <div>
                          <div className="font-bold text-white text-xs flex items-center gap-1.5">
                            <span>{user.name}</span>
                            {isCurrentSelf && (
                              <span className="text-[9px] bg-white/10 text-white/70 px-1.5 py-0.2 rounded font-mono">
                                You
                              </span>
                            )}
                          </div>
                          <div className="text-[11px] text-white/50 font-mono">
                            {user.email}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Org Role Badge Column */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      {user.role === "owner" && (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-amber-500/10 text-amber-300 border border-amber-400/30">
                          <Crown className="w-3 h-3 text-amber-400" />
                          <span>Owner</span>
                        </span>
                      )}
                      {user.role === "admin" && (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-blue-500/10 text-blue-300 border border-blue-400/30">
                          <Shield className="w-3 h-3 text-blue-400" />
                          <span>Admin</span>
                        </span>
                      )}
                      {user.role === "member" && (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold bg-white/5 text-white/70 border border-white/10">
                          <User className="w-3 h-3 text-white/40" />
                          <span>Member</span>
                        </span>
                      )}
                    </td>

                    {/* Career Track Column */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span
                        className={cn(
                          "inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-medium border",
                          user.trackColor
                        )}
                      >
                        {user.track}
                      </span>
                    </td>

                    {/* Progress Column */}
                    <td className="py-3.5 px-4 w-32">
                      <div className="flex items-center gap-2">
                        <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-orange-500 to-amber-400 rounded-full"
                            style={{ width: `${user.progress}%` }}
                          />
                        </div>
                        <span className="font-mono text-[11px] text-white/80 font-bold">
                          {user.progress}%
                        </span>
                      </div>
                    </td>

                    {/* AI Score Column */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span className="font-mono font-bold text-xs text-white bg-white/5 px-2 py-0.5 rounded border border-white/10">
                        {user.score}
                      </span>
                    </td>

                    {/* Status Column */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span
                        className={cn(
                          "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold",
                          user.status === "Active"
                            ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30"
                            : user.status === "Suspended"
                            ? "bg-rose-500/10 text-rose-400 border border-rose-500/30"
                            : "bg-amber-500/10 text-amber-400 border border-amber-500/30"
                        )}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-current" />
                        {user.status}
                      </span>
                    </td>

                    {/* Action Column: RBAC Buttons */}
                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      <div className="inline-flex items-center gap-1.5 justify-end">
                        {/* View Details */}
                        <button
                          onClick={() => setSelectedUserDetails(user)}
                          className="inline-flex items-center gap-1 text-xs text-orange-400 hover:text-white bg-orange-500/10 hover:bg-orange-500/20 border border-orange-400/30 px-2.5 py-1.5 rounded-full font-bold transition-colors cursor-pointer"
                          title="View detailed skill evaluation and test history"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>Details</span>
                        </button>

                        {/* Owner Role Management Controls */}
                        {canManageRole && (
                          <button
                            onClick={() => handleToggleRole(user.id, user.role)}
                            className={cn(
                              "inline-flex items-center gap-1 text-xs px-2.5 py-1.5 rounded-full font-bold transition-colors cursor-pointer border",
                              isAdminRow
                                ? "bg-white/5 hover:bg-white/10 text-white/80 border-white/10"
                                : "bg-blue-500/10 hover:bg-blue-500/20 text-blue-300 border-blue-400/30"
                            )}
                            title={
                              isAdminRow
                                ? "Demote to regular Member"
                                : "Promote to Organization Admin"
                            }
                          >
                            <Shield className="w-3 h-3" />
                            <span>{isAdminRow ? "Demote" : "Make Admin"}</span>
                          </button>
                        )}

                        {/* Transfer Ownership Button (Owner only, for Admins) */}
                        {currentOrgRole === "owner" && isAdminRow && (
                          <button
                            onClick={() => setTransferOwnershipTarget(user)}
                            className="inline-flex items-center gap-1 text-xs text-amber-300 hover:text-amber-100 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-400/30 px-2.5 py-1.5 rounded-full font-bold transition-colors cursor-pointer"
                            title="Transfer full organization ownership to this admin"
                          >
                            <Crown className="w-3 h-3 text-amber-400" />
                            <span>Transfer</span>
                          </button>
                        )}

                        {/* Suspend / Reactivate (Owner or Admin for Members) */}
                        {canSuspendOrRemove && (
                          <button
                            onClick={() =>
                              handleToggleStatus(user.id, user.status)
                            }
                            className={cn(
                              "p-1.5 rounded-full border transition-colors cursor-pointer",
                              user.status === "Suspended"
                                ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/20"
                                : "bg-white/5 text-white/50 border-white/10 hover:text-rose-300 hover:border-rose-400/30"
                            )}
                            title={
                              user.status === "Suspended"
                                ? "Reactivate member"
                                : "Suspend member"
                            }
                          >
                            {user.status === "Suspended" ? (
                              <UserCheck className="w-3.5 h-3.5" />
                            ) : (
                              <UserX className="w-3.5 h-3.5" />
                            )}
                          </button>
                        )}

                        {/* Remove User */}
                        {canSuspendOrRemove && (
                          <button
                            onClick={() => handleRemoveUser(user.id)}
                            className="p-1.5 rounded-full bg-white/5 text-white/40 border border-white/10 hover:text-rose-400 hover:bg-rose-500/10 hover:border-rose-400/30 transition-colors cursor-pointer"
                            title="Remove from organization"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        )}

                        {/* Protected Badge for Owner Row */}
                        {isOwnerRow && (
                          <span className="text-[10px] text-amber-400/80 font-mono px-2 py-1 bg-amber-500/5 rounded-full border border-amber-400/20">
                            Protected Owner
                          </span>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* TRANSFER OWNERSHIP MODAL */}
      {transferOwnershipTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-md bg-[#0e0f17] border border-amber-400/40 rounded-3xl p-6 sm:p-7 shadow-2xl space-y-5 text-left">
            <button
              onClick={() => setTransferOwnershipTarget(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/5 hover:bg-white/10 text-white/60 hover:text-white cursor-pointer transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-amber-500/10 border border-amber-400/30 flex items-center justify-center text-amber-400">
                <Crown className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Transfer Organization Ownership</h3>
                <p className="text-xs text-white/60">
                  Careful: This transfers full billing and admin control.
                </p>
              </div>
            </div>

            {transferSuccess ? (
              <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-5 text-center space-y-2">
                <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
                <div className="text-sm font-bold text-white">Ownership Transferred!</div>
                <p className="text-xs text-white/60">
                  {transferOwnershipTarget.name} is now the Organization Owner.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-400/30 flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div className="text-xs text-amber-200/90 leading-relaxed">
                    You are transferring primary ownership to{" "}
                    <span className="font-bold text-white">
                      {transferOwnershipTarget.name} ({transferOwnershipTarget.email})
                    </span>
                    . Your role will be converted to <strong>Admin</strong>.
                  </div>
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    onClick={() => setTransferOwnershipTarget(null)}
                    className="flex-1 py-3 rounded-full bg-white/5 hover:bg-white/10 text-white text-xs font-bold transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleConfirmTransferOwnership}
                    className="flex-1 py-3 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-black text-xs font-extrabold transition-colors shadow-lg cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <Crown className="w-4 h-4" />
                    <span>Confirm Transfer</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* FULL USER DETAILS MODAL */}
      {selectedUserDetails && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-[#0e0f17] border border-orange-400/40 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 text-left max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedUserDetails(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-white/5 hover:bg-white/10 text-white/60 hover:text-white cursor-pointer transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Profile Header */}
            <div className="flex items-center gap-4 border-b border-white/10 pb-5">
              <img
                src={selectedUserDetails.avatar}
                alt={selectedUserDetails.name}
                className="w-14 h-14 rounded-2xl object-cover border-2 border-orange-400/40 shadow-md shrink-0"
              />
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-extrabold text-white">
                    {selectedUserDetails.name}
                  </h3>
                  <span
                    className={cn(
                      "px-2.5 py-0.5 rounded-full text-[10px] font-bold border",
                      selectedUserDetails.role === "owner"
                        ? "bg-amber-500/10 text-amber-300 border-amber-400/30"
                        : selectedUserDetails.role === "admin"
                        ? "bg-blue-500/10 text-blue-300 border-blue-400/30"
                        : "bg-white/5 text-white/70 border-white/10"
                    )}
                  >
                    {selectedUserDetails.role.toUpperCase()}
                  </span>
                  <span
                    className={cn(
                      "px-2.5 py-0.5 rounded-full text-[10px] font-bold border",
                      selectedUserDetails.trackColor
                    )}
                  >
                    {selectedUserDetails.track}
                  </span>
                </div>
                <div className="text-xs text-white/60 font-mono mt-0.5">
                  {selectedUserDetails.email}
                </div>
              </div>
            </div>

            {/* AI Score & Skill Breakdown Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
              <div className="sm:col-span-4 bg-gradient-to-br from-orange-500/20 via-[#12131c] to-[#0d0e14] rounded-2xl p-4 border border-orange-400/30 text-center flex flex-col justify-center space-y-1">
                <span className="text-[10px] font-mono uppercase text-white/50">
                  OVERALL AI SCORE
                </span>
                <div className="text-4xl font-extrabold text-white font-mono">
                  {selectedUserDetails.score}
                </div>
                <span className="text-[10px] text-emerald-400 font-bold">
                  Evaluated via Simulations
                </span>
              </div>

              <div className="sm:col-span-8 bg-[#12131c] rounded-2xl p-4 border border-white/10 space-y-2.5">
                <span className="text-xs font-bold text-white flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-orange-400" />
                  <span>Evaluated Skill Competencies</span>
                </span>

                {selectedUserDetails.skillsBreakdown && (
                  <div className="space-y-2 text-xs">
                    <div>
                      <div className="flex justify-between text-[11px] font-mono text-white/70">
                        <span>Communication Tone</span>
                        <span className="text-orange-400 font-bold">
                          {selectedUserDetails.skillsBreakdown.communication}%
                        </span>
                      </div>
                      <div className="w-full h-1.5 bg-black/60 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-orange-400 rounded-full"
                          style={{
                            width: `${selectedUserDetails.skillsBreakdown.communication}%`,
                          }}
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-[11px] font-mono text-white/70">
                        <span>De-escalation & Conflict</span>
                        <span className="text-emerald-400 font-bold">
                          {selectedUserDetails.skillsBreakdown.deEscalation}%
                        </span>
                      </div>
                      <div className="w-full h-1.5 bg-black/60 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-emerald-400 rounded-full"
                          style={{
                            width: `${selectedUserDetails.skillsBreakdown.deEscalation}%`,
                          }}
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-[11px] font-mono text-white/70">
                        <span>Technical Triage & Logic</span>
                        <span className="text-purple-400 font-bold">
                          {selectedUserDetails.skillsBreakdown.diagnostics}%
                        </span>
                      </div>
                      <div className="w-full h-1.5 bg-black/60 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-purple-400 rounded-full"
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
              <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-orange-400" />
                <span>Completed Classes & Simulation History</span>
              </h4>

              <div className="space-y-2">
                {selectedUserDetails.completedClassesHistory ? (
                  selectedUserDetails.completedClassesHistory.map((item) => (
                    <div
                      key={item.title}
                      className="p-3.5 rounded-xl bg-black/50 border border-white/10 flex items-center justify-between text-xs"
                    >
                      <div>
                        <div className="font-bold text-white">{item.title}</div>
                        <div className="text-[10px] text-white/40 font-mono mt-0.5">
                          Completed: {item.date}
                        </div>
                      </div>
                      <span className="font-mono font-bold text-xs text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded border border-emerald-500/20">
                        Score: {item.score}
                      </span>
                    </div>
                  ))
                ) : (
                  <div className="p-4 text-xs text-white/40 text-center bg-black/40 rounded-xl">
                    No completed simulations yet.
                  </div>
                )}
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setSelectedUserDetails(null)}
                className="px-5 py-2.5 rounded-full bg-white text-black font-extrabold text-xs hover:bg-white/90 transition-colors cursor-pointer"
              >
                Close Profile Details
              </button>
            </div>
          </div>
        </div>
      )}

      {/* INVITE USER MODAL WITH ROLE SELECTOR */}
      {isInviteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-md bg-[#0e0f17] border border-orange-400/30 rounded-3xl p-6 sm:p-7 shadow-2xl space-y-5 text-left">
            <button
              onClick={() => setIsInviteModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/5 hover:bg-white/10 text-white/60 hover:text-white cursor-pointer transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-orange-500/10 border border-orange-400/30 flex items-center justify-center text-orange-400">
                <UserPlus className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Invite Team Participant</h3>
                <p className="text-xs text-white/60">
                  Assign role and career track for onboarding.
                </p>
              </div>
            </div>

            {inviteSuccess ? (
              <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-5 text-center space-y-2">
                <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
                <div className="text-sm font-bold text-white">Invite Sent Successfully!</div>
                <p className="text-xs text-white/60">
                  {inviteName} has been invited as <strong>{inviteRole.toUpperCase()}</strong> to the {inviteTrack} track.
                </p>
              </div>
            ) : (
              <form onSubmit={handleInviteSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-white/80 mb-1">
                    Participant Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={inviteName}
                    onChange={(e) => setInviteName(e.target.value)}
                    placeholder="e.g. Alex Morgan"
                    className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-white/40 focus:outline-none focus:border-orange-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-white/80 mb-1">
                    Work Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={inviteEmail}
                    onChange={(e) => setInviteEmail(e.target.value)}
                    placeholder="alex@acmecorp.com"
                    className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-white/40 focus:outline-none focus:border-orange-400"
                  />
                </div>

                {/* ROLE SELECTOR (ADMIN vs MEMBER) */}
                <div>
                  <label className="block text-xs font-semibold text-white/80 mb-1">
                    Assigned Organization Role
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setInviteRole("member")}
                      className={cn(
                        "p-3 rounded-xl border text-left transition-all cursor-pointer",
                        inviteRole === "member"
                          ? "bg-orange-500/15 border-orange-400 text-white shadow-sm"
                          : "bg-black/40 border-white/10 text-white/60 hover:border-white/20"
                      )}
                    >
                      <div className="flex items-center gap-1.5 font-bold text-xs text-white">
                        <User className="w-3.5 h-3.5 text-orange-400" />
                        <span>Member</span>
                      </div>
                      <p className="text-[10px] text-white/50 mt-1">
                        Learner who completes assigned simulations & classes.
                      </p>
                    </button>

                    <button
                      type="button"
                      onClick={() => setInviteRole("admin")}
                      className={cn(
                        "p-3 rounded-xl border text-left transition-all cursor-pointer",
                        inviteRole === "admin"
                          ? "bg-blue-500/15 border-blue-400 text-white shadow-sm"
                          : "bg-black/40 border-white/10 text-white/60 hover:border-white/20"
                      )}
                    >
                      <div className="flex items-center gap-1.5 font-bold text-xs text-white">
                        <Shield className="w-3.5 h-3.5 text-blue-400" />
                        <span>Admin</span>
                      </div>
                      <p className="text-[10px] text-white/50 mt-1">
                        Can invite members, assign simulations, and view progress.
                      </p>
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-white/80 mb-1">
                    Assign Primary Career Track
                  </label>
                  <select
                    value={inviteTrack}
                    onChange={(e) => setInviteTrack(e.target.value)}
                    className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-orange-400"
                  >
                    <option value="Customer Service">Customer Service</option>
                    <option value="Tech Support">Tech Support</option>
                    <option value="IT Specialist">IT Specialist</option>
                    <option value="Healthcare Support">Healthcare Support</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-full bg-white text-black hover:bg-white/90 text-xs font-extrabold transition-colors shadow-md cursor-pointer mt-2"
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

