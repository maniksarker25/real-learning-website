import Image from "next/image";
import { blob, display, NOISE } from "./shared";

const VALUES = [
  {
    title: "Practice over theory",
    text: "Reading about a tough call isn't the same as handling one. We put you in the conversation.",
    image: "/images/patricia/pose-pointing.png",
    blob: blob("#9f1239", "#fb7185", "#f59e0b", "#4c0519"),
  },
  {
    title: "Safe to fail",
    text: "No real customer, no real stakes. Get it wrong, learn why, and try again.",
    image: "/images/patricia/pose-thumbs-up.png",
    blob: blob("#0f5f58", "#34d399", "#0ea5e9", "#052e2b"),
  },
  {
    title: "Real situations",
    text: "Scenarios come from what people actually face in service, support, IT and healthcare.",
    image: "/images/patricia/pose-cross-arms.png",
    blob: blob("#1e40af", "#60a5fa", "#f97316", "#172554"),
  },
  {
    title: "Feedback you can use",
    text: "Not a vague grade. Skill scores and one clear thing to do better next time.",
    image: "/images/patricia/pose-thinking.png",
    blob: blob("#4c1d95", "#a78bfa", "#ec4899", "#1e1b4b"),
  },
];

export function AboutValues() {
  return (
    <section className="w-full bg-[#121212] px-6 py-16 text-white sm:px-10 sm:py-20 md:py-24 lg:px-16">
      <div className="mx-auto w-full max-w-7xl">
        <div className="mb-10 max-w-2xl sm:mb-12">
          <h2 className="text-3xl font-semibold tracking-[-0.03em] sm:text-4xl lg:text-[44px] lg:leading-[1.1]">
            What we believe
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-zinc-400 sm:text-base">
            Four ideas behind everything we build.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {VALUES.map((v, i) => (
            <div
              key={v.title}
              className="group relative isolate flex min-h-[300px] overflow-hidden rounded-2xl border border-white/[0.06] bg-[#181818] p-6 transition-colors duration-500 hover:border-transparent sm:p-7"
            >
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{ background: v.blob }}
              />
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 -z-10 opacity-[0.35] mix-blend-soft-light"
                style={{ backgroundImage: NOISE, backgroundSize: "220px 220px" }}
              />

              <div className="flex flex-1 flex-col">
                <span className="inline-flex items-center gap-2 text-xs font-medium text-zinc-400 transition-colors duration-500 group-hover:text-white/85 sm:text-[13px]">
                  <span className="h-2 w-2 rounded-full border border-zinc-500 transition-colors duration-500 group-hover:border-white/80" />
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3
                  className={`${display.className} mt-auto text-xl uppercase leading-[1.15] tracking-[-0.01em] text-white sm:text-[22px]`}
                >
                  {v.title}
                </h3>
                <p className="mt-2 max-w-[30ch] text-sm leading-relaxed text-zinc-400 transition-colors duration-500 group-hover:text-white/80 sm:text-[15px]">
                  {v.text}
                </p>
              </div>

              <div className="relative ml-4 hidden w-28 shrink-0 self-stretch sm:block lg:w-36">
                <Image
                  src={v.image}
                  alt=""
                  fill
                  sizes="144px"
                  className="object-contain object-bottom"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
