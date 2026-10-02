"use client";

import React, { memo } from "react";
import { Users, UserPlus, Crown, Shield } from "lucide-react";
import { cn } from "@/lib/utils";
import { OrgRole } from "@/types/account";

interface UsersHeaderProps {
  currentOrgRole: OrgRole;
  onOpenInviteModal: () => void;
}

export const UsersHeader = memo(function UsersHeader({
  currentOrgRole,
  onOpenInviteModal,
}: UsersHeaderProps) {
  const isOwner = currentOrgRole === "owner";

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white rounded-2xl p-5 border border-stone-200 shadow-sm">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span
            className={cn(
              "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider border font-mono",
              isOwner
                ? "bg-amber-50 text-amber-800 border-amber-200"
                : "bg-blue-50 text-blue-800 border-blue-200"
            )}
          >
            {isOwner ? (
              <>
                <Crown className="w-3 h-3 text-amber-600" />
                <span>Owner View (Full Control)</span>
              </>
            ) : (
              <>
                <Shield className="w-3 h-3 text-blue-600" />
                <span>Admin View (Member Management)</span>
              </>
            )}
          </span>
        </div>
        <h2 className="text-xl font-bold text-stone-900 flex items-center gap-2">
          <Users className="w-5 h-5 text-orange-600" />
          <span>Organization Members & Role Permissions</span>
        </h2>
        <p className="text-xs text-stone-500 mt-0.5">
          {isOwner
            ? "Manage all members, promote/demote admins, transfer ownership, and view AI simulation progress."
            : "Invite and manage regular members, assign learning tracks, and evaluate simulation scores."}
        </p>
      </div>

      <button
        onClick={onOpenInviteModal}
        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-stone-900 text-white font-bold text-xs hover:bg-stone-800 transition-colors shadow-sm cursor-pointer shrink-0"
      >
        <UserPlus className="w-4 h-4 text-orange-400" />
        <span>Invite New Member</span>
      </button>
    </div>
  );
});
