import { UserProgressSummary } from "@/types/individual";

/**
 * Standard default / mock object for User Progress.
 * When connecting to your real backend API, this structure can be returned
 * directly from your endpoint (e.g. GET /api/user/progress).
 */
export const DEFAULT_USER_PROGRESS: UserProgressSummary = {
  userId: "usr-learner-1",
  careerTrackId: "path-cust-service",
  careerTrackTitle: "Customer Service",
  levelTier: "Level 2 Specialist",
  metrics: {
    learningStreakDays: 7,
    classesCompleted: 3,
    totalClasses: 4,
    simulationsPassed: 5,
    overallAccuracy: 92.8,
    monthlyAccuracyGain: 14.2,
  },
  skills: [
    {
      id: "s1",
      name: "Communication",
      level: 52,
      benchmark: 80,
      category: "Core",
      delta: "+18%",
      lastEvaluatedAt: "2026-09-18T10:30:00Z",
    },
    {
      id: "s2",
      name: "Empathy",
      level: 46,
      benchmark: 80,
      category: "Tone",
      delta: "+12%",
      lastEvaluatedAt: "2026-09-18T10:30:00Z",
    },
    {
      id: "s3",
      name: "Problem Solving",
      level: 38,
      benchmark: 80,
      category: "Diagnostics",
      delta: "+8%",
      lastEvaluatedAt: "2026-09-17T15:45:00Z",
    },
    {
      id: "s4",
      name: "Active Listening",
      level: 58,
      benchmark: 80,
      category: "Comprehension",
      delta: "+22%",
      lastEvaluatedAt: "2026-09-18T11:00:00Z",
    },
    {
      id: "s5",
      name: "De-escalation",
      level: 42,
      benchmark: 80,
      category: "Conflict",
      delta: "+16%",
      lastEvaluatedAt: "2026-09-18T11:30:00Z",
    },
    {
      id: "s6",
      name: "Clarity & Tone",
      level: 60,
      benchmark: 80,
      category: "Clarity",
      delta: "+25%",
      lastEvaluatedAt: "2026-09-18T11:45:00Z",
    },
    {
      id: "s7",
      name: "Resolution Speed",
      level: 34,
      benchmark: 80,
      category: "Efficiency",
      delta: "+10%",
      lastEvaluatedAt: "2026-09-16T14:20:00Z",
    },
  ],
  milestones: [
    {
      id: "m1",
      title: "Foundation Certified",
      desc: "Completed 3 foundational communication classes",
      status: "completed",
      progress: "100%",
      progressPercent: 100,
      unlockedAt: "2026-09-15T09:00:00Z",
      badgeIcon: "CheckCircle2",
    },
    {
      id: "m2",
      title: "Roleplay Specialist",
      desc: "Pass 6 AI roleplay simulations with >85% score",
      status: "in_progress",
      progress: "5 / 6 Completed",
      progressPercent: 83,
      badgeIcon: "Target",
    },
    {
      id: "m3",
      title: "Mastery Distinction",
      desc: "Maintain >90% overall accuracy across all career skills",
      status: "in_progress",
      progress: "92.8% Current",
      progressPercent: 93,
      badgeIcon: "Trophy",
    },
  ],
  nextBadgeHint:
    "You are 1 simulation away from unlocking the Roleplay Specialist certification badge.",
  updatedAt: "2026-09-18T12:00:00Z",
};

/**
 * Service function to fetch user progress.
 * Replace the internal implementation with `fetch('/api/user/progress')`
 * once backend endpoints are live.
 */
export async function fetchUserProgress(
  _userId?: string
): Promise<UserProgressSummary> {
  // Simulated API response delay:
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(DEFAULT_USER_PROGRESS);
    }, 150);
  });
}
