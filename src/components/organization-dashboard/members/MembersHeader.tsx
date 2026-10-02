"use client";

import React, { memo } from "react";
import { UserPlus } from "lucide-react";

interface MembersHeaderProps {
  onOpenInviteModal: () => void;
}

export const MembersHeader = memo(function MembersHeader({
  onOpenInviteModal,
}: MembersHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white rounded-xl p-4 sm:p-5 border border-stone-200">
      <div>
        <h2 className="text-lg sm:text-xl font-bold text-stone-900">
          Organization Members & Learner Participants
        </h2>
        <p className="text-xs text-stone-500 mt-0.5">
          View enrolled learner performance, track completion progress, evaluate
          simulation scores, and manage access.
        </p>
      </div>

      <button
        type="button"
        onClick={onOpenInviteModal}
        className="inline-flex items-center gap-2 px-3.5 py-2 rounded-md bg-stone-900 text-white font-medium text-xs hover:bg-stone-800 transition-colors cursor-pointer shrink-0"
      >
        <UserPlus className="w-4 h-4 text-orange-400" />
        <span>Invite New Member</span>
      </button>
    </div>
  );
});
