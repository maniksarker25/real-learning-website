import React from "react";
import FooterCTA from "@/components/front-end/FooterCTA";
import GsapAwwwardsHero from "../components/cinematic/GsapAwwwardsHero";
import ConnectAgentSection from "../components/cinematic/ConnectAgentSection";
import CinematicNavbar from "../components/cinematic/CinematicNavbar";
import ConnectBentoGrid from "@/components/front-end/ConnectBentoGrid";
import JoinPathsSection from "@/components/front-end/JoinPathsSection";

export default function Home() {
  return (
    <div className="bg-[#121212] min-h-screen w-full overflow-x-clip font-sans selection:bg-orange-500 selection:text-white">
      <CinematicNavbar />
      <main className="overflow-x-clip">
        <GsapAwwwardsHero />
        <JoinPathsSection />
        <ConnectAgentSection />
        <ConnectBentoGrid />
        <FooterCTA />
      </main>
    </div>
  );
}