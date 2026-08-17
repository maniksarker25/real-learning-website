export interface SimulationMessage {
  id: number | string;
  role: "ai" | "user";
  text: string;
  timestamp?: string;
}

export interface SimulationScore {
  label: string;
  score: number;
  color: string;
}

export interface SimulationScenario {
  id: string;
  title: string;
  skill: string;
  career: string;
  accentClass: string;
  accentBorder: string;
  accentText: string;
  glowFrom: string;
  glowTo: string;
  aiInitial: string;
  aiGradient: string;
  script: SimulationMessage[];
  scores: SimulationScore[];
  overall: number;
  yourResponse: string;
  idealResponse: string;
}
