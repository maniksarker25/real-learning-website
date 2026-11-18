"use client";

import React, { memo, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLenis } from "lenis/react";
import { AccountVisual, PathVisual, PracticeVisual, ProgressVisual } from "./StepVisuals";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export type ConnectStep = {
  id: string;
  title: string;
  description: string;
  points?: string[];
  cta?: { label: string; href: string };
  /** A React component/mock, or a screenshot path in /public */
  visual: React.ReactNode | { src: string; alt: string };
};

const DEFAULT_STEPS: ConnectStep[] = [
  {
    id: "account",
    title: "Create your account",
    description: "Sign up free, for yourself or your whole team.",
    points: ["Ready in a minute", "No card needed"],
    cta: { label: "Get started free", href: "/get-started" },
    visual: <AccountVisual />,
  },
  {
    id: "path",
    title: "Pick your path",
    description: "Choose a career track and pace. We build your plan.",
    points: ["4 career tracks", "Go at your own speed"],
    cta: { label: "Explore career tracks", href: "/onboarding/individual" },
    visual: <PathVisual />,
  },
  {
    id: "practice",
    title: "Practice with Patricia",
    description: "Chat through real work moments with your AI coach.",
    points: ["Text-based simulations", "Live tips as you reply"],
    cta: { label: "Try a demo session", href: "/demo" },
    visual: <PracticeVisual />,
  },
  {
    id: "progress",
    title: "Track and prove it",
    description: "Get scored every session and share your progress.",
    points: ["Skill-by-skill feedback", "Shareable credentials"],
    cta: { label: "Talk to our team", href: "/contact" },
    visual: <ProgressVisual />,
  },
];

function StepVisual({ visual }: { visual: ConnectStep["visual"] }) {
  if (visual && typeof visual === "object" && "src" in (visual as object)) {
    const v = visual as { src: string; alt: string };
    return (
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[22px] ring-1 ring-white/10">
        <Image src={v.src} alt={v.alt} fill className="object-cover" sizes="(min-width:1024px) 50vw, 100vw" />
      </div>
    );
  }
  return <>{visual as React.ReactNode}</>;
}

type Props = {
  title?: string;
  description?: string;
  steps?: ConnectStep[];
};

