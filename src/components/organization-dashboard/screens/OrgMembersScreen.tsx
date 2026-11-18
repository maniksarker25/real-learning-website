"use client";

import { useState, useCallback, useMemo, memo } from "react";
import { Card, EmptyState, Toast } from "@/components/dashboard/ui";
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

  const remind = useCallback((name: string) => showToast(`Reminder sent to ${name}`), [showToast]);
  const rowProps = {
    onViewDetails: setSelectedUserDetails,
    onSendReminder: remind,
    onRemoveMember: handleRemoveMember,
  };

  return (
    <div className="space-y-6">
      <Toast message={toastMessage} />

      <MembersHeader onOpenInviteModal={() => setIsInviteModalOpen(true)} />

      <MembersStatsCards totalMembersCount={members.length} />

      <Card>
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

        {filteredMembers.length === 0 ? (
          <EmptyState title="No members found" description="Try a different name, track or status." />
        ) : (
          <>
            {/* mobile: cards */}
            <div className="space-y-2 md:hidden">
              {filteredMembers.map((member) => (
                <MemberMobileCard key={member.id} member={member} {...rowProps} />
              ))}
            </div>

            {/* desktop: table */}
            <div className="-mx-1 hidden overflow-x-auto md:block">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-white/[0.06] text-sm text-zinc-500">
                    <th className="py-3 pl-1 pr-4 font-normal">Member</th>
                    <th className="px-4 py-3 font-normal">Track</th>
                    <th className="px-4 py-3 font-normal">Classes</th>
                    <th className="px-4 py-3 font-normal">Progress</th>
                    <th className="px-4 py-3 text-right font-normal">Score</th>
                    <th className="px-4 py-3 font-normal">Status</th>
                    <th className="w-10 py-3">
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredMembers.map((member) => (
                    <MemberTableRow key={member.id} member={member} {...rowProps} />
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </Card>

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
