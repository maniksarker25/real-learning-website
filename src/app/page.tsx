import React from "react";
import { CinematicNavbar } from "@/components/cinematic/CinematicNavbar";
import { GsapAwwwardsHero } from "@/components/cinematic/GsapAwwwardsHero";
import { WhyYouAreHereSection } from "@/components/cinematic/WhyYouAreHereSection";
import FooterCTA from "@/components/front-end/FooterCTA";
import HowRealLearningWorks from "@/components/front-end/HowRealLearningWorks";
import ExploreCareers from "@/components/front-end/ExploreCareers";
import FeedbackSection from "@/components/front-end/FeedbackSection";
import UserStoriesShowcase from "@/components/front-end/UserStoriesShowcase";

export default function Home() {
  return (
    <div className="bg-[#fcfdfd] text-slate-900 min-h-screen w-full overflow-x-clip font-sans selection:bg-orange-500 selection:text-white">
      {/* 1. Top navigation tabs: clean and minimal */}
      <CinematicNavbar />

      <main className="overflow-x-clip">
        {/* 2. FEATHER (First visual/brand moment on #fdceb2) */}
        {/* Directly underneath: SCORCHED SOULS PRESENTS */}
        {/* 3. GSAP ScrollTrigger Pinned Scrub transition */}
        {/* 4. REAL LEARNING (Layout matching the reference image) */}
        <GsapAwwwardsHero />

        {/* 5. Why You're Here & Patricia Chat Experience (Combined) */}
        <div id="patricia-experience">
          <WhyYouAreHereSection />
        </div>

        {/* 7. How Real Learning Works */}
        <div id="how-it-works">
          <HowRealLearningWorks />
        </div>

        {/* 8. Explore Careers & subsequent sections */}
        <div id="explore-careers">
          <ExploreCareers />
        </div>
        {/* <div id="feedback-section">
          <FeedbackSection />
        </div> */}
        <div id="customer-stories">
          <UserStoriesShowcase />
        </div>
        <FooterCTA />
      </main>
    </div>
  );
}

