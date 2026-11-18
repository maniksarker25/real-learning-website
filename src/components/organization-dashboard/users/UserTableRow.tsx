"use client";

import { memo } from "react";
import { Crown, Eye, Shield, UserCheck, UserX, X } from "lucide-react";
import type { OrgRole } from "@/types/account";
import { Badge, Button, ProgressBar } from "@/components/dashboard/ui";
import { RoleBadge, StatusBadge } from "./UserBadges";
import type { UserItem } from "./types";

interface UserTableRowProps {
  user: UserItem;
  currentOrgRole: OrgRole;
  onViewDetails: (user: UserItem) => void;
  onToggleRole: (userId: string, currentRole: OrgRole) => void;
  onToggleStatus: (userId: string, currentStatus: "Active" | "Pending" | "Suspended") => void;
  onRemoveUser: (userId: string) => void;
  onOpenTransferModal: (user: UserItem) => void;
}

const iconBtn =
  "flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-zinc-400 transition-colors";

/** Name + avatar + email. */
function UserIdentity({ user }: { user: UserItem }) {
  return (
    <div className="flex min-w-0 items-center gap-3">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={user.avatar} alt="" className="h-10 w-10 shrink-0 rounded-full object-cover" />
      <div className="min-w-0">
        <p className="flex items-center gap-2 truncate text-base font-medium text-white">
          {user.name}
          {user.id === "u-owner" && <Badge className="px-2 py-0.5">You</Badge>}
        </p>
        <p className="truncate text-sm text-zinc-500">{user.email}</p>
      </div>
    </div>
  );
}

/** Role-aware action buttons (same rules for the table row and the mobile card). */
function UserActions({
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
  const canManageRole = currentOrgRole === "owner" && !isOwnerRow;
  const canSuspendOrRemove =
    (currentOrgRole === "owner" && !isOwnerRow) || (currentOrgRole === "admin" && user.role === "member");
  const suspended = user.status === "Suspended";

  return (
    <div className="flex flex-wrap items-center gap-1.5 md:justify-end">
      <Button size="sm" variant="outline" onClick={() => onViewDetails(user)}>
        <Eye className="h-4 w-4" />
        Details
      </Button>

      {canManageRole && (
        <Button
          size="sm"
          variant="outline"
          onClick={() => onToggleRole(user.id, user.role)}
          title={isAdminRow ? "Change to member" : "Make admin"}
        >
          <Shield className="h-4 w-4" />
          {isAdminRow ? "Demote" : "Make admin"}
        </Button>
      )}

      {currentOrgRole === "owner" && isAdminRow && (
        <Button size="sm" variant="outline" onClick={() => onOpenTransferModal(user)} title="Transfer ownership">
          <Crown className="h-4 w-4" />
          Transfer
        </Button>
      )}

      {canSuspendOrRemove && (
        <>
          <button
            type="button"
            onClick={() => onToggleStatus(user.id, user.status)}
            aria-label={suspended ? `Reactivate ${user.name}` : `Suspend ${user.name}`}
            title={suspended ? "Reactivate" : "Suspend"}
            className={`${iconBtn} ${suspended ? "hover:border-emerald-500/50 hover:text-emerald-400" : "hover:border-amber-500/50 hover:text-amber-400"}`}
          >
            {suspended ? <UserCheck className="h-4 w-4" /> : <UserX className="h-4 w-4" />}
          </button>
          <button
            type="button"
            onClick={() => onRemoveUser(user.id)}
            aria-label={`Remove ${user.name}`}
            title="Remove from organization"
            className={`${iconBtn} hover:border-rose-500/50 hover:text-rose-400`}
          >
            <X className="h-4 w-4" />
          </button>
        </>
      )}

      {isOwnerRow && <span className="px-2 text-sm text-zinc-500">Protected</span>}
    </div>
  );
}

function UserProgress({ value }: { value: number }) {
  return (
    <div className="flex items-center gap-3">
      <ProgressBar value={value} className="w-24" label="Progress" />
      <span className="text-sm text-zinc-300 tabular-nums">{value}%</span>
    </div>
  );
}

/** Desktop table row. */
export const UserTableRow = memo(function UserTableRow(props: UserTableRowProps) {
  const { user } = props;
  return (
    <tr className="transition-colors hover:bg-white/[0.02]">
      <td className="px-5 py-4">
        <UserIdentity user={user} />
      </td>
      <td className="whitespace-nowrap px-5 py-4">
        <RoleBadge role={user.role} />
      </td>
      <td className="whitespace-nowrap px-5 py-4 text-sm text-zinc-300">{user.track}</td>
      <td className="px-5 py-4">
        <UserProgress value={user.progress} />
      </td>
      <td className="whitespace-nowrap px-5 py-4 text-base font-medium text-white tabular-nums">{user.score}</td>
      <td className="whitespace-nowrap px-5 py-4">
        <StatusBadge status={user.status} />
      </td>
      <td className="px-5 py-4">
        <UserActions {...props} />
      </td>
    </tr>
  );
});

/** Mobile stacked card with the same data and actions. */
export const UserMobileCard = memo(function UserMobileCard(props: UserTableRowProps) {
  const { user } = props;
  return (
    <div className="space-y-4 p-5">
      <UserIdentity user={user} />
      <div className="flex flex-wrap items-center gap-2">
        <RoleBadge role={user.role} />
        <StatusBadge status={user.status} />
        <Badge>{user.track}</Badge>
      </div>
      <div className="flex items-center justify-between gap-4">
        <UserProgress value={user.progress} />
        <span className="text-sm text-zinc-500">
          Score <span className="text-base font-medium text-white">{user.score}</span>
        </span>
      </div>
      <UserActions {...props} />
    </div>
  );
});
