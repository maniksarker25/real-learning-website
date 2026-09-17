import React from "react";
import Navbar from "@/components/front-end/Navbar";
import { PatriciaMainSection } from "@/components/patricia/PatriciaMainSection";
import HowRealLearningWorks from "@/components/front-end/HowRealLearningWorks";
import ExploreCareers from "@/components/front-end/ExploreCareers";
import FeedbackSection from "@/components/front-end/FeedbackSection";
import UserStoriesShowcase from "@/components/front-end/UserStoriesShowcase";
import FooterCTA from "@/components/front-end/FooterCTA";

export default function Home() {
  return (
    <div className="bg-black text-slate-100 min-h-screen w-full overflow-x-clip font-sans selection:bg-orange-500 selection:text-white">
      <Navbar />

      <main className="overflow-x-clip">
        <PatriciaMainSection />

        <div id="how-it-works">
          <HowRealLearningWorks />
        </div>

        <div id="explore-careers">
          <ExploreCareers />
        </div>

        <div id="feedback-section">
          <FeedbackSection />
        </div>

        <div id="customer-stories">
          <UserStoriesShowcase />
        </div>

        <FooterCTA />
      </main>
    </div>
  );
}
