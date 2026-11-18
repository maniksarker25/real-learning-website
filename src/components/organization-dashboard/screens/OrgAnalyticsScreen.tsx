"use client";

import React, { memo } from "react";
import { CheckCircle2, TrendingUp, Zap } from "lucide-react";
import {
  BlobCard,
  Card,
  CardHeader,
  PageHeader,
  PatriciaPose,
  ProgressBar,
  StatTile,
} from "@/components/dashboard/ui";

const SKILLS = [
  { skill: "De-escalation and professional tone", score: 94 },
  { skill: "Technical accuracy and diagnostics", score: 88 },
  { skill: "Empathetic communication", score: 91 },
  { skill: "Time to resolution", score: 84 },
];

export const OrgAnalyticsScreen = memo(function OrgAnalyticsScreen() {
  const top = SKILLS.reduce((a, b) => (b.score > a.score ? b : a));

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Analytics"
        title="Team skills"
        description="Simulation scores, weekly volume and skill mastery across your teams."
      />

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <StatTile
          label="Average simulation score"
          value="88.5%"
          note="+4.2% vs last month"
          noteTone="positive"
          icon={TrendingUp}
        />
        <StatTile label="Simulations completed" value="3,420" note="342 this week" icon={Zap} />
        <StatTile
          label="Skill mastery rate"
          value="92.1%"
          note="Passed on the first try"
          noteTone="positive"
          icon={CheckCircle2}
        />
      </div>

      <div className="grid grid-cols-1 gap-3 lg:grid-cols-12">
        <Card className="lg:col-span-8">
          <CardHeader title="Skill scores" description="How Patricia scores your team on each skill." />
          <ul className="space-y-5">
            {SKILLS.map((item) => (
              <li key={item.skill}>
                <div className="mb-2 flex items-center justify-between gap-3">
                  <span className="text-base text-white">{item.skill}</span>
                  <span className="text-sm font-medium text-zinc-300 tabular-nums">{item.score}%</span>
                </div>
                <ProgressBar value={item.score} label={item.skill} />
              </li>
            ))}
          </ul>
        </Card>

        <BlobCard tone="green" className="flex min-h-64 flex-col lg:col-span-4">
          <p className="text-sm text-white/80">Strongest skill</p>
          <p className="mt-2 max-w-[14rem] text-2xl font-semibold leading-tight tracking-[-0.01em]">{top.skill}</p>
          <p className="mt-auto text-5xl font-semibold tracking-[-0.02em] tabular-nums">{top.score}%</p>
          <PatriciaPose pose="thumbs-up" className="absolute bottom-0 right-4 h-40 w-28" sizes="112px" />
        </BlobCard>
      </div>
    </div>
  );
});
