"use client";

import { memo } from "react";
import { Badge, BlobCard, Button, Modal, ProgressBar } from "@/components/dashboard/ui";
import { MemberAvatar, MemberStatusBadge } from "./MemberParts";
import type { MemberUserItem } from "./types";

interface MemberDetailsModalProps {
  member: MemberUserItem | null;
  onClose: () => void;
}

export const MemberDetailsModal = memo(function MemberDetailsModal({ member, onClose }: MemberDetailsModalProps) {
  if (!member) return null;

  const skills = member.skillsBreakdown
    ? [
        { label: "Communication", value: member.skillsBreakdown.communication },
        { label: "De-escalation", value: member.skillsBreakdown.deEscalation },
        { label: "Troubleshooting", value: member.skillsBreakdown.diagnostics },
        { label: "Empathy", value: member.skillsBreakdown.empathy },
      ]
    : [];

  return (
    <Modal
      open
      onClose={onClose}
      title={
      <div className="flex items-center gap-4">
        <MemberAvatar member={member} size={56} />
        <div className="min-w-0">
          <span className="block truncate text-xl font-semibold tracking-[-0.01em] text-white">{member.name}</span>
          <p className="truncate text-sm text-zinc-500">{member.email}</p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            <MemberStatusBadge status={member.status} />
            <Badge>{member.track}</Badge>
          </div>
        </div>
      </div>
      }
    >
      {/* score + skills */}
      <div className="grid gap-3 sm:grid-cols-5">
        <BlobCard tone="green" className="p-5 sm:col-span-2 sm:p-6">
          <p className="text-sm text-white/80">Overall score</p>
          <p className="mt-2 text-4xl font-semibold tracking-[-0.02em] tabular-nums">{member.score}</p>
          <p className="mt-1 text-sm text-white/75">From simulations</p>
        </BlobCard>

        <div className="rounded-3xl border border-white/[0.06] bg-black/20 p-5 sm:col-span-3">
          <p className="text-sm font-medium text-white">Skills</p>
          {skills.length > 0 ? (
            <ul className="mt-4 space-y-3.5">
              {skills.map((s) => (
                <li key={s.label}>
                  <div className="mb-1.5 flex justify-between text-sm">
                    <span className="text-zinc-400">{s.label}</span>
                    <span className="font-medium text-white tabular-nums">{s.value}%</span>
                  </div>
                  <ProgressBar value={s.value} label={s.label} />
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-3 text-sm text-zinc-500">No skill data yet.</p>
          )}
        </div>
      </div>

      {/* history */}
      <h3 className="mb-3 mt-7 text-base font-medium text-white">Completed classes</h3>
      {member.completedClassesHistory && member.completedClassesHistory.length > 0 ? (
        <ul className="divide-y divide-white/[0.06] rounded-2xl border border-white/[0.06]">
          {member.completedClassesHistory.map((item) => (
            <li key={item.title} className="flex items-center justify-between gap-3 px-4 py-3.5">
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-white">{item.title}</p>
                <p className="text-sm text-zinc-500">{item.date}</p>
              </div>
              <Badge tone="green">{item.score}</Badge>
            </li>
          ))}
        </ul>
      ) : (
        <p className="rounded-2xl border border-white/[0.06] px-4 py-6 text-center text-sm text-zinc-500">
          No completed classes yet.
        </p>
      )}

      <div className="mt-7 flex justify-end">
        <Button variant="white" onClick={onClose}>
          Close
        </Button>
      </div>
    </Modal>
  );
});
