import { memo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Unbounded } from "next/font/google";
import { ArrowRight, ArrowUpRight, Lightbulb } from "lucide-react";

// Same display face as the bento card titles
const display = Unbounded({ subsets: ["latin"], weight: ["600"], display: "swap" });

const TRACKS = ["Customer Service", "Tech Support", "IT Specialist", "Healthcare Support"];

const MOODS = [
  { src: "/images/patricia/angry.png", label: "Frustrated" },
  { src: "/images/patricia/confused.png", label: "Unsure" },
  { src: "/images/patricia/normal.png", label: "Listening" },
  { src: "/images/patricia/happy.png", label: "Pleased" },
];

function Card({
  tag,
  title,
  text,
  children,
}: {
  tag: string;
  title: string;
  text: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-[320px] flex-col justify-between rounded-2xl border border-white/[0.06] bg-[#181818] p-6 sm:p-7">
      <div>
        <span className="inline-flex items-center gap-2 text-xs font-medium text-zinc-400 sm:text-[13px]">
          <span className="h-2 w-2 rounded-full border border-zinc-500" />
          {tag}
        </span>
        <h3
          className={`${display.className} mt-6 text-xl uppercase leading-[1.15] tracking-[-0.01em] text-white sm:text-[22px]`}
        >
          {title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-zinc-400 sm:text-[15px]">{text}</p>
      </div>
      <div className="mt-8">{children}</div>
    </div>
  );
}

export const ConnectAgentSection = memo(function ConnectAgentSection() {
  return (
    <section
      id="meet-patricia"
      className="relative w-full bg-[#121212] px-6 py-16 text-white sm:px-10 sm:py-20 md:py-24 lg:px-16"
    >
      <div className="mx-auto w-full max-w-7xl">
        {/* Header */}
        <div className="mb-10 flex flex-col justify-between gap-6 sm:mb-12 sm:flex-row sm:items-end">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-semibold tracking-[-0.03em] sm:text-4xl lg:text-[44px] lg:leading-[1.1]">
              Meet Patricia, your practice partner
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-zinc-400 sm:text-base">
              Real work moments, a coach who reacts, and feedback you can use.
            </p>
          </div>

          <Link
            href="/demo"
            className="inline-flex shrink-0 items-center gap-2 self-start rounded-full bg-white px-5 py-2.5 text-sm font-medium text-black transition-colors hover:bg-zinc-200 sm:self-auto"
          >
            Try a free simulation
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
          {/* 1: real situations */}
          <Card
            tag="Practice"
            title="Real work moments"
            text="Rehearse the conversations your career track actually throws at you."
          >
            <div className="flex flex-wrap gap-2">
              {TRACKS.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-white/[0.08] bg-black/40 px-3 py-1.5 text-xs text-zinc-300 sm:text-[13px]"
                >
                  {t}
                </span>
              ))}
            </div>
          </Card>

          {/* 2: Patricia reacts */}
          <Card
            tag="Coach"
            title="She reacts to you"
            text="Patricia's mood shifts with every reply, just like a real person would."
          >
            <div className="flex items-center gap-1.5 sm:gap-2">
              {MOODS.map((m, i) => (
                <div key={m.label} className="flex items-center gap-1.5 sm:gap-2">
                  <div className="flex flex-col items-center gap-1.5">
                    <span className="relative block h-11 w-11 overflow-hidden rounded-xl bg-orange-500/15 ring-1 ring-white/10 sm:h-12 sm:w-12">
                      <Image
                        src={m.src}
                        alt={`Patricia ${m.label.toLowerCase()}`}
                        fill
                        sizes="48px"
                        className="object-cover object-top"
                      />
                    </span>
                    <span className="text-[10px] text-zinc-500 sm:text-[11px]">{m.label}</span>
                  </div>
                  {i < MOODS.length - 1 && (
                    <ArrowRight className="mb-5 h-3 w-3 shrink-0 text-zinc-600" />
                  )}
                </div>
              ))}
            </div>
          </Card>

          {/* 3: feedback */}
          <Card
            tag="Feedback"
            title="Know what to fix"
            text="Every session ends with skill scores and one clear thing to improve."
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between rounded-xl border border-white/[0.08] bg-black/40 px-4 py-3">
                <span className="text-xs text-zinc-300 sm:text-[13px]">Empathy</span>
                <div className="flex items-center gap-3">
                  <span className="h-1.5 w-20 overflow-hidden rounded-full bg-white/[0.08]">
                    <span className="block h-full w-[88%] rounded-full bg-orange-500" />
                  </span>
                  <span className="font-mono text-xs text-zinc-400">88</span>
                </div>
              </div>
              <div className="flex items-start gap-2.5 rounded-xl border border-white/[0.08] bg-black/40 px-4 py-3 text-xs leading-relaxed text-zinc-200 sm:text-[13px]">
                <Lightbulb className="mt-0.5 h-3.5 w-3.5 shrink-0 text-orange-400" />
                <span>
                  <span className="font-semibold text-white">Coach tip:</span> give the customer a
                  clear time frame.
                </span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
});

export default ConnectAgentSection;
