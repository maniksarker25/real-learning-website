import type { CompletedSimulationItem } from "./types";

/** Badge tone per career track (dark theme). */
export const TRACK_TONE: Record<CompletedSimulationItem["careerTrack"], "orange" | "blue" | "green" | "rose"> = {
  "Customer Service": "orange",
  "Tech Support": "blue",
  "IT Specialist": "green",
  "Healthcare Support": "rose",
};
