"use client";

import React, { useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useAccount } from "@/context/AccountContext";
import Navbar from "@/components/front-end/Navbar";
import { PatriciaOpeningHero } from "@/components/patricia/PatriciaOpeningHero";
import { PatriciaChatExperience } from "@/components/patricia/PatriciaChatExperience";
import HowRealLearningWorks from "@/components/front-end/HowRealLearningWorks";
import ExploreCareers from "@/components/front-end/ExploreCareers";
import VideoShowcase from "@/components/front-end/VideoShowcase";
import FeedbackSection from "@/components/front-end/FeedbackSection";
import UserStoriesShowcase from "@/components/front-end/UserStoriesShowcase";
import TrackProgress from "@/components/front-end/TrackProgress";
import OrganizationDashboard from "@/components/front-end/OrganizationDashboard";
import FooterCTA from "@/components/front-end/FooterCTA";

export default function Home() {
  const router = useRouter();
  const { session } = useAccount();
  const patriciaSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (session.accountType === "organization") {
      router.replace("/organization-dashboard");
    } else if (session.accountType === "individual") {
      router.replace("/user-dashboard");
    }
  }, [session.accountType, router]);

  const [initialPrompt, setInitialPrompt] = React.useState<string | null>(null);

  const handleSlideUpToPatricia = useCallback((prompt?: string) => {
    if (prompt) {
      setInitialPrompt(prompt);
    }
    if (patriciaSectionRef.current) {
      patriciaSectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  const handleClearInitialPrompt = useCallback(() => {
    setInitialPrompt(null);
  }, []);

  if (session.accountType) {
    return (
      <main className="bg-black text-slate-100 min-h-screen font-sans flex items-center justify-center p-8 text-center text-xs text-white/50">
        Redirecting to dashboard...
      </main>
    );
  }

  return (
    <div className="bg-orange-50 text-stone-900 min-h-screen w-full overflow-x-clip font-sans selection:bg-orange-500 selection:text-white">
      {/* Top Navbar */}
      <Navbar />

      <main className="overflow-x-clip">

      {/* 1. Patricia Front Door Opening Hero */}
      <PatriciaOpeningHero onSlideUp={handleSlideUpToPatricia} />

      {/* 2. Patricia Chatbot & Live Life GPS Experience */}
      <div
        id="patricia-experience"
        ref={patriciaSectionRef}
        className="bg-orange-50"
      >
        <PatriciaChatExperience
          initialPrompt={initialPrompt}
          onClearInitialPrompt={handleClearInitialPrompt}
        />
      </div>

      {/* 3. Section: How Real Learning Works */}
      <div id="how-it-works">
        <HowRealLearningWorks />
      </div>

      {/* 4. Section: Explore Your Career */}
      <div id="explore-careers">
        <ExploreCareers />
      </div>

      {/* 5. Section: Practice Real Workplace Situations */}
      {/* <VideoShowcase /> */}

      {/* 6. Section: Real-Time Feedback & Skill Progress Dashboard */}
      <div id="feedback-section">
        <FeedbackSection />
      </div>

      {/* 7. Section: Customer & Learner Stories Showcase */}
      <div id="customer-stories">
        <UserStoriesShowcase />
      </div>

      {/* 8. Section: For Schools & Organizations */}
      {/* <div id="organizations">
        <OrganizationDashboard />
      </div> */}

      {/* 9. Section: Ready to Practice Your Future & Footer */}
      <FooterCTA />
    </main>
  </div>
);
}
