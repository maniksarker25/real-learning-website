"use client";

import { memo } from "react";
import { Route, Users } from "lucide-react";
import { BlobCard, PatriciaPose, ProgressBar, StatTile } from "@/components/dashboard/ui";

interface MembersStatsCardsProps {
  totalMembersCount: number;
}

export const MembersStatsCards = memo(function MembersStatsCards({ totalMembersCount }: MembersStatsCardsProps) {
  return (
    <div className="grid gap-3 lg:grid-cols-12">
      {/* headline score */}
      <BlobCard tone="green" className="lg:col-span-7 sm:pr-44">
        <div className="flex flex-wrap items-center gap-2">
          <p className="text-sm font-medium text-white/80">Average simulation score</p>
          <span className="rounded-full bg-black/20 px-2.5 py-1 text-xs font-medium text-white">+3.8% this cycle</span>
        </div>
        <p className="mt-3 text-5xl font-semibold tracking-[-0.03em] tabular-nums sm:text-6xl">91.4%</p>
        <p className="mt-2 max-w-sm text-sm text-white/75">Across every simulation your team completed.</p>

        <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/75">
          <span>
            Top <strong className="font-semibold text-white">98%</strong>
          </span>
          <span>
            Median <strong className="font-semibold text-white">88%</strong>
          </span>
          <span>
            Passing <strong className="font-semibold text-white">100%</strong>
          </span>
        </div>
        <ProgressBar value={91.4} className="mt-3 max-w-xs bg-black/20" barClassName="bg-white" label="Average score" />

        <PatriciaPose pose="thumbs-up" className="absolute bottom-0 right-5 hidden h-52 w-36 sm:block" sizes="144px" />
      </BlobCard>

      <div className="grid gap-3 sm:grid-cols-2 lg:col-span-5 lg:grid-cols-1">
        <StatTile
          label="Enrolled learners"
          value={totalMembersCount}
          note="All seats in use"
          icon={Users}
        />
        <StatTile
          label="Active career tracks"
          value="4"
          note="Customer service, tech support, IT, healthcare"
          icon={Route}
        />
      </div>
    </div>
  );
});
