export interface SkillScores {
  communication: number;
  empathy: number;
  problemSolving: number;
  ownership: number;
  resolution: number;
}

export interface DialogueTurn {
  role: "ai" | "user";
  text: string;
}

export interface SimulationMember {
  name: string;
  email: string;
  avatar: string;
}

export interface CompletedSimulationItem {
  id: string;
  scenarioTitle: string;
  careerTrack:
    | "Customer Service"
    | "Tech Support"
    | "IT Specialist"
    | "Healthcare Support";
  trackColor: string;
  aiCharacterName: string;
  aiCharacterRole: string;
  completedAt: string;
  overallScore: number;
  duration: string;
  member: SimulationMember;
  skills: SkillScores;
  highlightQuote: string;
  dialoguePreview: DialogueTurn[];
  feedbackHighlights: string[];
}
