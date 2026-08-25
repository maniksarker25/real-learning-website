"use client";

import React, { useState, useCallback, useMemo, memo } from "react";
import {
  Shield,
  Crown,
  Search,
  UserPlus,
  Filter,
  CheckCircle2,
  Mail,
  X,
  ShieldCheck,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAccount } from "@/context/AccountContext";
import { OrgRole } from "@/types/account";


interface AdminUserItem {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: "owner" | "admin";
  title: string;
  department: string;
  addedDate: string;
  status: "Active" | "Pending" | "Suspended";
}

export const OrgAdminsScreen = memo(function OrgAdminsScreen() {
  const { session } = useAccount();
  const currentOrgRole: OrgRole = session.orgRole || "owner";
  const isOwner = currentOrgRole === "owner";

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatusFilter, setSelectedStatusFilter] = useState("all");

  // Invite Modal state
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [inviteName, setInviteName] = useState("");
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteDepartment, setInviteDepartment] = useState("Operations & Training");
  const [inviteSuccess, setInviteSuccess] = useState(false);

  // Toast feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  }, []);

  const [admins, setAdmins] = useState<AdminUserItem[]>([
    {
      id: "u-owner",
      name: session.name || "Hosain Ali (You)",
      email: session.email || "hosain.owner@acmecorp.com",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
      role: "owner",
      title: "Founder & Organization Owner",
      department: "Executive Leadership",
      addedDate: "Jan 15, 2026",
      status: "Active",
    },
    {
      id: "u-admin-1",
      name: "Marcus Vance",
      email: "marcus.admin@acmecorp.com",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80",
      role: "admin",
      title: "L&D Training Director",
      department: "Human Resources / L&D",
      addedDate: "Feb 02, 2026",
      status: "Active",
    },
    {
      id: "u-admin-2",
      name: "Sophia Martinez",
      email: "sophia.m@acmecorp.com",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80",
      role: "admin",
      title: "Customer Success Team Lead",
      department: "Support & Enablement",
      addedDate: "Mar 11, 2026",
      status: "Active",
    },
  ]);

  const filteredAdmins = useMemo(() => {
    return admins.filter((admin) => {
      const matchesSearch =
        admin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        admin.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        admin.department.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus =
        selectedStatusFilter === "all" || admin.status === selectedStatusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [admins, searchTerm, selectedStatusFilter]);

  const handleRemoveAdmin = useCallback(
    (adminId: string, adminName: string) => {
      setAdmins((prev) => prev.filter((a) => a.id !== adminId));
      showToast(`${adminName} removed from organization administrators.`);
    },
    [showToast]
  );


  const handleInviteSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const newAdmin: AdminUserItem = {
        id: `u-admin-${Date.now()}`,
        name: inviteName,
        email: inviteEmail,
        avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80",
        role: "admin",
        title: "Training Administrator",
        department: inviteDepartment,
        addedDate: "Just now",
        status: "Pending",
      };

      setAdmins((prev) => [...prev, newAdmin]);
      setInviteSuccess(true);
      setTimeout(() => {
        setInviteSuccess(false);
        setIsInviteModalOpen(false);
        setInviteName("");
        setInviteEmail("");
        showToast(`Admin invite sent to ${inviteName}`);
      }, 1500);
    },
    [inviteName, inviteEmail, inviteDepartment, showToast]
  );

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-blue-500 text-white text-xs font-bold px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-2 animate-in fade-in slide-in-from-top-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-[#12131c]/90 rounded-2xl p-5 border border-white/10 shadow-lg">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span
              className={cn(
                "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider border",
                isOwner
                  ? "bg-amber-500/10 text-amber-300 border-amber-400/30"
                  : "bg-blue-500/10 text-blue-300 border-blue-400/30"
              )}
            >
              {isOwner ? (
                <>
                  <Crown className="w-3 h-3 text-amber-400" />
                  <span>Owner View</span>
                </>
              ) : (
                <>
                  <Shield className="w-3 h-3 text-blue-400" />
                  <span>Admin View</span>
                </>
              )}
            </span>
          </div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Shield className="w-5 h-5 text-blue-400" />
            <span>Organization Administrators</span>
          </h2>
          <p className="text-xs text-white/60 mt-0.5">
            {isOwner
              ? "Manage organization administrators, invite team leads, and oversee leadership staff."
              : "View the active organization administrators and team leads."}
          </p>
        </div>

        {isOwner && (
          <button
            onClick={() => setIsInviteModalOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white text-black font-extrabold text-xs hover:bg-white/90 transition-colors shadow-md cursor-pointer shrink-0"
          >
            <UserPlus className="w-4 h-4 text-blue-600" />
            <span>Invite New Admin</span>
          </button>
        )}
      </div>

      {/* Search & Filter Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-[#0d0e14] p-3 rounded-2xl border border-white/10">
        <div className="relative max-w-sm w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search admins by name, email, or department..."
            className="w-full bg-black/60 border border-white/10 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-white/40 focus:outline-none focus:border-blue-400 transition-colors"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="w-4 h-4 text-white/40 shrink-0" />
          <select
            value={selectedStatusFilter}
            onChange={(e) => setSelectedStatusFilter(e.target.value)}
            className="w-full sm:w-auto bg-black/60 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-400 transition-colors"
          >
            <option value="all">All Statuses</option>
            <option value="Active">Active</option>
            <option value="Pending">Pending Invite</option>
            <option value="Suspended">Suspended</option>
          </select>
        </div>
      </div>

      {/* Admins Table */}
      <div className="bg-[#12131c]/90 rounded-2xl border border-white/10 shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-white/10 text-white/40 font-mono text-[10px] uppercase bg-black/40">
                <th className="py-3 px-4 font-semibold">ADMINISTRATOR</th>
                <th className="py-3 px-4 font-semibold">ROLE</th>
                <th className="py-3 px-4 font-semibold">DEPARTMENT</th>
                <th className="py-3 px-4 font-semibold">ADDED DATE</th>
                <th className="py-3 px-4 font-semibold">STATUS</th>
                {isOwner && (
                  <th className="py-3 px-4 font-semibold text-right">MANAGE</th>
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredAdmins.map((admin) => {
                const isOwnerRow = admin.role === "owner";
                const isCurrentSelf = admin.id === "u-owner";

                return (
                  <tr key={admin.id} className="hover:bg-white/[0.02] transition-colors">
                    {/* Administrator Name & Avatar */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <img
                          src={admin.avatar}
                          alt={admin.name}
                          className="w-9 h-9 rounded-full object-cover border border-white/20 shrink-0"
                        />
                        <div>
                          <div className="font-bold text-white text-xs flex items-center gap-1.5">
                            <span>{admin.name}</span>
                            {isCurrentSelf && (
                              <span className="text-[9px] bg-white/10 text-white/70 px-1.5 py-0.2 rounded font-mono">
                                You
                              </span>
                            )}
                          </div>
                          <div className="text-[11px] text-white/50 font-mono">
                            {admin.email}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Role Badge */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      {isOwnerRow ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-amber-500/10 text-amber-300 border border-amber-400/30">
                          <Crown className="w-3 h-3 text-amber-400" />
                          <span>Owner</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-blue-500/10 text-blue-300 border border-blue-400/30">
                          <Shield className="w-3 h-3 text-blue-400" />
                          <span>Admin</span>
                        </span>
                      )}
                    </td>

                    {/* Department / Title */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <div className="text-white font-medium">{admin.department}</div>
                      <div className="text-[10px] text-white/40">{admin.title}</div>
                    </td>

                    {/* Added Date */}
                    <td className="py-3.5 px-4 text-white/60 font-mono whitespace-nowrap">
                      {admin.addedDate}
                    </td>

                    {/* Status */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span
                        className={cn(
                          "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold",
                          admin.status === "Active"
                            ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30"
                            : admin.status === "Suspended"
                            ? "bg-rose-500/10 text-rose-400 border border-rose-500/30"
                            : "bg-amber-500/10 text-amber-400 border border-amber-500/30"
                        )}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-current" />
                        {admin.status}
                      </span>
                    </td>

                    {/* Actions (Owner on Admin rows) */}
                    {isOwner && (
                      <td className="py-3.5 px-4 text-right whitespace-nowrap">
                        <div className="inline-flex items-center gap-1.5 justify-end">
                          {!isOwnerRow ? (
                            <button
                              onClick={() => handleRemoveAdmin(admin.id, admin.name)}
                              className="inline-flex items-center gap-1 text-xs text-rose-400 hover:text-white bg-rose-500/10 hover:bg-rose-500/20 border border-rose-400/30 px-3 py-1.5 rounded-full font-bold transition-colors cursor-pointer"
                              title="Remove admin from organization"
                            >
                              <X className="w-3.5 h-3.5" />
                              <span>Remove</span>
                            </button>
                          ) : (
                            <span className="text-[10px] text-amber-400/80 font-mono px-2.5 py-1 bg-amber-500/5 rounded-full border border-amber-400/20">
                              Protected Owner
                            </span>
                          )}
                        </div>
                      </td>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* INVITE NEW ADMIN MODAL */}
      {isInviteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-md bg-[#0e0f17] border border-blue-400/30 rounded-3xl p-6 sm:p-7 shadow-2xl space-y-5 text-left">
            <button
              onClick={() => setIsInviteModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/5 hover:bg-white/10 text-white/60 hover:text-white cursor-pointer transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-blue-500/10 border border-blue-400/30 flex items-center justify-center text-blue-400">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Invite Organization Admin</h3>
                <p className="text-xs text-white/60">
                  Admins can invite members, assign simulations, and view progress.
                </p>
              </div>
            </div>

            {inviteSuccess ? (
              <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-5 text-center space-y-2">
                <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
                <div className="text-sm font-bold text-white">Admin Invite Sent!</div>
                <p className="text-xs text-white/60">
                  {inviteName} has been invited with Administrator privileges.
                </p>
              </div>
            ) : (
              <form onSubmit={handleInviteSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-white/80 mb-1">
                    Admin Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={inviteName}
                    onChange={(e) => setInviteName(e.target.value)}
                    placeholder="e.g. Rachel Adams"
                    className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-white/40 focus:outline-none focus:border-blue-400"
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
                    placeholder="rachel.adams@acmecorp.com"
                    className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-white/40 focus:outline-none focus:border-blue-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-white/80 mb-1">
                    Department / Team Area
                  </label>
                  <input
                    type="text"
                    required
                    value={inviteDepartment}
                    onChange={(e) => setInviteDepartment(e.target.value)}
                    placeholder="e.g. Operations & Support"
                    className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-white/40 focus:outline-none focus:border-blue-400"
                  />
                </div>

                <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-400/20 text-[11px] text-blue-200 flex items-start gap-2">
                  <ShieldCheck className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                  <span>
                    Admins can manage members and assign simulations. Billing and seats remain Owner-controlled.
                  </span>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-full bg-white text-black hover:bg-white/90 text-xs font-extrabold transition-colors shadow-md cursor-pointer mt-2"
                >
                  Send Admin Invitation
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
});
