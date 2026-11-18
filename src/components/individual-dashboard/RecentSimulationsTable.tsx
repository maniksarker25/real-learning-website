"use client";

import { memo, useMemo, useState } from "react";
import { Card, EmptyState, SectionTitle } from "@/components/dashboard/ui";
import {
  RecentSimulationItem,
  RecentSimulationsTableProps,
  getRecentSimulations,
  RecentSimulationsFilterTabs,
  RecentSimulationTableRow,
  RecentSimulationCard,
  RecentSimulationFeedbackModal,
} from "./recent-simulations";

export type { RecentSimulationItem };

const COLUMNS = ["Scenario", "Track", "Score", "Date", ""];

export const RecentSimulationsTable = memo(function RecentSimulationsTable({
  onLaunchSimulation,
}: RecentSimulationsTableProps) {
  const [selected, setSelected] = useState<RecentSimulationItem | null>(null);
  const [trackFilter, setTrackFilter] = useState("all");

  const all = useMemo(() => getRecentSimulations(), []);
  const rows = useMemo(
    () => (trackFilter === "all" ? all : all.filter((s) => s.careerTrack === trackFilter)),
    [all, trackFilter],
  );

  return (
    <section>
      <SectionTitle title="Recent simulations" />
      <RecentSimulationsFilterTabs activeFilter={trackFilter} onSelectFilter={setTrackFilter} />

      <Card className="mt-4 overflow-hidden p-0 sm:p-0">
        {rows.length === 0 ? (
          <EmptyState title="No sessions on this track yet" description="Finish a simulation and it will show up here." />
        ) : (
          <>
            {/* desktop table */}
            <table className="hidden w-full text-left md:table">
              <thead>
                <tr className="border-b border-white/[0.06] text-sm text-zinc-500">
                  {COLUMNS.map((c) => (
                    <th key={c || "action"} className="px-5 py-3.5 font-normal">
                      {c}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.06]">
                {rows.map((sim) => (
                  <RecentSimulationTableRow key={sim.id} simulation={sim} onSelectFeedback={setSelected} />
                ))}
              </tbody>
            </table>

            {/* mobile cards */}
            <div className="divide-y divide-white/[0.06] md:hidden">
              {rows.map((sim) => (
                <RecentSimulationCard key={sim.id} simulation={sim} onSelectFeedback={setSelected} />
              ))}
            </div>
          </>
        )}
      </Card>

      {selected && (
        <RecentSimulationFeedbackModal
          simulation={selected}
          onClose={() => setSelected(null)}
          onLaunchSimulation={onLaunchSimulation}
        />
      )}
    </section>
  );
});
