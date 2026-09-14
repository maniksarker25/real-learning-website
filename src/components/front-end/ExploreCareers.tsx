"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Zap,
  Mic,
  Plus,
  Send,
  Check,
  Terminal,
  ShieldCheck,
  Stethoscope,
  ChevronRight,
  ArrowRight,
} from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function ExploreCareers() {
  const [task1Checked, setTask1Checked] = useState(true);
  const [task2Checked, setTask2Checked] = useState(false);
  const [task3Checked, setTask3Checked] = useState(false);
  const [activeTool, setActiveTool] = useState<"terminal" | "iam" | "clinic">(
    "terminal",
  );
  const [activeTrackTab, setActiveTrackTab] = useState<
    "tech" | "crm" | "health"
  >("tech");

  return (
    <section
      id="explore-careers"
      className="relative w-full py-20 sm:py-28 bg-orange-50 text-stone-900 font-sans overflow-hidden select-none border-t border-stone-200/80"
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

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1400px]">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div className="max-w-2xl space-y-3.5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-stone-900/5 border border-stone-900/10 text-xs font-mono text-stone-800">
              <Zap className="w-3.5 h-3.5 text-orange-600" />
              <span>EXPLORE YOUR CAREER</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold tracking-tight text-stone-950 leading-[1.15] uppercase">
              Explore Your{" "}
              <span className="border-b-4 border-dashed border-orange-400">
                Career.
              </span>
            </h2>

            <p className="text-sm sm:text-base text-stone-600 font-medium leading-relaxed max-w-xl">
              Select a career simulation track tailored to your professional
              goals and start practicing real scenarios.
            </p>
          </div>

          {/* <div>
            <Link
              href="/get-started"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-stone-950 hover:bg-stone-900 text-white text-xs font-bold transition-all shadow-xl hover:shadow-2xl active:scale-95"
            >
              <span>Explore All 135+ Scenarios</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div> */}
        </div>

        <div className="hidden xl:block">
          <div className="flex items-stretch gap-[18px] justify-center">
            <div className="w-[260px] h-[250px] shrink-0 relative flex flex-col justify-end items-center pb-6 pointer-events-none">
              <div className="w-px h-32 bg-gradient-to-b from-transparent via-cyan-500/20 to-cyan-500/60" />
              <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#38bdf8] mt-1" />
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
            </div>

            <div className="w-[270px] h-[250px] shrink-0 relative flex flex-col justify-between p-6">
              <img
                src="/images/tasks-notes.png"
                alt=""
                className="pointer-events-none absolute -right-1 -top-1 w-[534px] h-[508px] max-w-none z-0 select-none"
              />

              <div className="relative z-10 space-y-1 flex flex-col items-center justify-center h-full">
                <h3 className="text-xl font-bold text-white tracking-tight leading-snug">
                  Customer service and communication
                </h3>
                <p className="text-white/60 text-xs mt-2">
                  Learn to handle customer inquiries with professionalism and
                  care
                </p>
              </div>

              {/* <div className="relative z-10 space-y-2 pt-2">
                <button
                  onClick={() => setTask1Checked(!task1Checked)}
                  className={`w-full flex ml-2 items-center gap-2.5 p-2.5 rounded-xl border transition-all cursor-pointer text-left ${
                    task1Checked
                      ? "bg-blue-600/30 border-blue-400/60 text-white shadow-[0_0_15px_rgba(59,130,246,0.3)] backdrop-blur-md"
                      : "bg-[#13141b]/95 border-white/10 text-white/60 hover:text-white backdrop-blur-md"
                  }`}
                >
                  <div
                    className={`w-3.5 h-3.5 rounded flex items-center justify-center transition-colors ${
                      task1Checked
                        ? "bg-blue-500 text-white"
                        : "border border-white/30"
                    }`}
                  >
                    {task1Checked && (
                      <Check className="w-2.5 h-2.5 stroke-[3]" />
                    )}
                  </div>
                  <span className="text-[11px] font-medium leading-none">
                    Customer SLA Escalation
                  </span>
                </button>

                <button
                  onClick={() => setTask2Checked(!task2Checked)}
                  className={`w-full flex ml-6 items-center gap-2.5 p-2.5 rounded-xl border transition-all cursor-pointer text-left ${
                    task2Checked
                      ? "bg-blue-600/30 border-blue-400/60 text-white shadow-[0_0_15px_rgba(59,130,246,0.3)] backdrop-blur-md"
                      : "bg-[#13141b]/95 border-white/10 text-white/60 hover:text-white backdrop-blur-md"
                  }`}
                >
                  <div
                    className={`w-3.5 h-3.5 rounded flex items-center justify-center transition-colors ${
                      task2Checked
                        ? "bg-blue-500 text-white"
                        : "border border-white/30"
                    }`}
                  >
                    {task2Checked && (
                      <Check className="w-2.5 h-2.5 stroke-[3]" />
                    )}
                  </div>
                  <span className="text-[11px] font-medium leading-none">
                    Initial usability triage
                  </span>
                </button>

                <button
                  onClick={() => setTask3Checked(!task3Checked)}
                  className={`w-full flex items-center gap-2.5 p-2.5 rounded-xl border transition-all cursor-pointer text-left ${
                    task3Checked
                      ? "bg-blue-600/30 border-blue-400/60 text-white shadow-[0_0_15px_rgba(59,130,246,0.3)] backdrop-blur-md"
                      : "bg-[#13141b]/95 border-white/10 text-white/60 hover:text-white backdrop-blur-md"
                  }`}
                >
                  <div
                    className={`w-3.5 h-3.5 rounded flex items-center justify-center transition-colors ${
                      task3Checked
                        ? "bg-blue-500 text-white"
                        : "border border-white/30"
                    }`}
                  >
                    {task3Checked && (
                      <Check className="w-2.5 h-2.5 stroke-[3]" />
                    )}
                  </div>
                  <span className="text-[11px] font-medium leading-none">
                    Updating incident report
                  </span>
                </button>
              </div> */}
            </div>

            <div className="w-[260px] h-[250px] shrink-0 relative rounded-[50px] bg-[#121318] text-white border border-white/10 shadow-2xl flex flex-col justify-between overflow-hidden">
              <Image
                src="/images/teck.jpg"
                alt=""
                width={500}
                height={500}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="w-[570px] h-[250px] items-center justify-center  shrink-0 relative rounded-[50px] bg-[#121318] text-white p-5 border border-white/10 shadow-2xl flex flex-col overflow-hidden">
              <div className="flex items-center justify-center gap-1.5 py-3">
                {[
                  32, 52, 22, 68, 42, 60, 26, 76, 38, 54, 28, 64, 46, 34, 58,
                  24,
                ].map((h, i) => (
                  <motion.span
                    key={i}
                    className="w-1.5 rounded-full bg-gradient-to-t from-fuchsia-500 to-rose-400 shadow-sm"
                    animate={{ height: [h * 0.35, h, h * 0.35] }}
                    transition={{
                      repeat: Infinity,
                      duration: 0.75 + (i % 4) * 0.18,
                      ease: "easeInOut",
                    }}
                    style={{ height: `${h}px` }}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-stretch gap-[18px] justify-center mt-[18px]">
            <div className="w-[260px] h-[240px] shrink-0 relative flex flex-col justify-center p-6">
              <h3 className="text-xl font-bold text-white tracking-tight leading-snug">
                Tech Support
              </h3>
              <p className="text-white/60 text-xs mt-2">
                Help people solve their technology problems and get back online
              </p>
            </div>

            <div className="w-[450px] h-[240px] shrink-0 relative rounded-[50px] bg-[#C04828] text-white p-6 border border-white/10 shadow-2xl overflow-hidden flex flex-col justify-center">
              <div
                className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-32 blur-3xl pointer-events-none opacity-30"
                style={{
                  background:
                    "radial-gradient(ellipse at center, #6366f1 0%, #3b82f6 50%, transparent 80%)",
                }}
              />
              <h1 className="text-xl font-bold text-white tracking-tight leading-snug">
                IT Specialist
              </h1>
              <p className="text-white/60 text-xs mt-2">
                Diagnose and resolve complex IT infrastructure challenges
              </p>
            </div>

            <div className="w-[600px] h-[240px] shrink-0 relative rounded-[50px] bg-[#121318] text-white p-6 border border-white/10 shadow-2xl flex flex-col justify-between overflow-hidden">
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-white tracking-tight leading-snug">
                  Healthcare suport & patient supprot
                </h3>
                <p>
                  Support patients and medical staff with empathy and accuracy
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 xl:hidden">
          <div className="rounded-[28px] bg-[#121318] text-white p-6 border border-white/10 shadow-xl space-y-4">
            <h3 className="text-sm font-bold text-white tracking-tight">
              Create tasks.{" "}
              <span className="font-normal text-white/60">
                Schedule practice sessions.
              </span>
            </h3>
            <div className="space-y-2">
              <button
                onClick={() => setTask1Checked(!task1Checked)}
                className={`w-full flex items-center gap-3 p-3 rounded-xl border transition-all text-left ${
                  task1Checked
                    ? "bg-blue-500/20 border-blue-400/40 text-white"
                    : "bg-white/[0.03] border-white/10 text-white/60"
                }`}
              >
                <div
                  className={`w-4 h-4 rounded flex items-center justify-center ${task1Checked ? "bg-blue-500 text-white" : "border border-white/30"}`}
                >
                  {task1Checked && <Check className="w-3 h-3 stroke-[3]" />}
                </div>
                <span className="text-xs font-medium">
                  Customer SLA Escalation
                </span>
              </button>
              <button
                onClick={() => setTask2Checked(!task2Checked)}
                className={`w-full flex items-center gap-3 p-3 rounded-xl border transition-all text-left ${
                  task2Checked
                    ? "bg-blue-500/20 border-blue-400/40 text-white"
                    : "bg-white/[0.03] border-white/10 text-white/60"
                }`}
              >
                <div
                  className={`w-4 h-4 rounded flex items-center justify-center ${task2Checked ? "bg-blue-500 text-white" : "border border-white/30"}`}
                >
                  {task2Checked && <Check className="w-3 h-3 stroke-[3]" />}
                </div>
                <span className="text-xs font-medium">
                  Initial usability triage
                </span>
              </button>
            </div>
          </div>

          <div className="rounded-[28px] bg-[#121318] text-white p-6 border border-white/10 shadow-xl space-y-4">
            <h3 className="text-sm font-bold text-white tracking-tight">
              Diagnostic tools.{" "}
              <span className="font-normal text-white/60">
                Access live sandboxes.
              </span>
            </h3>
            <div className="space-y-2">
              <button
                onClick={() => setActiveTool("terminal")}
                className={`w-full flex items-center gap-3 p-2.5 rounded-xl border transition-all text-left ${
                  activeTool === "terminal"
                    ? "bg-white/[0.1] border-white/20 text-white"
                    : "bg-white/[0.02] border-white/5 text-white/60"
                }`}
              >
                <Terminal className="w-4 h-4 text-blue-400" />
                <span className="text-xs font-medium">Terminal Console</span>
              </button>
              <button
                onClick={() => setActiveTool("iam")}
                className={`w-full flex items-center gap-3 p-2.5 rounded-xl border transition-all text-left ${
                  activeTool === "iam"
                    ? "bg-white/[0.1] border-white/20 text-white"
                    : "bg-white/[0.02] border-white/5 text-white/60"
                }`}
              >
                <ShieldCheck className="w-4 h-4 text-violet-400" />
                <span className="text-xs font-medium">Active Directory</span>
              </button>
            </div>
          </div>

          <div className="rounded-[28px] bg-[#121318] text-white p-6 border border-white/10 shadow-xl space-y-4">
            <h3 className="text-sm font-bold text-white tracking-tight">
              Plan your work.{" "}
              <span className="font-normal text-white/60">
                Visualize practice sessions.
              </span>
            </h3>
            <div className="p-4 rounded-2xl bg-black/60 border border-white/10 space-y-2">
              <div className="text-xs font-bold text-white">
                Incident debrief with VP of Ops
              </div>
              <div className="text-[11px] font-mono text-white/50">
                01:00 – 01:30 pm · Live Session
              </div>
            </div>
          </div>

          <div className="rounded-[28px] bg-[#121318] text-white p-6 border border-white/10 shadow-xl flex items-center justify-between">
            <div>
              <div className="text-3xl font-black font-mono text-white">
                135+
              </div>
              <div className="text-xs text-white/60 uppercase tracking-wider">
                Practice Scenarios
              </div>
            </div>
            <Link
              href="/get-started"
              className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center font-bold"
            >
              <Plus className="w-4 h-4" />
            </Link>
          </div>

          <div className="rounded-[28px] bg-[#121318] text-white p-6 border border-white/10 shadow-xl space-y-4 md:col-span-2 lg:col-span-2">
            <h3 className="text-sm font-bold text-white tracking-tight">
              Sync in real time.{" "}
              <span className="font-normal text-white/60">
                Voice dialogue with AI stakeholders.
              </span>
            </h3>
            <div className="py-4 flex items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-blue-600/30 border border-blue-400 flex items-center justify-center shadow-[0_0_20px_rgba(59,130,246,0.6)]">
                <Mic className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
