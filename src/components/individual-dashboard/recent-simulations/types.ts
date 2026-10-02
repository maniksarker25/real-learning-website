export interface KeyMoment {
  timestamp: string;
  note: string;
  quality: "good" | "improve";
}

export interface PersonaInfo {
  name: string;
  role: string;
  avatar: string;
}

export interface SimulationSkillScores {
  communication: number;
  empathy: number;
  activeListening: number;
  problemSolving: number;
  conflictResolution: number;
}

export interface RecentSimulationItem {
  id: string;
  scenarioTitle: string;
  careerTrack:
    | "Customer Service"
    | "Tech Support"
    | "IT Specialist"
    | "Healthcare Support";
  trackColor: string;
  score: number;
  scoreGrade: "Mastery" | "Proficient" | "Good";
  date: string;
  duration: string;
  status: "Completed" | "Needs Review";
  aiPersona: PersonaInfo;
  skills: SimulationSkillScores;
  positiveHighlights: string[];
  improvementPoints: string[];
  keyMoments: KeyMoment[];
  recommendedLessons: string[];
  recommendedSimulations: string[];
}

export interface RecentSimulationsTableProps {
  onLaunchSimulation?: (scenarioTitle: string) => void;
}
