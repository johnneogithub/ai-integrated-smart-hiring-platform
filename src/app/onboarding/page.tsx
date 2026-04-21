// app/onboarding/page.tsx

"use client";

import { useEffect, useState } from "react";
import { FormData, initialFormData } from "@/types/formTypes";
import { Step1Personal } from "@/components/onboarding/Step1Personal";
import { Step2Professional } from "@/components/onboarding/Step2Professional";
import { Step3CareerGoals } from "@/components/onboarding/Step3CareerGoals";

export default function OnboardingPage() {
  const [step, setStep] = useState(1);
  const totalSteps = 3;
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isLoading, setIsLoading] = useState(false);

  // Load saved profile from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("workerProfile");
    if (saved) {
      try {
        setFormData(JSON.parse(saved));
      } catch (error) {
        console.error("Failed to load saved profile:", error);
      }
    }
  }, []);

  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Navigation handlers
  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    }
  };

  const handlePrevious = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  // Save profile and redirect
  const handleComplete = async () => {
    setIsLoading(true);
    try {
      // Save to localStorage
      localStorage.setItem("workerProfile", JSON.stringify(formData));

      // Optional: Call API to save to backend
      // await fetch("/api/profile", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(formData),
      // });

      // Redirect to next step
      window.location.href = "/job-matches";
    } catch (error) {
      console.error("Failed to complete profile:", error);
      alert("Error saving profile. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const progress = Math.round((step / totalSteps) * 100);

  return (
    <main className="min-h-screen bg-gray-100 pb-32">
      <div className="mx-auto max-w-3xl px-6 py-10">
        {/* Header */}
        <div className="mb-8 rounded-2xl bg-white p-6 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
            Smart Hiring Platform
          </p>
          <h1 className="mt-2 text-3xl font-bold text-gray-900">
            Logistics Driver Application Profile
          </h1>
          <p className="mt-2 text-gray-600">
            Complete your professional profile for AI-driven application analysis
            and candidate matching.
          </p>

          {/* Progress Bar */}
          <div className="mt-6">
            <div className="mb-2 flex items-center justify-between text-sm text-gray-600">
              <span>
                Step {step} of {totalSteps}
              </span>
              <span className="font-medium">{progress}%</span>
            </div>
            <div className="h-2 rounded-full bg-gray-200">
              <div
                className="h-2 rounded-full bg-blue-600 transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>

        {/* Form Content */}
        <div className="rounded-2xl bg-white p-8 shadow-sm">
          {step === 1 && (
            <Step1Personal formData={formData} onChange={handleChange} />
          )}
          {step === 2 && (
            <Step2Professional formData={formData} onChange={handleChange} />
          )}
          {step === 3 && (
            <Step3CareerGoals formData={formData} onChange={handleChange} />
          )}
        </div>
      </div>

      {/* Navigation Footer */}
      <div className="fixed bottom-0 left-0 right-0 border-t bg-white p-5 shadow-lg">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-6">
          <button
            onClick={handlePrevious}
            disabled={step === 1}
            className="rounded-xl border border-gray-300 px-6 py-3 font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40 transition"
          >
            Previous
          </button>

          {step < totalSteps ? (
            <button
              onClick={handleNext}
              className="rounded-xl bg-blue-600 px-8 py-3 font-medium text-white hover:bg-blue-700 transition"
            >
              Next
            </button>
          ) : (
            <button
              onClick={handleComplete}
              disabled={isLoading}
              className="rounded-xl bg-green-600 px-8 py-3 font-medium text-white hover:bg-green-700 disabled:opacity-50 transition"
            >
              {isLoading ? "Saving..." : "Complete Profile"}
            </button>
          )}
        </div>
      </div>
    </main>
  );
}
