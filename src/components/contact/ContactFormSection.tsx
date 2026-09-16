"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  CheckCircle2,
  Mail,
  ArrowRight,
  ShieldCheck,
  MapPin,
} from "lucide-react";

type CareerTrackType =
  | "Customer Service"
  | "Tech Support"
  | "IT Specialist"
  | "Healthcare Support"
  | "Other Career Track";

export function ContactFormSection() {
  const [careerTrack, setCareerTrack] =
    useState<CareerTrackType>("Customer Service");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    targetRole: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const careerTracks: CareerTrackType[] = [
    "Customer Service",
    "Tech Support",
    "IT Specialist",
    "Healthcare Support",
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 400);
  };

  const handleReset = () => {
    setFormData({
      name: "",
      email: "",
      targetRole: "",
      message: "",
    });
    setSubmitted(false);
  };

  return (
    <section
      id="contact-form"
      className="relative w-full py-20 sm:py-28 bg-white text-stone-900 border-b border-stone-200/80"
    >
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-stretch">
          {/* Left Column: Form Section */}
          <div className="lg:col-span-7 space-y-8 flex flex-col justify-between">
            <div className="space-y-6">
              {/* Header & Typography */}
              <div className="space-y-2">
                <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-stone-950 font-sans">
                  How can we support your journey?
                </h2>

                <p className="text-stone-600 text-sm sm:text-base leading-relaxed max-w-xl font-normal">
                  Select your target career simulation track below. Whether you
                  need practice guidance, custom cohort scenarios, or technical
                  support, our team is here to assist.
                </p>
              </div>

              {/* Career Track Topic Pills */}
              <div className="space-y-2.5">
                <label className="block text-xs font-mono uppercase tracking-wider text-stone-700 font-semibold">
                  Select Career Track Focus
                </label>
                <div className="flex flex-wrap gap-2">
                  {careerTracks.map((track) => {
                    const isSelected = careerTrack === track;
                    return (
                      <button
                        key={track}
                        type="button"
                        onClick={() => setCareerTrack(track)}
                        className={`px-4 py-2.5 rounded-xl text-xs font-mono tracking-wide transition-colors cursor-pointer border ${
                          isSelected
                            ? "bg-stone-900 text-white border-stone-900 font-bold"
                            : "bg-[#faf9f6] hover:bg-white text-stone-700 border-stone-200 hover:border-stone-300 font-medium"
                        }`}
                      >
                        {track}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Form Card */}
              <div className="bg-[#faf9f6] border border-stone-200 rounded-3xl p-6 sm:p-8">
                {submitted ? (
                  <div className="py-8 text-center space-y-5">
                    <div className="w-14 h-14 rounded-2xl bg-emerald-100 border border-emerald-300 flex items-center justify-center text-emerald-700 mx-auto">
                      <CheckCircle2 className="w-7 h-7" />
                    </div>

                    <div className="space-y-1.5">
                      <h3 className="text-2xl font-bold text-stone-950">
                        Message Dispatched
                      </h3>
                      <p className="text-stone-600 text-sm max-w-md mx-auto leading-relaxed">
                        Thank you,{" "}
                        <span className="text-stone-950 font-semibold">
                          {formData.name}
                        </span>
                        . We have routed your inquiry regarding the{" "}
                        <span className="text-orange-700 font-semibold">
                          {careerTrack}
                        </span>{" "}
                        track. Our learning specialists will reply to{" "}
                        <span className="text-stone-900 font-mono font-medium">
                          {formData.email}
                        </span>{" "}
                        shortly.
                      </p>
                    </div>

                    <div className="pt-2">
                      <button
                        type="button"
                        onClick={handleReset}
                        className="px-6 py-2.5 rounded-full bg-stone-900 hover:bg-stone-800 text-white text-xs font-mono uppercase tracking-wider font-semibold transition-colors cursor-pointer border border-stone-900"
                      >
                        Send Another Message
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="block text-xs font-mono uppercase tracking-wider text-stone-700 font-semibold">
                          Full Name <span className="text-orange-600">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                          }
                          placeholder="e.g. Alex Vance"
                          className="w-full px-4 py-3 rounded-xl bg-white border border-stone-200 focus:border-stone-900 focus:outline-none text-sm text-stone-900 placeholder:text-stone-400 transition-colors font-sans"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="block text-xs font-mono uppercase tracking-wider text-stone-700 font-semibold">
                          Email Address{" "}
                          <span className="text-orange-600">*</span>
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                          placeholder="alex@company.com"
                          className="w-full px-4 py-3 rounded-xl bg-white border border-stone-200 focus:border-stone-900 focus:outline-none text-sm text-stone-900 placeholder:text-stone-400 transition-colors font-sans"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-xs font-mono uppercase tracking-wider text-stone-700 font-semibold">
                        Current or Target Role{" "}
                        <span className="text-stone-400 font-normal">
                          (Optional)
                        </span>
                      </label>
                      <input
                        type="text"
                        value={formData.targetRole}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            targetRole: e.target.value,
                          })
                        }
                        placeholder="e.g. Support Specialist, IT Associate, or Team Lead"
                        className="w-full px-4 py-3 rounded-xl bg-white border border-stone-200 focus:border-stone-900 focus:outline-none text-sm text-stone-900 placeholder:text-stone-400 transition-colors font-sans"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-xs font-mono uppercase tracking-wider text-stone-700 font-semibold">
                        Your Message or Simulation Questions{" "}
                        <span className="text-orange-600">*</span>
                      </label>
                      <textarea
                        required
                        rows={4}
                        value={formData.message}
                        onChange={(e) =>
                          setFormData({ ...formData, message: e.target.value })
                        }
                        placeholder="Tell us about your learning goals, target roles, team cohort questions, or general inquiry..."
                        className="w-full px-4 py-3 rounded-xl bg-white border border-stone-200 focus:border-stone-900 focus:outline-none text-sm text-stone-900 placeholder:text-stone-400 transition-colors font-sans resize-y"
                      />
                    </div>

                    <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                      <div />

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-stone-950 hover:bg-stone-800 text-white font-mono font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer border border-stone-950 disabled:opacity-50"
                      >
                        {isSubmitting ? (
                          <span>Sending Message...</span>
                        ) : (
                          <>
                            <span>Send Message</span>
                            <ArrowRight className="w-4 h-4" />
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Visual Showcase Matching Website Aesthetic */}
          <div className="lg:col-span-5 h-full flex flex-col justify-between">
            <div className="relative w-full h-[450px] sm:h-[540px] lg:h-full min-h-[460px] rounded-3xl overflow-hidden border border-stone-200 bg-white p-2">
              <div className="relative w-full h-full rounded-2xl overflow-hidden">
                <Image
                  src="/images/contact-studio.jpg"
                  alt="Real Learning Innovation Studio & Collaborative Lab"
                  fill
                  className="object-cover object-center"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/20 to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
