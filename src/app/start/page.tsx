// app/start/page.tsx
"use client";

import Link from "next/link";
import { Briefcase, UserPlus, Wand2 } from "lucide-react";
import { useEffect, useState } from "react";

/** semantic profile validation */
const isValidProfile = (raw: string | null): boolean => {
  if (!raw) return false;

  try {
    const profile = JSON.parse(raw);
    return Boolean(
      profile.nickname?.trim() ||
      profile.firstName?.trim() ||
      profile.lastName?.trim()
    );
  } catch {
    return false;
  }
};

export default function StartPage() {
  const [hasProfile, setHasProfile] = useState<boolean | null>(null);

  useEffect(() => {
    const checkProfile = () => {
      setHasProfile(isValidProfile(localStorage.getItem("workerProfile")));
    };

    checkProfile();

    window.addEventListener("focus", checkProfile);
    return () => window.removeEventListener("focus", checkProfile);
  }, []);

  // prevent flicker
  if (hasProfile === null) {
    return <div className="min-h-screen bg-gray-100" />;
  }

  return (
    <main className="min-h-[80vh] bg-gray-100 flex items-center justify-center px-6">
      <div className="max-w-6xl w-full">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Welcome to Smart Hiring
          </h1>
          <p className="mt-4 text-gray-600 text-lg">
            Choose how you’d like to get started
          </p>
        </div>

        {/* Choice Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-14">
          {/* Career Agent */}
          <Link
            href="/career-agent"
            className={`group rounded-3xl bg-white p-8 flex flex-col justify-between
              transition-all border shadow-sm
              ${
                hasProfile
                  ? "border-blue-500 ring-2 ring-blue-100"
                  : "border-gray-200 opacity-70 hover:opacity-100"
              }`}
          >
            <div>
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100">
                <Wand2 className="h-7 w-7 text-blue-600" />
              </div>

              <h2 className="text-2xl font-bold text-gray-900">
                Talk to Career Agent
              </h2>

              <p className="mt-3 text-gray-600 leading-relaxed">
                Get AI‑powered job recommendations, career advice, and interview
                guidance using your profile.
              </p>

              {hasProfile && (
                <p className="mt-4 text-sm text-blue-600 font-medium">
                  ✅ Profile detected — recommended
                </p>
              )}

              {!hasProfile && (
                <p className="mt-4 text-sm text-gray-800">
                  ⚠ Create a profile first for best results
                </p>
              )}
            </div>

            <p className="mt-8 text-blue-600 font-medium group-hover:underline">
              Continue →
            </p>
          </Link>

          {/* Onboarding */}
          <Link
            href="/onboarding"
            className={`group rounded-3xl p-8 flex flex-col justify-between
              transition-all shadow-sm bg-blue-600 text-white
              ${
                !hasProfile
                  ? "ring-2 ring-blue-200"
                  : "hover:bg-blue-700"
              }`}
          >
            <div>
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20">
                <UserPlus className="h-7 w-7 text-white" />
              </div>

              <h2 className="text-2xl font-bold">
                Create / Update Profile
              </h2>

              <p className="mt-3 text-blue-100 leading-relaxed">
                Build or update your professional profile so we can personalize
                job matches and career guidance for you.
              </p>

              {!hasProfile && (
                <p className="mt-4 text-sm text-white font-medium">
                  ⭐ Recommended for first‑time users
                </p>
              )}
            </div>

            <p className="mt-8 font-medium opacity-90 group-hover:underline">
              Get started →
            </p>
          </Link>

          {/* Available Jobs */}
          <Link
            href="/job-matches"
            className="group rounded-3xl bg-white p-8 flex flex-col justify-between
                      transition-all border shadow-sm border-gray-200
                      hover:border-indigo-500 hover:shadow-md"
          >
            <div>
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-100">
                <Briefcase className="h-7 w-7 text-indigo-600" />
              </div>

              <h2 className="text-2xl font-bold text-gray-900">
                Browse Available Jobs
              </h2>

              <p className="mt-3 text-gray-600 leading-relaxed">
                View all open logistics and supply‑chain roles, including entry‑level,
                warehouse, and professional positions — no profile required. 
              </p>
            </div>

            <p className="mt-8 text-indigo-600 font-medium group-hover:underline">
              View jobs →
            </p>
          </Link>

        </div>
      </div>
    </main>
  );
}