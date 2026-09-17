"use client";

import React, { memo } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Zap, Plus, ArrowRight } from "lucide-react";

export default memo(function ExploreCareers() {
  return (
    <section
      id="explore-careers"
      className="relative w-full py-6 sm:py-16 lg:py-24 bg-orange-50 text-stone-900 font-sans overflow-hidden select-none border-t border-stone-200/80"
    >
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(rgba(0,0,0,0.06) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />
      </div>

      <div className="relative container mx-auto max-w-7xl px-3 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 mb-8 sm:mb-14">
          <div className="max-w-2xl space-y-2.5 sm:space-y-3.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-stone-900/5 border border-stone-900/10 text-[11px] sm:text-xs font-mono text-stone-800">
              <Zap className="w-3.5 h-3.5 text-orange-600 shrink-0" />
              <span>EXPLORE YOUR CAREER</span>
            </div>

            <h2 className="text-2xl sm:text-4xl lg:text-[44px] font-extrabold tracking-tight text-stone-950 leading-[1.15] uppercase">
              Explore Your{" "}
              <span className="border-b-4 border-dashed border-orange-400">
                Career.
              </span>
            </h2>

            <p className="text-xs sm:text-base text-stone-600 font-medium leading-relaxed max-w-xl">
              Select from 4 career simulation tracks tailored to your
              professional goals and start practicing real scenarios.
            </p>
          </div>

          <div>
            <Link
              href="/get-started"
              className="inline-flex items-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 rounded-full bg-stone-950 hover:bg-stone-800 text-white text-xs font-bold transition-all shadow-xl hover:shadow-2xl active:scale-95"
            >
              <span>Explore All Scenarios</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        <div className="hidden xl:block">
          <div className="flex items-stretch gap-[18px] justify-center">
            <div className="w-[240px] h-[250px] shrink-0 relative flex items-center justify-center">
              <div className="w-[236px] h-[236px] rounded-full bg-[#14151b] border border-white/15 shadow-2xl flex flex-col items-center justify-center relative select-none group hover:border-orange-400/40 transition-colors">
                <div
                  className="absolute inset-0 rounded-full pointer-events-none opacity-20"
                  style={{
                    background:
                      "radial-gradient(circle, rgba(255,255,255,0.4) 0%, transparent 70%)",
                  }}
                />

                <div className="relative z-10 text-center">
                  <div className="text-4xl font-black text-white font-mono tracking-tighter drop-shadow-md">
                    135+
                  </div>
                  <div className="text-[10px] font-semibold text-white/60 uppercase tracking-widest mt-0.5">
                    Scenarios
                  </div>
                </div>

                <Link
                  href="/get-started"
                  className="absolute bottom-3 right-3 w-8 h-8 rounded-full bg-black border border-white/30 flex items-center justify-center text-white hover:bg-orange-500 hover:border-orange-400 transition-all shadow-md group-hover:scale-110 active:scale-95"
                  title="Explore All Scenarios"
                >
                  <Plus className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            <div className="w-[270px] h-[250px] shrink-0 relative flex flex-col justify-between p-6">
              <Image
                src="/images/tasks-notes.png"
                alt="Tasks and Notes"
                width={534}
                height={508}
                className="pointer-events-none absolute -right-1 -top-1 w-[534px] h-[508px] max-w-none z-0 select-none object-contain"
              />

              <div className="relative z-10 flex flex-col justify-center h-full">
                <div className="flex items-center gap-2 mb-2.5">
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-white/10 border border-white/20 text-xs font-mono font-bold text-orange-400 shadow-sm">
                    1
                  </span>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-white/50">
                    Career Track
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white tracking-tight leading-snug">
                  Customer service and communication
                </h3>
                <p className="text-white/60 text-xs mt-2 leading-relaxed">
                  Learn to handle customer inquiries with professionalism and
                  care
                </p>
              </div>
            </div>

            <div className="w-[260px] h-[250px] shrink-0 relative rounded-[50px] bg-[#121318] text-white border border-white/10 shadow-2xl flex flex-col justify-between overflow-hidden">
              <Image
                src="/images/teck.jpg"
                alt="Support Specialist"
                width={500}
                height={500}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="hidden xl:flex w-[570px] h-[250px] items-center justify-center shrink-0 relative rounded-[50px] bg-[#121318] text-white p-5 border border-white/10 shadow-2xl flex-col overflow-hidden">
              <div className="h-24 flex items-center justify-center gap-1.5">
                {[
                  32, 52, 22, 68, 42, 60, 26, 76, 38, 54, 28, 64, 46, 34, 58,
                  24,
                ].map((h, i) => (
                  <span
                    key={i}
                    className="w-1.5 rounded-full bg-gradient-to-t from-fuchsia-500 to-rose-400 shadow-sm origin-center transform-gpu animate-pulse"
                    style={{
                      height: `${h}px`,
                      animationDuration: `${0.75 + (i % 4) * 0.18}s`,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-stretch gap-[18px] justify-center mt-[18px]">
            <div className="w-[260px] h-[240px] shrink-0 relative flex flex-col justify-center p-6">
              <div className="flex items-center gap-2 mb-2.5">
                <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-white/10 border border-white/20 text-xs font-mono font-bold text-orange-400 shadow-sm">
                  2
                </span>
                <span className="text-[10px] font-mono uppercase tracking-widest text-white/50">
                  Career Track
                </span>
              </div>
              <h3 className="text-xl font-bold text-white tracking-tight leading-snug">
                Tech Support
              </h3>
              <p className="text-white/60 text-xs mt-2 leading-relaxed">
                Help people solve their technology problems and get back online
              </p>
            </div>

            <div className="w-[450px] h-[240px] shrink-0 relative rounded-[50px] bg-[#C04828] text-white p-6 sm:p-8 border border-white/10 shadow-2xl overflow-hidden flex flex-col justify-center">
              <div
                className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-32 blur-3xl pointer-events-none opacity-30"
                style={{
                  background:
                    "radial-gradient(ellipse at center, #6366f1 0%, #3b82f6 50%, transparent 80%)",
                }}
              />
              <div className="flex items-center gap-2 mb-2.5 relative z-10">
                <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-white/20 border border-white/30 text-xs font-mono font-bold text-white shadow-sm">
                  3
                </span>
                <span className="text-[10px] font-mono uppercase tracking-widest text-white/80">
                  Career Track
                </span>
              </div>
              <h3 className="text-xl font-bold text-white tracking-tight leading-snug relative z-10">
                IT Specialist
              </h3>
              <p className="text-white/80 text-xs mt-2 leading-relaxed relative z-10">
                Diagnose and resolve complex IT infrastructure challenges
              </p>
            </div>

            <div className="w-[370px] h-[240px] shrink-0 relative rounded-[50px] bg-[#2B5748] text-white p-6 sm:p-8 border border-white/10 shadow-2xl flex flex-col justify-center overflow-hidden">
              <div className="flex items-center gap-2 mb-2.5">
                <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-white/10 border border-white/20 text-xs font-mono font-bold text-orange-400 shadow-sm">
                  4
                </span>
                <span className="text-[10px] font-mono uppercase tracking-widest text-white/50">
                  Career Track
                </span>
              </div>
              <h3 className="text-xl font-bold text-white tracking-tight leading-snug">
                Healthcare Support & Patient Care
              </h3>
              <p className="text-white/60 text-xs mt-2 leading-relaxed">
                Support patients and medical staff with empathy and accuracy
              </p>
            </div>

            <div className="w-[240px] h-[240px] shrink-0 relative rounded-[50px] bg-[#121318] text-white flex flex-col justify-between overflow-hidden">
              <Image
                src="/images/healthcare.jpg"
                alt="Healthcare Specialist"
                width={500}
                height={500}
                className="w-full h-full object-cover object-top"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-6 xl:hidden">
          <div className="col-span-full rounded-2xl sm:rounded-[32px] bg-[#14151b] border border-white/15 p-4 sm:p-6 shadow-xl flex items-center justify-between">
            <div>
              <div className="text-2xl sm:text-4xl font-black font-mono text-white tracking-tighter">
                135+
              </div>
              <div className="text-[10px] sm:text-xs text-white/60 uppercase tracking-wider mt-0.5">
                Practice Scenarios
              </div>
            </div>
            <Link
              href="/get-started"
              className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white text-black flex items-center justify-center font-bold hover:bg-orange-500 hover:text-white transition-all shadow-md active:scale-95 shrink-0"
              title="Explore All Scenarios"
            >
              <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
            </Link>
          </div>

          <div className="rounded-2xl sm:rounded-[32px] bg-[#121318] text-white p-4 sm:p-7 border border-white/10 shadow-xl flex flex-col justify-center">
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-flex items-center justify-center w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-white/10 border border-white/20 text-[11px] sm:text-xs font-mono font-bold text-orange-400 shadow-sm shrink-0">
                1
              </span>
              <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-widest text-white/50">
                Career Track
              </span>
            </div>
            <h3 className="text-base sm:text-xl font-bold text-white tracking-tight leading-snug">
              Customer service and communication
            </h3>
            <p className="text-white/60 text-[11px] sm:text-sm mt-1.5 leading-relaxed">
              Learn to handle customer inquiries with professionalism and care
            </p>
          </div>

          <div className="rounded-2xl sm:rounded-[32px] bg-[#121318] border border-white/10 shadow-xl overflow-hidden h-[160px] sm:h-[230px] relative">
            <Image
              src="/images/teck.jpg"
              alt="Support Specialist"
              width={500}
              height={500}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="rounded-2xl sm:rounded-[32px] bg-[#121318] text-white p-4 sm:p-7 border border-white/10 shadow-xl flex flex-col justify-center">
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-flex items-center justify-center w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-white/10 border border-white/20 text-[11px] sm:text-xs font-mono font-bold text-orange-400 shadow-sm shrink-0">
                2
              </span>
              <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-widest text-white/50">
                Career Track
              </span>
            </div>
            <h3 className="text-base sm:text-xl font-bold text-white tracking-tight leading-snug">
              Tech Support
            </h3>
            <p className="text-white/60 text-[11px] sm:text-sm mt-1.5 leading-relaxed">
              Help people solve their technology problems and get back online
            </p>
          </div>

          <div className="rounded-2xl sm:rounded-[32px] bg-[#C04828] text-white p-4 sm:p-7 border border-white/10 shadow-xl flex flex-col justify-center relative overflow-hidden">
            <div
              className="absolute bottom-0 left-1/2 -translate-x-1/2 w-80 h-28 blur-3xl pointer-events-none opacity-30"
              style={{
                background:
                  "radial-gradient(ellipse at center, #6366f1 0%, #3b82f6 50%, transparent 80%)",
              }}
            />
            <div className="flex items-center gap-2 mb-2 relative z-10">
              <span className="inline-flex items-center justify-center w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-white/20 border border-white/30 text-[11px] sm:text-xs font-mono font-bold text-white shadow-sm shrink-0">
                3
              </span>
              <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-widest text-white/80">
                Career Track
              </span>
            </div>
            <h3 className="text-base sm:text-xl font-bold text-white tracking-tight leading-snug relative z-10">
              IT Specialist
            </h3>
            <p className="text-white/80 text-[11px] sm:text-sm mt-1.5 leading-relaxed relative z-10">
              Diagnose and resolve complex IT infrastructure challenges
            </p>
          </div>

          <div className="rounded-2xl sm:rounded-[32px] bg-[#121318] border border-white/10 shadow-xl overflow-hidden h-[160px] sm:h-[230px] relative">
            <Image
              src="/images/healthcare.jpg"
              alt="Healthcare Specialist"
              width={500}
              height={500}
              className="w-full h-full object-cover object-top"
            />
          </div>

          <div className="col-span-full rounded-2xl sm:rounded-[32px] bg-[#121318] text-white p-4 sm:p-7 border border-white/10 shadow-xl flex flex-col justify-center">
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-flex items-center justify-center w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-white/10 border border-white/20 text-[11px] sm:text-xs font-mono font-bold text-orange-400 shadow-sm shrink-0">
                4
              </span>
              <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-widest text-white/50">
                Career Track
              </span>
            </div>
            <h3 className="text-base sm:text-xl font-bold text-white tracking-tight leading-snug">
              Healthcare Support & Patient Care
            </h3>
            <p className="text-white/60 text-[11px] sm:text-sm mt-1.5 leading-relaxed">
              Support patients and medical staff with empathy and accuracy
            </p>
          </div>
        </div>
      </div>
    </section>
  );
});
