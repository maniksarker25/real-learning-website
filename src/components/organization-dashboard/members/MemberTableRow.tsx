"use client";

import React, { memo } from "react";
import { RowActionMenu } from "@/components/ui/RowActionMenu";
import { MemberUserItem } from "./types";

interface MemberTableRowProps {
  member: MemberUserItem;
  onViewDetails: (member: MemberUserItem) => void;
  onSendReminder: (name: string) => void;
  onRemoveMember: (id: string, name: string) => void;
}

export const MemberTableRow = memo(function MemberTableRow({
  member,
  onViewDetails,
  onSendReminder,
  onRemoveMember,
}: MemberTableRowProps) {
  return (
    <tr className="h-12 border-b border-stone-100 last:border-0 hover:bg-stone-50/70 transition-colors">
      {/* Participant */}
      <td className="px-2.5 lg:px-3.5 py-3 whitespace-nowrap align-middle">
        <div className="flex items-center gap-2.5">
          <img
            src={member.avatar}
            alt={member.name}
            className="w-7 h-7 rounded-full object-cover border border-stone-200 shrink-0"
          />
          <div className="flex items-baseline gap-2 truncate">
            <span className="text-sm font-semibold text-stone-900 leading-normal">
              {member.name}
            </span>
            <span className="text-xs text-stone-400 font-mono hidden xl:inline leading-normal">
              {member.email}
            </span>
          </div>
        </div>
      </td>

      {/* Track */}
      <td className="px-2.5 lg:px-3.5 py-3 whitespace-nowrap align-middle">
        <span className="inline-flex items-center px-2 lg:px-2.5 py-1 rounded text-xs font-mono text-stone-700 bg-stone-100 border border-stone-200 leading-normal">
          {member.track}
        </span>
      </td>

      {/* Enrolled Classes */}
      <td className="px-2.5 lg:px-3.5 py-3 text-stone-700 font-mono text-xs whitespace-nowrap font-medium align-middle leading-normal">
        {member.enrolledClasses} Classes
      </td>

      {/* Progress */}
      <td className="px-2.5 lg:px-3.5 py-3 whitespace-nowrap align-middle w-24 lg:w-32">
        <div className="flex items-center gap-1.5 lg:gap-2">
          <div className="w-12 lg:w-16 h-1.5 bg-stone-100 rounded-full overflow-hidden border border-stone-200/60">
            <div
              className="h-full bg-orange-500 rounded-full"
              style={{ width: `${member.progress}%` }}
            />
          </div>
          <span className="font-mono text-xs text-stone-700 font-bold leading-normal">
            {member.progress}%
          </span>
        </div>
      </td>

      {/* Score */}
      <td className="px-2.5 lg:px-3.5 py-3 text-right whitespace-nowrap align-middle">
        <span className="font-mono font-bold text-xs text-stone-900 bg-stone-100 px-2 lg:px-2.5 py-1 rounded border border-stone-200 leading-normal inline-block">
          {member.score}
        </span>
      </td>

      {/* Status */}
      <td className="px-2.5 lg:px-3.5 py-3 whitespace-nowrap align-middle text-xs font-mono text-stone-700 leading-normal">
        {member.status}
      </td>

      {/* Action Menu */}
      <td className="px-1 py-3 text-center whitespace-nowrap align-middle">
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
      </td>
    </tr>
  );
});
