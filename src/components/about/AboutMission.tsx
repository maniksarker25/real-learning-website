import { Check, X } from "lucide-react";
import { display, NOISE } from "./shared";

const OLD_WAY = [
  "Quizzes that test memory, not ability",
  "Reading about hard conversations instead of having them",
  "Generic advice that doesn't tell you what to do next",
  "Your first real attempt happens with a real customer",
];

const NEW_WAY = [
  "Short, realistic scenarios from your career track",
  "Patricia reacts to what you actually say",
  "Clear feedback on empathy, ownership and clarity",
  "Mistakes cost nothing, so you can try again",
];

export function AboutMission() {
  return (
    <section className="w-full bg-[#121212] px-6 py-16 text-white sm:px-10 sm:py-20 md:py-24 lg:px-16">
      <div className="mx-auto w-full max-w-7xl">
        <div className="mb-10 flex flex-col justify-between gap-6 sm:mb-12 md:flex-row md:items-end">
          <h2 className="max-w-2xl text-3xl font-semibold tracking-[-0.03em] sm:text-4xl lg:text-[44px] lg:leading-[1.1]">
            Why practice beats reading
          </h2>
          <p className="max-w-md text-sm leading-relaxed text-zinc-400 sm:text-base">
            Work asks you to respond in the moment. The only way to get good at
            that is to do it, somewhere safe, again and again.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
          {/* old way */}
          <div className="flex flex-col rounded-2xl border border-white/[0.06] bg-[#181818] p-6 sm:p-8">
            <span className="inline-flex items-center gap-2 text-xs font-medium text-zinc-400 sm:text-[13px]">
              <span className="h-2 w-2 rounded-full border border-zinc-500" />
              The old way
            </span>
            <h3 className={`${display.className} mt-6 text-xl uppercase leading-[1.15] text-zinc-300 sm:text-2xl`}>
              Read, memorise, hope
            </h3>
            <ul className="mt-8 space-y-4">
              {OLD_WAY.map((p) => (
                <li key={p} className="flex items-start gap-3 text-sm text-zinc-400 sm:text-base">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/[0.06]">
                    <X className="h-3 w-3 text-zinc-500" />
                  </span>
                  {p}
                </li>
              ))}
            </ul>
          </div>

          {/* real learning way */}
          <div className="relative isolate flex flex-col overflow-hidden rounded-2xl bg-orange-500 p-6 text-black sm:p-8">
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 -z-10 opacity-40 mix-blend-soft-light"
              style={{ backgroundImage: NOISE, backgroundSize: "220px 220px" }}
            />
            <span className="inline-flex items-center gap-2 text-xs font-medium text-black/75 sm:text-[13px]">
              <span className="h-2 w-2 rounded-full border border-black/60" />
              The Real Learning way
            </span>
            <h3 className={`${display.className} mt-6 text-xl uppercase leading-[1.15] sm:text-2xl`}>
              Practice, feedback, repeat
            </h3>
            <ul className="mt-8 space-y-4">
              {NEW_WAY.map((p) => (
                <li key={p} className="flex items-start gap-3 text-sm font-medium sm:text-base">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-black">
                    <Check className="h-3 w-3 text-white" />
                  </span>
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
