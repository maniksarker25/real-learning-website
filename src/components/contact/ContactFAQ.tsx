import { Plus } from "lucide-react";

const FAQS = [
  {
    q: "Is Real Learning free to start?",
    a: "Yes. You can try a simulation on the demo page without signing up, and create a free account when you want to save your progress.",
  },
  {
    q: "Which careers can I practice for?",
    a: "There are four tracks today: Customer Service, Technical Support, IT Specialist and Healthcare Support. Each one is built from situations people really face in that job.",
  },
  {
    q: "Who is Patricia?",
    a: "Patricia is your AI practice partner. In a simulation she plays the other person, like a frustrated customer or an anxious patient, and her mood changes with how you respond. Afterwards she gives you feedback.",
  },
  {
    q: "Can I talk to Patricia with my voice?",
    a: "Not yet. Simulations are text-based for now, so you reply by typing, just like a live chat.",
  },
  {
    q: "Can I use Real Learning with my team?",
    a: "Yes. A team workspace lets you add seats, organise classes and follow your team's progress. You can set one up from the team onboarding page, or send us a message above.",
  },
];

export function ContactFAQ() {
  return (
    <section className="w-full bg-[#121212] px-6 py-16 text-white sm:px-10 sm:py-20 lg:px-16">
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-10 lg:grid-cols-[1fr_1.5fr]">
        <div>
          <h2 className="text-3xl font-semibold tracking-[-0.03em] sm:text-4xl lg:text-[44px] lg:leading-[1.1]">
            Common questions
          </h2>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-zinc-400 sm:text-base">
            Quick answers before you get in touch.
          </p>
        </div>

        <div className="border-t border-white/[0.08]">
          {FAQS.map((f, i) => (
            <details key={f.q} open={i === 0} className="group border-b border-white/[0.08]">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-base font-medium text-white sm:text-lg [&::-webkit-details-marker]:hidden">
                {f.q}
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/[0.06] text-zinc-300 transition-[transform,background-color,color] duration-300 group-open:rotate-45 group-open:bg-orange-500 group-open:text-black">
                  <Plus className="h-4 w-4" />
                </span>
              </summary>
              <p className="max-w-2xl pb-6 text-sm leading-relaxed text-zinc-400 sm:text-base">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
