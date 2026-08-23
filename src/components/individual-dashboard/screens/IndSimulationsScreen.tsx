"use client";

import React, { useState, useCallback, useMemo, memo } from "react";
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
} from "lucide-react";
import { useAccount } from "@/context/AccountContext";
import { ChatMessage, SimulationScenario } from "@/types/individual";
import { cn } from "@/lib/utils";

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
  const [selectedScenario, setSelectedScenario] = useState<SimulationScenario | null>(
    scenarios[0]
  );
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState("");
  const [isSimActive, setIsSimActive] = useState(false);
  const [isSimCompleted, setIsSimCompleted] = useState(false);

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

        // Auto mark complete after 3 user interactions
        if (messages.length >= 3) {
          setIsSimCompleted(true);
        }
      }, 1000);
    },
    [inputText, selectedScenario, messages.length]
  );

  const handleFinishAndGetFeedback = useCallback(() => {
    setIsSimActive(false);
    if (onNavigateToTab) {
      onNavigateToTab("feedback");
    }
  }, [onNavigateToTab]);

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
            Interact with AI characters in realistic scenarios to apply what you learned in classes.
          </p>
        </div>
      </div>

      {/* ACTIVE SIMULATION INTERACTIVE PLAYER */}
      {isSimActive && selectedScenario ? (
        <div className="bg-[#12131c]/90 rounded-2xl border border-orange-400/30 shadow-2xl overflow-hidden space-y-0">
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

          {/* Chat Form */}
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
                onClick={handleFinishAndGetFeedback}
                className="px-4 py-1.5 rounded-full bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 text-xs font-extrabold transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Finish Simulation & Get AI Feedback</span>
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* SCENARIOS BROWSER GRID */
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
      )}
    </div>
  );
});
