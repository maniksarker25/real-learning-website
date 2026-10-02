"use client";

import React, { memo } from "react";
import { RowActionMenu } from "@/components/ui/RowActionMenu";
import { MemberUserItem } from "./types";

interface MemberMobileCardProps {
  member: MemberUserItem;
  onViewDetails: (member: MemberUserItem) => void;
  onSendReminder: (name: string) => void;
  onRemoveMember: (id: string, name: string) => void;
}

export const MemberMobileCard = memo(function MemberMobileCard({
  member,
  onViewDetails,
  onSendReminder,
  onRemoveMember,
}: MemberMobileCardProps) {
  return (
    <div className="p-4 space-y-3 hover:bg-stone-50/60 transition-colors">
      {/* Top Row: Participant Info & 3-Dot Actions */}
      <div className="flex items-start justify-between gap-2.5">
        <div className="flex items-center gap-3 min-w-0">
          <img
            src={member.avatar}
            alt={member.name}
            className="w-10 h-10 rounded-full object-cover border border-stone-200 shrink-0"
          />
          <div className="min-w-0">
            <div className="text-sm font-semibold text-stone-900 truncate">
              {member.name}
            </div>
            <div className="text-xs text-stone-400 font-mono truncate">
              {member.email}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-mono text-stone-700 bg-stone-100 border border-stone-200">
            {member.status}
          </span>
          <RowActionMenu
            buttonAriaLabel={`Actions for ${member.name}`}
            theme="light"
            align="right"
            items={[
              {
                id: "details",
                label: "View Details",
                onClick: () => onViewDetails(member),
              },
              {
                id: "remind",
                label: "Send Reminder",
                onClick: () => onSendReminder(member.name),
              },
              {
                id: "remove",
                label: "Remove Member",
                danger: true,
                onClick: () => onRemoveMember(member.id, member.name),
              },
            ]}
          />
        </div>
      </div>

      {/* Middle Row: Track Badge & Score */}
      <div className="flex items-center justify-between gap-2 text-xs">
        <span className="inline-flex items-center px-2.5 py-1 rounded font-mono text-stone-700 bg-stone-100 border border-stone-200">
          {member.track}
        </span>
        <div className="flex items-center gap-1.5 font-mono">
          <span className="text-stone-400 text-xs">Avg Score:</span>
          <span className="font-bold text-xs text-stone-900 bg-stone-100 px-2.5 py-0.5 rounded border border-stone-200">
            {member.score}
          </span>
        </div>
      </div>

      {/* Bottom Row: Class Count & Progress */}
      <div className="space-y-1.5 pt-0.5">
        <div className="flex items-center justify-between text-xs text-stone-600 font-mono">
          <span>{member.enrolledClasses} Classes enrolled</span>
          <span className="font-bold text-stone-800">
            {member.progress}% Complete
          </span>
        </div>
        <div className="w-full h-1.5 bg-stone-100 rounded-full overflow-hidden border border-stone-200/60">
          <div
            className="h-full bg-orange-500 rounded-full"
            style={{ width: `${member.progress}%` }}
          />
        </div>
      </div>
    </div>
  );
});
