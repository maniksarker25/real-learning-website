"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useLearningLoop } from "@/context/LearningLoopContext";

export default function UserFeedbackPage() {
  const router = useRouter();
  const { setStep } = useLearningLoop();

  useEffect(() => {
    setStep("feedback");
    router.replace("/user-dashboard");
  }, [setStep, router]);

  return (
    <div className="p-8 text-center text-xs text-white/50">
      Loading Learning GPS Feedback & Demonstrated Skills...
    </div>
  );
}
