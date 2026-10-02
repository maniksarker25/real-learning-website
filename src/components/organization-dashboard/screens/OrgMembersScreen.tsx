"use client";

import React, { useState, useCallback, useMemo, memo } from "react";
import { CheckCircle2 } from "lucide-react";
import {
  MemberUserItem,
  getInitialMembers,
  MembersHeader,
  MembersStatsCards,
  MembersFilterBar,
  MemberTableRow,
  MemberMobileCard,
  MemberDetailsModal,
  InviteMemberModal,
} from "../members";

export const OrgMembersScreen = memo(function OrgMembersScreen() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTrack, setSelectedTrack] = useState("all");
  const [selectedStatusFilter, setSelectedStatusFilter] = useState("all");

  // Modals state
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [selectedUserDetails, setSelectedUserDetails] =
    useState<MemberUserItem | null>(null);

  // Toast feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  }, []);

  const [members, setMembers] = useState<MemberUserItem[]>(getInitialMembers);

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
    (newInvite: { name: string; email: string; track: string }) => {
      const newMember: MemberUserItem = {
        id: `u-${Date.now()}`,
        name: newInvite.name,
        email: newInvite.email,
        avatar:
          "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80",
        track: newInvite.track,
        enrolledClasses: 1,
        progress: 0,
        score: "Pending",
        status: "Pending",
      };

      setMembers((prev) => [newMember, ...prev]);
      showToast(`Member invite sent to ${newInvite.name}`);
    },
    [showToast]
  );

  const handleResetFilters = useCallback(() => {
    setSelectedTrack("all");
    setSelectedStatusFilter("all");
    setSearchTerm("");
  }, []);

  return (
    <div className="space-y-4">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-stone-900 text-white text-xs font-bold px-4 py-2.5 rounded-lg border border-stone-800 flex items-center gap-2 animate-in fade-in slide-in-from-top-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Screen Header */}
      <MembersHeader
        onOpenInviteModal={() => setIsInviteModalOpen(true)}
      />

      {/* Stats Cards */}
      <MembersStatsCards totalMembersCount={members.length} />

      {/* Members Table & Card List Container */}
      <div className="bg-white rounded-xl p-4 border border-stone-200 space-y-3 overflow-hidden">
        {/* Filter and Search Bar */}
        <MembersFilterBar
          totalCount={members.length}
          filteredCount={filteredMembers.length}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          selectedTrack={selectedTrack}
          onTrackChange={setSelectedTrack}
          selectedStatusFilter={selectedStatusFilter}
          onStatusChange={setSelectedStatusFilter}
          onResetFilters={handleResetFilters}
        />

        {/* Mobile View: Card List (< md) */}
        <div className="md:hidden divide-y divide-stone-100 -mx-4 -mb-4">
          {filteredMembers.length === 0 ? (
            <div className="text-center text-stone-400 text-xs py-8 px-4 leading-normal">
              No members found matching current filter.
            </div>
          ) : (
            filteredMembers.map((member) => (
              <MemberMobileCard
                key={member.id}
                member={member}
                onViewDetails={setSelectedUserDetails}
                onSendReminder={(name) =>
                  showToast(`Reminder sent to ${name}`)
                }
                onRemoveMember={handleRemoveMember}
              />
            ))
          )}
        </div>

        {/* Desktop View: Table (>= md) */}
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
                  <MemberTableRow
                    key={member.id}
                    member={member}
                    onViewDetails={setSelectedUserDetails}
                    onSendReminder={(name) =>
                      showToast(`Reminder sent to ${name}`)
                    }
                    onRemoveMember={handleRemoveMember}
                  />
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modals */}
      <MemberDetailsModal
        member={selectedUserDetails}
        onClose={() => setSelectedUserDetails(null)}
      />

      <InviteMemberModal
        isOpen={isInviteModalOpen}
        onClose={() => setIsInviteModalOpen(false)}
        onInvite={handleInviteSubmit}
      />
    </div>
  );
});
