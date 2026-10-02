"use client";

import React, { useState, useMemo, memo } from "react";
import {
  RecentSimulationItem,
  RecentSimulationsTableProps,
  getRecentSimulations,
  RecentSimulationsFilterTabs,
  RecentSimulationTableRow,
  RecentSimulationFeedbackModal,
} from "./recent-simulations";

export type { RecentSimulationItem };

export const RecentSimulationsTable = memo(function RecentSimulationsTable({
  onLaunchSimulation,
}: RecentSimulationsTableProps) {
  const [selectedSimFeedback, setSelectedSimFeedback] =
    useState<RecentSimulationItem | null>(null);
  const [trackFilter, setTrackFilter] = useState("all");

  const recentSimulations = useMemo(() => getRecentSimulations(), []);

  const filteredSimulations = useMemo(() => {
    if (trackFilter === "all") return recentSimulations;
    return recentSimulations.filter((s) => s.careerTrack === trackFilter);
  }, [recentSimulations, trackFilter]);

  return (
    <div className="space-y-3">
      {/* Filter Tabs */}
      <RecentSimulationsFilterTabs
        activeFilter={trackFilter}
        onSelectFilter={setTrackFilter}
      />

      {/* Recent Simulations Table */}
      <div className="bg-white rounded-xl border border-stone-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-stone-200 text-stone-500 font-mono text-[10px] uppercase bg-stone-50/80">
                <th className="py-3 px-4 font-semibold">SIMULATION SCENARIO</th>
                <th className="py-3 px-4 font-semibold">CAREER TRACK</th>
                <th className="py-3 px-4 font-semibold">SCORE</th>
                <th className="py-3 px-4 font-semibold">DATE & DURATION</th>
                <th className="py-3 px-4 font-semibold">STATUS</th>
                <th className="py-3 px-4 font-semibold text-right">
                  FEEDBACK & ACTION
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {filteredSimulations.map((sim) => (
                <RecentSimulationTableRow
                  key={sim.id}
                  simulation={sim}
                  onSelectFeedback={setSelectedSimFeedback}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Full Simulation Feedback Modal */}
      {selectedSimFeedback && (
        <RecentSimulationFeedbackModal
          simulation={selectedSimFeedback}
          onClose={() => setSelectedSimFeedback(null)}
          onLaunchSimulation={onLaunchSimulation}
        />
      )}
    </div>
  );
});
