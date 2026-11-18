"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Unbounded } from "next/font/google";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  Lightbulb,
  RotateCcw,
  SendHorizontal,
} from "lucide-react";
import { DEMO_SCENARIOS, type DemoScenario, type Mood } from "./scenarios";
import {
  evaluateReply,
  summarise,
  SKILL_LABELS,
  type ReplyEvaluation,
} from "./evaluate";

const display = Unbounded({ subsets: ["latin"], weight: ["600"], display: "swap" });

type Stage = "pick" | "chat" | "feedback";
type Message = { id: number; from: "patricia" | "user"; text: string };
type Reply = { text: string; evaluation: ReplyEvaluation };

const REPLIES_PER_SESSION = 3;

/** Soft "blob" mesh: three colour blobs over a base colour */
const blob = (base: string, a: string, b: string, c: string) =>
  [
    `radial-gradient(45% 55% at 18% 28%, ${a} 0%, transparent 70%)`,
    `radial-gradient(50% 60% at 85% 15%, ${b} 0%, transparent 70%)`,
    `radial-gradient(60% 55% at 65% 95%, ${c} 0%, transparent 72%)`,
    base,
  ].join(", ");

const SCENARIO_BLOBS: Record<string, string> = {
  "double-charge": blob("#9f1239", "#fb7185", "#f59e0b", "#4c0519"),
  "wifi-meeting": blob("#1e40af", "#60a5fa", "#f97316", "#172554"),
  "locked-out": blob("#4c1d95", "#a78bfa", "#ec4899", "#1e1b4b"),
  "appointment-delay": blob("#0f5f58", "#34d399", "#0ea5e9", "#052e2b"),
};

// Static film-grain texture (inline SVG, no image request, no JS)
const NOISE =
  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='220' height='220'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/><feColorMatrix type='saturate' values='0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")";

