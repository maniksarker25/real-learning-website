"use client";

import React, { memo, useMemo, useState } from "react";
import { ArrowUpRight, ChevronDown, UserPlus } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAccount } from "@/context/AccountContext";
import { RowActionMenu } from "@/components/ui/RowActionMenu";
import {
  Badge,
  BlobCard,
  ButtonLink,
  Card,
  CardHeader,
  EmptyState,
  PageHeader,
  ProgressBar,
  Select,
  StatTile,
} from "@/components/dashboard/ui";

interface Participant {
  id: number;
  name: string;
  role: string;
  avatar: string;
  track: string;
  status: string;
  progress: number;
  score: string;
}

const TRACK_FILTER_OPTIONS = [
  { id: "all", label: "All tracks" },
  { id: "Customer Service", label: "Customer Service" },
  { id: "Tech Support", label: "Tech Support" },
  { id: "IT Specialist", label: "IT Specialist" },
  { id: "Healthcare Support", label: "Healthcare" },
] as const;

const METRICS = [
  { id: "total-participants", label: "Total participants", value: "1,248", change: "+14.2% active learners" },
  { id: "total-simulations-completed", label: "Simulations completed", value: "3,842", change: "+342 this week" },
  { id: "simulation-completion", label: "Completion rate", value: "88.5%", change: "+5.2% mastery rate" },
];

const CAREER_TRACKS = [
  { id: "customer-service", name: "Customer Service", count: 380, percentage: 38 },
  { id: "tech-support", name: "Tech Support", count: 290, percentage: 29 },
  { id: "it-specialist", name: "IT Specialist", count: 210, percentage: 21 },
  { id: "healthcare-support", name: "Healthcare Support", count: 160, percentage: 16 },
];

const PARTICIPANTS: Participant[] = [
  {
    id: 1,
    name: "Sarah Jenkins",
    role: "Senior Agent",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80",
    track: "Customer Service",
    status: "Completed",
    progress: 94,
    score: "96%",
  },
  {
    id: 2,
    name: "David Chen",
    role: "Tier 2 Support",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
    track: "Tech Support",
    status: "In Progress",
    progress: 78,
    score: "88%",
  },
  {
    id: 3,
    name: "Elena Rostova",
    role: "Systems Analyst",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
    track: "IT Specialist",
    status: "In Progress",
    progress: 64,
    score: "85%",
  },
  {
    id: 4,
    name: "Marcus Vance",
    role: "Clinical Care",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80",
    track: "Healthcare Support",
    status: "Active",
    progress: 45,
    score: "79%",
  },
  {
    id: 5,
    name: "Aisha Khan",
    role: "Lead Specialist",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80",
    track: "Customer Service",
    status: "Certified",
    progress: 98,
    score: "94%",
  },
];

const rowActions = (name: string) => [
  { id: "view", label: `View ${name}` },
  { id: "edit", label: "Change track" },
  { id: "remind", label: "Send reminder" },
];

