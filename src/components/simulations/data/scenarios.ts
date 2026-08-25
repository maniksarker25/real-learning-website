import type { SimulationScenario } from "../types";

export const DEFAULT_SCENARIOS: SimulationScenario[] = [
  {
    id: "angry-customer",
    title: "Angry Customer",
    skill: "De-escalation",
    career: "Tech Support",
    accentClass: "bg-orange-500/10",
    accentBorder: "border-orange-400/20",
    accentText: "text-orange-300",
    glowFrom: "from-orange-500/20",
    glowTo: "to-rose-500/20",
    aiInitial: "C",
    aiGradient: "from-rose-400 to-orange-400",
    script: [
      {
        id: 0,
        role: "ai",
        text: "I've been on hold for 45 minutes. This is completely unacceptable.",
      },
      {
        id: 1,
        role: "user",
        text: "I completely understand — 45 minutes is too long. Let me personally handle this right now, no more holds.",
      },
      {
        id: 2,
        role: "ai",
        text: "Fine. But I just want this fixed. I'm a paying customer.",
      },
      {
        id: 3,
        role: "user",
        text: "You deserve that. Walk me through what happened — I won't put you on hold again.",
      },
      {
        id: 4,
        role: "ai",
        text: "...That's the first time someone actually asked me that.",
      },
    ],
    scores: [
      { label: "Empathy", score: 94, color: "bg-orange-400" },
      { label: "Ownership", score: 91, color: "bg-emerald-400" },
      { label: "Communication", score: 88, color: "bg-blue-400" },
      { label: "Resolution", score: 85, color: "bg-amber-400" },
      { label: "Problem Solving", score: 79, color: "bg-pink-400" },
    ],
    overall: 87,
    yourResponse:
      '"I completely understand your frustration — 45 minutes is way too long."',
    idealResponse:
      "\"That's completely on us and I take full ownership. No hold — I'll handle this personally right now.\"",
  },
  {
    id: "billing-dispute",
    title: "Billing Dispute",
    skill: "Ownership",
    career: "Customer Service",
    accentClass: "bg-blue-500/10",
    accentBorder: "border-blue-400/20",
    accentText: "text-blue-300",
    glowFrom: "from-blue-500/20",
    glowTo: "to-indigo-500/20",
    aiInitial: "C",
    aiGradient: "from-blue-400 to-indigo-400",
    script: [
      {
        id: 0,
        role: "ai",
        text: "There's an $89 charge on my account I never agreed to. I want it reversed — now.",
      },
      {
        id: 1,
        role: "user",
        text: "I completely own this. Let me pull up your account right now and find exactly what happened.",
      },
      {
        id: 2,
        role: "ai",
        text: "I've called three times and nobody fixed it. Why would you be any different?",
      },
      {
        id: 3,
        role: "user",
        text: "That's a fair question. Here's what I'll do: confirm the charge, reverse it if it's wrong, and stay on the line until it's done.",
      },
      {
        id: 4,
        role: "ai",
        text: "Okay. That's all I wanted — someone to actually take responsibility.",
      },
    ],
    scores: [
      { label: "Ownership", score: 92, color: "bg-emerald-400" },
      { label: "Resolution", score: 89, color: "bg-blue-400" },
      { label: "Communication", score: 85, color: "bg-amber-400" },
      { label: "Empathy", score: 80, color: "bg-orange-400" },
      { label: "Problem Solving", score: 83, color: "bg-pink-400" },
    ],
    overall: 86,
    yourResponse:
      '"I completely own this. Let me pull up your account right now."',
    idealResponse:
      "\"I'll confirm the charge, reverse it if it's unauthorized, and stay on the line with you until it's resolved — no follow-ups needed.\"",
  },
  {
    id: "it-specialist-triage",
    title: "Server Security Breach",
    skill: "Incident Response",
    career: "IT Specialist",
    accentClass: "bg-rose-500/10",
    accentBorder: "border-rose-400/20",
    accentText: "text-rose-300",
    glowFrom: "from-rose-500/20",
    glowTo: "to-pink-500/20",
    aiInitial: "S",
    aiGradient: "from-rose-400 to-pink-400",
    script: [
      {
        id: 0,
        role: "ai",
        text: "Alert: An unauthorized privilege escalation attempt was detected on the main production database server.",
      },
      {
        id: 1,
        role: "user",
        text: "Isolating the database VLAN immediately and revoking all active Kerberos admin tokens while we pull the audit logs.",
      },
      {
        id: 2,
        role: "ai",
        text: "VLAN isolated. The security lead is asking for an immediate status update.",
      },
      {
        id: 3,
        role: "user",
        text: "Confirming containment. I will export the hash signatures, verify no data exfiltration occurred, and publish the incident summary in 15 minutes.",
      },
      {
        id: 4,
        role: "ai",
        text: "Confirmed. Containment protocol executed flawlessly.",
      },
    ],
    scores: [
      { label: "Problem Solving", score: 95, color: "bg-rose-400" },
      { label: "Ownership", score: 92, color: "bg-emerald-400" },
      { label: "Communication", score: 89, color: "bg-blue-400" },
      { label: "Resolution", score: 94, color: "bg-purple-400" },
      { label: "Empathy", score: 82, color: "bg-orange-400" },
    ],
    overall: 90,
    yourResponse:
      '"Isolating the database VLAN immediately and revoking active admin tokens."',
    idealResponse:
      "\"Isolating the VLAN immediately, revoking credentials, and exporting hash logs to verify containment before reporting to SecOps.\"",
  },
  {
    id: "healthcare-triage",
    title: "Patient Clinical Intake",
    skill: "Empathetic Care",
    career: "Healthcare Support",
    accentClass: "bg-purple-500/10",
    accentBorder: "border-purple-400/20",
    accentText: "text-purple-300",
    glowFrom: "from-purple-500/20",
    glowTo: "to-violet-500/20",
    aiInitial: "P",
    aiGradient: "from-purple-400 to-violet-400",
    script: [
      {
        id: 0,
        role: "ai",
        text: "I feel dizzy and have a sharp chest pain... I'm really scared right now.",
      },
      {
        id: 1,
        role: "user",
        text: "You are in safe hands. Please take a deep breath with me while I notify our triage nurse to come check you immediately.",
      },
      {
        id: 2,
        role: "ai",
        text: "Thank you... It helps that you're staying right here with me.",
      },
      {
        id: 3,
        role: "user",
        text: "I won't leave your side. The nurse is on her way now. Let me verify your emergency contact number while we wait.",
      },
      {
        id: 4,
        role: "ai",
        text: "Okay, thank you so much for being so kind and prompt.",
      },
    ],
    scores: [
      { label: "Empathy", score: 98, color: "bg-purple-400" },
      { label: "Communication", score: 96, color: "bg-emerald-400" },
      { label: "Active Listening", score: 94, color: "bg-blue-400" },
      { label: "Ownership", score: 92, color: "bg-amber-400" },
      { label: "Resolution", score: 91, color: "bg-pink-400" },
    ],
    overall: 94,
    yourResponse:
      '"You are in safe hands. Please take a deep breath while I notify the triage nurse."',
    idealResponse:
      "\"You are in safe hands. I will stay right beside you and alert our triage nurse immediately.\"",
  },
];

export const TIMINGS = [
  900, // step 0  → show msg 0
  1900, // step 1  → show typing (for msg 1)
  2900, // step 2  → show msg 1
  4100, // step 3  → show typing (for msg 2)
  5000, // step 4  → show msg 2
  6200, // step 5  → show typing (for msg 3)
  7100, // step 6  → show msg 3
  8300, // step 7  → show typing (for msg 4)
  9100, // step 8  → show msg 4
  10800, // step 9  → show scores
  14500, // step 10 → show ideal comparison
  19500, // step 11 → advance scenario
];
