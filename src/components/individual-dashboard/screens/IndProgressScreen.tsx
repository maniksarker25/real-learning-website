"use client";

import { memo } from "react";
import { BookOpen, CheckCircle2, Flame, Target, TrendingUp, Zap } from "lucide-react";
import { useAccount } from "@/context/AccountContext";
import { cn } from "@/lib/utils";
import {
  Badge,
  Card,
  PageHeader,
  PatriciaFace,
  SectionTitle,
  StatGrid,
  StatTile,
} from "@/components/dashboard/ui";
import { RecentSimulationsTable } from "../RecentSimulationsTable";
import { SkillMatrixEqualizer } from "../SkillMatrixEqualizer";
import { UserProgressSummary } from "@/types/individual";
import { DEFAULT_USER_PROGRESS } from "@/data/mockUserProgress";

interface IndProgressScreenProps {
  /**
   * Optional progress data payload. When API is connected,
   * pass the fetched UserProgressSummary directly.
   */
  progressData?: UserProgressSummary;
}

export const IndProgressScreen = memo(function IndProgressScreen({ progressData }: IndProgressScreenProps) {
  const { session } = useAccount();

  const data: UserProgressSummary = progressData || DEFAULT_USER_PROGRESS;
  const { metrics, skills, milestones } = data;
  const classPct = Math.round((metrics.classesCompleted / metrics.totalClasses) * 100);

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Progress"
        title="Your progress"
        description="How your skills, practice habit and simulation scores are growing."
        actions={<Badge tone="orange">{data.careerTrackTitle || session.goal || "Customer Service"}</Badge>}
      />

      <StatGrid>
        <StatTile label="Streak" value={`${metrics.learningStreakDays} days`} note="Practicing daily" icon={Flame} />
        <StatTile
          label="Classes done"
          value={`${metrics.classesCompleted}/${metrics.totalClasses}`}
          note={`${classPct}% finished`}
          icon={BookOpen}
        />
        <StatTile label="Simulations passed" value={metrics.simulationsPassed} note="Verified scores" icon={Zap} />
        <StatTile
          label="Accuracy"
          value={`${metrics.overallAccuracy}%`}
          note={`+${metrics.monthlyAccuracyGain}% this month`}
          noteTone="positive"
          icon={TrendingUp}
        />
      </StatGrid>

      <section>
        <SectionTitle title="Skill levels" />
        <SkillMatrixEqualizer
          skills={skills}
          title="Skill mastery"
          subtitle="Patricia scores each skill across your simulations."
        />
      </section>

      <section>
        <SectionTitle title="Milestones" action={<Badge>{data.levelTier || "Level 2 Specialist"}</Badge>} />
        <div className="grid gap-3 md:grid-cols-3">
          {milestones.map((m) => {
            const done = m.status === "completed";
            return (
              <Card key={m.id || m.title} className="flex flex-col">
                <div className="flex items-start justify-between gap-3">
                  <span
                    className={cn(
                      "flex h-10 w-10 items-center justify-center rounded-xl",
                      done ? "bg-emerald-500/15 text-emerald-400" : "bg-orange-500/15 text-orange-400",
                    )}
                  >
                    {done ? <CheckCircle2 className="h-5 w-5" /> : <Target className="h-5 w-5" />}
                  </span>
                  <Badge tone={done ? "green" : "neutral"}>{m.progress}</Badge>
                </div>
                <p className="mt-5 text-base font-medium text-white">{m.title}</p>
                <p className="mt-1 text-sm leading-relaxed text-zinc-500">{m.desc}</p>
              </Card>
            );
          })}
        </div>

        {data.nextBadgeHint && (
          <div className="mt-3 flex items-center gap-4 rounded-2xl border border-white/[0.06] bg-[#181818] p-4">
            <PatriciaFace face="excited" size={44} />
            <p className="text-sm leading-relaxed text-zinc-300">{data.nextBadgeHint}</p>
          </div>
        )}
      </section>

      <RecentSimulationsTable />
    </div>
  );
});
