"use client";

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
  useEffect,
} from "react";
import {
  CareerPath,
  ClassModule,
  LearningLoopStep,
  SimulationFeedback,
  SkillLevel,
} from "@/types/individual";

export const DEFAULT_CAREER_PATHS: CareerPath[] = [
  {
    id: "path-cust-service",
    title: "Customer service and communication",
    category: "Client Engagement & Communication",
    description:
      "Master active customer de-escalation, empathy under stress, non-confrontational phrasing, and high-impact resolution.",
    matchScore: 96,
    startingClassId: "class-1",
    startingScenarioId: "sim-1",
    targetJobRoles: [
      "Customer Service Specialist",
      "Client Care Representative",
      "Communication Associate",
    ],
    coreSkills: [
      "De-escalation",
      "Customer Empathy",
      "Active Listening",
      "Positive Framing",
    ],
    avgSalaryRange: "$48,000 - $68,000/yr",
  },
  {
    id: "path-tech-support",
    title: "Tech Support",
    category: "Helpdesk & Technical Operations",
    description:
      "Master L1/L2 diagnostic workflows, customer troubleshooting, incident ticket triage, and clear technical communication.",
    matchScore: 94,
    startingClassId: "class-1",
    startingScenarioId: "sim-1",
    targetJobRoles: [
      "Tech Support Specialist",
      "Help Desk Analyst",
      "Desktop Support Technician",
    ],
    coreSkills: [
      "Troubleshooting",
      "Incident Triage",
      "Tone Control",
      "SLA Management",
    ],
    avgSalaryRange: "$52,000 - $74,000/yr",
  },
  {
    id: "path-it-specialist",
    title: "It Specialist",
    category: "Infrastructure & Network Systems",
    description:
      "Diagnose system outages, remote connectivity, endpoint security, and critical incident escalation protocols under SLA pressure.",
    matchScore: 91,
    startingClassId: "class-2",
    startingScenarioId: "sim-2",
    targetJobRoles: [
      "IT Specialist",
      "Network Support Technician",
      "Systems Administrator Associate",
    ],
    coreSkills: [
      "Network Triage",
      "System Diagnostics",
      "Escalation Protocols",
      "Root-Cause Analysis",
    ],
    avgSalaryRange: "$58,000 - $82,000/yr",
  },
  {
    id: "path-healthcare-support",
    title: "Healthcare suport & patient supprot",
    category: "Clinical Care & Patient Services",
    description:
      "Navigate sensitive patient triage, compassionate crisis de-escalation, HIPAA-compliant communication, and care coordination.",
    matchScore: 93,
    startingClassId: "class-1",
    startingScenarioId: "sim-4",
    targetJobRoles: [
      "Patient Support Specialist",
      "Healthcare Care Coordinator",
      "Clinical Intake Representative",
    ],
    coreSkills: [
      "Patient Empathy",
      "Crisis De-escalation",
      "Compassionate Phrasing",
      "Care Protocol Adherence",
    ],
    avgSalaryRange: "$50,000 - $72,000/yr",
  },
];

export const INITIAL_SKILLS: SkillLevel[] = [
  { name: "Active Listening", level: 74, category: "Communication", delta: 18 },
  { name: "De-escalation", level: 78, category: "Conflict Resolution", delta: 16 },
  { name: "Positive Framing", level: 70, category: "Tone Control", delta: 25 },
  { name: "Action Agreements", level: 65, category: "Resolution", delta: 24 },
  { name: "System Diagnostics", level: 68, category: "Technical", delta: 12 },
];

