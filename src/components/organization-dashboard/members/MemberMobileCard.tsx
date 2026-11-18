"use client";

import { memo } from "react";
import { ProgressBar } from "@/components/dashboard/ui";
import { MemberActions, MemberAvatar, MemberStatusBadge } from "./MemberParts";
import type { MemberUserItem } from "./types";

interface MemberMobileCardProps {
  member: MemberUserItem;
  onViewDetails: (member: MemberUserItem) => void;
  onSendReminder: (name: string) => void;
  onRemoveMember: (id: string, name: string) => void;
}

export const MemberMobileCard = memo(function MemberMobileCard(props: MemberMobileCardProps) {
  const { member, onViewDetails } = props;
  return (
    <div className="rounded-2xl border border-white/[0.06] bg-black/20 p-4">
      <div className="flex items-start justify-between gap-3">
        <button type="button" onClick={() => onViewDetails(member)} className="flex min-w-0 items-center gap-3 text-left">
          <MemberAvatar member={member} size={44} />
          <span className="min-w-0">
            <span className="block truncate text-base font-medium text-white">{member.name}</span>
            <span className="block truncate text-sm text-zinc-500">{member.email}</span>
          </span>
        </button>
        <MemberActions {...props} />
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <MemberStatusBadge status={member.status} />
        <span className="text-sm text-zinc-400">{member.track}</span>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2 text-sm">
        <div>
          <p className="text-zinc-500">Classes</p>
          <p className="mt-0.5 font-medium text-white tabular-nums">{member.enrolledClasses}</p>
        </div>
        <div>
          <p className="text-zinc-500">Score</p>
          <p className="mt-0.5 font-medium text-white tabular-nums">{member.score}</p>
        </div>
        <div>
          <p className="text-zinc-500">Progress</p>
          <p className="mt-0.5 font-medium text-white tabular-nums">{member.progress}%</p>
        </div>
      </div>
      <ProgressBar value={member.progress} className="mt-3" label={`${member.name} progress`} />
    </div>
  );
});
