"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { blob, display, NOISE } from "@/components/about/shared";

const SLIDES = [
  {
    id: "practice",
    title: "Practice real work moments",
    description: "Step into customer, support, IT and healthcare situations with Patricia.",
    image: "/images/patricia/pose-pointing.png",
    blob: blob("#9f1239", "#fb7185", "#f59e0b", "#4c0519"),
  },
  {
    id: "feedback",
    title: "Feedback you can act on",
    description: "Get scored on empathy, ownership and clarity after every session.",
    image: "/images/patricia/pose-thumbs-up.png",
    blob: blob("#0f5f58", "#34d399", "#0ea5e9", "#052e2b"),
  },
  {
    id: "teams",
    title: "Train your whole team",
    description: "Give your team seats, classes and one place to follow progress.",
    image: "/images/patricia/pose-cross-arms.png",
    blob: blob("#1e40af", "#60a5fa", "#a78bfa", "#172554"),
  },
];

/** Blob + Patricia slider used on the sign-up and log-in screens (desktop only). */
export function AuthShowcase() {
  const [slide, setSlide] = useState(0);
  const current = SLIDES[slide];
  const prev = () => setSlide((i) => (i === 0 ? SLIDES.length - 1 : i - 1));
  const next = () => setSlide((i) => (i === SLIDES.length - 1 ? 0 : i + 1));

  return (
    <div className="relative isolate hidden min-h-[560px] flex-col overflow-hidden rounded-[28px] p-8 lg:flex lg:p-10">
      <span
        aria-hidden
        className="absolute inset-0 -z-20 transition-[background] duration-700"
        style={{ background: current.blob }}
      />
      <span
        aria-hidden
        className="absolute inset-0 -z-10 opacity-40 mix-blend-soft-light"
        style={{ backgroundImage: NOISE, backgroundSize: "220px 220px" }}
      />

      <span className="inline-flex items-center gap-2 text-sm font-medium text-white/80">
        <span className="h-2 w-2 rounded-full border border-white/70" />
        {String(slide + 1).padStart(2, "0")} / {String(SLIDES.length).padStart(2, "0")}
      </span>

      <div className="relative flex flex-1 items-end justify-center py-6">
        <span className="absolute bottom-6 left-1/2 h-3 w-40 -translate-x-1/2 rounded-[50%] bg-black/30 blur-md" />
        <div key={current.id} className="pt-react-idle pt-idle relative h-[300px] w-[210px]">
          <Image
            src={current.image}
            alt="Patricia"
            fill
            priority
            sizes="210px"
            className="object-contain object-bottom"
          />
        </div>
      </div>

      <div key={`t-${current.id}`} className="pt-react-idle">
        <h2 className={`${display.className} text-3xl uppercase leading-[1.08] tracking-[-0.01em]`}>
          {current.title}
        </h2>
        <p className="mt-3 max-w-sm text-base leading-relaxed text-white/80">{current.description}</p>
      </div>

      <div className="mt-8 flex items-center justify-between border-t border-white/15 pt-6">
        <div className="flex items-center gap-1.5">
          {SLIDES.map((s, i) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setSlide(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-1.5 rounded-full transition-all ${
                slide === i ? "w-7 bg-white" : "w-2 bg-white/30 hover:bg-white/60"
              }`}
            />
          ))}
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={prev}
            aria-label="Previous slide"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-black/25 text-white transition-colors hover:bg-black/40"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="Next slide"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-black/25 text-white transition-colors hover:bg-black/40"
          >
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
