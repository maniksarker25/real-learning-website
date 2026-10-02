"use client";

import React, { useState, useMemo, memo } from "react";
import {
  CompletedSimulationItem,
  getCompletedSimulations,
  OrgSimulationsHeader,
  OrgSimulationsFilterBar,
  OrgSimulationCard,
  OrgSimulationTranscriptModal,
} from "../simulations";

export const OrgSimulationsScreen = memo(function OrgSimulationsScreen() {
  const [selectedTrackFilter, setSelectedTrackFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSimulationDetails, setSelectedSimulationDetails] =
    useState<CompletedSimulationItem | null>(null);

  const completedSimulations = useMemo(() => getCompletedSimulations(), []);

  const filteredSimulations = useMemo(() => {
    return completedSimulations.filter((sim) => {
      const matchesTrack =
        selectedTrackFilter === "all" ||
        sim.careerTrack === selectedTrackFilter;
      const matchesSearch =
        sim.scenarioTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sim.member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sim.member.email.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesTrack && matchesSearch;
    });
  }, [completedSimulations, selectedTrackFilter, searchTerm]);

  return (
    <div className="space-y-6">
      <OrgSimulationsHeader averageScore="92.2%" />

      <OrgSimulationsFilterBar
        selectedTrackFilter={selectedTrackFilter}
        onSelectTrackFilter={setSelectedTrackFilter}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        totalCount={completedSimulations.length}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredSimulations.map((sim) => (
          <OrgSimulationCard
            key={sim.id}
            simulation={sim}
            onViewTranscript={setSelectedSimulationDetails}
          />
        ))}
      </div>

      {selectedSimulationDetails && (
        <OrgSimulationTranscriptModal
          simulation={selectedSimulationDetails}
          onClose={() => setSelectedSimulationDetails(null)}
        />
      )}
    </div>
  );
});
