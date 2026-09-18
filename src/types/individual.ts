export interface LessonItem {
  id: string;
  title: string;
  duration: string;
  content: string;
  example: string;
  exercisePrompt: string;
  isCompleted: boolean;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
}

export type LearningLoopStep =
  | "pathfinder"
  | "class"
  | "simulator"
  | "feedback"
  | "skill_progress"
  | "next_step";

export interface CareerPath {
  id: string;
  title: string;
  category: string;
  description: string;
  matchScore: number; // e.g. 95%
  startingClassId: string;
  startingScenarioId: string;
  targetJobRoles: string[];
  coreSkills: string[];
  avgSalaryRange: string;
}

export interface NextStepDecision {
  type: "next_class" | "repeat_skill" | "harder_simulation" | "new_skill";
  title: string;
  description: string;
  targetClassId?: string;
  targetScenarioId?: string;
  rationale: string;
}

export interface ClassModule {
  id: string;
  title: string;
  category: string;
  description: string;
  estimatedDuration: string;
  lessons: LessonItem[];
  quiz: QuizQuestion[];
  progress: number; // 0 - 100
  isCompleted: boolean;
  linkedSimulationId?: string;
}

export interface ChatMessage {
  id: string;
  sender: "ai" | "user" | "system";
  text: string;
  timestamp: string;
}

export interface SimulationScenario {
  id: string;
  title: string;
  category: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  estimatedTime: string;
  objective: string;
  characterName: string;
  characterRole: string;
  expectedSkills: string[];
  initialAiMessage: string;
  bestScore?: string;
  attemptsCount: number;
  linkedClassId?: string;
}

export interface SimulationFeedback {
  scenarioId: string;
  scenarioTitle: string;
  overallScore: number; // e.g. 92
  skillScores: {
    communication: number;
    empathy: number;
    problemSolving: number;
    activeListening: number;
    conflictResolution: number;
  };
  positiveHighlights: string[];
  improvementPoints: string[];
  keyMoments: { timestamp: string; note: string; quality: "good" | "improve" }[];
  recommendedLessons: string[];
  recommendedSimulations: string[];
  nextStepRecommendation?: NextStepDecision;
}

export interface SkillLevel {
  name: string;
  level: number; // 0 - 100
  category: string;
  delta?: number; // e.g. +12
}

/**
 * Standard User Progress API response schemas
 */
export interface UserProgressMetric {
  learningStreakDays: number;
  classesCompleted: number;
  totalClasses: number;
  simulationsPassed: number;
  overallAccuracy: number;
  monthlyAccuracyGain: number;
}

export interface UserSkillProficiency {
  id: string;
  name: string;
  level: number; // 0 - 100 percentage
  benchmark: number; // e.g. 80
  category: string;
  delta: string; // e.g. "+18%"
  lastEvaluatedAt?: string;
}

export interface UserProgressMilestone {
  id: string;
  title: string;
  desc: string;
  status: "completed" | "in_progress" | "locked";
  progress: string; // e.g. "100%", "5 / 6 Completed"
  progressPercent: number; // 0 - 100
  unlockedAt?: string;
  badgeIcon?: string;
}

export interface UserProgressSummary {
  userId: string;
  careerTrackId: string;
  careerTrackTitle: string;
  levelTier: string; // e.g. "Level 2 Specialist"
  metrics: UserProgressMetric;
  skills: UserSkillProficiency[];
  milestones: UserProgressMilestone[];
  nextBadgeHint: string;
  updatedAt: string;
}

