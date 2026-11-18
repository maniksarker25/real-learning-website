"use client";

import { memo } from "react";
import { ProgressBar } from "@/components/dashboard/ui";
import { MemberActions, MemberAvatar, MemberStatusBadge } from "./MemberParts";
import type { MemberUserItem } from "./types";

interface MemberTableRowProps {
  member: MemberUserItem;
  onViewDetails: (member: MemberUserItem) => void;
  onSendReminder: (name: string) => void;
  onRemoveMember: (id: string, name: string) => void;
}

export const MemberTableRow = memo(function MemberTableRow(props: MemberTableRowProps) {
  const { member, onViewDetails } = props;
  return (
    <tr className="border-b border-white/[0.06] transition-colors last:border-0 hover:bg-white/[0.02]">
      <td className="py-4 pl-1 pr-4">
        <button type="button" onClick={() => onViewDetails(member)} className="flex items-center gap-3 text-left">
          <MemberAvatar member={member} />
          <span className="min-w-0">
            <span className="block truncate text-sm font-medium text-white hover:text-orange-400">{member.name}</span>
            <span className="block truncate text-sm text-zinc-500">{member.email}</span>
          </span>
        </button>
      </td>
      <td className="whitespace-nowrap px-4 py-4 text-sm text-zinc-300">{member.track}</td>
      <td className="whitespace-nowrap px-4 py-4 text-sm text-zinc-300 tabular-nums">{member.enrolledClasses}</td>
      <td className="px-4 py-4">
        <div className="flex w-36 items-center gap-3">
          <ProgressBar value={member.progress} label={`${member.name} progress`} />
          <span className="w-10 shrink-0 text-right text-sm text-zinc-300 tabular-nums">{member.progress}%</span>
        </div>
      </td>
      <td className="whitespace-nowrap px-4 py-4 text-right text-sm font-medium text-white tabular-nums">{member.score}</td>
      <td className="whitespace-nowrap px-4 py-4">
        <MemberStatusBadge status={member.status} />
      </td>
      <td className="py-4 pl-2 pr-1 text-right">
        <MemberActions {...props} />
      </td>
    </tr>
  );
});
