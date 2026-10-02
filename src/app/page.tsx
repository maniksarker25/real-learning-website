import React from "react";
import { CinematicNavbar } from "@/components/cinematic/CinematicNavbar";
import { GsapAwwwardsHero } from "@/components/cinematic/GsapAwwwardsHero";
import { WhyYouAreHereSection } from "@/components/cinematic/WhyYouAreHereSection";
import FooterCTA from "@/components/front-end/FooterCTA";
import HowRealLearningWorks from "@/components/front-end/HowRealLearningWorks";
import ExploreCareers from "@/components/front-end/ExploreCareers";
import UserStoriesShowcase from "@/components/front-end/UserStoriesShowcase";

export default function Home() {
  return (
    <div className="bg-[#fcfdfd] text-slate-900 min-h-screen w-full overflow-x-clip font-sans selection:bg-orange-500 selection:text-white">
      <CinematicNavbar />

      <main className="overflow-x-clip">
        <GsapAwwwardsHero />
        <div id="patricia-experience">
          <WhyYouAreHereSection />
        </div>
        <div id="how-it-works">
          <HowRealLearningWorks />
        </div>
        <div id="explore-careers">
          <ExploreCareers />
        </div>
        <div id="customer-stories">
          <UserStoriesShowcase />
        </div>
        <FooterCTA />
      </main>
    </div>
  );
}

