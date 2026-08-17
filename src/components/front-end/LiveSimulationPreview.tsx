"use client";

import { SimulationChat } from "@/components/simulations/components/simulation-chat";

export default function LiveSimulationPreview() {
  return (
    <div className="relative max-w-5xl mx-auto mt-20">
      <SimulationChat autoPlay={true} fixedHeightClass="h-[380px]" />
    </div>
  );
}
