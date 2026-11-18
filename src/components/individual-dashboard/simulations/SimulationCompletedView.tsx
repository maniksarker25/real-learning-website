"use client";

import { memo } from "react";
import { RotateCcw, TrendingUp } from "lucide-react";
import { SimulationScenario } from "@/types/individual";
import { Badge, BlobCard, Button, Card, CardHeader, PageHeader, ProgressBar } from "@/components/dashboard/ui";

interface SimulationCompletedViewProps {
  scenario: SimulationScenario;
  onPracticeAgain: (scenario: SimulationScenario) => void;
  onBackToList: () => void;
}

const SKILLS = [
  { name: "Communication and clarity", score: 95 },
  { name: "Empathy and tone", score: 96 },
  { name: "Active listening", score: 93 },
  { name: "Problem solving", score: 92 },
  { name: "Conflict resolution", score: 94 },
];

export const SimulationCompletedView = memo(function SimulationCompletedView({
  scenario,
  onPracticeAgain,
  onBackToList,
}: SimulationCompletedViewProps) {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Simulation feedback"
        title="Your result"
        description={scenario.title}
        actions={
          <>
            <Button onClick={() => onPracticeAgain(scenario)}>
              <RotateCcw className="h-4 w-4" />
              Practice again
            </Button>
            <Button variant="outline" onClick={onBackToList}>
              Back to list
            </Button>
          </>
        }
      />

      <div className="grid gap-3 lg:grid-cols-12">
        <BlobCard tone="green" className="flex flex-col justify-between lg:col-span-4">
          <p className="text-sm font-medium text-white/80">Overall score</p>
          <p className="mt-6 text-6xl font-semibold tracking-[-0.03em] tabular-nums">94%</p>
          <p className="mt-3 inline-flex items-center gap-1.5 text-sm text-white/90">
            <TrendingUp className="h-4 w-4" />
            Strong performance
          </p>
        </BlobCard>

        <Card className="lg:col-span-8">
          <CardHeader title="Skill breakdown" action={<Badge tone="green">All above 90%</Badge>} />
          <ul className="space-y-4">
            {SKILLS.map((sk) => (
              <li key={sk.name}>
                <div className="mb-2 flex justify-between text-sm">
                  <span className="text-zinc-300">{sk.name}</span>
                  <span className="font-medium text-white tabular-nums">{sk.score}%</span>
                </div>
                <ProgressBar value={sk.score} label={sk.name} />
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  );
});