/* ------------------------------------------------------------------ */
/* Patricia avatar (expression changes with mood)                       */
/* ------------------------------------------------------------------ */
function Avatar({ mood, size }: { mood: Mood; size: number }) {
  return (
    <span
      className="relative block shrink-0 overflow-hidden rounded-full bg-orange-500/15 ring-1 ring-white/10"
      style={{ width: size, height: size }}
    >
      <Image
        src={`/images/patricia/${mood}.png`}
        alt={`Patricia looking ${mood}`}
        fill
        sizes={`${size}px`}
        className="object-cover object-top"
      />
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Stage 1: pick a scenario                                             */
/* ------------------------------------------------------------------ */
function PickStage({ onPick }: { onPick: (s: DemoScenario) => void }) {
  return (
    <div className="mx-auto w-full max-w-335">
      <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <div className="max-w-xl">
          <p className="text-sm font-medium text-orange-400">Free demo · no sign-up</p>
          <h1
            className={`${display.className} mt-3 text-3xl uppercase leading-[1.1] tracking-[-0.01em] text-white sm:text-4xl lg:text-[44px]`}
          >
            Try a real simulation
          </h1>
          <p className="mt-4 text-base leading-relaxed text-zinc-400 sm:text-lg">
            Pick a situation. Patricia plays the other person, you reply in your
            own words, and you get feedback at the end.
          </p>
        </div>

        <div className="flex items-center gap-4 rounded-2xl border border-white/[0.06] bg-[#181818] p-4 md:max-w-sm">
          <div className="relative h-20 w-16 shrink-0">
            <Image
              src="/images/patricia/pose-wave.png"
              alt="Patricia waving"
              fill
              sizes="64px"
              className="object-contain"
            />
          </div>
          <p className="text-sm leading-snug text-zinc-300">
            &ldquo;Hi, I&apos;m Patricia. Don&apos;t worry about getting it perfect.
            That&apos;s what practice is for.&rdquo;
          </p>
        </div>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {DEMO_SCENARIOS.map((s) => (
          <button
            key={s.id}
            type="button"
            onClick={() => onPick(s)}
            className="group relative isolate flex flex-col overflow-hidden rounded-2xl border border-white/[0.06] bg-[#181818] p-5 text-left transition-colors duration-500 hover:border-transparent sm:p-6"
          >
            {/* blob gradient (fades in on hover) */}
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              style={{ background: SCENARIO_BLOBS[s.id] }}
            />
            {/* grain */}
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 -z-10 opacity-[0.35] mix-blend-soft-light"
              style={{ backgroundImage: NOISE, backgroundSize: "220px 220px" }}
            />

            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-2 text-sm font-medium text-zinc-400 transition-colors duration-500 group-hover:text-white/85">
                <span className="h-2 w-2 rounded-full border border-zinc-500 transition-colors duration-500 group-hover:border-white/80" />
                {s.track}
              </span>
              <span className="text-xs text-zinc-500 transition-colors duration-500 group-hover:text-white/70">
                {s.minutes}
              </span>
            </div>

            <div className="mt-8 flex items-end justify-between gap-4">
              <div>
                <h2
                  className={`${display.className} text-xl uppercase leading-[1.15] text-white sm:text-2xl`}
                >
                  {s.title}
                </h2>
                <p className="mt-3 text-base text-zinc-400 transition-colors duration-500 group-hover:text-white/80">
                  Patricia plays:{" "}
                  <span className="text-zinc-200 transition-colors duration-500 group-hover:text-white">
                    {s.role}
                  </span>
                </p>
                <p className="mt-1 text-base text-zinc-500 transition-colors duration-500 group-hover:text-white/70">
                  {s.goal}
                </p>
              </div>
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/[0.06] text-zinc-300 transition-colors duration-500 group-hover:bg-white group-hover:text-black">
                <ArrowRight className="h-4 w-4" />
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Stage 2: chat                                                        */
/* ------------------------------------------------------------------ */
type Reaction = "idle" | "shake" | "bounce" | "tilt";

/** How Patricia's full body reacts to each mood */
const MOOD_STAGE: Record<
  Mood,
  { pose: string; fx?: string; label: string; reaction: Reaction; calm: number }
> = {
  normal: { pose: "full-body", label: "Listening", reaction: "idle", calm: 60 },
  happy: { pose: "pose-thumbs-up", fx: "fx-sparkles", label: "Pleased", reaction: "bounce", calm: 85 },
  excited: { pose: "pose-pointing", fx: "fx-sparkles", label: "Delighted", reaction: "bounce", calm: 95 },
  angry: { pose: "pose-cross-arms", fx: "fx-anger", label: "Frustrated", reaction: "shake", calm: 15 },
  sad: { pose: "pose-cross-arms", fx: "fx-scribble", label: "Upset", reaction: "tilt", calm: 25 },
  confused: { pose: "pose-thinking", fx: "fx-question", label: "Confused", reaction: "tilt", calm: 40 },
  surprised: { pose: "full-body", fx: "fx-exclaim", label: "Panicking", reaction: "shake", calm: 20 },
  thinking: { pose: "pose-thinking", fx: "fx-speech", label: "Thinking", reaction: "idle", calm: 55 },
};

const POSE_SRC = (name: string) => `/images/patricia/${name}.png`;

function PatriciaStage({
  scenario,
  mood,
  typing,
}: {
  scenario: DemoScenario;
  mood: Mood;
  typing: boolean;
}) {
  const shown = typing ? MOOD_STAGE.thinking : MOOD_STAGE[mood];
  const meter = MOOD_STAGE[mood];
  const reactKey = typing ? "typing" : mood;

  return (
    <div className="relative isolate hidden flex-col overflow-hidden rounded-2xl border border-white/[0.06] bg-[#181818] p-5 sm:p-6 lg:flex">
      {/* scenario colour wash + grain */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-40"
        style={{ background: SCENARIO_BLOBS[scenario.id] }}
      />
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.35] mix-blend-soft-light"
        style={{ backgroundImage: NOISE, backgroundSize: "220px 220px" }}
      />

      <div className="flex items-start justify-between gap-3">
        <div>
          <span className="inline-flex items-center gap-2 text-xs font-medium text-white/70 sm:text-sm">
            <span className="h-2 w-2 rounded-full border border-white/60" />
            {scenario.track}
          </span>
          <p className={`${display.className} mt-2 text-lg uppercase leading-[1.15] text-white sm:text-xl`}>
            Patricia
          </p>
          <p className="text-sm text-white/70 sm:text-base">as {scenario.role}</p>
        </div>
        <span className="rounded-full bg-black/40 px-3 py-1 text-xs font-medium text-white sm:text-sm">
          {typing ? "Typing..." : shown.label}
        </span>
      </div>

      {/* character */}
      <div className="relative flex flex-1 items-end justify-center py-4">
        {/* floor shadow */}
        <span className="absolute bottom-4 left-1/2 h-4 w-40 -translate-x-1/2 rounded-[50%] bg-black/40 blur-md" />
        <div className="pt-idle relative">
          <div key={reactKey} className={`pt-react-${shown.reaction} relative h-[220px] w-[160px] sm:h-[300px] sm:w-[200px] lg:h-[min(46vh,400px)] lg:w-[260px]`}>
            <Image
              src={POSE_SRC(shown.pose)}
              alt={`Patricia, ${shown.label.toLowerCase()}`}
              fill
              unoptimized
              priority
              className="object-contain object-bottom"
            />
            {shown.fx && (
              <span className="pt-fx absolute -right-4 top-0 block h-14 w-14 sm:h-16 sm:w-16">
                <span className="pt-fx-float relative block h-full w-full">
                  <Image src={POSE_SRC(shown.fx)} alt="" fill unoptimized className="object-contain" />
                </span>
              </span>
            )}
          </div>
        </div>
      </div>

      {/* mood meter */}
      <div>
        <div className="mb-2 flex justify-between text-xs font-medium text-white/70 sm:text-sm">
          <span>Upset</span>
          <span>Calm</span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-black/40">
          <div
            className="h-full rounded-full bg-white transition-[width] duration-700 ease-out"
            style={{ width: `${meter.calm}%` }}
          />
        </div>
        <p className="mt-3 text-sm text-white/80 sm:text-base">
          <span className="font-semibold text-white">Your goal:</span> {scenario.goal}
        </p>
      </div>
    </div>
  );
}

function ChatStage({
  scenario,
  onBack,
  onFinish,
}: {
  scenario: DemoScenario;
  onBack: () => void;
  onFinish: (replies: Reply[]) => void;
}) {
  const [messages, setMessages] = useState<Message[]>([
    { id: 0, from: "patricia", text: scenario.opening.text },
  ]);
  const [replies, setReplies] = useState<Reply[]>([]);
  const [mood, setMood] = useState<Mood>(scenario.opening.mood);
  const [typing, setTyping] = useState(false);
  const [input, setInput] = useState("");
  const [tip, setTip] = useState<ReplyEvaluation["tip"] | null>(null);

  const listRef = useRef<HTMLDivElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const turn = replies.length;
  const done = turn >= REPLIES_PER_SESSION && !typing;

  // Preload every pose + sticker so mood changes swap instantly
  useEffect(() => {
    const names = new Set<string>();
    Object.values(MOOD_STAGE).forEach((s) => {
      names.add(s.pose);
      if (s.fx) names.add(s.fx);
    });
    names.forEach((n) => {
      const img = new window.Image();
      img.src = POSE_SRC(n);
    });
  }, []);

  useEffect(() => {
    const el = listRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [messages, typing]);

  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );

  const send = useCallback(
    (raw: string) => {
      const text = raw.trim();
      if (!text || typing || turn >= REPLIES_PER_SESSION) return;

      const evaluation = evaluateReply(text);
      const next = scenario.turns[turn];
      const response = evaluation.good ? next.good : next.weak;

      setMessages((m) => [...m, { id: Date.now(), from: "user", text }]);
      setReplies((r) => [...r, { text, evaluation }]);
      setTip(evaluation.tip);
      setInput("");
      setTyping(true);

      timer.current = setTimeout(() => {
        setMessages((m) => [...m, { id: Date.now() + 1, from: "patricia", text: response.text }]);
        setMood(response.mood);
        setTyping(false);
      }, 1300);
    },
    [scenario, turn, typing],
  );

  const suggestions = !done && !typing ? scenario.suggestions[turn] ?? [] : [];

  return (
    <div className="mx-auto grid w-full max-w-335 grid-cols-1 gap-3 lg:h-[calc(100dvh-7.5rem)] lg:min-h-[640px] lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
      <PatriciaStage scenario={scenario} mood={mood} typing={typing} />

      <div className="flex h-[calc(100dvh-7.5rem)] min-h-[480px] flex-col overflow-hidden rounded-2xl border border-white/[0.06] bg-[#161616] lg:h-auto lg:min-h-0">
        {/* header */}
        <div className="flex items-center gap-3 border-b border-white/[0.06] px-4 py-4 sm:px-6">
          <button
            type="button"
            onClick={onBack}
            aria-label="Choose another scenario"
            className="flex h-9 w-9 items-center justify-center rounded-full text-zinc-400 transition-colors hover:bg-white/[0.06] hover:text-white"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          {/* mobile: compact Patricia in place of the character stage */}
          <span className="lg:hidden">
            <Avatar mood={typing ? "thinking" : mood} size={40} />
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-base font-semibold text-white sm:text-lg">{scenario.title}</p>
            <p className="truncate text-sm text-zinc-500">
              Reply {Math.min(turn + 1, REPLIES_PER_SESSION)} of {REPLIES_PER_SESSION}
              <span className="lg:hidden">
                {" "}· Patricia is {typing ? "typing..." : MOOD_STAGE[mood].label.toLowerCase()}
              </span>
            </p>
          </div>
          <div className="hidden items-center gap-1.5 sm:flex">
            {Array.from({ length: REPLIES_PER_SESSION }).map((_, i) => (
              <span
                key={i}
                className={`h-1.5 w-7 rounded-full transition-colors duration-300 ${
                  i < turn ? "bg-orange-500" : "bg-white/10"
                }`}
              />
            ))}
          </div>
        </div>

        {/* messages */}
        <div ref={listRef} data-lenis-prevent className="flex-1 space-y-4 overflow-y-auto px-4 py-6 sm:px-6">
          {messages.map((m) =>
            m.from === "patricia" ? (
              <div key={m.id} className="flex items-end gap-3">
                <Avatar mood={mood} size={36} />
                <div className="max-w-[78%] rounded-2xl rounded-bl-sm bg-white/[0.06] px-4 py-3 text-[15px] leading-relaxed text-zinc-100 sm:px-5 sm:text-base lg:text-[17px]">
                  {m.text}
                </div>
              </div>
            ) : (
              <div key={m.id} className="flex justify-end">
                <div className="max-w-[78%] rounded-2xl rounded-br-sm bg-orange-500 px-4 py-3 text-[15px] leading-relaxed text-black sm:px-5 sm:text-base lg:text-[17px]">
                  {m.text}
                </div>
              </div>
            ),
          )}

          {typing && (
            <div className="flex items-end gap-3">
              <Avatar mood="thinking" size={36} />
              <div className="flex gap-1.5 rounded-2xl rounded-bl-sm bg-white/[0.06] px-5 py-4">
                {[0, 150, 300].map((d) => (
                  <span
                    key={d}
                    className="h-2 w-2 animate-bounce rounded-full bg-zinc-400"
                    style={{ animationDelay: `${d}ms` }}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* live coaching tip */}
        {tip && (
          <div className="mx-4 mb-3 flex items-center gap-2.5 rounded-xl border border-white/[0.06] bg-white/[0.03] px-4 py-3 sm:mx-6">
            {tip.kind === "praise" ? (
              <Check className="h-4 w-4 shrink-0 text-orange-400" />
            ) : (
              <Lightbulb className="h-4 w-4 shrink-0 text-orange-400" />
            )}
            <p className="text-sm text-zinc-300 sm:text-[15px]">
              <span className="font-semibold text-white">Coach tip:</span> {tip.text}
            </p>
          </div>
        )}

        {/* input / finish */}
        <div className="border-t border-white/[0.06] p-4 sm:p-5">
          {done ? (
            <button
              type="button"
              onClick={() => onFinish(replies)}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-orange-500 py-4 text-base font-semibold text-black transition-colors hover:bg-orange-400"
            >
              See your feedback
              <ArrowRight className="h-5 w-5" />
            </button>
          ) : (
            <>
              {suggestions.length > 0 && (
                <div className="mb-3">
                  <p className="mb-2 text-xs font-medium uppercase tracking-wider text-zinc-500">
                    Or pick a reply
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {suggestions.map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => send(s)}
                        className="rounded-xl border border-white/[0.08] px-4 py-2.5 text-left text-sm text-zinc-200 transition-colors hover:border-orange-500/60 hover:text-white sm:text-[15px]"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  send(input);
                }}
                className="flex items-end gap-2 rounded-xl border border-white/[0.08] bg-black/40 p-2 pl-4 focus-within:border-orange-500/60"
              >
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      send(input);
                    }
                  }}
                  rows={1}
                  disabled={typing}
                  placeholder={typing ? "Patricia is typing..." : "Write your reply in your own words..."}
                  className="max-h-36 min-h-[44px] flex-1 resize-none bg-transparent py-2.5 text-base text-white placeholder:text-zinc-500 focus:outline-none disabled:opacity-60"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || typing}
                  aria-label="Send reply"
                  className="flex h-11 w-11 items-center justify-center rounded-lg bg-orange-500 text-black transition-colors hover:bg-orange-400 disabled:bg-white/10 disabled:text-zinc-500"
                >
                  <SendHorizontal className="h-5 w-5" />
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Stage 3: feedback                                                    */
/* ------------------------------------------------------------------ */
function FeedbackStage({
  scenario,
  replies,
  onRetry,
  onPickAnother,
}: {
  scenario: DemoScenario;
  replies: Reply[];
  onRetry: () => void;
  onPickAnother: () => void;
}) {
  const summary = useMemo(() => summarise(replies), [replies]);
  const mood: Mood = summary.overall >= 80 ? "excited" : summary.overall >= 60 ? "happy" : "thinking";
  const headline =
    summary.overall >= 80 ? "Excellent work" : summary.overall >= 60 ? "Solid start" : "Good first try";

  const r = 52;
  const c = 2 * Math.PI * r;

  return (
    <div className="mx-auto w-full max-w-335">
      <div className="grid grid-cols-1 gap-3 lg:grid-cols-[1.1fr_1fr]">
        {/* score */}
        <div className="rounded-2xl border border-white/[0.06] bg-[#181818] p-6 sm:p-8">
          <p className="text-xs font-medium text-zinc-400">
            {scenario.track} · {scenario.title}
          </p>
          <div className="mt-6 flex items-center gap-6">
            <div className="relative h-32 w-32 shrink-0">
              <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90">
                <circle cx="60" cy="60" r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="9" />
                <circle
                  cx="60"
                  cy="60"
                  r={r}
                  fill="none"
                  stroke="#f97316"
                  strokeWidth="9"
                  strokeLinecap="round"
                  strokeDasharray={c}
                  strokeDashoffset={c * (1 - summary.overall / 100)}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className={`${display.className} text-3xl text-white`}>{summary.overall}</span>
                <span className="text-[10px] uppercase tracking-wider text-zinc-500">out of 100</span>
              </div>
            </div>
            <div>
              <h1 className={`${display.className} text-2xl uppercase leading-[1.1] text-white sm:text-3xl`}>
                {headline}
              </h1>
              <p className="mt-2 text-sm text-zinc-400">
                Strongest skill:{" "}
                <span className="text-white">{SKILL_LABELS[summary.strongest]}</span>
              </p>
            </div>
          </div>

          <div className="mt-8 space-y-4">
            {summary.skills.map((s) => (
              <div key={s.key}>
                <div className="mb-2 flex justify-between text-base">
                  <span className="text-zinc-300">{s.label}</span>
                  <span className="font-mono text-zinc-500">{s.score}</span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
                  <div className="h-full rounded-full bg-orange-500" style={{ width: `${s.score}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* coaching */}
        <div className="flex flex-col gap-3">
          <div className="flex items-start gap-4 rounded-2xl border border-white/[0.06] bg-[#181818] p-6">
            <Avatar mood={mood} size={56} />
            <div>
              <p className="text-sm font-semibold text-white">Patricia&apos;s note</p>
              <p className="mt-1 text-base leading-relaxed text-zinc-400">
                Next time, focus on{" "}
                <span className="text-white">{SKILL_LABELS[summary.weakest].toLowerCase()}</span>.{" "}
                {summary.improveTip}
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-white/[0.06] bg-[#181818] p-6">
            <p className="text-xs font-medium text-zinc-400">Your best reply</p>
            <p className="mt-2 text-base leading-relaxed text-zinc-200 sm:text-lg">&ldquo;{summary.bestReply}&rdquo;</p>
          </div>

          <div className="flex flex-1 flex-col justify-between rounded-2xl bg-orange-500 p-6 text-black">
            <div>
              <p className={`${display.className} text-lg uppercase leading-[1.15]`}>Keep your progress</p>
              <p className="mt-2 text-sm text-black/75">
                Create a free account to save scores and unlock full career tracks.
              </p>
            </div>
            <Link
              href="/get-started"
              className="mt-5 inline-flex items-center justify-center gap-2 self-start rounded-full bg-black px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-zinc-800"
            >
              Get started free
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        <button
          type="button"
          onClick={onRetry}
          className="inline-flex items-center gap-2 rounded-full border border-white/10 px-5 py-2.5 text-sm text-zinc-200 transition-colors hover:border-white/25"
        >
          <RotateCcw className="h-4 w-4" />
          Try this one again
        </button>
        <button
          type="button"
          onClick={onPickAnother}
          className="inline-flex items-center gap-2 rounded-full border border-white/10 px-5 py-2.5 text-sm text-zinc-200 transition-colors hover:border-white/25"
        >
          Try another scenario
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Page shell                                                           */
/* ------------------------------------------------------------------ */
export default function DemoExperience() {
  const [stage, setStage] = useState<Stage>("pick");
  const [scenario, setScenario] = useState<DemoScenario>(DEMO_SCENARIOS[0]);
  const [replies, setReplies] = useState<Reply[]>([]);
  const [session, setSession] = useState(0);

  const start = (s: DemoScenario) => {
    setScenario(s);
    setReplies([]);
    setSession((n) => n + 1);
    setStage("chat");
    window.scrollTo({ top: 0 });
  };

  return (
    <div className="min-h-dvh bg-[#121212] text-white">
      <header className="mx-auto flex w-full max-w-335 items-center justify-between px-5 py-4 sm:px-8">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 py-2 pl-2.5 pr-4 text-sm text-zinc-300 transition-colors hover:border-white/30 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>
              <span className="hidden sm:inline">Back to </span>home
            </span>
          </Link>
          <Link href="/" className="hidden items-center gap-2.5 sm:flex" aria-label="Real Learning home">
            <span className="relative block h-8 w-8 overflow-hidden rounded-lg bg-white">
              <Image src="/icons/brand-mark.png" alt="" fill sizes="32px" className="object-contain p-0.5" />
            </span>
            <span className="text-sm font-semibold tracking-tight text-white">Real Learning</span>
          </Link>
        </div>
        <Link
          href="/get-started"
          className="rounded-full bg-white px-4 py-2 text-xs font-medium text-black transition-colors hover:bg-zinc-200 sm:text-sm"
        >
          Get started free
        </Link>
      </header>

      <main className="px-4 pb-10 pt-4 sm:px-8 sm:pt-8">
        {stage === "pick" && <PickStage onPick={start} />}
        {stage === "chat" && (
          <ChatStage
            key={session}
            scenario={scenario}
            onBack={() => setStage("pick")}
            onFinish={(r) => {
              setReplies(r);
              setStage("feedback");
              window.scrollTo({ top: 0 });
            }}
          />
        )}
        {stage === "feedback" && (
          <FeedbackStage
            scenario={scenario}
            replies={replies}
            onRetry={() => start(scenario)}
            onPickAnother={() => setStage("pick")}
          />
        )}
      </main>
    </div>
  );
}
