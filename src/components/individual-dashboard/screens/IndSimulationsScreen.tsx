"use client";

import React, {
  useState,
  useCallback,
  useMemo,
  memo,
  useEffect,
  useRef,
} from "react";
import { useLearningLoop } from "@/context/LearningLoopContext";
import { cn } from "@/lib/utils";
import {
  ChatMessage,
  SimulationScenario,
  DEFAULT_SCENARIOS,
  QUICK_PROMPTS_MAP,
  SimulationActiveBanner,
  SimulationLoadingOverlay,
  SimulationCompletedView,
  SimulationPlayerHeader,
  SimulationMessageList,
  SimulationInputDock,
  SimulationInactiveCard,
} from "../simulations";

interface IndSimulationsScreenProps {
  onNavigateToTab?: (tabId: string) => void;
  activeScenarioTitle?: string;
}

export const IndSimulationsScreen = memo(function IndSimulationsScreen({
  onNavigateToTab,
  activeScenarioTitle,
}: IndSimulationsScreenProps) {
  const contextValue: ReturnType<typeof useLearningLoop> | null = useLearningLoop();

  const scenarios = DEFAULT_SCENARIOS;

  // Derive matching scenario based on user's choice from Step 1 & Class
  const targetScenarioId = useMemo(() => {
    if (contextValue?.activeScenarioId) return contextValue.activeScenarioId;
    if (contextValue?.activePath?.id === "path-healthcare-support")
      return "sim-4";
    if (contextValue?.activePath?.id === "path-it-specialist") return "sim-2";
    if (contextValue?.activePath?.id === "path-tech-support") return "sim-1";
    return contextValue?.activePath?.startingScenarioId || "sim-1";
  }, [contextValue?.activeScenarioId, contextValue?.activePath]);

  const targetScenario = useMemo(() => {
    return scenarios.find((s) => s.id === targetScenarioId) || scenarios[0];
  }, [scenarios, targetScenarioId]);

  // Active Simulation State
  const [selectedScenario, setSelectedScenario] = useState<SimulationScenario>(
    () => targetScenario
  );
  const [messages, setMessages] = useState<ChatMessage[]>(() => [
    {
      id: "m-1",
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
  const [isAiTyping, setIsAiTyping] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Update scenario if targetScenario changes
  useEffect(() => {
    if (targetScenario.id !== selectedScenario.id) {
      setSelectedScenario(targetScenario);
      setMessages([
        {
          id: "m-1",
          sender: "ai",
          text: targetScenario.initialAiMessage,
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ]);
      setIsSimActive(true);
      setShowCompletedFeedback(false);
    }
  }, [targetScenario, selectedScenario.id]);

  // Feedback Generation Loading & Finished State
  const [isGeneratingFeedback, setIsGeneratingFeedback] = useState(false);
  const [feedbackStage, setFeedbackStage] = useState(1);
  const [showCompletedFeedback, setShowCompletedFeedback] = useState(false);

  // Timer State
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    if (isSimActive) {
      scrollToBottom();
    }
  }, [messages, isAiTyping, isSimActive, scrollToBottom]);

  // Timer Effect
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
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  }, [elapsedSeconds]);

  // Start Simulation
  const handleStartSimulation = useCallback((scenario: SimulationScenario) => {
    setSelectedScenario(scenario);
    setMessages([
      {
        id: "m-1",
        sender: "ai",
        text: scenario.initialAiMessage,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      },
    ]);
    setIsSimActive(true);
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
          activeScenarioTitle.toLowerCase().includes(s.title.toLowerCase())
      );
      if (match) {
        handleStartSimulation(match);
      }
    }
  }, [activeScenarioTitle, scenarios, isSimActive, handleStartSimulation]);

  // Send Message with optimistic UI
  const handleSendMessage = useCallback(
    (customText?: string) => {
      const textToSend =
        typeof customText === "string" ? customText : inputText;
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
        }
      }, 950);
    },
    [inputText, selectedScenario, isAiTyping, messages.length]
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

  const prompts = QUICK_PROMPTS_MAP[selectedScenario.id];
  const turnCount = messages.filter((m) => m.sender === "user").length;

  return (
    <div className={cn("space-y-5", isFullscreen && "space-y-0")}>
      {/* Context Banner */}
      {!isGeneratingFeedback && !showCompletedFeedback && isSimActive && (
        <SimulationActiveBanner
          scenarioTitle={selectedScenario.title}
          careerTrackTitle={contextValue?.activePath?.title}
          onReviewClass={() =>
            onNavigateToTab ? onNavigateToTab("classes") : undefined
          }
        />
      )}

      {/* Loading Feedback State */}
      {isGeneratingFeedback && (
        <SimulationLoadingOverlay feedbackStage={feedbackStage} />
      )}

      {/* Completed Results View */}
      {!isGeneratingFeedback && showCompletedFeedback && selectedScenario && (
        <SimulationCompletedView
          scenario={selectedScenario}
          onPracticeAgain={handleStartSimulation}
          onBackToList={handleCloseFeedbackAndGoHome}
        />
      )}

      {/* Active Simulation Player */}
      {!isGeneratingFeedback &&
        !showCompletedFeedback &&
        isSimActive &&
        selectedScenario && (
          <div
            className={cn(
              "flex flex-col overflow-hidden border border-white/[0.06] bg-[#181818] text-white",
              isFullscreen
                ? "fixed inset-0 z-[100] h-dvh w-screen rounded-none border-none"
                : "h-[calc(100dvh-12rem)] min-h-[560px] w-full rounded-3xl"
            )}
          >
            {/* Top Bar Header */}
            <SimulationPlayerHeader
              scenario={selectedScenario}
              formattedTime={formattedTime}
              turnCount={turnCount}
              isFullscreen={isFullscreen}
              onToggleFullscreen={() => setIsFullscreen((prev) => !prev)}
              onReset={() => handleStartSimulation(selectedScenario)}
              onClose={() => setIsSimActive(false)}
            />

            {/* Chat Messages List */}
            <SimulationMessageList
              messages={messages}
              scenario={selectedScenario}
              isAiTyping={isAiTyping}
              messagesEndRef={messagesEndRef}
            />

            {/* Bottom Input Dock */}
            <SimulationInputDock
              inputText={inputText}
              onInputChange={setInputText}
              onSendMessage={handleSendMessage}
              isAiTyping={isAiTyping}
              objective={selectedScenario.objective}
              prompts={prompts}
              characterName={selectedScenario.characterName}
              onFinishAndGetFeedback={handleFinishAndGetFeedback}
            />
          </div>
        )}

      {/* Inactive Standby State */}
      {!isGeneratingFeedback && !showCompletedFeedback && !isSimActive && (
        <SimulationInactiveCard
          scenario={selectedScenario}
          onStartSimulation={handleStartSimulation}
        />
      )}
    </div>
  );
});
