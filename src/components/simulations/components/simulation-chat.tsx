"use client";

import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { SimulationHeader } from "./simulation-header";
import { MessageList } from "./message-list";
import { ChatInput } from "./chat-input";
import { SimulationComplete } from "./simulation-complete";
import { DEFAULT_SCENARIOS, TIMINGS } from "../data/scenarios";
import type { SimulationMessage, SimulationScenario } from "../types";

export { DEFAULT_SCENARIOS, TIMINGS };

interface SimulationChatProps {
  scenarios?: SimulationScenario[];
  autoPlay?: boolean;
  fixedHeightClass?: string;
  disabledInput?: boolean;
  onInteractiveSendMessage?: (text: string) => void;
}

export const SimulationChat = memo(function SimulationChat({
  scenarios = DEFAULT_SCENARIOS,
  autoPlay = true,
  fixedHeightClass = "h-[340px] sm:h-[380px]",
  disabledInput = true,
  onInteractiveSendMessage,
}: SimulationChatProps) {
  const [scenarioIdx, setScenarioIdx] = useState(0);
  const [step, setStep] = useState(0);
  const [mobileView, setMobileView] = useState<"chat" | "scores">("chat");
  const [interactiveMessages, setInteractiveMessages] = useState<
    SimulationMessage[]
  >([]);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const scenario = useMemo(
    () => scenarios[scenarioIdx] || scenarios[0],
    [scenarios, scenarioIdx],
  );

  // Run timer loop cleanly without triggering synchronous setState inside effect
  useEffect(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];

    if (!autoPlay) return;

    TIMINGS.forEach((ms, i) => {
      const t = setTimeout(() => {
        if (i === TIMINGS.length - 1) {
          setScenarioIdx((prev) => (prev + 1) % scenarios.length);
          setStep(0);
          setInteractiveMessages([]);
        } else {
          setStep(i);
        }
      }, ms);
      timers.current.push(t);
    });

    return () => {
      timers.current.forEach(clearTimeout);
      timers.current = [];
    };
  }, [scenarioIdx, autoPlay, scenarios.length]);

  const resetPlayback = useCallback((newScenarioIdx: number) => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    setStep(0);
    setInteractiveMessages([]);
    setScenarioIdx(newScenarioIdx);
  }, []);

  const handleSelectScenario = useCallback(
    (idx: number) => {
      resetPlayback(idx);
    },
    [resetPlayback],
  );

  const handleSendMessage = useCallback(
    (text: string) => {
      if (onInteractiveSendMessage) {
        onInteractiveSendMessage(text);
      }
      const newMsg: SimulationMessage = {
        id: Date.now(),
        role: "user",
        text,
      };
      setInteractiveMessages((prev) => [...prev, newMsg]);
    },
    [onInteractiveSendMessage],
  );

  // Derive visible messages & state for preview playback
  const showAtStep = useMemo(() => [0, 2, 4, 6, 8], []);
  const scriptMessages = useMemo(
    () =>
      scenario.script.filter(
        (m) => step >= showAtStep[typeof m.id === "number" ? m.id : 0],
      ),
    [scenario.script, step, showAtStep],
  );

  const displayMessages = useMemo(
    () =>
      interactiveMessages.length > 0
        ? [...scriptMessages, ...interactiveMessages]
        : scriptMessages,
    [scriptMessages, interactiveMessages],
  );

  const showTyping = useMemo(
    () => autoPlay && [1, 3, 5, 7].includes(step),
    [autoPlay, step],
  );
  const typingRole: "ai" | "user" = useMemo(
    () => (step === 3 || step === 5 ? "ai" : "user"),
    [step],
  );
  const showScores = useMemo(() => !autoPlay || step >= 9, [autoPlay, step]);
  const showIdeal = useMemo(() => !autoPlay || step >= 10, [autoPlay, step]);

  return (
    <div className="relative max-w-5xl mx-auto">
      {/* Background glow per scenario color */}
      <div
        className={`absolute inset-0 bg-gradient-to-r ${scenario.glowFrom} ${scenario.glowTo} blur-3xl rounded-3xl pointer-events-none transition-all duration-700`}
      />

      <div className="relative rounded-2xl border border-white/10 bg-[#0d0d14] backdrop-blur-xl shadow-2xl overflow-hidden flex flex-col">
        {/* Modular Header */}
        <SimulationHeader
          scenarios={scenarios}
          activeScenarioIndex={scenarioIdx}
          onSelectScenario={handleSelectScenario}
          onReplay={() => resetPlayback(scenarioIdx)}
        />

        {/* Mobile View Toggle Bar (Only visible on screens < md) */}
        <div className="md:hidden flex border-b border-white/[0.06] bg-white/[0.02] p-1">
          <button
            type="button"
            onClick={() => setMobileView("chat")}
            className={`flex-1 py-1.5 text-xs font-medium rounded-lg text-center transition cursor-pointer ${
              mobileView === "chat"
                ? "bg-white/10 text-white font-semibold"
                : "text-white/40 hover:text-white/70"
            }`}
          >
            💬 Simulation Chat
          </button>
          <button
            type="button"
            onClick={() => setMobileView("scores")}
            className={`flex-1 py-1.5 text-xs font-medium rounded-lg text-center transition cursor-pointer ${
              mobileView === "scores"
                ? "bg-white/10 text-white font-semibold"
                : "text-white/40 hover:text-white/70"
            }`}
          >
            📊 Feedback & Scores
          </button>
        </div>

        {/* Main Grid: Message Column + Performance Column */}
        <div className="grid md:grid-cols-[1fr_280px] flex-1 min-h-[428px]">
          {/* Chat Area (Visible on md+ OR when mobileView is 'chat') */}
          <div
            className={`flex-col border-b md:border-b-0 md:border-r border-white/[0.06] ${
              mobileView === "chat" ? "flex" : "hidden md:flex"
            }`}
          >
            <MessageList
              messages={displayMessages}
              scenario={scenario}
              showTyping={showTyping}
              typingRole={typingRole}
              heightClass={fixedHeightClass}
            />

            {/* Chat Input Bar */}
            <ChatInput
              onSendMessage={handleSendMessage}
              disabled={disabledInput}
            />
          </div>

          {/* Performance & Score Panel (Visible on md+ OR when mobileView is 'scores') */}
          <div
            className={`flex-col ${
              mobileView === "scores" ? "flex" : "hidden md:flex"
            }`}
          >
            <SimulationComplete
              scenario={scenario}
              showScores={showScores}
              showIdeal={showIdeal}
            />
          </div>
        </div>
      </div>
    </div>
  );
});
