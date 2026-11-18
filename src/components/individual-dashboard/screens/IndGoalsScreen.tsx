"use client";

import { memo, useCallback, useState, type ReactNode } from "react";
import { Award, Check, CheckCircle2, Circle, Clock, Flame, Plus, Trash2 } from "lucide-react";
import { useAccount } from "@/context/AccountContext";
import { useLearningLoop } from "@/context/LearningLoopContext";
import { cn } from "@/lib/utils";
import {
  Badge,
  BlobCard,
  Button,
  Card,
  CardHeader,
  EmptyState,
  Input,
  PageHeader,
  PatriciaPose,
  ProgressBar,
  Segmented,
  Select,
  Textarea,
} from "@/components/dashboard/ui";

type Category = "Habit" | "Simulation" | "Class" | "Personal";

interface MilestoneItem {
  id: string;
  title: string;
  category: Category;
  targetDate: string;
  completed: boolean;
}

const CATEGORIES: Category[] = ["Personal", "Simulation", "Class", "Habit"];

const INITIAL_MILESTONES: MilestoneItem[] = [
  { id: "m-1", title: "Complete 4 simulations with an 88%+ score", category: "Simulation", targetDate: "This week", completed: true },
  { id: "m-2", title: "Finish Lesson 4: Active listening and calm phrasing", category: "Class", targetDate: "In 3 days", completed: true },
  { id: "m-3", title: "Score 92%+ on the upset refund request scenario", category: "Simulation", targetDate: "This Sunday", completed: false },
  { id: "m-4", title: "Keep a 5-day practice streak", category: "Habit", targetDate: "Ongoing", completed: false },
  { id: "m-5", title: "Pass the final readiness assessment", category: "Personal", targetDate: "Oct 31", completed: false },
];

const INITIAL_DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, i) => ({ day, done: i < 3 }));

