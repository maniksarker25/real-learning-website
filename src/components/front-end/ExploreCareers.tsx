"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Headphones,
  Laptop,
  Server,
  Stethoscope,
  Zap,
  ChevronRight,
  CheckCircle2,
  Terminal,
  ShieldCheck,
} from "lucide-react";

export default function ExploreCareers() {
  return (
    <section
      id="explore-careers"
      className="relative w-full py-16 sm:py-20 bg-black text-slate-100 font-sans border-y border-white/10 overflow-hidden"
    >
      {/* Background Grid */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "radial-gradient(rgba(167,139,250,0.6) 1px, transparent 1px)",
            backgroundSize: "16px 16px",
          }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[550px] opacity-35 blur-3xl pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(249, 115, 22, 0.15) 0%, rgba(244, 63, 94, 0.1) 50%, transparent 70%)",
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-400/30 backdrop-blur text-xs text-orange-300 font-medium mb-4"
          >
            <Zap className="h-3.5 w-3.5 text-orange-400" />
            <span>EXPLORE YOUR CAREER</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight uppercase"
          >
            EXPLORE YOUR{" "}
            <span className="bg-gradient-to-r from-orange-400 via-rose-400 to-pink-400 bg-clip-text text-transparent font-accent">
              CAREER
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="mt-4 text-base sm:text-lg text-white/70 font-normal leading-relaxed max-w-2xl mx-auto"
          >
            Select a career simulation track tailored to your professional goals
            and start practicing real scenarios.
          </motion.p>
        </div>

        {/* Bento Grid Container (Exact Spans: C1-span-1, C2-span-2 | C3-span-2, C4-span-1) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
          {/* C1: Customer Service (Span 1) */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-1 bg-[#0f0f15]/90 rounded-3xl p-6 border border-white/10 hover:border-white/20 shadow-xl backdrop-blur-md flex flex-col justify-between group transition-all duration-300"
          >
            <div>
              <div className="flex items-center justify-between gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-orange-500/10 text-orange-400 border border-orange-400/30 flex items-center justify-center">
                  <Headphones className="w-5 h-5 stroke-[2.2]" />
                </div>

                <span className="text-[10px] font-mono font-bold text-orange-300 bg-orange-500/10 px-2.5 py-1 rounded-md border border-orange-400/30">
                  42 SCENARIOS
                </span>
              </div>

              <h3 className="text-xl font-bold text-white tracking-tight mb-2 group-hover:text-orange-300 transition-colors">
                Customer service and communication
              </h3>

              <p className="text-xs sm:text-sm text-white/70 leading-relaxed font-normal mb-6">
                Learn to handle customer inquiries with professionalism and care
              </p>
            </div>

            <div className="pt-4 border-t border-white/10">
              <Link
                href="/get-started"
                className="w-full inline-flex items-center justify-between px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold text-white transition-all group-hover:border-orange-400/40 group-hover:text-orange-300 cursor-pointer"
              >
                <span>Start Training</span>
                <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </motion.div>

          {/* C2: Tech Support (Span 2 - Featured Card with macOS Terminal) */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-2 bg-[#0f0f15]/90 rounded-3xl p-6 sm:p-8 border border-white/10 hover:border-white/20 shadow-2xl backdrop-blur-md flex flex-col justify-between group transition-all duration-300"
          >
            <div>
              <div className="flex items-center justify-between gap-3 mb-6">
                <div className="w-11 h-11 rounded-2xl bg-blue-500/10 text-blue-400 border border-blue-500/30 flex items-center justify-center">
                  <Laptop className="w-5 h-5 stroke-[2.2]" />
                </div>

                <span className="text-[10px] font-mono font-bold text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/30">
                  35 SCENARIOS AVAILABLE
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-2 group-hover:text-orange-300 transition-colors">
                Tech Support
              </h3>

              <p className="text-sm sm:text-base text-white/70 leading-relaxed font-normal mb-8 max-w-xl">
                Help people solve their technology problems and get back online
              </p>

              {/* macOS Terminal Mockup Widget */}
              <div className="bg-[#181824] rounded-2xl border border-white/10 font-mono text-xs text-white/80 overflow-hidden mb-6 shadow-xl">
                {/* macOS Window Header */}
                <div className="flex items-center justify-between px-4 py-2.5 bg-black/80 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#FF5F56] border border-[#E0443E]/50" />
                    <div className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-[#DEA123]/50" />
                    <div className="w-3 h-3 rounded-full bg-[#27C93F] border border-[#1AAB29]/50" />
                  </div>
                  <span className="text-[10px] text-white/50 font-mono flex items-center gap-1.5">
                    <Terminal className="w-3 h-3 text-blue-400" />
                    zsh — diagnostics@reallearning-macbook-pro
                  </span>
                </div>

                {/* macOS Terminal Body */}
                <div className="p-4 space-y-2 bg-black/90">
                  <div className="flex items-center gap-2 text-emerald-400">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Remote Desktop Handshake Established</span>
                  </div>
                  <div className="text-white/60 pl-5">
                    Analyzing network packet loss & DNS routing protocols...
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10">
              <Link
                href="/get-started"
                className="inline-flex items-center gap-2 bg-white text-black hover:bg-white/90 rounded-full px-6 py-2.5 text-xs font-bold transition-all shadow-md cursor-pointer group-hover:bg-orange-400 group-hover:text-black"
              >
                <span>Start Training</span>
                <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </motion.div>

          {/* C3: IT Specialist (Span 2 - Featured Card with macOS Server Console) */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="lg:col-span-2 bg-[#0f0f15]/90 rounded-3xl p-6 sm:p-8 border border-white/10 hover:border-white/20 shadow-2xl backdrop-blur-md flex flex-col justify-between group transition-all duration-300"
          >
            <div>
              <div className="flex items-center justify-between gap-3 mb-6">
                <div className="w-11 h-11 rounded-2xl bg-violet-500/10 text-violet-400 border border-violet-500/30 flex items-center justify-center">
                  <Server className="w-5 h-5 stroke-[2.2]" />
                </div>

                <span className="text-[10px] font-mono font-bold text-violet-400 bg-violet-500/10 px-3 py-1 rounded-full border border-violet-500/30">
                  30 SCENARIOS AVAILABLE
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-2 group-hover:text-orange-300 transition-colors">
                IT Specialist
              </h3>

              <p className="text-sm sm:text-base text-white/70 leading-relaxed font-normal mb-8 max-w-xl">
                Diagnose and resolve complex IT infrastructure challenges
              </p>

              {/* macOS Server Infrastructure Console Widget */}
              <div className="bg-[#181824] rounded-2xl border border-white/10 font-mono text-xs text-white/80 overflow-hidden mb-6 shadow-xl">
                {/* macOS Window Header */}
                <div className="flex items-center justify-between px-4 py-2.5 bg-black/80 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#FF5F56] border border-[#E0443E]/50" />
                    <div className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-[#DEA123]/50" />
                    <div className="w-3 h-3 rounded-full bg-[#27C93F] border border-[#1AAB29]/50" />
                  </div>
                  <span className="text-[10px] text-white/50 font-mono flex items-center gap-1.5">
                    <ShieldCheck className="w-3 h-3 text-violet-400" />
                    bash — cloud-cluster-monitor@macOS-server
                  </span>
                </div>

                {/* macOS Console Body */}
                <div className="p-4 space-y-2 bg-black/90">
                  <div className="flex items-center gap-2 text-emerald-400">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Cloud Firewall & Active Directory Synced</span>
                  </div>
                  <div className="text-white/60 pl-5">
                    Monitoring server load balancing, SSL certificate rotation,
                    and incident escalation protocols...
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10">
              <Link
                href="/get-started"
                className="inline-flex items-center gap-2 bg-white text-black hover:bg-white/90 rounded-full px-6 py-2.5 text-xs font-bold transition-all shadow-md cursor-pointer group-hover:bg-orange-400 group-hover:text-black"
              >
                <span>Start Training</span>
                <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </motion.div>

          {/* C4: Healthcare Support (Span 1) */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-1 bg-[#0f0f15]/90 rounded-3xl p-6 border border-white/10 hover:border-white/20 shadow-xl backdrop-blur-md flex flex-col justify-between group transition-all duration-300"
          >
            <div>
              <div className="flex items-center justify-between gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center justify-center">
                  <Stethoscope className="w-5 h-5 stroke-[2.2]" />
                </div>

                <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-md border border-emerald-500/30">
                  28 SCENARIOS
                </span>
              </div>

              <h3 className="text-xl font-bold text-white tracking-tight mb-2 group-hover:text-orange-300 transition-colors">
                Healthcare suport & patient supprot
              </h3>

              <p className="text-xs sm:text-sm text-white/70 leading-relaxed font-normal mb-6">
                Support patients and medical staff with empathy and accuracy
              </p>
            </div>

            <div className="pt-4 border-t border-white/10">
              <Link
                href="/get-started"
                className="w-full inline-flex items-center justify-between px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold text-white transition-all group-hover:border-orange-400/40 group-hover:text-orange-300 cursor-pointer"
              >
                <span>Start Training</span>
                <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
