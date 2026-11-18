import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { blob, display, NOISE } from "@/components/about/shared";

const ROUTES = [
  {
    tag: "Learners",
    title: "I want to practice",
    text: "Try a simulation now. No sign-up needed.",
    href: "/demo",
    image: "/images/patricia/pose-pointing.png",
    blob: blob("#9f1239", "#fb7185", "#f59e0b", "#4c0519"),
  },
  {
    tag: "Teams",
    title: "I'm training a team",
    text: "Set up seats, classes and reporting.",
    href: "/onboarding/organization",
    image: "/images/patricia/pose-cross-arms.png",
    blob: blob("#1e40af", "#60a5fa", "#f97316", "#172554"),
  },
  {
    tag: "Anything else",
    title: "Send us a message",
    text: "Questions, ideas or partnerships.",
    href: "#contact-form",
    image: "/images/patricia/pose-wave.png",
    blob: blob("#0f5f58", "#34d399", "#0ea5e9", "#052e2b"),
  },
];

export function ContactHero() {
  return (
    <section className="w-full bg-[#121212] px-6 pb-12 pt-32 text-white sm:px-10 sm:pb-16 sm:pt-40 lg:px-16">
      <div className="mx-auto w-full max-w-7xl">
        <p className="text-sm font-medium text-orange-400">Contact</p>
        <h1
          className={`${display.className} mt-4 text-4xl uppercase leading-[1.05] tracking-[-0.02em] sm:text-6xl lg:text-[76px]`}
        >
          Let&apos;s talk
        </h1>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-zinc-400 sm:text-lg">
          Pick the option that fits you best, or send us a message and the Real
          Learning team will get back to you.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-3 sm:mt-12 md:grid-cols-3">
          {ROUTES.map((r) => (
            <Link
              key={r.title}
              href={r.href}
              className="group relative isolate flex min-h-[220px] overflow-hidden rounded-2xl border border-white/[0.06] bg-[#181818] p-6 transition-colors duration-500 hover:border-transparent"
            >
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{ background: r.blob }}
              />
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 -z-10 opacity-[0.35] mix-blend-soft-light"
                style={{ backgroundImage: NOISE, backgroundSize: "220px 220px" }}
              />

              <div className="flex flex-1 flex-col">
                <span className="inline-flex items-center gap-2 text-xs font-medium text-zinc-400 transition-colors duration-500 group-hover:text-white/85 sm:text-[13px]">
                  <span className="h-2 w-2 rounded-full border border-zinc-500 transition-colors duration-500 group-hover:border-white/80" />
                  {r.tag}
                </span>
                <h2 className={`${display.className} mt-auto text-lg uppercase leading-[1.15] sm:text-xl`}>
                  {r.title}
                </h2>
                <p className="mt-2 text-sm text-zinc-400 transition-colors duration-500 group-hover:text-white/80">
                  {r.text}
                </p>
              </div>

              <div className="flex shrink-0 flex-col items-end justify-between">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/[0.06] text-zinc-300 transition-colors duration-500 group-hover:bg-white group-hover:text-black">
                  <ArrowUpRight className="h-4 w-4" />
                </span>
                <span className="relative block h-28 w-20">
                  <Image src={r.image} alt="" fill sizes="80px" className="object-contain object-bottom" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
