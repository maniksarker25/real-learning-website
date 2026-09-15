import React from "react";
import {
  Briefcase,
  Building2,
  Bot,
  BarChart3,
  TrendingUp,
} from "lucide-react";

export interface ShowcaseStep {
  id: string;
  stepNumber: string;
  shortLabel: string;
  tag: string;
  title: string;
  highlightWords: string[];
  metrics: { value: string; label: string }[];
  ctaLabel: string;
  ctaHref: string;
  bgClass: string;
  accentHex: string;
  icon: React.ComponentType<{ className?: string }>;
}

export const SHOWCASE_STEPS: ShowcaseStep[] = [
  {
    id: "step-01",
    stepNumber: "01",
    shortLabel: "Career",
    tag: "CAREER // STEP 01",
    title: "Choose from 4 Career Tracks tailored to your natural strengths",
    highlightWords: ["4 Career Tracks"],
    metrics: [
      { value: "4 Tracks", label: "Specialized career pathways" },
      { value: "100%", label: "Customized skill maps" },
    ],
    ctaLabel: "Explore career tracks",
    ctaHref: "#explore-careers",
    bgClass: "bg-[#c04828]",
    accentHex: "#c04828",
    icon: Briefcase,
  },
  {
    id: "step-02",
    stepNumber: "02",
    shortLabel: "Simulation",
    tag: "SIMULATION // STEP 02",
    title:
      "Step into 850+ Workplace Scenarios with zero risk and maximum realism",
    highlightWords: ["850+ Workplace Scenarios"],
    metrics: [
      { value: "850+", label: "Real workplace situations" },
      { value: "0 Risk", label: "Safe environment to learn" },
    ],
    ctaLabel: "Browse simulations",
    ctaHref: "#explore-careers",
    bgClass: "bg-[#0f2b5c]",
    accentHex: "#0f2b5c",
    icon: Building2,
  },
  {
    id: "step-03",
    stepNumber: "03",
    shortLabel: "AI Roleplay",
    tag: "ADAPTIVE AI // STEP 03",
    title:
      "Engage with 500+ Adaptive AI Personas with authentic voice and emotions",
    highlightWords: ["500+ Adaptive AI Personas"],
    metrics: [
      { value: "500+", label: "Dynamic AI stakeholders" },
      { value: "< 250ms", label: "Real-time conversational latency" },
    ],
    ctaLabel: "Try AI interaction",
    ctaHref: "#patricia-experience",
    bgClass: "bg-[#451a70]",
    accentHex: "#451a70",
    icon: Bot,
  },
  {
    id: "step-04",
    stepNumber: "04",
    shortLabel: "Feedback",
    tag: "FEEDBACK // STEP 04",
    title:
      "Receive Multi-Dimensional AI Feedback scored across 12 critical workplace skills",
    highlightWords: ["Multi-Dimensional AI Feedback"],
    metrics: [
      { value: "12 Skills", label: "Soft skill dimensions scored" },
      { value: "Instant", label: "Turn-by-turn actionable insights" },
    ],
    ctaLabel: "See feedback scoring",
    ctaHref: "#feedback-section",
    bgClass: "bg-[#0e4b55]",
    accentHex: "#0e4b55",
    icon: BarChart3,
  },
  {
    id: "step-05",
    stepNumber: "05",
    shortLabel: "Progress",
    tag: "PROGRESSION // STEP 05",
    title:
      "Demonstrate Verifiable Skill Growth and graduate to senior industry readiness",
    highlightWords: ["Verifiable Skill Growth"],
    metrics: [
      { value: "+24%", label: "Average weekly skill gain" },
      { value: "Level 4", label: "Workplace mastery certified" },
    ],
    ctaLabel: "Start your journey",
    ctaHref: "#explore-careers",
    bgClass: "bg-[#064e3b]",
    accentHex: "#064e3b",
    icon: TrendingUp,
  },
];
