"use client";

import React, { useState } from "react";
import { Plus, Minus, HelpCircle } from "lucide-react";

export function ContactFAQ() {
  const faqs = [
    {
      question: "How quickly can we roll out a pilot for our university cohort or company?",
      answer:
        "Our team can configure and provision a customized sandbox workspace within 24 to 48 hours. We provide pre-built onboarding tracks, scenario libraries tailored to your industry, and dedicated dashboard telemetry for mentors and instructors.",
    },
    {
      question: "Can Real Learning integrate with existing LMS or HR platforms?",
      answer:
        "Yes. Real Learning supports LTI 1.3 standards for university platforms (Canvas, Blackboard, Moodle) and standard SAML/SSO authentication for enterprise directory systems. Telemetry and completion metrics can be exported via secure API.",
    },
    {
      question: "How does Patricia AI handle student and employee data privacy?",
      answer:
        "All simulation transcripts, voice inputs, and behavioral telemetry are strictly isolated in encrypted enterprise sandboxes. We adhere to zero-retention training policies—your team's conversational data is never used to train global third-party AI models.",
    },
    {
      question: "Can we build custom workplace scenarios specific to our internal workflows?",
      answer:
        "Absolutely. Through Northstar Interactive Labs, we collaborate with your subject matter experts to author realistic, high-friction scenarios replicating proprietary escalation protocols, executive reviews, or sales negotiations.",
    },
    {
      question: "What should individual learners do if they need personalized career roadmapping?",
      answer:
        "Individual learners can start a direct session with Patricia, the AI Life GPS, on our platform anytime. If you encounter any simulation bugs or need roadmap guidance, our learner desk is accessible via support@reallearning.ai.",
    },
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="relative w-full py-20 sm:py-28 bg-[#faf9f6] text-stone-900 border-b border-stone-200/80">
      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center space-y-4 max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight uppercase text-stone-950">
            Common questions & answers.
          </h2>
          <p className="text-sm text-stone-600 font-normal">
            Everything you need to know about getting started, enterprise security, and interactive simulations.
          </p>
        </div>

        {/* FAQ Accordion List with clean borders */}
        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className={`rounded-2xl border transition-colors overflow-hidden ${
                  isOpen
                    ? "bg-white border-orange-300"
                    : "bg-white hover:border-stone-300 border-stone-200"
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 cursor-pointer"
                >
                  <span className="text-base sm:text-lg font-bold text-stone-950 font-sans leading-snug">
                    {faq.question}
                  </span>
                  <div
                    className={`p-2 rounded-xl border shrink-0 transition-colors ${
                      isOpen
                        ? "bg-orange-50 text-orange-700 border-orange-200"
                        : "bg-stone-50 text-stone-500 border-stone-200"
                    }`}
                  >
                    {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-sm text-stone-600 font-normal leading-relaxed border-t border-stone-100">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
