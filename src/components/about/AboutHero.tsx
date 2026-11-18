import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { blob, display, NOISE } from "./shared";

const HERO_BLOB = blob("#4c1d95", "#a78bfa", "#f97316", "#1e1b4b");

const MOODS = ["angry", "confused", "normal", "happy"];

export function AboutHero() {
  return (
    <section className="w-full bg-[#121212] px-6 pb-16 pt-32 text-white sm:px-10 sm:pb-20 sm:pt-40 lg:px-16">
      <div className="mx-auto w-full max-w-7xl">
        <p className="text-sm font-medium text-orange-400">About Real Learning</p>
        <h1
          className={`${display.className} mt-4 max-w-5xl text-4xl uppercase leading-[1.05] tracking-[-0.02em] sm:text-6xl lg:text-[76px]`}
        >
          Practice real careers before day one
        </h1>

        <div className="mt-8 flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <p className="max-w-xl text-base leading-relaxed text-zinc-400 sm:text-lg">
            We believe confidence at work comes from practice, not theory. So we
            built a safe place to rehearse the hard conversations, with an AI
            coach who reacts like a real person.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/get-started"
              className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-medium text-black transition-colors hover:bg-zinc-200"
            >
              Get started free
              <ArrowUpRight className="h-4 w-4" />
            </Link>
            <Link
              href="/demo"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-3 text-sm font-medium text-white transition-colors hover:border-white/40"
            >
              Try the demo
            </Link>
          </div>
        </div>

        {/* Visual */}
        <div className="relative isolate mt-12 overflow-hidden rounded-[28px] sm:mt-16 sm:rounded-[36px]">
          <span aria-hidden className="absolute inset-0 -z-20" style={{ background: HERO_BLOB }} />
          <span
            aria-hidden
            className="absolute inset-0 -z-10 opacity-40 mix-blend-soft-light"
            style={{ backgroundImage: NOISE, backgroundSize: "220px 220px" }}
          />

          <div className="grid items-end gap-8 px-6 pt-10 sm:px-12 sm:pt-12 lg:grid-cols-[1fr_auto_1fr] lg:px-14">
            <div className="pb-10 sm:pb-12">
              <p className={`${display.className} text-xl uppercase leading-[1.15] sm:text-2xl`}>
                Meet Patricia
              </p>
              <p className="mt-2 max-w-xs text-sm leading-relaxed text-white/80 sm:text-base">
                Your AI practice partner. She plays the customer, the colleague or
                the patient, and coaches you after.
              </p>
            </div>

            <div className="relative mx-auto h-[300px] w-[220px] sm:h-[380px] sm:w-[270px]">
              <span className="absolute bottom-1 left-1/2 h-3 w-40 -translate-x-1/2 rounded-[50%] bg-black/30 blur-md" />
              <div className="pt-idle relative h-full w-full">
                <Image
                  src="/images/patricia/full-body.png"
                  alt="Patricia, Real Learning's AI coach"
                  fill
                  priority
                  sizes="270px"
                  className="object-contain object-bottom"
                />
              </div>
            </div>

            <div className="hidden pb-12 lg:block">
              <p className="text-right text-sm text-white/80">She reacts to every reply</p>
              <div className="mt-3 flex justify-end gap-2">
                {MOODS.map((m) => (
                  <span
                    key={m}
                    className="relative block h-12 w-12 overflow-hidden rounded-xl bg-black/25 ring-1 ring-white/15"
                  >
                    <Image
                      src={`/images/patricia/${m}.png`}
                      alt={`Patricia ${m}`}
                      fill
                      sizes="48px"
                      className="object-cover object-top"
                    />
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