export const DEFAULT_FEEDBACK: SimulationFeedback = {
  scenarioId: "sim-1",
  scenarioTitle: "Handling an Upset Customer Requesting Immediate Refund",
  overallScore: 92,
  skillScores: {
    communication: 95,
    empathy: 94,
    problemSolving: 90,
    activeListening: 92,
    conflictResolution: 89,
  },
  positiveHighlights: [
    "Immediate Emotional Validation: Validated the caller's frustration within the first 10 seconds before discussing policies.",
    "Positive Framing: Used 'What I can do right now...' instead of 'We can't...'.",
    "Explicit Action Agreement: Set a clear follow-up commitment with a specific time window.",
  ],
  improvementPoints: [
    "Speed of Agreement: State the specific resolution credit option earlier in the interaction.",
    "Summarizing Facts: Confirm the order invoice number before locking in the final credit amount.",
  ],
  keyMoments: [
    {
      timestamp: "00:15",
      note: "Customer expressed anger over 5-day delay. Responded with empathy and validation. Excellent tone control.",
      quality: "good",
    },
    {
      timestamp: "01:20",
      note: "Customer demanded immediate refund. Framed available credit options positively.",
      quality: "good",
    },
    {
      timestamp: "02:10",
      note: "Opportunity missed: Verify invoice earlier in the conversation to lock in protocol accuracy.",
      quality: "improve",
    },
  ],
  recommendedLessons: [
    "Lesson 4: Establishing Control & Action Agreements",
    "Lesson 3: Non-Confrontational Phrasing & Positive Framing",
  ],
  recommendedSimulations: [
    "L1 Network Diagnostics Under High SLA Pressure",
    "Omnichannel Live Chat Resolution",
  ],
  nextStepRecommendation: {
    type: "next_class",
    title: "Advance to Next Class",
    description: "Class 2: Advanced Technical Diagnostics & Incident Escalations",
    rationale: "Demonstrated 92% mastery on foundational de-escalation protocols.",
  },
};

export const STEP_ORDER: LearningLoopStep[] = [
  "pathfinder",
  "class",
  "simulator",
  "feedback",
  "skill_progress",
  "next_step",
];

interface LearningLoopContextType {
  currentStep: LearningLoopStep;
  activePath: CareerPath;
  activeClassId: string;
  activeScenarioId: string;
  demonstratedSkills: SkillLevel[];
  feedback: SimulationFeedback;
  simulationAttemptCount: number;
  maxUnlockedStepIndex: number;
  completedSteps: LearningLoopStep[];
  isStepUnlocked: (step: LearningLoopStep) => boolean;
  isStepCompleted: (step: LearningLoopStep) => boolean;
  completeStep: (step: LearningLoopStep) => void;
  setStep: (step: LearningLoopStep) => void;
  selectCareerPath: (path: CareerPath) => void;
  startClass: (classId?: string) => void;
  launchPracticeSimulator: (scenarioId?: string) => void;
  completeSimulation: (score?: number) => void;
  chooseNextStep: (decisionType: "next_class" | "harder_simulation" | "repeat_skill" | "new_skill") => void;
  resetLoop: () => void;
}

const STORAGE_KEY = "rl_learning_loop_state_v1";

const LearningLoopContext = createContext<LearningLoopContextType | undefined>(
  undefined
);

