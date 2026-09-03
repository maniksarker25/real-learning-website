"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useLearningLoop } from "@/context/LearningLoopContext";

export default function UserPathfinderPage() {
  const router = useRouter();
  const { setStep } = useLearningLoop();

  useEffect(() => {
    setStep("pathfinder");
    router.replace("/user-dashboard");
  }, [setStep, router]);

  return (
    <div className="p-8 text-center text-xs text-white/50">
      Loading Learning GPS Pathfinder...
    </div>
  );
}
