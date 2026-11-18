"use client";

import { RowActionMenu } from "@/components/ui/RowActionMenu";
import { Badge } from "@/components/dashboard/ui";
import type { MemberUserItem } from "./types";

const STATUS_TONE = { Active: "green", Pending: "amber", Suspended: "rose" } as const;

/** Coloured status pill shared by the table row, mobile card and details modal. */
export function MemberStatusBadge({ status }: { status: MemberUserItem["status"] }) {
  return <Badge tone={STATUS_TONE[status]}>{status}</Badge>;
}

/** Round avatar image. */
export function MemberAvatar({ member, size = 36 }: { member: MemberUserItem; size?: number }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={member.avatar}
      alt=""
      className="shrink-0 rounded-full object-cover"
      style={{ width: size, height: size }}
    />
  );
}

/** "…" menu with the three member actions. */
export function MemberActions({
  member,
  onViewDetails,
  onSendReminder,
  onRemoveMember,
}: {
  member: MemberUserItem;
  onViewDetails: (member: MemberUserItem) => void;
  onSendReminder: (name: string) => void;
  onRemoveMember: (id: string, name: string) => void;
}) {
  return (
    <RowActionMenu
      buttonAriaLabel={`Actions for ${member.name}`}
      theme="dark"
      align="right"
      items={[
        { id: "details", label: "View details", onClick: () => onViewDetails(member) },
        { id: "remind", label: "Send reminder", onClick: () => onSendReminder(member.name) },
        { id: "remove", label: "Remove member", danger: true, onClick: () => onRemoveMember(member.id, member.name) },
      ]}
    />
  );
}
