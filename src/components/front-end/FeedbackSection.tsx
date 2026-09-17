"use client";

import React, { useState, useEffect, useRef, memo, useCallback } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
  SCENARIO_STEPS,
  INITIAL_SCORES,
  delay,
  RetroDotWaveDisplay,
  DialogueSimulationCard,
  PractitionerPhotoCard,
  PerformanceMetricsEqualizer,
} from "./feedback";

export default memo(function FeedbackSection() {
  const [stepIdx, setStepIdx] = useState(0);
  const [typedText, setTypedText] = useState("");
  const [displayedSpeaker, setDisplayedSpeaker] = useState<"Customer" | "Learner">("Customer");
  const [displayedRole, setDisplayedRole] = useState("Frustrated Client");
  const [displayedMessage, setDisplayedMessage] = useState(SCENARIO_STEPS[0].customerMessage);
  const [, setCurrentToneTag] = useState(SCENARIO_STEPS[0].customerTone);
  const [currentScores, setCurrentScores] = useState(INITIAL_SCORES);

  // Virtual cursor & automated UI interaction states
  const [cursorPos, setCursorPos] = useState({ x: 280, y: 70 });
  const [cursorDuration, setCursorDuration] = useState(0.8);
  const [isClicking, setIsClicking] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [isSendPressed, setIsSendPressed] = useState(false);
  const [isCustomerTyping, setIsCustomerTyping] = useState(false);
  const [isInViewport, setIsInViewport] = useState(false);

  const sectionRef = useRef<HTMLElement | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);
  const inputContainerRef = useRef<HTMLDivElement | null>(null);
  const sendButtonRef = useRef<HTMLButtonElement | null>(null);

  // IntersectionObserver to pause heavy simulation loop when offscreen
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        setIsInViewport(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );
    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, []);

  // Dynamic coordinates relative to card container
  const getTargetCoords = useCallback(() => {
    if (!cardRef.current) {
      return {
        input: { x: 120, y: 155 },
        send: { x: 380, y: 155 },
        rest: { x: 260, y: 70 },
      };
    }
    const cardRect = cardRef.current.getBoundingClientRect();
    const inputRect = inputContainerRef.current?.getBoundingClientRect();
    const sendRect = sendButtonRef.current?.getBoundingClientRect();

    const inputX = inputRect
      ? inputRect.left - cardRect.left + 70
      : cardRect.width * 0.35;
    const inputY = inputRect
      ? inputRect.top - cardRect.top + inputRect.height / 2
      : 155;

    const sendX = sendRect
      ? sendRect.left - cardRect.left + sendRect.width / 2
      : cardRect.width - 55;
    const sendY = sendRect
      ? sendRect.top - cardRect.top + sendRect.height / 2
      : 155;

    const restX = Math.min(cardRect.width * 0.65, cardRect.width - 90);
    const restY = 70;

    return {
      input: { x: inputX, y: inputY },
      send: { x: sendX, y: sendY },
      rest: { x: restX, y: restY },
    };
  }, []);

  // Automated human-like simulation runner (Only active when in viewport)
  useEffect(() => {
    if (!isInViewport) return;

    let isMounted = true;

    const runSimulationTurn = async (index: number) => {
      if (!isMounted) return;
      const scenario = SCENARIO_STEPS[index % SCENARIO_STEPS.length];
      const initialCoords = getTargetCoords();

      // 1. Customer turn is active, cursor rests naturally
      setDisplayedSpeaker("Customer");
      setDisplayedRole("Frustrated Client");
      setDisplayedMessage(scenario.customerMessage);
      setCurrentToneTag(scenario.customerTone);
      setIsCustomerTyping(false);
      setTypedText("");
      setIsInputFocused(false);
      setIsSendPressed(false);
      setCursorDuration(0.8);
      setCursorPos(initialCoords.rest);

      // Natural pause while reading customer's message
      await delay(1200);
      if (!isMounted) return;

      // 2. Cursor glides smoothly toward input box
      const freshCoords = getTargetCoords();
      setCursorDuration(0.75);
      setCursorPos(freshCoords.input);

      await delay(800);
      if (!isMounted) return;

      // 3. Cursor clicks inside the input
      setIsClicking(true);
      setIsInputFocused(true);
      await delay(200);
      if (!isMounted) return;
      setIsClicking(false);

      // 4. Type the specialist reply letter-by-letter
      const textToType = scenario.suggestedReply;
      for (let i = 1; i <= textToType.length; i++) {
        if (!isMounted) return;
        setTypedText(textToType.slice(0, i));
        await delay(22);
      }

      await delay(350);
      if (!isMounted) return;

      // 5. Cursor glides smoothly toward the "Send" button
      const sendCoords = getTargetCoords();
      setCursorDuration(0.65);
      setCursorPos(sendCoords.send);

      await delay(700);
      if (!isMounted) return;

      // 6. Cursor clicks "Send" button
      setIsClicking(true);
      setIsSendPressed(true);
      await delay(180);
      if (!isMounted) return;
      setIsClicking(false);

      // 7. Message is sent! Dialogue bubble updates, scores update, input resets
      setDisplayedSpeaker("Learner");
      setDisplayedRole("Support Specialist");
      setDisplayedMessage(`"${textToType}"`);
      setCurrentToneTag(scenario.specialistTone);
      setCurrentScores(scenario.scores);
      setTypedText("");
      setIsInputFocused(false);
      setIsSendPressed(false);

      // Cursor moves back toward neutral rest position
      const restCoords = getTargetCoords();
      setCursorDuration(0.9);
      setCursorPos(restCoords.rest);

      // 8. Realistic customer response typing interval
      await delay(400);
      if (!isMounted) return;
      setIsCustomerTyping(true);

      await delay(1500);
      if (!isMounted) return;
      setIsCustomerTyping(false);

      // 9. Advance to next scenario in automated cycle
      if (isMounted) {
        setStepIdx((prev) => (prev + 1) % SCENARIO_STEPS.length);
      }
    };

    runSimulationTurn(stepIdx);

    return () => {
      isMounted = false;
    };
  }, [stepIdx, isInViewport, getTargetCoords]);

  // Live average score calculated across all 7 competencies
  const scoreValues = Object.values(currentScores);
  const averageMastery = Math.round(
    scoreValues.reduce((acc, curr) => acc + curr, 0) / scoreValues.length,
  );

  return (
    <section
      id="feedback-section"
      ref={sectionRef}
      className="relative w-full py-20 sm:py-28 bg-orange-50 text-stone-900 font-sans overflow-hidden select-none"
    >
      {/* Precision Blueprint Grid Background */}
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(to_right,#0000000c_1px,transparent_1px),linear-gradient(to_bottom,#0000000c_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_50%,#000_65%,transparent_100%)]" />
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(to_right,#00000006_2px,transparent_2px),linear-gradient(to_bottom,#00000006_2px,transparent_2px)] bg-[size:160px_160px]" />

      <div className="relative max-w-7xl mx-auto px-2">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div className="max-w-2xl space-y-3.5">
            <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold tracking-tight text-stone-950 leading-[1.15] uppercase">
              Real-Time Skill{" "}
              <span className="border-b-4 border-dashed border-orange-400">
                Performance.
              </span>
            </h2>

            <p className="text-sm sm:text-base text-stone-600 font-medium leading-relaxed max-w-xl">
              Turn-by-turn multi-dimensional evaluation, voice acoustic telemetry,
              and live facial expression scoring across every simulation scenario.
            </p>
          </div>

          <div>
            <Link
              href="#patricia-experience"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-stone-950 hover:bg-stone-800 text-white text-xs font-bold transition-all shadow-xl hover:shadow-2xl active:scale-95"
            >
              <span>Practice Scenarios Now</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Bento Cards Container */}
        <div className="space-y-[18px]">
          {/* Row 1: Telemetry Stat Gauge, Interactive Simulation Dialogue & Practitioner Photo */}
          <div className="flex flex-col lg:flex-row items-stretch gap-[18px] justify-center">
            {/* 1. Retro Dot-Matrix Wave Stat Card */}
            <RetroDotWaveDisplay
              score={averageMastery}
              isTyping={isCustomerTyping}
            />

            {/* 2. Automated Cursor-Driven Dialogue Card */}
            <DialogueSimulationCard
              cardRef={cardRef}
              inputContainerRef={inputContainerRef}
              sendButtonRef={sendButtonRef}
              cursorPos={cursorPos}
              cursorDuration={cursorDuration}
              isClicking={isClicking}
              isCustomerTyping={isCustomerTyping}
              isInputFocused={isInputFocused}
              isSendPressed={isSendPressed}
              displayedSpeaker={displayedSpeaker}
              displayedRole={displayedRole}
              displayedMessage={displayedMessage}
              typedText={typedText}
              suggestedReplyPlaceholder={
                SCENARIO_STEPS[stepIdx % SCENARIO_STEPS.length].suggestedReply
              }
            />

            {/* 3. Practitioner Photo Card */}
            <PractitionerPhotoCard />
          </div>

          {/* Row 2: Live Equalizer Telemetry Chart Board (7 Dynamic Competency Bars) */}
          <PerformanceMetricsEqualizer
            currentScores={currentScores}
            isCustomerTyping={isCustomerTyping}
          />
        </div>
      </div>
    </section>
  );
});
