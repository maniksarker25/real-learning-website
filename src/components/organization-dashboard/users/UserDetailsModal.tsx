"use client";

import { memo } from "react";
import { Badge, BlobCard, Modal, ProgressBar } from "@/components/dashboard/ui";
import { RoleBadge } from "./UserBadges";
import type { UserItem } from "./types";

interface UserDetailsModalProps {
  user: UserItem | null;
  onClose: () => void;
}

export const UserDetailsModal = memo(function UserDetailsModal({ user, onClose }: UserDetailsModalProps) {
  if (!user) return null;

  const skills = user.skillsBreakdown
    ? [
        { label: "Communication", value: user.skillsBreakdown.communication },
        { label: "De-escalation", value: user.skillsBreakdown.deEscalation },
        { label: "Diagnostics", value: user.skillsBreakdown.diagnostics },
        { label: "Empathy", value: user.skillsBreakdown.empathy },
      ]
    : [];
  const history = user.completedClassesHistory || [];

  return (
    <Modal open onClose={onClose} title="Member details">
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={user.avatar} alt="" className="h-14 w-14 shrink-0 rounded-full object-cover" />
          <div className="min-w-0">
            <p className="truncate text-lg font-semibold text-white">{user.name}</p>
            <p className="truncate text-sm text-zinc-500">{user.email}</p>
            <div className="mt-2 flex flex-wrap gap-2">
              <RoleBadge role={user.role} />
              <Badge>{user.track}</Badge>
            </div>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-[200px_1fr]">
          <BlobCard tone="orange" className="flex flex-col justify-center p-5 sm:p-5">
            <p className="text-sm text-white/80">Overall score</p>
            <p className="mt-1 text-4xl font-semibold tracking-[-0.02em] tabular-nums">{user.score}</p>
            <p className="mt-1 text-sm text-white/80">From simulations</p>
          </BlobCard>

          <div className="rounded-3xl border border-white/[0.06] bg-black/20 p-5">
            <p className="text-sm font-medium text-white">Skills</p>
            {skills.length ? (
              <ul className="mt-4 space-y-3.5">
                {skills.map((s) => (
                  <li key={s.label}>
                    <div className="mb-1.5 flex justify-between text-sm">
                      <span className="text-zinc-400">{s.label}</span>
                      <span className="text-white tabular-nums">{s.value}%</span>
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

        <div>
          <p className="mb-3 text-sm font-medium text-white">Completed classes & simulations</p>
          {history.length ? (
            <ul className="divide-y divide-white/[0.06] rounded-2xl border border-white/[0.06]">
              {history.map((item) => (
                <li key={item.title} className="flex items-center justify-between gap-4 p-4">
                  <div className="min-w-0">
                    <p className="truncate text-base text-white">{item.title}</p>
                    <p className="text-sm text-zinc-500">{item.date}</p>
                  </div>
                  <Badge tone="green">{item.score}</Badge>
                </li>
              ))}
            </ul>
          ) : (
            <p className="rounded-2xl border border-white/[0.06] p-5 text-center text-sm text-zinc-500">
              No completed simulations yet.
            </p>
          )}
        </div>
      </div>
    </Modal>
  );
});
