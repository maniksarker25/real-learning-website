"use client";

import React, {
  useState,
  useCallback,
  useMemo,
  memo,
  useEffect,
  useRef,
} from "react";
import {
  Play,
  Zap,
  CheckCircle2,
  Clock,
  Sparkles,
  MessageSquare,
  Send,
  ArrowRight,
  ShieldCheck,
  RotateCcw,
  TrendingUp,
  AlertCircle,
  BookOpen,
  Loader2,
  X,
  Maximize2,
  Minimize2,
  User,
  Bot,
  RefreshCw,
  CornerDownLeft,
  ChevronRight,
} from "lucide-react";
import { useAccount } from "@/context/AccountContext";
import {
  ChatMessage,
  SimulationScenario,
} from "@/types/individual";
import { cn } from "@/lib/utils";
import { RecentSimulationsTable } from "../RecentSimulationsTable";
import { useLearningLoop } from "@/context/LearningLoopContext";

interface IndSimulationsScreenProps {
  onNavigateToTab?: (tabId: string) => void;
  activeScenarioTitle?: string;
}

export const IndSimulationsScreen = memo(function IndSimulationsScreen({
  onNavigateToTab,
  activeScenarioTitle,
}: IndSimulationsScreenProps) {
  const { session } = useAccount();

  let contextValue: ReturnType<typeof useLearningLoop> | null = null;
  try {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    contextValue = useLearningLoop();
  } catch {
    contextValue = null;
  }

  const scenarios: SimulationScenario[] = useMemo(
    () => [
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
    ],
    [],
  );

  // Quick Suggestion Prompts Map
  const quickPromptsMap: Record<string, string[]> = useMemo(
    () => ({
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
    }),
    [],
  );

  // Derive matching scenario based on user's choice from Step 1 & Class
  const targetScenarioId = useMemo(() => {
    if (contextValue?.activeScenarioId) return contextValue.activeScenarioId;
    if (contextValue?.activePath?.id === "path-healthcare-support") return "sim-4";
    if (contextValue?.activePath?.id === "path-it-specialist") return "sim-2";
    if (contextValue?.activePath?.id === "path-tech-support") return "sim-1";
    return contextValue?.activePath?.startingScenarioId || "sim-1";
  }, [contextValue?.activeScenarioId, contextValue?.activePath]);

  const targetScenario = useMemo(() => {
    return scenarios.find((s) => s.id === targetScenarioId) || scenarios[0];
  }, [scenarios, targetScenarioId]);

  // Active Simulation State — directly initialized to ACTIVE with the user's chosen scenario!
  const [selectedScenario, setSelectedScenario] = useState<SimulationScenario>(
    () => targetScenario,
  );
  const [messages, setMessages] = useState<ChatMessage[]>(() => [
    {
      id: `m-1`,
      sender: "ai",
      text: targetScenario.initialAiMessage,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [isSimActive, setIsSimActive] = useState(true);
  const [isSimCompleted, setIsSimCompleted] = useState(false);
  const [isAiTyping, setIsAiTyping] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Update scenario if targetScenario changes based on career path selection
  useEffect(() => {
    if (targetScenario.id !== selectedScenario.id) {
      setSelectedScenario(targetScenario);
      setMessages([
        {
          id: `m-1`,
          sender: "ai",
          text: targetScenario.initialAiMessage,
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ]);
      setIsSimActive(true);
      setIsSimCompleted(false);
      setShowCompletedFeedback(false);
    }
  }, [targetScenario, selectedScenario.id]);

  // AI Feedback Generation Loading & Finished State
  const [isGeneratingFeedback, setIsGeneratingFeedback] = useState(false);
  const [feedbackStage, setFeedbackStage] = useState(1);
  const [showCompletedFeedback, setShowCompletedFeedback] = useState(false);

  // Timer State
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  // Auto-scroll ref
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    if (isSimActive) {
      scrollToBottom();
    }
  }, [messages, isAiTyping, isSimActive, scrollToBottom]);

  // Live Simulation Timer Effect
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isSimActive && !isGeneratingFeedback && !showCompletedFeedback) {
      interval = setInterval(() => {
        setElapsedSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      setElapsedSeconds(0);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isSimActive, isGeneratingFeedback, showCompletedFeedback]);

  const formattedTime = useMemo(() => {
    const mins = Math.floor(elapsedSeconds / 60);
    const secs = elapsedSeconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  }, [elapsedSeconds]);

  // Start Simulation
  const handleStartSimulation = useCallback((scenario: SimulationScenario) => {
    setSelectedScenario(scenario);
    setMessages([
      {
        id: `m-1`,
        sender: "ai",
        text: scenario.initialAiMessage,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      },
    ]);
    setIsSimActive(true);
    setIsSimCompleted(false);
    setIsGeneratingFeedback(false);
    setShowCompletedFeedback(false);
    setIsAiTyping(false);
  }, []);

  // Auto-start scenario if passed from props
  useEffect(() => {
    if (activeScenarioTitle && !isSimActive) {
      const match = scenarios.find(
        (s) =>
          s.title.toLowerCase().includes(activeScenarioTitle.toLowerCase()) ||
          activeScenarioTitle.toLowerCase().includes(s.title.toLowerCase()),
      );
      if (match) {
        handleStartSimulation(match);
      }
    }
  }, [activeScenarioTitle, scenarios, isSimActive, handleStartSimulation]);

  // Send Message with Optimistic UI & Typing Indicator
  const handleSendMessage = useCallback(
    (customText?: string) => {
      const textToSend = typeof customText === "string" ? customText : inputText;
      if (!textToSend.trim() || !selectedScenario || isAiTyping) return;

      const userMsg: ChatMessage = {
        id: `m-${Date.now()}`,
        sender: "user",
        text: textToSend.trim(),
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      setMessages((prev) => [...prev, userMsg]);
      setInputText("");
      setIsAiTyping(true);

      // Simulated Dynamic AI Character Response
      setTimeout(() => {
        const aiReplies = [
          "I appreciate you listening to me. But how quickly can this actually be resolved?",
          "Okay, that makes sense. Thank you for giving me clear options right now.",
          "Alright, I'll wait for your email update by 2 PM. Thank you for taking ownership of this.",
        ];
        const randomReply =
          aiReplies[Math.floor(Math.random() * aiReplies.length)];

        const aiMsg: ChatMessage = {
          id: `m-ai-${Date.now()}`,
          sender: "ai",
          text: randomReply,
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        };

        setMessages((prev) => [...prev, aiMsg]);
        setIsAiTyping(false);

        if (messages.length >= 2) {
          setIsSimCompleted(true);
        }
      }, 950);
    },
    [inputText, selectedScenario, isAiTyping, messages.length],
  );

  const handleFinishAndGetFeedback = useCallback(() => {
    setIsGeneratingFeedback(true);
    setIsFullscreen(false);
    setFeedbackStage(1);

    setTimeout(() => {
      setFeedbackStage(2);
    }, 800);

    setTimeout(() => {
      setFeedbackStage(3);
    }, 1600);

    setTimeout(() => {
      setIsGeneratingFeedback(false);
      setShowCompletedFeedback(false);
      setIsSimActive(true);
      if (contextValue) {
        contextValue.completeSimulation(94);
      }
      if (onNavigateToTab) {
        onNavigateToTab("feedback");
      }
    }, 2400);
  }, [contextValue, onNavigateToTab]);

  const handleCloseFeedbackAndGoHome = useCallback(() => {
    setShowCompletedFeedback(false);
    setIsSimActive(false);
    setIsFullscreen(false);
  }, []);
  return (
    <div className={cn("space-y-5", isFullscreen && "space-y-0")}>
      {/* Simulation Active Context Banner */}
      {!isGeneratingFeedback && !showCompletedFeedback && isSimActive && (
        <div className="bg-white rounded-xl p-4 border border-stone-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-200 text-[10px] font-mono font-semibold mb-1">
              <Zap className="w-3 h-3 text-amber-700" />
              <span>STEP 3: PRACTICE SIMULATOR</span>
            </div>
            <h2 className="text-base sm:text-lg font-bold text-stone-900 flex items-center gap-2">
              <span>{selectedScenario.title}</span>
            </h2>
            <p className="text-xs text-stone-500 mt-0.5">
              Practice scenario for <strong className="text-stone-800 font-semibold">{contextValue?.activePath?.title || "Your Career Track"}</strong>.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => onNavigateToTab && onNavigateToTab("classes")}
              className="px-3.5 py-1.5 rounded-lg bg-stone-50 hover:bg-stone-100 border border-stone-200 text-xs font-semibold text-stone-700 hover:text-stone-900 transition-colors cursor-pointer"
            >
              Review Class
            </button>
          </div>
        </div>
      )}

      {/* 1. AI GENERATING FEEDBACK LOADING OVERLAY */}
      {isGeneratingFeedback && (
        <div className="bg-white rounded-xl p-8 sm:p-10 border border-amber-200 text-center space-y-5 max-w-lg mx-auto my-6">
          <div className="w-14 h-14 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700 mx-auto">
            <Sparkles className="w-7 h-7 animate-spin" style={{ animationDuration: "3s" }} />
          </div>

          <div className="space-y-1">
            <h3 className="text-lg font-bold text-stone-900">
              AI Analyzing Simulation...
            </h3>
            <p className="text-xs text-stone-500 max-w-sm mx-auto leading-relaxed">
              Evaluating dialogue cadence, empathy, and coaching rubrics.
            </p>
          </div>

          {/* Step-by-Step Stages */}
          <div className="bg-[#FAF8F5] rounded-xl p-4 border border-stone-200 space-y-2.5 text-left max-w-md mx-auto text-xs">
            <div
              className={cn(
                "flex items-center gap-2 transition-colors",
                feedbackStage >= 1 ? "text-emerald-800 font-semibold" : "text-stone-400",
              )}
            >
              {feedbackStage > 1 ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
              ) : (
                <Loader2 className="w-4 h-4 animate-spin text-amber-600 shrink-0" />
              )}
              <span>Transcribing conversation turns & tone...</span>
            </div>

            <div
              className={cn(
                "flex items-center gap-2 transition-colors",
                feedbackStage >= 2 ? "text-emerald-800 font-semibold" : "text-stone-400",
              )}
            >
              {feedbackStage > 2 ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
              ) : feedbackStage === 2 ? (
                <Loader2 className="w-4 h-4 animate-spin text-amber-600 shrink-0" />
              ) : (
                <div className="w-4 h-4 rounded-full border border-stone-300 shrink-0" />
              )}
              <span>Scoring Empathy & Conflict Resolution...</span>
            </div>

            <div
              className={cn(
                "flex items-center gap-2 transition-colors",
                feedbackStage >= 3 ? "text-emerald-800 font-semibold" : "text-stone-400",
              )}
            >
              {feedbackStage === 3 ? (
                <Loader2 className="w-4 h-4 animate-spin text-amber-600 shrink-0" />
              ) : (
                <div className="w-4 h-4 rounded-full border border-stone-300 shrink-0" />
              )}
              <span>Synthesizing coaching takeaways...</span>
            </div>
          </div>
        </div>
      )}

      {/* 2. COMPLETED SIMULATION RESULT SCREEN */}
      {!isGeneratingFeedback && showCompletedFeedback && selectedScenario && (
        <div className="space-y-5">
          {/* Header Banner */}
          <div className="bg-white rounded-xl p-4 sm:p-5 border border-stone-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-200 text-[10px] font-mono font-semibold mb-1">
                <Sparkles className="w-3 h-3 text-amber-700" />
                <span>SIMULATION FEEDBACK</span>
              </div>
              <h2 className="text-lg font-bold text-stone-900">
                Simulation Result & Evaluation
              </h2>
              <p className="text-xs text-stone-500 mt-0.5">
                Scenario: {selectedScenario.title}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => handleStartSimulation(selectedScenario)}
                className="px-3.5 py-1.5 rounded-lg bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5 text-orange-400" />
                <span>Practice Again</span>
              </button>
              <button
                onClick={handleCloseFeedbackAndGoHome}
                className="px-3.5 py-1.5 rounded-lg bg-stone-50 hover:bg-stone-100 border border-stone-200 text-stone-700 text-xs font-semibold transition-colors cursor-pointer"
              >
                Back to List
              </button>
            </div>
          </div>

          {/* Overall Score & Skill Scores Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            <div className="lg:col-span-4 bg-gradient-to-br from-amber-50/70 via-white to-orange-50/50 rounded-xl p-5 border border-amber-200/70 text-center flex flex-col justify-center space-y-2">
              <span className="text-[10px] font-mono font-semibold uppercase text-stone-500">
                Overall Score
              </span>
              <div className="text-4xl sm:text-5xl font-black text-stone-900 font-mono">
                94%
              </div>
              <div className="inline-flex items-center justify-center gap-1 text-[11px] text-emerald-800 font-semibold bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 mx-auto">
                <TrendingUp className="w-3 h-3 text-emerald-700" />
                <span>High Performance</span>
              </div>
            </div>

            <div className="lg:col-span-8 bg-white rounded-xl p-5 border border-stone-200 space-y-3">
              <h3 className="text-xs sm:text-sm font-bold text-stone-900 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-amber-600" />
                <span>Skill Level Breakdown</span>
              </h3>

              <div className="space-y-2.5">
                {[
                  { name: "Communication & Clarity", score: 95, color: "bg-orange-500" },
                  { name: "Empathy & Tone", score: 96, color: "bg-emerald-500" },
                  { name: "Active Listening", score: 93, color: "bg-rose-500" },
                  { name: "Problem Solving", score: 92, color: "bg-purple-500" },
                  { name: "Conflict Resolution", score: 94, color: "bg-amber-500" },
                ].map((sk) => (
                  <div key={sk.name} className="space-y-1">
                    <div className="flex justify-between text-xs font-medium">
                      <span className="text-stone-800">{sk.name}</span>
                      <span className="font-mono text-stone-900 font-bold">{sk.score}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-stone-100 rounded-full overflow-hidden border border-stone-200">
                      <div className={cn("h-full rounded-full", sk.color)} style={{ width: `${sk.score}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. ACTIVE SIMULATION INTERACTIVE PLAYER */}
      {!isGeneratingFeedback &&
        !showCompletedFeedback &&
        isSimActive &&
        selectedScenario && (
          <div
            className={cn(
              "transition-all duration-200 flex flex-col bg-white border border-stone-200 shadow-sm overflow-hidden",
              isFullscreen
                ? "fixed inset-0 z-50 w-screen h-screen rounded-none p-0 border-none bg-white"
                : "w-full h-[calc(100vh-9rem)] min-h-[520px] rounded-xl",
            )}
          >
            {/* Top Bar Header */}
            <div className="px-4 py-3 bg-[#FCFAF6] border-b border-stone-200 flex flex-wrap items-center justify-between gap-3 shrink-0">
              {/* Left Info */}
              <div className="flex items-center gap-3 min-w-0">
                <div className="relative shrink-0">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white font-bold text-xs shadow-xs">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-white" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-xs sm:text-sm font-bold text-stone-900 truncate">
                      {selectedScenario.characterName}
                    </h3>
                    <span className="text-[10px] font-mono font-semibold text-amber-900 bg-amber-100 px-2 py-0.5 rounded border border-amber-200 shrink-0">
                      {selectedScenario.characterRole}
                    </span>
                    <span className="text-[10px] font-mono text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 shrink-0">
                      {selectedScenario.difficulty}
                    </span>
                  </div>
                  <p className="text-[11px] text-stone-500 truncate mt-0.5">
                    {selectedScenario.title}
                  </p>
                </div>
              </div>

              {/* Center Metrics & Timer */}
              <div className="hidden md:flex items-center gap-3 text-xs font-mono text-stone-600 bg-stone-100/80 px-3 py-1 rounded-full border border-stone-200">
                <div className="flex items-center gap-1.5 text-stone-800 font-bold">
                  <Clock className="w-3.5 h-3.5 text-orange-600" />
                  <span>{formattedTime}</span>
                </div>
                <span className="text-stone-300">|</span>
                <div className="flex items-center gap-1.5">
                  <MessageSquare className="w-3.5 h-3.5 text-stone-500" />
                  <span>
                    {messages.filter((m) => m.sender === "user").length} Turns
                  </span>
                </div>
              </div>

              {/* Right Action Tools */}
              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  onClick={() => setIsFullscreen((prev) => !prev)}
                  className="p-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 hover:text-stone-950 border border-stone-200 transition-colors cursor-pointer text-xs"
                  title={isFullscreen ? "Exit Fullscreen" : "Full Screen"}
                >
                  {isFullscreen ? (
                    <Minimize2 className="w-3.5 h-3.5" />
                  ) : (
                    <Maximize2 className="w-3.5 h-3.5" />
                  )}
                </button>

                <button
                  onClick={() => handleStartSimulation(selectedScenario)}
                  className="p-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 hover:text-stone-950 border border-stone-200 transition-colors cursor-pointer text-xs"
                  title="Reset"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => setIsSimActive(false)}
                  className="p-1.5 rounded-lg bg-stone-100 hover:bg-rose-50 text-stone-700 hover:text-rose-700 border border-stone-200 hover:border-rose-200 transition-colors cursor-pointer text-xs"
                  title="Close"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Evaluated Skills Bar */}
            <div className="px-4 py-1.5 bg-[#FAF8F5] border-b border-stone-200 flex items-center gap-2 overflow-x-auto text-[10px] shrink-0 no-scrollbar">
              <span className="text-stone-500 font-mono font-semibold shrink-0">
                Skills Tested:
              </span>
              {selectedScenario.expectedSkills.map((sk) => (
                <span
                  key={sk}
                  className="px-2 py-0.5 rounded bg-white border border-stone-200 text-stone-700 font-mono whitespace-nowrap shrink-0"
                >
                  {sk}
                </span>
              ))}
            </div>

            {/* Main Chat Messages Stream Container */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3 bg-[#FBF9F5] min-h-0">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={cn(
                    "flex items-start gap-2.5 max-w-[85%] sm:max-w-[75%] md:max-w-[65%] text-xs sm:text-sm",
                    m.sender === "user" ? "ml-auto flex-row-reverse" : "",
                  )}
                >
                  {/* Avatar */}
                  <div
                    className={cn(
                      "w-7 h-7 rounded-full flex items-center justify-center font-bold text-[10px] shrink-0 border",
                      m.sender === "user"
                        ? "bg-stone-900 text-white border-stone-900"
                        : "bg-white text-stone-700 border-stone-200",
                    )}
                  >
                    {m.sender === "user" ? (
                      <User className="w-3.5 h-3.5" />
                    ) : (
                      <Bot className="w-3.5 h-3.5 text-amber-700" />
                    )}
                  </div>

                  {/* Message Bubble Body */}
                  <div
                    className={cn(
                      "p-3.5 rounded-xl leading-relaxed font-sans space-y-1",
                      m.sender === "user"
                        ? "bg-stone-900 text-white rounded-tr-xs"
                        : "bg-white text-stone-900 border border-stone-200 rounded-tl-xs shadow-xs",
                    )}
                  >
                    <div className="flex items-center justify-between gap-3 text-[10px] opacity-60 font-mono">
                      <span className="font-semibold">
                        {m.sender === "user"
                          ? "You"
                          : selectedScenario.characterName}
                      </span>
                      <span>{m.timestamp}</span>
                    </div>
                    <p className="text-xs sm:text-sm whitespace-pre-wrap">
                      {m.text}
                    </p>
                  </div>
                </div>
              ))}

              {/* Optimistic AI Typing Indicator */}
              {isAiTyping && (
                <div className="flex items-start gap-2.5 max-w-md text-xs">
                  <div className="w-7 h-7 rounded-full bg-white border border-stone-200 flex items-center justify-center text-amber-700 shrink-0">
                    <Bot className="w-3.5 h-3.5" />
                  </div>
                  <div className="px-3.5 py-2.5 rounded-xl rounded-tl-xs bg-white border border-stone-200 text-stone-600 flex items-center gap-2 shadow-xs">
                    <span className="text-xs text-stone-700 font-medium">
                      {selectedScenario.characterName} is replying
                    </span>
                    <div className="flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-stone-400 animate-bounce" />
                      <span
                        className="w-1.5 h-1.5 rounded-full bg-stone-400 animate-bounce"
                        style={{ animationDelay: "0.15s" }}
                      />
                      <span
                        className="w-1.5 h-1.5 rounded-full bg-stone-400 animate-bounce"
                        style={{ animationDelay: "0.3s" }}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Scroll Anchor */}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Response Helper Chips Bar */}
            {quickPromptsMap[selectedScenario.id] && (
              <div className="px-4 py-2 bg-[#FAF8F5] border-t border-stone-200 flex items-center gap-2 overflow-x-auto shrink-0 no-scrollbar">
                <span className="text-[10px] font-mono text-stone-500 uppercase font-bold shrink-0 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-amber-600" />
                  <span>Suggestions:</span>
                </span>
                {quickPromptsMap[selectedScenario.id].map((prompt, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSendMessage(prompt)}
                    disabled={isAiTyping}
                    className="px-2.5 py-1 rounded-full bg-white hover:bg-stone-50 text-stone-700 hover:text-stone-950 border border-stone-200 text-xs transition-colors cursor-pointer whitespace-nowrap shrink-0 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
                  >
                    <span className="truncate max-w-[240px]">{prompt}</span>
                    <ChevronRight className="w-3 h-3 text-stone-400" />
                  </button>
                ))}
              </div>
            )}

            {/* Bottom Form & Action Bar */}
            <div className="p-3 bg-white border-t border-stone-200 space-y-2 shrink-0">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="flex items-center gap-2"
              >
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder={`Reply to ${selectedScenario.characterName}...`}
                    disabled={isAiTyping}
                    className="w-full bg-stone-50 border border-stone-200 rounded-lg px-3.5 py-2 pr-10 text-xs sm:text-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:border-amber-500 focus:bg-white transition-colors disabled:opacity-60"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-mono text-stone-400 hidden sm:inline-block">
                    ↵
                  </span>
                </div>

                <button
                  type="submit"
                  disabled={!inputText.trim() || isAiTyping}
                  className="px-4 py-2 rounded-lg bg-stone-900 hover:bg-stone-800 text-white text-xs sm:text-sm font-semibold transition-colors cursor-pointer flex items-center gap-1.5 shrink-0 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <span>Send</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-0.5 text-xs">
                <div className="flex items-center gap-1.5 text-stone-500 text-[11px] truncate">
                  <span className="font-mono font-semibold text-stone-700 shrink-0">
                    Goal:
                  </span>
                  <span className="truncate">{selectedScenario.objective}</span>
                </div>

                <button
                  type="button"
                  onClick={handleFinishAndGetFeedback}
                  className="px-3 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs transition-colors cursor-pointer flex items-center justify-center gap-1.5 shrink-0 self-end sm:self-auto"
                >
                  <Sparkles className="w-3.5 h-3.5 fill-current" />
                  <span>Finish & Get Feedback</span>
                </button>
              </div>
            </div>
          </div>
        )}

      {/* Fallback state when not in live sim */}
      {!isGeneratingFeedback && !showCompletedFeedback && !isSimActive && (
        <div className="bg-white rounded-xl p-8 border border-stone-200 text-center space-y-3 max-w-md mx-auto">
          <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700 mx-auto">
            <Zap className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h3 className="text-base font-bold text-stone-900">Practice Simulation Ready</h3>
            <p className="text-xs text-stone-500 max-w-xs mx-auto">
              Ready to start <strong className="text-stone-800 font-semibold">{selectedScenario.title}</strong>?
            </p>
          </div>
          <button
            onClick={() => handleStartSimulation(selectedScenario)}
            className="px-4 py-2 rounded-lg bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold transition-colors cursor-pointer"
          >
            Start Simulation
          </button>
        </div>
      )}
    </div>
  );
});
