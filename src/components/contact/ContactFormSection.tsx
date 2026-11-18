"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowRight, RotateCcw } from "lucide-react";
import { display, NOISE } from "@/components/about/shared";

const TOPICS = ["I'm a learner", "For my team", "Partnership", "Something else"] as const;
const TRACKS = ["Customer Service", "Tech Support", "IT Specialist", "Healthcare Support", "Not sure yet"] as const;

const inputCls =
  "w-full rounded-xl border border-white/[0.08] bg-black/40 px-4 py-3.5 text-base text-white placeholder:text-zinc-500 transition-colors focus:border-orange-500/70 focus:outline-none";

function Chips<T extends string>({
  options,
  value,
  onChange,
}: {
  options: readonly T[];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((o) => (
        <button
          key={o}
          type="button"
          onClick={() => onChange(o)}
          aria-pressed={value === o}
          className={`rounded-full border px-4 py-2 text-sm transition-colors ${
            value === o
              ? "border-orange-500 bg-orange-500 font-medium text-black"
              : "border-white/[0.08] text-zinc-300 hover:border-white/25 hover:text-white"
          }`}
        >
          {o}
        </button>
      ))}
    </div>
  );
}

export function ContactFormSection() {
  const [topic, setTopic] = useState<(typeof TOPICS)[number]>("I'm a learner");
  const [track, setTrack] = useState<(typeof TRACKS)[number]>("Not sure yet");
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const update = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setSending(true);
    // TODO: connect to the real contact endpoint (email service / CRM).
    setTimeout(() => {
      setSending(false);
      setSent(true);
    }, 600);
  };

  const reset = () => {
    setForm({ name: "", email: "", message: "" });
    setSent(false);
  };

  return (
    <section
      id="contact-form"
      className="w-full scroll-mt-24 bg-[#121212] px-6 py-12 text-white sm:px-10 sm:py-16 lg:px-16"
    >
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-3 lg:grid-cols-[1fr_1.5fr]">
        {/* Patricia card */}
        <div className="relative isolate flex min-h-[320px] flex-col overflow-hidden rounded-2xl bg-orange-500 p-6 text-black sm:p-8">
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10 opacity-40 mix-blend-soft-light"
            style={{ backgroundImage: NOISE, backgroundSize: "220px 220px" }}
          />
          <span className="inline-flex items-center gap-2 text-sm font-medium text-black/75">
            <span className="h-2 w-2 rounded-full border border-black/60" />
            Real Learning team
          </span>
          <h2 className={`${display.className} mt-5 text-2xl uppercase leading-[1.1] sm:text-3xl`}>
            {sent ? "Message received" : "Send us a message"}
          </h2>
          <p className="mt-3 max-w-xs text-base leading-relaxed text-black/75">
            {sent
              ? "Thanks for reaching out. We'll reply to the email you gave us."
              : "Tell us a little about you and what you need. A real person will read it."}
          </p>

          <div className="relative mt-auto h-56 w-full sm:h-64">
            <div key={sent ? "sent" : "idle"} className="pt-react-bounce absolute inset-0">
              <div className="pt-idle relative h-full w-full">
                <Image
                  src={sent ? "/images/patricia/pose-thumbs-up.png" : "/images/patricia/pose-wave.png"}
                  alt={sent ? "Patricia giving a thumbs up" : "Patricia waving"}
                  fill
                  sizes="240px"
                  className="object-contain object-bottom"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Form card */}
        <div className="rounded-2xl border border-white/[0.06] bg-[#181818] p-6 sm:p-8">
          {sent ? (
            <div className="flex h-full flex-col items-start justify-center gap-5 py-10">
              <p className={`${display.className} text-2xl uppercase leading-[1.15] sm:text-3xl`}>
                Thanks, {form.name.split(" ")[0]}!
              </p>
              <p className="max-w-md text-base leading-relaxed text-zinc-400">
                While you wait, why not try a simulation with Patricia?
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href="/demo"
                  className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-medium text-black transition-colors hover:bg-zinc-200"
                >
                  Try the demo
                  <ArrowRight className="h-4 w-4" />
                </a>
                <button
                  type="button"
                  onClick={reset}
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-3 text-sm text-white transition-colors hover:border-white/40"
                >
                  <RotateCcw className="h-4 w-4" />
                  Send another
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={submit} className="space-y-6">
              <div>
                <p className="mb-3 text-sm font-medium text-white">What&apos;s this about?</p>
                <Chips options={TOPICS} value={topic} onChange={setTopic} />
              </div>

              {(topic === "I'm a learner" || topic === "For my team") && (
                <div>
                  <p className="mb-3 text-sm font-medium text-white">Which career track?</p>
                  <Chips options={TRACKS} value={track} onChange={setTrack} />
                </div>
              )}

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-white">Name</span>
                  <input
                    required
                    value={form.name}
                    onChange={update("name")}
                    placeholder="Your name"
                    autoComplete="name"
                    className={inputCls}
                  />
                </label>
                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-white">Email</span>
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={update("email")}
                    placeholder="you@example.com"
                    autoComplete="email"
                    className={inputCls}
                  />
                </label>
              </div>

              <label className="block">
                <span className="mb-2 block text-sm font-medium text-white">Message</span>
                <textarea
                  required
                  rows={5}
                  value={form.message}
                  onChange={update("message")}
                  placeholder="How can we help?"
                  className={`${inputCls} resize-y`}
                />
              </label>

              <button
                type="submit"
                disabled={sending}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-orange-500 px-6 py-4 text-base font-semibold text-black transition-colors hover:bg-orange-400 disabled:opacity-60 sm:w-auto"
              >
                {sending ? "Sending..." : "Send message"}
                {!sending && <ArrowRight className="h-5 w-5" />}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
