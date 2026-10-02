import { ClassModule, QuizQuestion, LessonItem } from "@/types/individual";

export type { ClassModule, QuizQuestion, LessonItem };

export interface IndClassesScreenProps {
  onLaunchPracticeSimulator?: (scenarioId?: string) => void;
}
