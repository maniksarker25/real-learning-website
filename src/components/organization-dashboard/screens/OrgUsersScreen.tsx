"use client";

import React, { useState, useCallback, useMemo, memo } from "react";
import { CheckCircle2 } from "lucide-react";
import { useAccount } from "@/context/AccountContext";
import { OrgRole } from "@/types/account";
import {
  UserItem,
  getInitialUsers,
  UsersHeader,
  UsersFilterBar,
  UserTableRow,
  UserDetailsModal,
  InviteUserModal,
  TransferOwnershipModal,
} from "../users";

export const OrgUsersScreen = memo(function OrgUsersScreen() {
  const { session } = useAccount();
  const currentOrgRole: OrgRole = session.orgRole || "owner";

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTrack, setSelectedTrack] = useState("all");
  const [selectedRoleFilter, setSelectedRoleFilter] = useState<string>("all");

  // Modals state
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [selectedUserDetails, setSelectedUserDetails] =
    useState<UserItem | null>(null);
  const [transferOwnershipTarget, setTransferOwnershipTarget] =
    useState<UserItem | null>(null);

  // Toast feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  }, []);

  const [users, setUsers] = useState<UserItem[]>(() =>
    getInitialUsers(session.name, session.email)
  );

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
      showToast(`Member status changed to ${newStatus}`);
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

  const handleConfirmTransferOwnership = useCallback(
    (target: UserItem) => {
      setUsers((prev) =>
        prev.map((u) => {
          if (u.id === target.id) {
            return { ...u, role: "owner" };
          }
          if (u.role === "owner") {
            return { ...u, role: "admin" };
          }
          return u;
        })
      );
      showToast(`Ownership successfully transferred to ${target.name}!`);
    },
    [showToast]
  );

  const handleInviteSubmit = useCallback(
    (newInvite: {
      name: string;
      email: string;
      role: "admin" | "member";
      track: string;
    }) => {
      const trackColors: Record<string, string> = {
        "Customer Service": "bg-orange-50 text-orange-800 border-orange-200",
        "Tech Support": "bg-emerald-50 text-emerald-800 border-emerald-200",
        "IT Specialist": "bg-rose-50 text-rose-800 border-rose-200",
      };

      const newUser: UserItem = {
        id: `u-${Date.now()}`,
        name: newInvite.name,
        email: newInvite.email,
        role: newInvite.role,
        avatar:
          "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80",
        track: newInvite.track,
        trackColor:
          trackColors[newInvite.track] ||
          "bg-purple-50 text-purple-800 border-purple-200",
        enrolledClasses: 1,
        progress: 0,
        score: "Pending",
        status: "Pending",
      };

      setUsers((prev) => [newUser, ...prev]);
      showToast(
        `Invitation sent to ${newInvite.name} as ${newInvite.role.toUpperCase()}`
      );
    },
    [showToast]
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

      {/* Screen Header */}
      <UsersHeader
        currentOrgRole={currentOrgRole}
        onOpenInviteModal={() => setIsInviteModalOpen(true)}
      />

      {/* Search and Filters */}
      <UsersFilterBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedRoleFilter={selectedRoleFilter}
        onRoleFilterChange={setSelectedRoleFilter}
        selectedTrack={selectedTrack}
        onTrackFilterChange={setSelectedTrack}
      />

      {/* Members Table */}
      <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-stone-200 text-stone-400 font-mono text-[10px] uppercase bg-stone-50/70">
                <th className="py-3 px-4 font-semibold">PARTICIPANT</th>
                <th className="py-3 px-4 font-semibold">ORG ROLE</th>
                <th className="py-3 px-4 font-semibold">CAREER TRACK</th>
                <th className="py-3 px-4 font-semibold">PROGRESS</th>
                <th className="py-3 px-4 font-semibold">AI SCORE</th>
                <th className="py-3 px-4 font-semibold">STATUS</th>
                <th className="py-3 px-4 font-semibold text-right">
                  MANAGE & ACTIONS
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {filteredUsers.map((user) => (
                <UserTableRow
                  key={user.id}
                  user={user}
                  currentOrgRole={currentOrgRole}
                  onViewDetails={setSelectedUserDetails}
                  onToggleRole={handleToggleRole}
                  onToggleStatus={handleToggleStatus}
                  onRemoveUser={handleRemoveUser}
                  onOpenTransferModal={setTransferOwnershipTarget}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modals */}
      <UserDetailsModal
        user={selectedUserDetails}
        onClose={() => setSelectedUserDetails(null)}
      />

      <InviteUserModal
        isOpen={isInviteModalOpen}
        onClose={() => setIsInviteModalOpen(false)}
        onInvite={handleInviteSubmit}
      />

      <TransferOwnershipModal
        targetUser={transferOwnershipTarget}
        onClose={() => setTransferOwnershipTarget(null)}
        onConfirm={handleConfirmTransferOwnership}
      />
    </div>
  );
});
