"use client";

import React, { memo } from "react";
import { Zap } from "lucide-react";
import { SimulationScenario } from "@/types/individual";

interface SimulationInactiveCardProps {
  scenario: SimulationScenario;
  onStartSimulation: (scenario: SimulationScenario) => void;
}

export const SimulationInactiveCard = memo(function SimulationInactiveCard({
  scenario,
  onStartSimulation,
}: SimulationInactiveCardProps) {
  return (
    <div className="bg-white rounded-xl p-8 border border-stone-200 text-center space-y-3 max-w-md mx-auto">
      <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700 mx-auto">
        <Zap className="w-6 h-6" />
      </div>
      <div className="space-y-1">
        <h3 className="text-base font-bold text-stone-900">
          Practice Simulation Ready
        </h3>
        <p className="text-xs text-stone-500 max-w-xs mx-auto">
          Ready to start{" "}
          <strong className="text-stone-800 font-semibold">
            {scenario.title}
          </strong>
          ?
        </p>
      </div>
      <button
        type="button"
        onClick={() => onStartSimulation(scenario)}
        className="px-4 py-2 rounded-lg bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold transition-colors cursor-pointer"
      >
        Start Simulation
      </button>
    </div>
  );
});