export const OrgOverviewScreen = memo(function OrgOverviewScreen() {
  const { session } = useAccount();
  const [selectedTrack, setSelectedTrack] = useState<string>("all");

  const filteredParticipants = useMemo(
    () => (selectedTrack === "all" ? PARTICIPANTS : PARTICIPANTS.filter((p) => p.track === selectedTrack)),
    [selectedTrack],
  );

  const [highlight, ...restMetrics] = METRICS;

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Overview"
        title={session.orgName || "Your team"}
        description="How your people are practicing, by track and by person."
        actions={
          <ButtonLink href="/organization-dashboard/members" variant="white">
            <UserPlus className="h-4 w-4" />
            Manage members
          </ButtonLink>
        }
      />

      {/* metrics: first one is the highlight */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <BlobCard tone="orange" className="p-5 sm:p-5">
          <p className="text-sm text-white/80">{highlight.label}</p>
          <p className="mt-4 text-3xl font-semibold tracking-[-0.02em] tabular-nums">{highlight.value}</p>
          <p className="mt-1 flex items-center gap-1 text-sm text-white/80">
            <ArrowUpRight className="h-4 w-4" />
            {highlight.change}
          </p>
        </BlobCard>
        {restMetrics.map((m) => (
          <StatTile key={m.id} label={m.label} value={m.value} note={m.change} noteTone="positive" />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-3 lg:grid-cols-12">
        {/* career track participation */}
        <Card className="lg:col-span-5">
          <CardHeader
            title="Career tracks"
            description="Tap a track to filter the table."
            action={<Badge tone="orange">{CAREER_TRACKS.length} tracks</Badge>}
          />
          <div className="space-y-2">
            {CAREER_TRACKS.map((track) => {
              const active = selectedTrack === track.name;
              return (
                <button
                  key={track.id}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setSelectedTrack((prev) => (prev === track.name ? "all" : track.name))}
                  className={cn(
                    "w-full rounded-2xl border p-4 text-left transition-colors",
                    active ? "border-orange-500/60 bg-orange-500/10" : "border-white/[0.06] hover:bg-white/[0.03]",
                  )}
                >
                  <div className="mb-3 flex items-center justify-between gap-2">
                    <span className="truncate text-base font-medium text-white">{track.name}</span>
                    <span className="shrink-0 text-sm text-zinc-400">
                      <span className="text-white">{track.count}</span> · {track.percentage}%
                    </span>
                  </div>
                  <ProgressBar value={track.percentage} label={`${track.name} share`} />
                </button>
              );
            })}
          </div>
        </Card>

        {/* participant progress */}
        <Card className="overflow-hidden lg:col-span-7">
          <CardHeader
            title="Participant progress"
            description={`Showing ${filteredParticipants.length} of ${PARTICIPANTS.length} participants`}
            action={
              <div className="relative w-full sm:w-48">
                <Select
                  value={selectedTrack}
                  onChange={(e) => setSelectedTrack(e.target.value)}
                  aria-label="Filter by career track"
                  className="h-10 py-0 text-sm"
                >
                  {TRACK_FILTER_OPTIONS.map((opt) => (
                    <option key={opt.id} value={opt.id}>
                      {opt.label}
                    </option>
                  ))}
                </Select>
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
              </div>
            }
          />

          {filteredParticipants.length === 0 ? (
            <EmptyState title="No participants found" description="Try another track." />
          ) : (
            <>
              {/* mobile: stacked cards */}
              <ul className="-mx-5 divide-y divide-white/[0.06] md:hidden">
                {filteredParticipants.map((p) => (
                  <li key={p.id} className="space-y-3 px-5 py-4">
                    <div className="flex items-center justify-between gap-3">
                      <ParticipantName p={p} />
                      <RowActionMenu
                        buttonAriaLabel={`Actions for ${p.name}`}
                        theme="dark"
                        align="right"
                        buttonClassName="h-9 w-9 rounded-full"
                        items={rowActions(p.name)}
                      />
                    </div>
                    <div className="flex items-center justify-between gap-2">
                      <Badge>{p.track}</Badge>
                      <span className="text-sm text-zinc-400">
                        Score <span className="font-medium text-white">{p.score}</span>
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <ProgressBar value={p.progress} label={`${p.name} progress`} />
                      <span className="w-10 shrink-0 text-right text-sm text-zinc-300 tabular-nums">{p.progress}%</span>
                    </div>
                  </li>
                ))}
              </ul>

              {/* desktop: table */}
              <div className="-mx-6 hidden overflow-x-auto md:block">
                <table className="w-full border-collapse text-left text-sm">
                  <thead>
                    <tr className="border-b border-white/[0.06] text-zinc-500">
                      <th className="px-6 py-3 font-medium">Participant</th>
                      <th className="px-3 py-3 font-medium">Track</th>
                      <th className="px-3 py-3 font-medium">Progress</th>
                      <th className="px-3 py-3 text-right font-medium">Score</th>
                      <th className="w-12 px-6 py-3">
                        <span className="sr-only">Actions</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredParticipants.map((p) => (
                      <tr
                        key={p.id}
                        className="border-b border-white/[0.04] transition-colors last:border-0 hover:bg-white/[0.02]"
                      >
                        <td className="whitespace-nowrap px-6 py-3.5">
                          <ParticipantName p={p} small />
                        </td>
                        <td className="whitespace-nowrap px-3 py-3.5">
                          <Badge>{p.track}</Badge>
                        </td>
                        <td className="w-40 whitespace-nowrap px-3 py-3.5">
                          <div className="flex items-center gap-2.5">
                            <ProgressBar value={p.progress} className="w-20" label={`${p.name} progress`} />
                            <span className="text-zinc-300 tabular-nums">{p.progress}%</span>
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-3 py-3.5 text-right font-medium text-white tabular-nums">
                          {p.score}
                        </td>
                        <td className="px-6 py-3.5 text-right">
                          <RowActionMenu
                            buttonAriaLabel={`Actions for ${p.name}`}
                            theme="dark"
                            buttonClassName="h-8 w-8 rounded-full"
                            items={rowActions(p.name)}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </Card>
      </div>
    </div>
  );
});

function ParticipantName({ p, small }: { p: Participant; small?: boolean }) {
  return (
    <div className="flex min-w-0 items-center gap-3">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={p.avatar}
        alt=""
        className={cn("shrink-0 rounded-full object-cover", small ? "h-8 w-8" : "h-10 w-10")}
      />
      <div className="min-w-0">
        <p className="truncate text-base font-medium text-white">{p.name}</p>
        {!small && <p className="truncate text-sm text-zinc-500">{p.role}</p>}
      </div>
    </div>
  );
}
