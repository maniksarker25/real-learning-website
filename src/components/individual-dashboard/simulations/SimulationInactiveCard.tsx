"use client";

import { memo } from "react";
import { ArrowRight } from "lucide-react";
import { SimulationScenario } from "@/types/individual";
import { Button, Card, EmptyState } from "@/components/dashboard/ui";

interface SimulationInactiveCardProps {
  scenario: SimulationScenario;
  onStartSimulation: (scenario: SimulationScenario) => void;
}

export const SimulationInactiveCard = memo(function SimulationInactiveCard({
  scenario,
  onStartSimulation,
}: SimulationInactiveCardProps) {
  return (
    <Card className="mx-auto max-w-lg">
      <EmptyState
        pose="wave"
        title="Ready when you are"
        description={`Start "${scenario.title}" with ${scenario.characterName}. It takes about ${scenario.estimatedTime}.`}
        action={
          <Button size="lg" onClick={() => onStartSimulation(scenario)}>
            Start simulation
            <ArrowRight className="h-5 w-5" />
          </Button>
        }
      />
    </Card>
  );
});
