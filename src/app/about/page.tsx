import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/front-end/Navbar";
import { AboutHero } from "@/components/about/AboutHero";
import { AboutMission } from "@/components/about/AboutMission";
import { AboutValues } from "@/components/about/AboutValues";
import { AboutStory } from "@/components/about/AboutStory";
import FooterCTA from "@/components/front-end/FooterCTA";

export const metadata: Metadata = {
  title: "About Us · Real Learning & Patricia AI Life GPS",
  description:
    "Discover how Real Learning and Northstar Labs are transforming career preparation through high-fidelity workplace simulations and personalized AI guidance.",
};

export default function AboutPage() {
  return (
    <div className="bg-[#faf9f6] text-stone-900 min-h-screen w-full overflow-x-clip font-sans selection:bg-orange-500 selection:text-white">
      {/* Top Navbar */}
      <Navbar />

      <main className="overflow-x-clip">
        {/* 1. Hero Section */}
        <AboutHero />

        {/* 2. Mission & Manifesto (The Problem vs Real Learning) */}
        <AboutMission />

        {/* 3. Core Architectural Values (Bento Grid) */}
        <AboutValues />

        {/* 4. Timeline & Milestones */}
        <AboutStory />

        {/* 5. Footer Call-to-Action */}
        <FooterCTA />
      </main>
    </div>
  );
}