export function LearningLoopProvider({ children }: { children: React.ReactNode }) {
  // Helper to read initial state from localStorage safely
  const getInitialState = () => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
          return JSON.parse(saved);
        }
      } catch {
        // Ignore parsing errors
      }
    }
    return {};
  };

  const [initialData] = useState(getInitialState);

  const [currentStep, setCurrentStep] = useState<LearningLoopStep>(
    () => initialData.currentStep || "pathfinder"
  );
  const [maxUnlockedStepIndex, setMaxUnlockedStepIndex] = useState<number>(
    () =>
      typeof initialData.maxUnlockedStepIndex === "number"
        ? initialData.maxUnlockedStepIndex
        : 0
  );
  const [completedSteps, setCompletedSteps] = useState<LearningLoopStep[]>(
    () => (Array.isArray(initialData.completedSteps) ? initialData.completedSteps : [])
  );
  const [activePath, setActivePath] = useState<CareerPath>(
    () => initialData.activePath || DEFAULT_CAREER_PATHS[0]
  );
  const [activeClassId, setActiveClassId] = useState<string>(
    () => initialData.activeClassId || "class-1"
  );
  const [activeScenarioId, setActiveScenarioId] = useState<string>(
    () => initialData.activeScenarioId || "sim-1"
  );
  const [demonstratedSkills, setDemonstratedSkills] = useState<SkillLevel[]>(
    () => initialData.demonstratedSkills || INITIAL_SKILLS
  );
  const [feedback, setFeedback] = useState<SimulationFeedback>(
    () => initialData.feedback || DEFAULT_FEEDBACK
  );
  const [simulationAttemptCount, setSimulationAttemptCount] = useState<number>(
    () => initialData.simulationAttemptCount || 1
  );

  // Save changes to localStorage
  const persist = useCallback(
    (newState: Partial<{
      currentStep: LearningLoopStep;
      maxUnlockedStepIndex: number;
      completedSteps: LearningLoopStep[];
      activePath: CareerPath;
      activeClassId: string;
      activeScenarioId: string;
      demonstratedSkills: SkillLevel[];
      feedback: SimulationFeedback;
      simulationAttemptCount: number;
    }>) => {
      try {
        const existing = localStorage.getItem(STORAGE_KEY);
        const parsed = existing ? JSON.parse(existing) : {};
        localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify({ ...parsed, ...newState })
        );
      } catch {
        // Ignore quota errors
      }
    },
    []
  );

  const isStepUnlocked = useCallback(
    (step: LearningLoopStep) => {
      const idx = STEP_ORDER.indexOf(step);
      if (idx === -1) return true;
      return idx <= maxUnlockedStepIndex;
    },
    [maxUnlockedStepIndex]
  );

  const isStepCompleted = useCallback(
    (step: LearningLoopStep) => {
      return completedSteps.includes(step);
    },
    [completedSteps]
  );

  const completeStep = useCallback(
    (step: LearningLoopStep) => {
      const stepIdx = STEP_ORDER.indexOf(step);
      const nextMax = Math.max(maxUnlockedStepIndex, stepIdx + 1);
      
      setMaxUnlockedStepIndex(nextMax);
      setCompletedSteps((prev) => {
        if (!prev.includes(step)) {
          const nextCompleted = [...prev, step];
          persist({ completedSteps: nextCompleted, maxUnlockedStepIndex: nextMax });
          return nextCompleted;
        }
        persist({ maxUnlockedStepIndex: nextMax });
        return prev;
      });
    },
    [maxUnlockedStepIndex, persist]
  );

  const setStep = useCallback(
    (step: LearningLoopStep) => {
      const idx = STEP_ORDER.indexOf(step);
      if (idx !== -1 && idx > maxUnlockedStepIndex) {
        // Step is locked - do not navigate
        return;
      }
      setCurrentStep(step);
      persist({ currentStep: step });
    },
    [maxUnlockedStepIndex, persist]
  );

  const selectCareerPath = useCallback(
    (path: CareerPath) => {
      setActivePath(path);
      setActiveClassId(path.startingClassId);
      setActiveScenarioId(path.startingScenarioId);
      
      // Complete pathfinder & unlock class (index 1)
      const nextMax = Math.max(maxUnlockedStepIndex, 1);
      setMaxUnlockedStepIndex(nextMax);
      setCompletedSteps((prev) => {
        const updated: LearningLoopStep[] = prev.includes("pathfinder") ? prev : [...prev, "pathfinder"];
        persist({
          activePath: path,
          activeClassId: path.startingClassId,
          activeScenarioId: path.startingScenarioId,
          currentStep: "class",
          maxUnlockedStepIndex: nextMax,
          completedSteps: updated,
        });
        return updated;
      });
      setCurrentStep("class");
    },
    [maxUnlockedStepIndex, persist]
  );

  const startClass = useCallback(
    (classId?: string) => {
      if (classId) {
        setActiveClassId(classId);
      }
      
      // Complete pathfinder & unlock class (index 1)
      const nextMax = Math.max(maxUnlockedStepIndex, 1);
      setMaxUnlockedStepIndex(nextMax);
      setCompletedSteps((prev) => {
        const updated: LearningLoopStep[] = prev.includes("pathfinder") ? prev : [...prev, "pathfinder"];
        persist({
          activeClassId: classId || activeClassId,
          currentStep: "class",
          maxUnlockedStepIndex: nextMax,
          completedSteps: updated,
        });
        return updated;
      });
      setCurrentStep("class");
    },
    [activeClassId, maxUnlockedStepIndex, persist]
  );

  const launchPracticeSimulator = useCallback(
    (scenarioId?: string) => {
      if (scenarioId) {
        setActiveScenarioId(scenarioId);
      }
      
      // Complete class & unlock simulator (index 2)
      const nextMax = Math.max(maxUnlockedStepIndex, 2);
      setMaxUnlockedStepIndex(nextMax);
      setCompletedSteps((prev) => {
        let updated: LearningLoopStep[] = prev.includes("pathfinder") ? prev : [...prev, "pathfinder"];
        if (!updated.includes("class")) updated = [...updated, "class"];
        persist({
          activeScenarioId: scenarioId || activeScenarioId,
          currentStep: "simulator",
          maxUnlockedStepIndex: nextMax,
          completedSteps: updated,
        });
        return updated;
      });
      setCurrentStep("simulator");
    },
    [activeScenarioId, maxUnlockedStepIndex, persist]
  );

  const completeSimulation = useCallback(
    (score: number = 92) => {
      setSimulationAttemptCount((prev) => {
        const nextCount = prev + 1;
        persist({ simulationAttemptCount: nextCount });
        return nextCount;
      });

      // Update feedback with latest score
      const updatedFeedback: SimulationFeedback = {
        ...DEFAULT_FEEDBACK,
        overallScore: score,
      };
      setFeedback(updatedFeedback);

      // Boost demonstrated skills
      setDemonstratedSkills((prev) =>
        prev.map((skill) => ({
          ...skill,
          level: Math.min(99, skill.level + Math.floor(Math.random() * 4) + 2),
        }))
      );

      // Complete simulator & unlock feedback, skill_progress, next_step (unlock index 5)
      const nextMax = Math.max(maxUnlockedStepIndex, 5);
      setMaxUnlockedStepIndex(nextMax);
      setCompletedSteps((prev) => {
        let updated: LearningLoopStep[] = [...prev];
        if (!updated.includes("pathfinder")) updated.push("pathfinder");
        if (!updated.includes("class")) updated.push("class");
        if (!updated.includes("simulator")) updated.push("simulator");
        if (!updated.includes("feedback")) updated.push("feedback");
        if (!updated.includes("skill_progress")) updated.push("skill_progress");
        
        persist({
          feedback: updatedFeedback,
          currentStep: "feedback",
          maxUnlockedStepIndex: nextMax,
          completedSteps: updated,
        });
        return updated;
      });

      setCurrentStep("feedback");
    },
    [maxUnlockedStepIndex, persist]
  );

  const chooseNextStep = useCallback(
    (decisionType: "next_class" | "harder_simulation" | "repeat_skill" | "new_skill") => {
      if (decisionType === "next_class") {
        setActiveClassId("class-2");
        setActiveScenarioId("sim-2");
        setCurrentStep("class");
        persist({
          activeClassId: "class-2",
          activeScenarioId: "sim-2",
          currentStep: "class",
        });
      } else if (decisionType === "harder_simulation") {
        setActiveScenarioId("sim-2");
        setCurrentStep("simulator");
        persist({
          activeScenarioId: "sim-2",
          currentStep: "simulator",
        });
      } else if (decisionType === "repeat_skill") {
        setCurrentStep("simulator");
        persist({ currentStep: "simulator" });
      } else if (decisionType === "new_skill") {
        setCurrentStep("pathfinder");
        persist({ currentStep: "pathfinder" });
      }
    },
    [persist]
  );

  const resetLoop = useCallback(() => {
    setCurrentStep("pathfinder");
    setMaxUnlockedStepIndex(0);
    setCompletedSteps([]);
    setActivePath(DEFAULT_CAREER_PATHS[0]);
    setActiveClassId("class-1");
    setActiveScenarioId("sim-1");
    setDemonstratedSkills(INITIAL_SKILLS);
    setFeedback(DEFAULT_FEEDBACK);
    persist({
      currentStep: "pathfinder",
      maxUnlockedStepIndex: 0,
      completedSteps: [],
      activePath: DEFAULT_CAREER_PATHS[0],
      activeClassId: "class-1",
      activeScenarioId: "sim-1",
      demonstratedSkills: INITIAL_SKILLS,
      feedback: DEFAULT_FEEDBACK,
    });
  }, [persist]);

  const value = useMemo(
    () => ({
      currentStep,
      activePath,
      activeClassId,
      activeScenarioId,
      demonstratedSkills,
      feedback,
      simulationAttemptCount,
      maxUnlockedStepIndex,
      completedSteps,
      isStepUnlocked,
      isStepCompleted,
      completeStep,
      setStep,
      selectCareerPath,
      startClass,
      launchPracticeSimulator,
      completeSimulation,
      chooseNextStep,
      resetLoop,
    }),
    [
      currentStep,
      activePath,
      activeClassId,
      activeScenarioId,
      demonstratedSkills,
      feedback,
      simulationAttemptCount,
      maxUnlockedStepIndex,
      completedSteps,
      isStepUnlocked,
      isStepCompleted,
      completeStep,
      setStep,
      selectCareerPath,
      startClass,
      launchPracticeSimulator,
      completeSimulation,
      chooseNextStep,
      resetLoop,
    ]
  );

  return (
    <LearningLoopContext.Provider value={value}>
      {children}
    </LearningLoopContext.Provider>
  );
}

export function useLearningLoop() {
  const context = useContext(LearningLoopContext);
  if (!context) {
    throw new Error("useLearningLoop must be used within a LearningLoopProvider");
  }
  return context;
}
