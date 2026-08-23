"use client";

import React, { useState, useCallback, useMemo, memo } from "react";
import {
  Users,
  Search,
  UserPlus,
  Filter,
  CheckCircle2,
  Mail,
  MoreVertical,
  BookOpen,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface UserItem {
  id: string;
  name: string;
  email: string;
  avatar: string;
  track: string;
  trackColor: string;
  enrolledClasses: number;
  progress: number;
  score: string;
  status: "Active" | "Pending";
}

export const OrgUsersScreen = memo(function OrgUsersScreen() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTrack, setSelectedTrack] = useState("all");
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);

  // Invite Modal Form State
  const [inviteName, setInviteName] = useState("");
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteTrack, setInviteTrack] = useState("Customer Service");
  const [inviteSuccess, setInviteSuccess] = useState(false);

  const [users, setUsers] = useState<UserItem[]>([
    {
      id: "u1",
      name: "Sarah Jenkins",
      email: "sarah.j@acmecorp.com",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80",
      track: "Customer Service",
      trackColor: "bg-orange-500/10 text-orange-300 border-orange-400/30",
      enrolledClasses: 4,
      progress: 94,
      score: "96%",
      status: "Active",
    },
    {
      id: "u2",
      name: "David Chen",
      email: "david.c@acmecorp.com",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
      track: "Tech Support",
      trackColor: "bg-emerald-500/10 text-emerald-300 border-emerald-500/30",
      enrolledClasses: 3,
      progress: 78,
      score: "88%",
      status: "Active",
    },
    {
      id: "u3",
      name: "Elena Rostova",
      email: "elena.r@acmecorp.com",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
      track: "IT Specialist",
      trackColor: "bg-rose-500/10 text-rose-300 border-rose-400/30",
      enrolledClasses: 3,
      progress: 64,
      score: "85%",
      status: "Active",
    },
    {
      id: "u4",
      name: "Marcus Vance",
      email: "marcus.v@acmecorp.com",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80",
      track: "Healthcare Support",
      trackColor: "bg-purple-500/10 text-purple-300 border-purple-400/30",
      enrolledClasses: 2,
      progress: 45,
      score: "79%",
      status: "Active",
    },
    {
      id: "u5",
      name: "Aisha Khan",
      email: "aisha.k@acmecorp.com",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80",
      track: "Customer Service",
      trackColor: "bg-orange-500/10 text-orange-300 border-orange-400/30",
      enrolledClasses: 5,
      progress: 98,
      score: "94%",
      status: "Active",
    },
    {
      id: "u6",
      name: "Liam O'Connor",
      email: "liam.o@acmecorp.com",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&auto=format&fit=crop&q=80",
      track: "Tech Support",
      trackColor: "bg-emerald-500/10 text-emerald-300 border-emerald-500/30",
      enrolledClasses: 1,
      progress: 12,
      score: "Pending",
      status: "Pending",
    },
  ]);

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchesSearch =
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesTrack =
        selectedTrack === "all" || user.track === selectedTrack;
      return matchesSearch && matchesTrack;
    });
  }, [users, searchTerm, selectedTrack]);

  const handleInviteSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const newUser: UserItem = {
        id: `u-${Date.now()}`,
        name: inviteName,
        email: inviteEmail,
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
      }, 1500);
    },
    [inviteName, inviteEmail, inviteTrack]
  );

  return (
    <div className="space-y-6">
      {/* Top Header & Search Bar Row */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-[#12131c]/90 rounded-2xl p-5 border border-white/10 shadow-lg">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Users className="w-5 h-5 text-orange-400" />
            <span>Manage Team Users & Participants</span>
          </h2>
          <p className="text-xs text-white/60 mt-0.5">
            Invite team members, assign learning tracks, and monitor individual simulation scores.
          </p>
        </div>

        <button
          onClick={() => setIsInviteModalOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white text-black font-extrabold text-xs hover:bg-white/90 transition-colors shadow-md cursor-pointer shrink-0"
        >
          <UserPlus className="w-4 h-4" />
          <span>Invite New User</span>
        </button>
      </div>

      {/* Filter & Search Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-[#0d0e14] p-3 rounded-2xl border border-white/10">
        <div className="relative max-w-sm w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by participant name or email..."
            className="w-full bg-black/60 border border-white/10 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-white/40 focus:outline-none focus:border-orange-400 transition-colors"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="w-4 h-4 text-white/40 shrink-0" />
          <select
            value={selectedTrack}
            onChange={(e) => setSelectedTrack(e.target.value)}
            className="w-full sm:w-auto bg-black/60 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-orange-400 transition-colors"
          >
            <option value="all">All Tracks (4)</option>
            <option value="Customer Service">Customer Service</option>
            <option value="Tech Support">Tech Support</option>
            <option value="IT Specialist">IT Specialist</option>
            <option value="Healthcare Support">Healthcare Support</option>
          </select>
        </div>
      </div>

      {/* User Table */}
      <div className="bg-[#12131c]/90 rounded-2xl border border-white/10 shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-white/10 text-white/40 font-mono text-[10px] uppercase bg-black/40">
                <th className="py-3 px-4 font-semibold">PARTICIPANT</th>
                <th className="py-3 px-4 font-semibold">EMAIL</th>
                <th className="py-3 px-4 font-semibold">CAREER TRACK</th>
                <th className="py-3 px-4 font-semibold">CLASSES</th>
                <th className="py-3 px-4 font-semibold">PROGRESS</th>
                <th className="py-3 px-4 font-semibold">AI SCORE</th>
                <th className="py-3 px-4 font-semibold">STATUS</th>
                <th className="py-3 px-4 font-semibold text-right">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-8 h-8 rounded-full object-cover border border-white/20 shrink-0"
                      />
                      <span className="font-bold text-white text-xs">
                        {user.name}
                      </span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-white/70 font-mono text-xs">
                    {user.email}
                  </td>
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
                  <td className="py-3.5 px-4 text-white/80 font-mono">
                    <div className="flex items-center gap-1.5">
                      <BookOpen className="w-3.5 h-3.5 text-orange-400" />
                      <span>{user.enrolledClasses} Classes</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 w-36">
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
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <span className="font-mono font-bold text-xs text-white bg-white/5 px-2 py-0.5 rounded border border-white/10">
                      {user.score}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <span
                      className={cn(
                        "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold",
                        user.status === "Active"
                          ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30"
                          : "bg-amber-500/10 text-amber-400 border border-amber-500/30"
                      )}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-current" />
                      {user.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right whitespace-nowrap">
                    <button className="text-xs text-orange-400 hover:text-orange-300 font-semibold px-2 py-1 rounded bg-orange-500/10 border border-orange-400/20 hover:border-orange-400/40 transition-colors cursor-pointer mr-2">
                      Assign Class
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Invite User Modal */}
      {isInviteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-md bg-[#0e0f17] border border-orange-400/30 rounded-3xl p-6 shadow-2xl space-y-5 text-left">
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
                  Send an onboarding invite key to join your organization pilot.
                </p>
              </div>
            </div>

            {inviteSuccess ? (
              <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-5 text-center space-y-2">
                <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
                <div className="text-sm font-bold text-white">Invite Sent Successfully!</div>
                <p className="text-xs text-white/60">
                  {inviteName} has been invited to the {inviteTrack} track.
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
