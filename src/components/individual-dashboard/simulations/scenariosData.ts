import { SimulationScenario } from "@/types/individual";

export const DEFAULT_SCENARIOS: SimulationScenario[] = [
  {
    id: "sim-1",
    title: "Handling an Upset Customer Requesting Immediate Refund",
    category: "Customer Service & Conflict Resolution",
    difficulty: "Intermediate",
    estimatedTime: "10 mins",
    objective:
      "De-escalate an upset customer whose delivery was delayed, validate their frustration, and reach a satisfactory action agreement.",
    characterName: "Alex Rivera",
    characterRole: "Frustrated Customer",
    expectedSkills: [
      "Empathy",
      "Active Listening",
      "Problem Solving",
      "Conflict Resolution",
    ],
    initialAiMessage:
      "Hello! I've been waiting for my shipment for 5 days and nobody responded to my email! I want a full refund and an answer right now!",
    attemptsCount: 3,
    bestScore: "96%",
  },
  {
    id: "sim-2",
    title: "L1 Network Diagnostics Under High SLA Pressure",
    category: "Tech Support & Triage",
    difficulty: "Advanced",
    estimatedTime: "15 mins",
    objective:
      "Diagnose remote office VPN connectivity failure while managing an anxious operations manager.",
    characterName: "David Vance",
    characterRole: "Operations Manager",
    expectedSkills: [
      "Technical Accuracy",
      "Step-by-step Guidance",
      "Tone Control",
    ],
    initialAiMessage:
      "Our entire Chicago branch lost VPN connection 10 minutes ago! We are losing thousands per minute. What is going on?",
    attemptsCount: 2,
    bestScore: "88%",
  },
  {
    id: "sim-3",
    title: "Omnichannel Live Chat Resolution",
    category: "Customer Service",
    difficulty: "Beginner",
    estimatedTime: "8 mins",
    objective:
      "Manage simultaneous chat inquiries with clear, positive framing.",
    characterName: "Elena Rostova",
    characterRole: "Online Buyer",
    expectedSkills: ["Positive Framing", "Multitasking", "Clarity"],
    initialAiMessage:
      "Hi, I want to change my shipping address before the item dispatches today.",
    attemptsCount: 0,
  },
  {
    id: "sim-4",
    title: "Emergency Clinical Intake & Anxious Patient Support",
    category: "Healthcare Support & Patient Care",
    difficulty: "Intermediate",
    estimatedTime: "10 mins",
    objective:
      "Validate an anxious family member's distress, collect urgent intake details calmly, and ensure clear clinical care triage.",
    characterName: "Maria Santos",
    characterRole: "Anxious Patient Relative",
    expectedSkills: [
      "Patient Empathy",
      "Compassionate De-escalation",
      "HIPAA Protocols",
      "Calm Phrasing",
    ],
    initialAiMessage:
      "Please, my father has been waiting in room 4 for over 45 minutes with severe chest discomfort! Nobody is telling us what's happening! We need a doctor immediately!",
    attemptsCount: 1,
    bestScore: "94%",
  },
];

export const QUICK_PROMPTS_MAP: Record<string, string[]> = {
  "sim-1": [
    "I hear your frustration and apologize for the delay. Let me resolve this immediately.",
    "I understand how urgent this is. Could you confirm your order invoice number?",
    "I can process a priority credit now and send tracking confirmation by 2 PM.",
  ],
  "sim-2": [
    "I understand the urgency. Let's run a rapid gateway ping check first.",
    "Could you check if the router link LEDs are green or flashing amber?",
    "I am escalating a P1 emergency ticket directly to our network tier-2 team.",
  ],
  "sim-3": [
    "I would be glad to update your shipping address! Please share the new address.",
    "I have updated your dispatch address. A confirmation email is on its way.",
    "Is there anything else I can adjust for your order before it ships today?",
  ],
  "sim-4": [
    "I hear how terrifying this is, Maria. I am notifying the attending triage nurse right now.",
    "Your father's safety is our top priority. Let me check his vitals chart immediately.",
    "The physician is reviewing his ECG results right now. I will stay with you until she walks in.",
  ],
};
