"use client";

import React, { memo } from "react";
import {
  Crown,
  Shield,
  User,
  Eye,
  UserCheck,
  UserX,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { OrgRole } from "@/types/account";
import { UserItem } from "./types";

interface UserTableRowProps {
  user: UserItem;
  currentOrgRole: OrgRole;
  onViewDetails: (user: UserItem) => void;
  onToggleRole: (userId: string, currentRole: OrgRole) => void;
  onToggleStatus: (
    userId: string,
    currentStatus: "Active" | "Pending" | "Suspended"
  ) => void;
  onRemoveUser: (userId: string) => void;
  onOpenTransferModal: (user: UserItem) => void;
}

export const UserTableRow = memo(function UserTableRow({
  user,
  currentOrgRole,
  onViewDetails,
  onToggleRole,
  onToggleStatus,
  onRemoveUser,
  onOpenTransferModal,
}: UserTableRowProps) {
  const isOwnerRow = user.role === "owner";
  const isAdminRow = user.role === "admin";
  const isCurrentSelf = user.id === "u-owner";

  const canManageRole = currentOrgRole === "owner" && !isOwnerRow;
  const canSuspendOrRemove =
    (currentOrgRole === "owner" && !isOwnerRow) ||
    (currentOrgRole === "admin" && user.role === "member");

  return (
    <tr className="hover:bg-stone-50/70 transition-colors">
      {/* Participant Column */}
      <td className="py-3.5 px-4 whitespace-nowrap">
        <div className="flex items-center gap-3">
          <img
            src={user.avatar}
            alt={user.name}
            className="w-8 h-8 rounded-full object-cover border border-stone-200 shrink-0"
          />
          <div>
            <div className="font-bold text-stone-900 text-xs flex items-center gap-1.5">
              <span>{user.name}</span>
              {isCurrentSelf && (
                <span className="text-[9px] bg-stone-100 text-stone-600 border border-stone-200 px-1.5 py-0.2 rounded font-mono font-bold">
                  You
                </span>
              )}
            </div>
            <div className="text-[11px] text-stone-500 font-mono">
              {user.email}
            </div>
          </div>
        </div>
      </td>

      {/* Org Role Badge Column */}
      <td className="py-3.5 px-4 whitespace-nowrap">
        {user.role === "owner" && (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-amber-50 text-amber-800 border border-amber-200">
            <Crown className="w-3 h-3 text-amber-600" />
            <span>Owner</span>
          </span>
        )}
        {user.role === "admin" && (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-blue-50 text-blue-800 border border-blue-200">
            <Shield className="w-3 h-3 text-blue-600" />
            <span>Admin</span>
          </span>
        )}
        {user.role === "member" && (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold bg-stone-100 text-stone-700 border border-stone-200">
            <User className="w-3 h-3 text-stone-400" />
            <span>Member</span>
          </span>
        )}
      </td>

      {/* Career Track Column */}
      <td className="py-3.5 px-4 whitespace-nowrap">
        <span
          className={cn(
            "inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-medium border font-mono",
            user.trackColor
          )}
        >
          {user.track}
        </span>
      </td>

      {/* Progress Column */}
      <td className="py-3.5 px-4 w-32">
        <div className="flex items-center gap-2">
          <div className="w-full h-1.5 bg-stone-100 rounded-full overflow-hidden border border-stone-200/60">
            <div
              className="h-full bg-orange-600 rounded-full"
              style={{ width: `${user.progress}%` }}
            />
          </div>
          <span className="font-mono text-[11px] text-stone-700 font-bold">
            {user.progress}%
          </span>
        </div>
      </td>

      {/* Score Column */}
      <td className="py-3.5 px-4 whitespace-nowrap">
        <span className="font-mono font-bold text-xs text-stone-900 bg-stone-100 px-2 py-0.5 rounded border border-stone-200">
          {user.score}
        </span>
      </td>

      {/* Status Column */}
      <td className="py-3.5 px-4 whitespace-nowrap">
        <span
          className={cn(
            "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold border font-mono",
            user.status === "Active"
              ? "bg-emerald-50 text-emerald-800 border-emerald-200"
              : user.status === "Suspended"
              ? "bg-rose-50 text-rose-800 border-rose-200"
              : "bg-amber-50 text-amber-800 border-amber-200"
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
            onClick={() => onViewDetails(user)}
            className="inline-flex items-center gap-1 text-xs text-orange-700 hover:text-orange-800 bg-orange-50 hover:bg-orange-100 border border-orange-200 px-2.5 py-1.5 rounded-full font-bold transition-colors cursor-pointer"
            title="View detailed skill evaluation and test history"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Details</span>
          </button>

          {/* Role Promotion / Demotion */}
          {canManageRole && (
            <button
              onClick={() => onToggleRole(user.id, user.role)}
              className={cn(
                "inline-flex items-center gap-1 text-xs px-2.5 py-1.5 rounded-full font-bold transition-colors cursor-pointer border",
                isAdminRow
                  ? "bg-stone-100 hover:bg-stone-200 text-stone-700 border-stone-200"
                  : "bg-blue-50 hover:bg-blue-100 text-blue-800 border-blue-200"
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
              onClick={() => onOpenTransferModal(user)}
              className="inline-flex items-center gap-1 text-xs text-amber-800 hover:text-amber-900 bg-amber-50 hover:bg-amber-100 border border-amber-200 px-2.5 py-1.5 rounded-full font-bold transition-colors cursor-pointer"
              title="Transfer full organization ownership to this admin"
            >
              <Crown className="w-3 h-3 text-amber-600" />
              <span>Transfer</span>
            </button>
          )}

          {/* Suspend / Reactivate */}
          {canSuspendOrRemove && (
            <button
              onClick={() => onToggleStatus(user.id, user.status)}
              className={cn(
                "p-1.5 rounded-full border transition-colors cursor-pointer",
                user.status === "Suspended"
                  ? "bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100"
                  : "bg-stone-100 text-stone-500 border-stone-200 hover:text-rose-600 hover:border-rose-200"
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
              onClick={() => onRemoveUser(user.id)}
              className="p-1.5 rounded-full bg-rose-50 text-rose-600 border border-rose-200 hover:text-rose-700 hover:bg-rose-100 transition-colors cursor-pointer"
              title="Remove from organization"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}

          {/* Protected Badge for Owner Row */}
          {isOwnerRow && (
            <span className="text-[10px] text-amber-800 font-mono font-bold px-2 py-1 bg-amber-50 rounded-full border border-amber-200">
              Protected Owner
            </span>
          )}
        </div>
      </td>
    </tr>
  );
});
