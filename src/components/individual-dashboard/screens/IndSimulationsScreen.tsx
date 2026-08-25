"use client";

import React, { useState, useCallback, useMemo, memo, useEffect } from "react";
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
  Star,
} from "lucide-react";
import { useAccount } from "@/context/AccountContext";
import { ChatMessage, SimulationScenario, SimulationFeedback } from "@/types/individual";
import { cn } from "@/lib/utils";
import { RecentSimulationsTable } from "../RecentSimulationsTable";

interface IndSimulationsScreenProps {
  onNavigateToTab?: (tabId: string) => void;
  activeScenarioTitle?: string;
}

export const IndSimulationsScreen = memo(function IndSimulationsScreen({
  onNavigateToTab,
  activeScenarioTitle,
}: IndSimulationsScreenProps) {
  const { session } = useAccount();

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
        expectedSkills: ["Empathy", "Active Listening", "Problem Solving", "Conflict Resolution"],
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
        expectedSkills: ["Technical Accuracy", "Step-by-step Guidance", "Tone Control"],
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
    ],
    []
  );

  // Active Simulation State
  const [selectedScenario, setSelectedScenario] = useState<SimulationScenario>(
    scenarios[0]
  );
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState("");
  const [isSimActive, setIsSimActive] = useState(false);
  const [isSimCompleted, setIsSimCompleted] = useState(false);

  // AI Feedback Generation Loading & Finished State
  const [isGeneratingFeedback, setIsGeneratingFeedback] = useState(false);
  const [feedbackStage, setFeedbackStage] = useState(1);
  const [showCompletedFeedback, setShowCompletedFeedback] = useState(false);

  const handleStartSimulation = useCallback((scenario: SimulationScenario) => {
    setSelectedScenario(scenario);
    setMessages([
      {
        id: `m-1`,
        sender: "ai",
        text: scenario.initialAiMessage,
        timestamp: "10:00 AM",
      },
    ]);
    setIsSimActive(true);
    setIsSimCompleted(false);
    setIsGeneratingFeedback(false);
    setShowCompletedFeedback(false);
  }, []);

  const handleSendMessage = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (!inputText.trim() || !selectedScenario) return;

      const userMsg: ChatMessage = {
        id: `m-${Date.now()}`,
        sender: "user",
        text: inputText,
        timestamp: "10:01 AM",
      };

      setMessages((prev) => [...prev, userMsg]);
      setInputText("");

      // Simulated Dynamic AI Character Response
      setTimeout(() => {
        const aiReplies = [
          "I appreciate you listening to me. But how quickly can this actually be resolved?",
          "Okay, that makes sense. Thank you for giving me clear options right now.",
          "Alright, I'll wait for your email update by 2 PM. Thank you for taking ownership of this.",
        ];
        const randomReply = aiReplies[Math.floor(Math.random() * aiReplies.length)];

        const aiMsg: ChatMessage = {
          id: `m-ai-${Date.now()}`,
          sender: "ai",
          text: randomReply,
          timestamp: "10:02 AM",
        };

        setMessages((prev) => [...prev, aiMsg]);

        if (messages.length >= 2) {
          setIsSimCompleted(true);
        }
      }, 900);
    },
    [inputText, selectedScenario, messages.length]
  );

  const handleFinishAndGetFeedback = useCallback(() => {
    setIsGeneratingFeedback(true);
    setFeedbackStage(1);

    setTimeout(() => {
      setFeedbackStage(2);
    }, 800);

    setTimeout(() => {
      setFeedbackStage(3);
    }, 1600);

    setTimeout(() => {
      setIsGeneratingFeedback(false);
      setShowCompletedFeedback(true);
    }, 2400);
  }, []);

  const handleCloseFeedbackAndGoHome = useCallback(() => {
    setShowCompletedFeedback(false);
    setIsSimActive(false);
  }, []);

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-[#12131c]/90 rounded-2xl p-5 border border-white/10 shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Zap className="w-5 h-5 text-orange-400" />
            <span>Simulations = Practice in Realistic Situations</span>
          </h2>
          <p className="text-xs text-white/60 mt-0.5">
            Interact with AI characters in realistic workplace scenarios to apply your skills.
          </p>
        </div>
      </div>

      {/* 1. AI GENERATING FEEDBACK LOADING OVERLAY */}
      {isGeneratingFeedback && (
        <div className="bg-[#12131c]/95 rounded-3xl p-8 sm:p-12 border border-orange-400/40 shadow-2xl text-center space-y-6 max-w-xl mx-auto my-8 animate-in fade-in zoom-in-95">
          {/* Animated Glowing Radar Icon */}
          <div className="relative w-20 h-20 mx-auto flex items-center justify-center">
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-orange-500 to-rose-500 blur-xl opacity-50 animate-pulse" />
            <div className="relative w-16 h-16 rounded-2xl bg-black/80 border border-orange-400/60 flex items-center justify-center text-orange-400 shadow-lg">
              <Sparkles className="w-8 h-8 animate-spin text-orange-400" style={{ animationDuration: "3s" }} />
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-2xl font-extrabold text-white">
              AI Analyzing Your Simulation...
            </h3>
            <p className="text-xs text-white/60 max-w-md mx-auto leading-relaxed">
              Evaluating dialogue cadence, emotional validation, and rubric competency scores.
            </p>
          </div>

          {/* Dynamic Step-by-Step Generation Stages */}
          <div className="bg-black/60 rounded-2xl p-4 border border-white/10 space-y-3 text-left max-w-md mx-auto text-xs">
            <div
              className={cn(
                "flex items-center gap-2.5 transition-colors",
                feedbackStage >= 1 ? "text-emerald-400 font-bold" : "text-white/40"
              )}
            >
              {feedbackStage > 1 ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              ) : (
                <Loader2 className="w-4 h-4 animate-spin text-orange-400 shrink-0" />
              )}
              <span>Transcribing conversation turns & tone metrics...</span>
            </div>

            <div
              className={cn(
                "flex items-center gap-2.5 transition-colors",
                feedbackStage >= 2 ? "text-emerald-400 font-bold" : "text-white/40"
              )}
            >
              {feedbackStage > 2 ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              ) : feedbackStage === 2 ? (
                <Loader2 className="w-4 h-4 animate-spin text-orange-400 shrink-0" />
              ) : (
                <div className="w-4 h-4 rounded-full border border-white/20 shrink-0" />
              )}
              <span>Scoring Empathy, Problem Solving & Tone rubric...</span>
            </div>

            <div
              className={cn(
                "flex items-center gap-2.5 transition-colors",
                feedbackStage >= 3 ? "text-emerald-400 font-bold" : "text-white/40"
              )}
            >
              {feedbackStage === 3 ? (
                <Loader2 className="w-4 h-4 animate-spin text-orange-400 shrink-0" />
              ) : (
                <div className="w-4 h-4 rounded-full border border-white/20 shrink-0" />
              )}
              <span>Synthesizing coaching points & standout highlights...</span>
            </div>
          </div>
        </div>
      )}

      {/* 2. COMPLETED SIMULATION RESULT & FULL AI EVALUATION SCREEN (1:1 with IndFeedbackScreen) */}
      {!isGeneratingFeedback && showCompletedFeedback && selectedScenario && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-3">
          {/* Header Banner */}
          <div className="bg-[#12131c]/90 rounded-2xl p-5 border border-white/10 shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-400/30 text-xs text-orange-300 font-medium mb-1.5">
                <Sparkles className="w-3.5 h-3.5 text-orange-400" />
                <span>FEEDBACK = UNDERSTAND YOUR PERFORMANCE</span>
              </div>
              <h2 className="text-xl font-bold text-white">
                Simulation Result & AI Evaluation
              </h2>
              <p className="text-xs text-white/60">
                Scenario: {selectedScenario.title}
              </p>
            </div>

            <div className="flex items-center gap-2.5">
              <button
                onClick={() => handleStartSimulation(selectedScenario)}
                className="px-4 py-2 rounded-full bg-white text-black hover:bg-white/90 text-xs font-extrabold transition-colors shadow-md cursor-pointer flex items-center gap-2 shrink-0"
              >
                <RotateCcw className="w-3.5 h-3.5 text-orange-400" />
                <span>Practice Again</span>
              </button>
              <button
                onClick={handleCloseFeedbackAndGoHome}
                className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-colors cursor-pointer"
              >
                Back to Simulations
              </button>
            </div>
          </div>

          {/* Overall Score & Skill Scores Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            {/* Left: Overall Score Card */}
            <div className="lg:col-span-4 bg-gradient-to-br from-orange-500/15 via-[#12131c] to-[#0d0e14] rounded-2xl p-6 border border-orange-400/30 shadow-xl text-center flex flex-col justify-center space-y-3">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-orange-300">
                Overall Simulation Score
              </span>
              <div className="text-5xl sm:text-6xl font-extrabold text-white font-mono tracking-tight">
                94%
              </div>
              <div className="inline-flex items-center justify-center gap-1.5 text-xs text-emerald-400 font-medium bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20 max-w-xs mx-auto">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>High Workplace Performance</span>
              </div>
            </div>

            {/* Right: Evaluated Skill Radar Scores */}
            <div className="lg:col-span-8 bg-[#12131c]/90 rounded-2xl p-6 border border-white/10 shadow-xl space-y-4">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-orange-400" />
                <span>Skill Level Evaluation Breakdown</span>
              </h3>

              <div className="space-y-3">
                {[
                  { name: "Communication & Clarity", score: 95, color: "bg-orange-500" },
                  { name: "Empathy & Tone", score: 96, color: "bg-emerald-500" },
                  { name: "Active Listening", score: 93, color: "bg-rose-500" },
                  { name: "Problem Solving & Logic", score: 92, color: "bg-purple-500" },
                  { name: "Conflict Resolution", score: 94, color: "bg-amber-500" },
                ].map((sk) => (
                  <div key={sk.name} className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="font-bold text-white">{sk.name}</span>
                      <span className="font-mono text-orange-400 font-bold">{sk.score}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-black/60 rounded-full overflow-hidden border border-white/10">
                      <div
                        className={cn("h-full rounded-full", sk.color)}
                        style={{ width: `${sk.score}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* What You Did Well vs What to Improve */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Positive Highlights */}
            <div className="bg-[#12131c]/90 rounded-2xl p-5 border border-emerald-500/30 shadow-lg space-y-3">
              <h3 className="text-sm font-bold text-emerald-400 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>What You Did Well</span>
              </h3>
              <ul className="space-y-2.5">
                <li className="flex items-start gap-2 text-xs text-white/80 leading-relaxed">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0 mt-1.5" />
                  <span>Immediate Emotional Validation: Validated the customer&apos;s frustration within the first 10 seconds before discussing company policy.</span>
                </li>
                <li className="flex items-start gap-2 text-xs text-white/80 leading-relaxed">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0 mt-1.5" />
                  <span>Positive Framing: Used &quot;What I can do right now...&quot; instead of defensive language.</span>
                </li>
                <li className="flex items-start gap-2 text-xs text-white/80 leading-relaxed">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0 mt-1.5" />
                  <span>Explicit Action Agreement: Set a clear 2 PM email update follow-up timestamp.</span>
                </li>
              </ul>
            </div>

            {/* Improvement Points */}
            <div className="bg-[#12131c]/90 rounded-2xl p-5 border border-orange-400/30 shadow-lg space-y-3">
              <h3 className="text-sm font-bold text-orange-400 flex items-center gap-2">
                <AlertCircle className="w-4 h-4" />
                <span>What You Could Improve</span>
              </h3>
              <ul className="space-y-2.5">
                <li className="flex items-start gap-2 text-xs text-white/80 leading-relaxed">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-400 shrink-0 mt-1.5" />
                  <span>Speed of Agreement: State the specific resolution credit option ~30 seconds earlier in the interaction.</span>
                </li>
                <li className="flex items-start gap-2 text-xs text-white/80 leading-relaxed">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-400 shrink-0 mt-1.5" />
                  <span>Summarizing Facts: Confirm order invoice # before confirming the refund credit amount.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Important Dialogue Moments Timeline */}
          <div className="bg-[#12131c]/90 rounded-2xl p-5 border border-white/10 shadow-lg space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-orange-400" />
              <span>Key Conversation Moments & AI Analysis</span>
            </h3>

            <div className="space-y-3">
              <div className="p-4 rounded-xl border text-xs space-y-1 leading-relaxed bg-emerald-500/10 border-emerald-500/30 text-white/90">
                <div className="flex items-center justify-between font-mono text-[10px]">
                  <span className="font-bold text-orange-300">Timestamp 00:15</span>
                  <span className="text-emerald-400 font-bold">Effective Response</span>
                </div>
                <p>Customer expressed anger over delay. You responded with empathy and validated their frustration immediately.</p>
              </div>

              <div className="p-4 rounded-xl border text-xs space-y-1 leading-relaxed bg-emerald-500/10 border-emerald-500/30 text-white/90">
                <div className="flex items-center justify-between font-mono text-[10px]">
                  <span className="font-bold text-orange-300">Timestamp 01:20</span>
                  <span className="text-emerald-400 font-bold">Effective Response</span>
                </div>
                <p>Customer demanded immediate resolution. You framed available credit options positively without confrontation.</p>
              </div>
            </div>
          </div>

          {/* Recommended Next Actions to Improve */}
          <div className="bg-[#12131c]/90 rounded-2xl p-5 border border-white/10 shadow-lg space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-orange-400" />
              <span>Recommended Next Actions to Improve</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-4 rounded-xl bg-black/50 border border-white/10 flex items-center justify-between gap-3 text-xs">
                <div>
                  <span className="text-[10px] font-mono text-orange-400 uppercase font-bold">
                    Recommended Class Lesson
                  </span>
                  <div className="font-bold text-white mt-0.5">Lesson 4: Establishing Control & Action Agreements</div>
                </div>
                <a
                  href="/user-dashboard/classes"
                  className="px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-xs transition-colors cursor-pointer shrink-0"
                >
                  Review Lesson
                </a>
              </div>

              <div className="p-4 rounded-xl bg-black/50 border border-white/10 flex items-center justify-between gap-3 text-xs">
                <div>
                  <span className="text-[10px] font-mono text-rose-400 uppercase font-bold">
                    Next Recommended Simulation
                  </span>
                  <div className="font-bold text-white mt-0.5">L1 Network Diagnostics Under High SLA Pressure</div>
                </div>
                <button
                  onClick={() => handleStartSimulation(scenarios[1])}
                  className="px-3.5 py-1.5 rounded-full bg-gradient-to-r from-orange-500 to-rose-500 text-white font-bold text-xs transition-opacity hover:opacity-90 cursor-pointer shrink-0"
                >
                  Start Sim
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Actions */}
          <div className="pt-2 flex items-center justify-between gap-3 border-t border-white/10">
            <button
              onClick={() => handleStartSimulation(selectedScenario)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-orange-500 to-rose-500 text-white font-extrabold text-xs hover:opacity-90 transition-opacity cursor-pointer shadow-md"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Practice Scenario Again</span>
            </button>

            <button
              onClick={handleCloseFeedbackAndGoHome}
              className="px-6 py-2.5 rounded-full bg-white text-black font-extrabold text-xs hover:bg-white/90 transition-colors cursor-pointer shadow-md"
            >
              Done & View Recent Simulations Table &rarr;
            </button>
          </div>
        </div>
      )}

      {/* 3. ACTIVE SIMULATION INTERACTIVE PLAYER */}
      {!isGeneratingFeedback && !showCompletedFeedback && isSimActive && selectedScenario && (
        <div className="bg-[#12131c]/90 rounded-2xl border border-orange-400/30 shadow-2xl overflow-hidden space-y-0 animate-in fade-in">
          {/* Simulation Header Bar */}
          <div className="p-4 bg-black/60 border-b border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-orange-500 to-rose-500 flex items-center justify-center text-white font-extrabold text-xs shrink-0 shadow-md">
                AI
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-white">
                    {selectedScenario.characterName}
                  </h3>
                  <span className="text-[10px] font-mono text-orange-300 bg-orange-500/10 px-2 py-0.5 rounded border border-orange-400/20">
                    {selectedScenario.characterRole}
                  </span>
                </div>
                <p className="text-[11px] text-white/60">
                  Scenario: {selectedScenario.title}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                Live Simulation Active
              </span>
              <button
                onClick={() => setIsSimActive(false)}
                className="text-xs text-white/60 hover:text-white px-3 py-1 rounded-full bg-white/5 border border-white/10 cursor-pointer"
              >
                Exit
              </button>
            </div>
          </div>

          {/* Expected Skills Bar */}
          <div className="px-5 py-2.5 bg-black/40 border-b border-white/10 flex items-center gap-2 overflow-x-auto text-[11px]">
            <span className="text-white/40 font-mono">Evaluated Skills:</span>
            {selectedScenario.expectedSkills.map((sk) => (
              <span
                key={sk}
                className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-orange-300 font-mono"
              >
                {sk}
              </span>
            ))}
          </div>

          {/* Chat Messages Area */}
          <div className="p-6 space-y-4 max-h-[380px] overflow-y-auto bg-black/50">
            {messages.map((m) => (
              <div
                key={m.id}
                className={cn(
                  "flex items-start gap-3 max-w-xl text-xs",
                  m.sender === "user" ? "ml-auto flex-row-reverse" : ""
                )}
              >
                <div
                  className={cn(
                    "w-7 h-7 rounded-full flex items-center justify-center font-bold text-[10px] shrink-0 border",
                    m.sender === "user"
                      ? "bg-white text-black border-white"
                      : "bg-orange-500/20 text-orange-300 border-orange-400/40"
                  )}
                >
                  {m.sender === "user" ? "YOU" : "AI"}
                </div>
                <div
                  className={cn(
                    "p-3.5 rounded-2xl leading-relaxed font-sans",
                    m.sender === "user"
                      ? "bg-orange-500/20 text-white border border-orange-400/30"
                      : "bg-[#161824] text-slate-100 border border-white/10"
                  )}
                >
                  {m.text}
                </div>
              </div>
            ))}
          </div>

          {/* Chat Form & Finish Action */}
          <div className="p-4 bg-black/60 border-t border-white/10 space-y-3">
            <form onSubmit={handleSendMessage} className="flex items-center gap-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Type your response to practice de-escalation & communication..."
                className="flex-1 bg-black border border-white/10 rounded-full px-5 py-3 text-xs text-white placeholder-white/40 focus:outline-none focus:border-orange-400 transition-colors"
              />
              <button
                type="submit"
                className="px-5 py-3 rounded-full bg-white text-black hover:bg-white/90 text-xs font-extrabold transition-colors shadow-md cursor-pointer flex items-center gap-1.5 shrink-0"
              >
                <span>Send</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>

            <div className="flex items-center justify-between pt-1">
              <span className="text-[10px] text-white/40 font-mono">
                Objective: De-escalate customer and set action agreement.
              </span>
              <button
                type="button"
                onClick={handleFinishAndGetFeedback}
                className="px-4 py-2 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:opacity-95 text-black font-extrabold text-xs transition-opacity shadow-lg cursor-pointer flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5 fill-current" />
                <span>Finish Simulation & Get AI Feedback</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 4. SCENARIOS BROWSER GRID & RECENT SIMULATIONS TABLE (Default state when not in live sim) */}
      {!isGeneratingFeedback && !showCompletedFeedback && !isSimActive && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {scenarios.map((sc) => (
              <div
                key={sc.id}
                className="bg-[#12131c]/90 rounded-2xl p-5 border border-white/10 shadow-lg flex flex-col justify-between space-y-4 hover:border-orange-400/40 transition-colors"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-orange-500/10 text-orange-300 border border-orange-400/20">
                      {sc.difficulty}
                    </span>
                    {sc.bestScore && (
                      <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                        Best: {sc.bestScore}
                      </span>
                    )}
                  </div>

                  <h3 className="text-base font-bold text-white leading-snug">
                    {sc.title}
                  </h3>

                  <p className="text-xs text-white/60 leading-relaxed min-h-[48px]">
                    {sc.objective}
                  </p>

                  <div className="flex items-center gap-3 text-xs text-white/50 font-mono pt-1">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-orange-400" />
                      <span>{sc.estimatedTime}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageSquare className="w-3.5 h-3.5 text-rose-400" />
                      <span>{sc.characterRole}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => handleStartSimulation(sc)}
                  className="w-full py-3 rounded-full bg-gradient-to-r from-orange-500 to-rose-500 hover:opacity-95 text-white text-xs font-extrabold transition-colors shadow-md cursor-pointer flex items-center justify-center gap-2"
                >
                  <Play className="w-4 h-4 fill-current" />
                  <span>Start Simulation Scenario</span>
                </button>
              </div>
            ))}
          </div>

          {/* RECENT COMPLETED SIMULATIONS TABLE */}
          <RecentSimulationsTable
            onLaunchSimulation={(title) => {
              const found = scenarios.find((s) => s.title === title) || scenarios[0];
              handleStartSimulation(found);
            }}
          />
        </div>
      )}
    </div>
  );
});
