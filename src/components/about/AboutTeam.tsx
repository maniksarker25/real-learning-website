"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Users, Sparkles, Bot } from "lucide-react";

export function AboutTeam() {
  const team = [
    {
      name: "Dr. Marcus Brody",
      role: "Chief Technology Officer",
      focus: "Behavioral AI & Telemetry Engines",
      image: "/images/step-career.jpg",
      bio: "Ex-Google DeepMind researcher specialized in dynamic interactive dialog systems and real-time behavioral telemetry.",
    },
    {
      name: "Elena Rostova",
      role: "Head of Learning Architecture",
      focus: "Workplace Simulation Fidelity",
      image: "/images/specialist.jpg",
      bio: "12+ years designing high-consequence training simulations for enterprise leaders and healthcare executives.",
    },
    {
      name: "David K. Chen",
      role: "Lead Cognitive Psychologist",
      focus: "Competency Measurement & Safety",
      image: "/images/healthcare.jpg",
      bio: "Pioneered low-friction micro-sprint methodologies to eliminate learner anxiety and maximize conversational recall.",
    },
    {
      name: "Patricia (AI System)",
      role: "Autonomous Life GPS",
      focus: "Personalized Career Trajectory",
      isAi: true,
      bio: "Engineered specifically to map your current baseline, target outcome, and calculate your immediate next best practice simulation.",
    },
  ];

  return (
    <section className="relative w-full py-20 sm:py-28 bg-black text-white overflow-hidden border-t border-white/10">
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-500/10 blur-[140px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col items-center text-center space-y-4 max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.06] border border-white/10 text-xs font-mono text-orange-300">
            <Users className="w-3.5 h-3.5 text-orange-400" />
            <span>THE MINDS BEHIND REAL LEARNING</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight uppercase leading-[1.15]">
            Built by engineers, psychologists,{" "}
            <span className="bg-gradient-to-r from-orange-400 to-rose-400 bg-clip-text text-transparent">
              and industry veterans.
            </span>
          </h2>

          <p className="text-sm sm:text-base text-stone-400 font-medium leading-relaxed max-w-xl">
            We combined decades of cognitive science with cutting-edge real-time AI to build the ultimate career training arena.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {team.map((member, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="rounded-3xl bg-[#151514] border border-white/10 hover:border-orange-500/40 p-5 sm:p-6 transition-all group flex flex-col justify-between"
            >
              <div>
                {/* Avatar / Portrait */}
                <div className="relative w-full h-56 sm:h-60 rounded-2xl overflow-hidden mb-5 bg-stone-900 border border-white/10">
                  {member.isAi ? (
                    <div className="w-full h-full bg-gradient-to-br from-[#c26d44] via-[#9e522d] to-stone-950 flex flex-col items-center justify-center p-6 text-center">
                      <div className="w-16 h-16 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center mb-3 shadow-inner">
                        <Bot className="w-8 h-8 text-white" />
                      </div>
                      <span className="text-xs font-mono uppercase font-bold text-orange-200">
                        Autonomous AI Core
                      </span>
                      <span className="text-[10px] text-white/60 mt-1">
                        Always Online · v2.4
                      </span>
                    </div>
                  ) : (
                    <Image
                      src={member.image || "/images/specialist.jpg"}
                      alt={member.name}
                      fill
                      className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                </div>

                {/* Role & Name */}
                <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-orange-400 block mb-1">
                  {member.role}
                </span>

                <h3 className="text-lg font-bold text-white group-hover:text-orange-200 transition-colors tracking-tight">
                  {member.name}
                </h3>

                <p className="text-xs text-stone-400 leading-relaxed mt-2.5">
                  {member.bio}
                </p>
              </div>

              {/* Specialization Tag */}
              <div className="mt-5 pt-3.5 border-t border-white/[0.08] flex items-center justify-between">
                <span className="text-[9px] font-mono text-stone-500 uppercase">
                  {member.focus}
                </span>
                <span className="w-2 h-2 rounded-full bg-emerald-400/80 animate-pulse" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
