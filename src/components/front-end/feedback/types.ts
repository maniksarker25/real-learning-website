export type PerformanceMetricKey =
  | "communication"
  | "empathy"
  | "problem_solving"
  | "active_listening"
  | "de_escalation"
  | "clarity"
  | "resolution_speed";

export interface PerformanceMetric {
  key: PerformanceMetricKey;
  label: string;
}

export interface ScenarioStep {
  customerMessage: string;
  customerTone: string;
  suggestedReply: string;
  specialistTone: string;
  scores: Record<PerformanceMetricKey, number>;
}

// Seven core performance competencies for rich equalizer telemetry
export const PERFORMANCE_METRICS: PerformanceMetric[] = [
  { key: "communication", label: "Communication" },
  { key: "empathy", label: "Empathy" },
  { key: "problem_solving", label: "Problem Solving" },
  { key: "active_listening", label: "Active Listening" },
  { key: "de_escalation", label: "De-escalation" },
  { key: "clarity", label: "Clarity & Tone" },
  { key: "resolution_speed", label: "Resolution Speed" },
];

export const SCENARIO_STEPS: ScenarioStep[] = [
  {
    customerMessage:
      '"Our payment gateway has been offline for 45 minutes, and our checkout is completely halted!"',
    customerTone: "Incident Escalation",
    suggestedReply:
      "I understand how critical this is for your revenue. I am taking personal ownership of this right now.",
    specialistTone: "Calming & Ownership",
    scores: {
      communication: 76,
      empathy: 89,
      problem_solving: 46,
      active_listening: 84,
      de_escalation: 78,
      clarity: 82,
      resolution_speed: 38,
    },
  },
  {
    customerMessage:
      '"We are losing sales every minute. I need an exact timeline for when our servers will be restored."',
    customerTone: "Time Pressure",
    suggestedReply:
      "Our telemetry isolated a webhook timeout. I am initiating the backup server reroute immediately.",
    specialistTone: "Root-Cause Isolation",
    scores: {
      communication: 88,
      empathy: 74,
      problem_solving: 86,
      active_listening: 88,
      de_escalation: 72,
      clarity: 90,
      resolution_speed: 78,
    },
  },
  {
    customerMessage:
      '"Will any customer transaction data or in-flight checkout carts be lost during this failover?"',
    customerTone: "Integrity Verification",
    suggestedReply:
      "All queued carts are cached in our isolated Redis broker. Zero data loss will occur throughout the cutover.",
    specialistTone: "Composed Transparency",
    scores: {
      communication: 92,
      empathy: 85,
      problem_solving: 88,
      active_listening: 94,
      de_escalation: 91,
      clarity: 96,
      resolution_speed: 70,
    },
  },
  {
    customerMessage:
      '"Okay, the backup route is active. The first batch of network nodes is reconnecting now."',
    customerTone: "De-escalated Relief",
    suggestedReply:
      "The server failover is 100% verified. Live transaction health is restored to nominal 99.98% throughput.",
    specialistTone: "Decisive Execution",
    scores: {
      communication: 95,
      empathy: 92,
      problem_solving: 96,
      active_listening: 93,
      de_escalation: 95,
      clarity: 94,
      resolution_speed: 94,
    },
  },
  {
    customerMessage:
      '"Payment gateway is fully green. Thank you for staying composed and resolving this so quickly!"',
    customerTone: "Satisfaction Confirmed",
    suggestedReply:
      "You are very welcome! I have locked in automated health monitors to guarantee zero recurrence.",
    specialistTone: "Mastery Closure",
    scores: {
      communication: 98,
      empathy: 97,
      problem_solving: 98,
      active_listening: 97,
      de_escalation: 99,
      clarity: 98,
      resolution_speed: 96,
    },
  },
];

export const INITIAL_SCORES: Record<PerformanceMetricKey, number> = {
  communication: 52,
  empathy: 46,
  problem_solving: 38,
  active_listening: 58,
  de_escalation: 42,
  clarity: 60,
  resolution_speed: 34,
};

export const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));