export const IndGoalsScreen = memo(function IndGoalsScreen() {
  const { session } = useAccount();
  const { activePath } = useLearningLoop();
  const pathTitle = activePath?.title || session.goal || "Customer Service";

  const [targetScore, setTargetScore] = useState("90");
  const [targetHours, setTargetHours] = useState("5");
  const [studyNote, setStudyNote] = useState(
    "Focus on active listening and acknowledging feelings before offering a fix.",
  );
  const [isNoteSaved, setIsNoteSaved] = useState(false);
  const [newGoalText, setNewGoalText] = useState("");
  const [newGoalCategory, setNewGoalCategory] = useState<Category>("Personal");
  const [milestones, setMilestones] = useState(INITIAL_MILESTONES);
  const [weeklyDays, setWeeklyDays] = useState(INITIAL_DAYS);

  const toggleMilestone = useCallback((id: string) => {
    setMilestones((prev) => prev.map((m) => (m.id === id ? { ...m, completed: !m.completed } : m)));
  }, []);

  const deleteMilestone = useCallback((id: string) => {
    setMilestones((prev) => prev.filter((m) => m.id !== id));
  }, []);

  const handleAddMilestone = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (!newGoalText.trim()) return;
      setMilestones((prev) => [
        { id: `m-${Date.now()}`, title: newGoalText.trim(), category: newGoalCategory, targetDate: "Upcoming", completed: false },
        ...prev,
      ]);
      setNewGoalText("");
    },
    [newGoalText, newGoalCategory],
  );

  const toggleDay = useCallback((index: number) => {
    setWeeklyDays((prev) => prev.map((d, i) => (i === index ? { ...d, done: !d.done } : d)));
  }, []);

  const handleSaveNote = useCallback(() => {
    setIsNoteSaved(true);
    setTimeout(() => setIsNoteSaved(false), 2000);
  }, []);

  const completedCount = milestones.filter((m) => m.completed).length;
  const progressPercent = Math.round((completedCount / (milestones.length || 1)) * 100);
  const activeDays = weeklyDays.filter((d) => d.done).length;

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Goals"
        title="Your goals"
        description="Set your targets, build a weekly habit and check off milestones as you go."
        actions={<Badge tone="orange">{pathTitle}</Badge>}
      />

      {/* overall progress */}
      <BlobCard tone="violet" className="sm:pr-52">
        <p className="text-sm font-medium text-white/80">Milestones completed</p>
        <p className="mt-2 text-5xl font-semibold tracking-[-0.02em] tabular-nums">{progressPercent}%</p>
        <p className="mt-2 text-base text-white/80">
          {completedCount} of {milestones.length} done. Keep going, you&apos;re on track.
        </p>
        <ProgressBar value={progressPercent} className="mt-6 max-w-md bg-white/25" barClassName="bg-white" label="Milestones completed" />
        <PatriciaPose pose="thumbs-up" className="absolute bottom-0 right-6 hidden h-52 w-36 sm:block" sizes="144px" />
      </BlobCard>

      {/* targets */}
      <div className="grid gap-3 md:grid-cols-3">
        <TargetCard icon={Award} label="Target score" value={`${targetScore}%`} note="Job ready is 85%+">
          <Segmented
            label="Target score"
            value={targetScore}
            onChange={setTargetScore}
            options={["85", "90", "95"].map((v) => ({ value: v, label: `${v}%` }))}
          />
        </TargetCard>

        <TargetCard icon={Clock} label="Weekly practice" value={`${targetHours}h`} note={`${Number(targetHours) * 60} minutes a week`}>
          <Segmented
            label="Weekly practice hours"
            value={targetHours}
            onChange={setTargetHours}
            options={["3", "5", "8"].map((v) => ({ value: v, label: `${v}h` }))}
          />
        </TargetCard>

        <TargetCard
          icon={Flame}
          label="This week"
          value={`${activeDays}/7`}
          note={activeDays >= 4 ? "Great pace, you're hitting your target." : "Practice today to keep your streak."}
        >
          <div className="grid grid-cols-7 gap-1">
            {weeklyDays.map((d, i) => (
              <button
                key={d.day}
                type="button"
                onClick={() => toggleDay(i)}
                aria-pressed={d.done}
                aria-label={`${d.day}: ${d.done ? "practiced" : "not practiced"}`}
                className={cn(
                  "flex flex-col items-center gap-1 rounded-xl py-2 text-xs transition-colors",
                  d.done ? "bg-orange-500 text-black" : "border border-white/[0.08] text-zinc-500 hover:border-white/25",
                )}
              >
                {d.day.slice(0, 1)}
                {d.done ? <Check className="h-3.5 w-3.5" /> : <Circle className="h-3.5 w-3.5" />}
              </button>
            ))}
          </div>
        </TargetCard>
      </div>

      {/* milestones */}
      <Card>
        <CardHeader
          title="Milestones"
          description="Check items off as you finish them, or add your own."
          action={<Badge tone="green">{completedCount} done</Badge>}
        />

        <form onSubmit={handleAddMilestone} className="flex flex-col gap-2 sm:flex-row">
          <Input
            value={newGoalText}
            onChange={(e) => setNewGoalText(e.target.value)}
            placeholder="Add a goal, e.g. stay calm with an angry caller"
            aria-label="New milestone"
            className="flex-1"
          />
          <Select
            value={newGoalCategory}
            onChange={(e) => setNewGoalCategory(e.target.value as Category)}
            aria-label="Category"
            className="sm:w-40"
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </Select>
          <Button type="submit" variant="white" size="lg" disabled={!newGoalText.trim()}>
            <Plus className="h-5 w-5" />
            Add
          </Button>
        </form>

        {milestones.length === 0 ? (
          <EmptyState title="No milestones yet" description="Add your first goal above to start tracking it." />
        ) : (
          <ul className="mt-5 divide-y divide-white/[0.06]">
            {milestones.map((m) => (
              <li key={m.id} className="group flex items-center gap-4 py-4 first:pt-1 last:pb-0">
                <button
                  type="button"
                  onClick={() => toggleMilestone(m.id)}
                  aria-label={m.completed ? "Mark as not done" : "Mark as done"}
                  className="shrink-0"
                >
                  {m.completed ? (
                    <CheckCircle2 className="h-6 w-6 text-emerald-400" />
                  ) : (
                    <Circle className="h-6 w-6 text-zinc-600 transition-colors hover:text-zinc-300" />
                  )}
                </button>
                <div className="min-w-0 flex-1">
                  <p className={cn("text-base", m.completed ? "text-zinc-500 line-through" : "text-white")}>{m.title}</p>
                  <p className="mt-1 text-sm text-zinc-500">
                    {m.category} · {m.targetDate}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => deleteMilestone(m.id)}
                  aria-label="Remove milestone"
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-zinc-600 transition-colors hover:bg-white/[0.05] hover:text-rose-400"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </Card>

      {/* focus note */}
      <Card>
        <CardHeader
          title="Focus note"
          description="A reminder to yourself for this week's practice."
          action={isNoteSaved ? <Badge tone="green"><Check className="h-3.5 w-3.5" />Saved</Badge> : undefined}
        />
        <Textarea
          value={studyNote}
          onChange={(e) => setStudyNote(e.target.value)}
          rows={3}
          aria-label="Focus note"
          placeholder="Write a technique reminder for this week..."
        />
        <div className="mt-3 flex justify-end">
          <Button variant="white" onClick={handleSaveNote}>
            Save note
          </Button>
        </div>
      </Card>
    </div>
  );
});

function TargetCard({
  icon: Icon,
  label,
  value,
  note,
  children,
}: {
  icon: typeof Award;
  label: string;
  value: string;
  note: string;
  children: ReactNode;
}) {
  return (
    <Card className="flex flex-col">
      <div className="flex items-center justify-between">
        <span className="text-sm text-zinc-400">{label}</span>
        <Icon className="h-4 w-4 text-zinc-500" />
      </div>
      <p className="mt-4 text-3xl font-semibold tracking-[-0.02em] text-white tabular-nums">{value}</p>
      <p className="mt-1 text-sm text-zinc-500">{note}</p>
      <div className="mt-auto pt-5">{children}</div>
    </Card>
  );
}