export default memo(function ConnectWithUsSection({
  title = "From sign-up to job-ready in four steps",
  description = "For you or your whole team. Here's how to start.",
  steps = DEFAULT_STEPS,
}: Props) {
  const [active, setActive] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef(0);

  // Keep ScrollTrigger in sync with Lenis smooth scroll
  useLenis(() => ScrollTrigger.update());

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    const rail = railRef.current;
    if (!section || !track || !rail) return;

    const last = steps.length - 1;
    const mm = gsap.matchMedia();

    // Desktop only: pin the whole section and scrub through the steps
    mm.add("(min-width: 1024px)", () => {
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${window.innerHeight * last * 0.7}`,
          pin: true,
          scrub: 0.3,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const idx = Math.min(last, Math.round(self.progress * last));
            if (idx !== activeRef.current) {
              activeRef.current = idx;
              setActive(idx);
            }
          },
        },
      });

      // Steps start at the top of the column; scroll only as far as needed so
      // the last step ends at the bottom (no empty space above/below).
      const column = track.parentElement as HTMLElement;
      const maxShift = () => Math.min(0, column.clientHeight - track.scrollHeight);

      tl.fromTo(track, { y: 0 }, { y: maxShift, duration: last }, 0);
      tl.fromTo(rail, { scaleY: 1 / steps.length }, { scaleY: 1, duration: last }, 0);

      return () => {
        gsap.set([track, rail], { clearProps: "all" });
      };
    });

    return () => mm.revert();
  }, [steps.length]);

  return (
    <section
      ref={sectionRef}
      id="connect-with-us"
      className="relative w-full bg-[#121212] px-6 py-20 text-white sm:px-10 sm:py-24 lg:flex lg:h-screen lg:flex-col lg:overflow-hidden lg:px-16 lg:py-0"
    >
      <div className="relative mx-auto flex w-full max-w-7xl flex-col lg:h-full lg:pb-12 lg:pt-20">
        {/* Header */}
        <div className="max-w-2xl shrink-0">
          <h2 className="text-3xl font-semibold tracking-[-0.03em] text-white sm:text-4xl lg:text-[44px] lg:leading-[1.1]">
            {title}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-zinc-400 sm:text-base">{description}</p>
        </div>

        <div className="relative mt-14 grid grid-cols-1 gap-x-16 lg:mt-8 lg:min-h-0 lg:flex-1 lg:grid-cols-2">
          {/* silk divider between text and assets (vertical) */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-y-0 left-1/2 hidden w-px bg-white/[0.08] lg:block"
          />
          {/* Left: step text (scrolls inside the pinned section on desktop) */}
          <div className="relative lg:h-full lg:overflow-hidden">
            {/* static top/bottom fades (cheaper than a mask on a moving layer) */}
            <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 z-20 hidden h-6 bg-gradient-to-b from-[#121212] to-transparent lg:block" />
            <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 z-20 hidden h-10 bg-gradient-to-t from-[#121212] to-transparent lg:block" />
            {/* progress rail (desktop) */}
            <div aria-hidden className="absolute bottom-6 left-[15px] top-6 z-10 hidden w-px bg-white/[0.08] lg:block">
              <div
                ref={railRef}
                className="h-full w-px origin-top bg-orange-500"
                style={{ transform: `scaleY(${1 / steps.length})` }}
              />
            </div>

            <div ref={trackRef} className="will-change-transform lg:py-2">
              {steps.map((step, i) => {
                const isActive = i === active;
                return (
                  <div
                    key={step.id}
                    className="relative flex flex-col justify-center py-12 first:pt-0 lg:py-10 lg:pl-14 lg:pr-6 lg:first:pt-4"
                  >
                    {/* silk divider between steps (horizontal) */}
                    {i > 0 && (
                      <span
                        aria-hidden
                        className={`pointer-events-none absolute inset-x-0 top-0 h-px transition-colors duration-500 lg:left-14 ${
                          isActive
                            ? "bg-orange-500"
                            : "bg-white/[0.08]"
                        }`}
                      />
                    )}
                    {i < steps.length - 1 && isActive && (
                      <span
                        aria-hidden
                        className="pointer-events-none absolute inset-x-0 bottom-0 hidden h-px bg-orange-500 lg:left-14 lg:block"
                      />
                    )}
                    <div
                      className={`transition-opacity duration-500 ${
                        isActive ? "lg:opacity-100" : "lg:opacity-30"
                      }`}
                    >
                      <span className="font-mono text-[11px] uppercase tracking-wider text-orange-400 lg:hidden">
                        Step {i + 1} of {steps.length}
                      </span>

                      <h3 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-3xl lg:mt-0">
                        {step.title}
                      </h3>
                      <p className="mt-2 max-w-md text-sm leading-relaxed text-zinc-400 sm:text-base">
                        {step.description}
                      </p>

                      {step.points && (
                        <ul className="mt-3 space-y-1.5">
                          {step.points.map((p) => (
                            <li key={p} className="flex items-start gap-2.5 text-sm text-zinc-300">
                              <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-orange-500" />
                              {p}
                            </li>
                          ))}
                        </ul>
                      )}

                      {step.cta && (
                        <Link
                          href={step.cta.href}
                          className="group mt-5 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-xs font-medium text-black transition-colors hover:bg-zinc-200 sm:text-sm"
                        >
                          {step.cta.label}
                          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                        </Link>
                      )}
                    </div>

                    {/* Mobile / tablet: visual inline under each step */}
                    <div className="mt-6 lg:hidden">
                      <StepVisual visual={step.visual} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: visual that swaps with the active step (desktop) */}
          <div className="hidden min-h-0 items-center lg:flex">
            <div className="relative w-full origin-center [@media(max-height:820px)]:scale-[0.88] [@media(max-height:720px)]:scale-[0.78]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={steps[active]?.id}
                  initial={{ opacity: 0, y: 24, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -24, scale: 0.98 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                >
                  {/* caption ties this asset to its step */}
                  <div className="mb-4 flex items-center gap-3">
                    <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-orange-400">
                      {String(active + 1).padStart(2, "0")}
                    </span>
                    <span className="h-px w-8 bg-orange-500" />
                    <span className="text-xs font-medium text-zinc-300">{steps[active]?.title}</span>
                  </div>
                  <StepVisual visual={steps[active]?.visual} />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});
