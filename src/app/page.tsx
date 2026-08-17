"use client";

import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Play, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/front-end/Navbar";
import LiveSimulationPreview from "@/components/front-end/LiveSimulationPreview";
import HowRealLearningWorks from "@/components/front-end/HowRealLearningWorks";
import ExploreCareers from "@/components/front-end/ExploreCareers";
import VideoShowcase from "@/components/front-end/VideoShowcase";
import FeedbackSection from "@/components/front-end/FeedbackSection";
import TrackProgress from "@/components/front-end/TrackProgress";
import OrganizationDashboard from "@/components/front-end/OrganizationDashboard";
import FooterCTA from "@/components/front-end/FooterCTA";
import { useRouter } from "next/navigation";

export default function Home() {
  const navigate = useRouter();

  return (
    <main className="bg-black text-slate-100 min-h-screen font-sans selection:bg-orange-500 selection:text-white">
      {/* 1. Top Navbar */}
      <Navbar />

      {/* 2. Hero Section */}
      <section id="start-simulation" className="relative px-6 md:px-12 pt-16 pb-20 bg-black overflow-hidden border-b border-white/10">
        {/* Background Dot Grid Matrix */}
        <div
          className="absolute inset-0 pointer-events-none overflow-hidden"
          style={{
            WebkitMaskImage:
              "radial-gradient(100vh at 50% 0%, #000 30%, transparent 80%)",
            maskImage:
              "radial-gradient(100vh at 50% 0%, #000 30%, transparent 80%)",
          }}
        >
          <div
            className="absolute inset-0 opacity-40"
            style={{
              backgroundImage:
                "radial-gradient(rgba(167,139,250,0.6) 1px, transparent 1px)",
              backgroundSize: "16px 16px",
            }}
          />
        </div>

        <div className="relative max-w-5xl mx-auto text-center">
          {/* Eyebrow Badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-400/30 backdrop-blur text-xs text-orange-300 font-medium mb-8"
          >
            <Zap className="h-3.5 w-3.5 text-orange-400" />
            AI-POWERED WORKPLACE SIMULATIONS
          </motion.div>

          {/* Hero Heading (Exact User Prompt Text) */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-[1.08] text-white uppercase"
          >
            EXPERIENCE YOUR CAREER{" "}
            <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-orange-400 via-rose-400 to-pink-400 bg-clip-text text-transparent font-accent">
              BEFORE YOU ENTER IT.
            </span>
          </motion.h1>

          {/* Hero Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-6 text-base sm:text-lg md:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed font-normal"
          >
            Practice realistic workplace situations through AI-powered career simulations.
          </motion.p>

          {/* Hero CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3"
          >
            <motion.div whileTap={{ scale: 0.97 }}>
              <Button
                size="lg"
                onClick={() => {}}
                className="group bg-white text-black hover:bg-white/90 rounded-full px-8 h-12 text-base font-semibold"
              >
                Start Simulation
                <ArrowRight className="ml-2 h-4 w-4 transition group-hover:translate-x-0.5" />
              </Button>
            </motion.div>
            <motion.div whileTap={{ scale: 0.97 }}>
              <Button
                size="lg"
                variant="outline"
                onClick={() => {
                  const el = document.getElementById("explore-careers");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="rounded-full px-8 h-12 text-base bg-white/5 border-white/20 text-white cursor-pointer"
              >
                Explore Careers
              </Button>
            </motion.div>
          </motion.div>

          {/* Trust Signals */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-xs text-white/50"
          >
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
              No videos. No passive reading.
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
              Instant AI scoring
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
              Free to start
            </div>
          </motion.div>
        </div>

        {/* Live Simulation Preview Frame */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-12"
        >
          <LiveSimulationPreview />
        </motion.div>
      </section>

      {/* 3. Section 1: How Real Learning Works */}
      <div id="how-it-works">
        <HowRealLearningWorks />
      </div>

      {/* 4. Section 2: Explore Your Career */}
      <ExploreCareers />

      {/* 5. Section 3: Practice Real Workplace Situations */}
      <VideoShowcase />

      {/* 6. Section 4: Get Feedback That Helps You Grow */}
      <FeedbackSection />

      {/* 7. Section 5: Track Your Progress */}
      <TrackProgress />

      {/* 8. Section 6: For Schools & Organizations */}
      <div id="organizations">
        <OrganizationDashboard />
      </div>

      {/* 9. Section 7: Ready to Practice Your Future? & Footer */}
      <FooterCTA />
    </main>
  );
}
