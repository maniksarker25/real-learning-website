import {
  Briefcase,
  Building2,
  Bot,
  BarChart3,
  TrendingUp,
  LucideIcon,
} from "lucide-react";

export interface LearningStepData {
  id: string;
  number: string;
  title: string;
  description: string;
  label: string;
  statusBadge: string;
  triggerBadge?: string;
  icon: LucideIcon;
  accent: {
    color: string;
    hex: string;
    bgLight: string;
    text: string;
    border: string;
    ring: string;
    badgeBg: string;
    gradient: string;
    nodeGlow: string;
  };
  preview: {
    tagline: string;
    highlights: string[];
    metrics?: { label: string; value: string }[];
  };
}

export const LEARNING_STEPS: LearningStepData[] = [
  {
    id: "step-01",
    number: "01",
    title: "Choose a Career",
    description: "Select a career path that matches your goals.",
    label: "CAREER",
    triggerBadge: "▷ Step 01",
    statusBadge: "✓ Selected",
    icon: Briefcase,
    accent: {
      color: "blue",
      hex: "#3B82F6",
      bgLight: "bg-blue-500/15",
      text: "text-blue-400",
      border: "border-blue-500/50",
      ring: "ring-blue-500/40",
      badgeBg: "bg-blue-500/15 text-blue-300 border-blue-500/30",
      gradient: "from-blue-500 to-indigo-600",
      nodeGlow: "rgba(59, 130, 246, 0.6)",
    },
    preview: {
      tagline: "4 Specialized Career Simulation Tracks",
      highlights: [
        "Customer Service & De-escalation",
        "Tech Support & Troubleshooting",
        "IT Specialist & Security Infrastructure",
        "Healthcare Support & Clinical Triage",
      ],
      metrics: [
        { label: "Career Tracks", value: "4 Tracks" },
        { label: "Skill Maps", value: "100% Tailored" },
      ],
    },
  },
  {
    id: "step-02",
    number: "02",
    title: "Enter a Real Scenario",
    description: "Step into realistic workplace situations.",
    label: "SIMULATION",
    statusBadge: "✓ Ready",
    icon: Building2,
    accent: {
      color: "violet",
      hex: "#8B5CF6",
      bgLight: "bg-violet-500/15",
      text: "text-violet-400",
      border: "border-violet-500/40",
      ring: "ring-violet-500/40",
      badgeBg: "bg-violet-500/15 text-violet-300 border-violet-500/30",
      gradient: "from-violet-500 to-purple-600",
      nodeGlow: "rgba(139, 92, 246, 0.6)",
    },
    preview: {
      tagline: "Realistic Workplace Environments",
      highlights: [
        "Executive Leadership Incident Response",
        "High-stakes Product Launch Debrief",
        "Conflict Resolution in Distributed Teams",
      ],
      metrics: [
        { label: "Scenarios", value: "850+" },
        { label: "Fidelity", value: "Workplace Grade" },
      ],
    },
  },
  {
    id: "step-03",
    number: "03",
    title: "Talk to AI",
    description: "Interact with adaptive AI characters.",
    label: "AI INTERACTION",
    statusBadge: "✓ AI Live",
    icon: Bot,
    accent: {
      color: "fuchsia",
      hex: "#D946EF",
      bgLight: "bg-fuchsia-500/15",
      text: "text-fuchsia-400",
      border: "border-fuchsia-500/40",
      ring: "ring-fuchsia-500/40",
      badgeBg: "bg-fuchsia-500/15 text-fuchsia-300 border-fuchsia-500/30",
      gradient: "from-fuchsia-500 to-pink-600",
      nodeGlow: "rgba(217, 70, 239, 0.6)",
    },
    preview: {
      tagline: "Dynamic AI Roleplaying",
      highlights: [
        "Voice & Text conversational modes",
        "Adaptive stakeholder personalities & mood swings",
        "Context-aware negotiation dynamics",
      ],
      metrics: [
        { label: "AI Personas", value: "500+" },
        { label: "Response", value: "< 250ms" },
      ],
    },
  },
  {
    id: "step-04",
    number: "04",
    title: "Get Evaluated",
    description: "Receive instant multi-skill evaluation.",
    label: "FEEDBACK",
    statusBadge: "✓ Scored",
    icon: BarChart3,
    accent: {
      color: "cyan",
      hex: "#06B6D4",
      bgLight: "bg-cyan-500/15",
      text: "text-cyan-400",
      border: "border-cyan-500/40",
      ring: "ring-cyan-500/40",
      badgeBg: "bg-cyan-500/15 text-cyan-300 border-cyan-500/30",
      gradient: "from-cyan-500 to-teal-600",
      nodeGlow: "rgba(6, 182, 212, 0.6)",
    },
    preview: {
      tagline: "Multi-Dimensional Skill Scoring",
      highlights: [
        "Empathy & Active Listening: 94%",
        "Strategic Problem Solving: 89%",
        "Professional Tone & Clarity: 96%",
      ],
      metrics: [
        { label: "Dimensions", value: "12 Soft Skills" },
        { label: "Feedback", value: "Instant Insights" },
      ],
    },
  },
  {
    id: "step-05",
    number: "05",
    title: "Improve & Progress",
    description: "Identify strengths & level up your career.",
    label: "PROGRESS",
    statusBadge: "✓ Mastery",
    icon: TrendingUp,
    accent: {
      color: "emerald",
      hex: "#10B981",
      bgLight: "bg-emerald-500/15",
      text: "text-emerald-400",
      border: "border-emerald-500/40",
      ring: "ring-emerald-500/40",
      badgeBg: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
      gradient: "from-emerald-500 to-green-600",
      nodeGlow: "rgba(16, 185, 129, 0.6)",
    },
    preview: {
      tagline: "Actionable Skill Growth Roadmap",
      highlights: [
        "Personalized practice recommendation engine",
        "Benchmarked against industry senior standards",
        "Verifiable skill certificates",
      ],
      metrics: [
        { label: "Skill Gain", value: "+24% Avg/Wk" },
        { label: "Mastery", value: "Level 4 Ready" },
      ],
    },
  },
];
