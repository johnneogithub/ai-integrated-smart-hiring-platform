"use client";

import { useState, useEffect } from "react";
import {
  mockJobs,
  getMatchedJobs,
  getJobById,
  JobListing,
} from "@/data/mockJobs";
import { JobCard } from "@/components/jobs/JobCard";
import { JobModal } from "@/components/jobs/JobModal";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Wand2 } from "lucide-react";
import { JobCardSkeleton } from "@/components/jobs/JobCardSkeleton";


export default function JobMatches() {
  const [jobs, setJobs] = useState<JobListing[]>(mockJobs);
  const [selectedJob, setSelectedJob] = useState<JobListing | null>(null);
  const [workerProfile, setWorkerProfile] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  const searchParams = useSearchParams();

  // 1. Define hasProfile FIRST
  const hasProfile =
    workerProfile &&
    (workerProfile.firstName ||
      workerProfile.nickname ||
      workerProfile.lastName);

  // 2. Then safely derive grouped jobs
  const bestMatches = hasProfile ? jobs.slice(0, 3) : [];
  const otherJobs = hasProfile ? jobs.slice(3) : jobs;

  useEffect(() => {
    const saved = localStorage.getItem("workerProfile");

    const timer = setTimeout(() => {
      if (saved) {
        try {
          const profile = JSON.parse(saved);
          setWorkerProfile(profile);
          const matchedJobs = getMatchedJobs(profile, 12);
          setJobs(matchedJobs.length ? matchedJobs : mockJobs);
        } catch {
          setJobs(mockJobs);
        }
      } else {
        setJobs(mockJobs);
      }
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, []);


  useEffect(() => {
    const jobId = searchParams.get("job");
    if (!jobId) return;

    const job = getJobById(jobId);
    if (job) {
      setSelectedJob(job);
    }
  }, [searchParams]);


console.log("Mock jobs:", mockJobs);

  if (isLoading) {
    return (
      <main className="min-h-screen bg-gray-100 py-12">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12">
            <div className="h-10 w-64 rounded bg-gray-200 mb-3 animate-pulse" />
            <div className="h-5 w-96 rounded bg-gray-100 animate-pulse" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <JobCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </main>
    );
  }
  
  return (
    <main className="min-h-screen bg-gray-100 py-12">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-12 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">
              {hasProfile ? "Your Best Job Matches" : "Available Open Job Listings"}
            </h1>

            <p className="mt-2 text-lg text-gray-600">
              {hasProfile
                ? "Ranked by relevance based on your experience, goals, and location"
                : "No profile yet — set one up so the AI can recommend jobs for you"}
            </p>
          </div>

          {hasProfile ? (
            <Link
              href="/career-agent"
              className="
                inline-flex items-center gap-2
                rounded-lg px-6 py-3 text-sm font-semibold text-white
                bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600
                bg-[length:200%_200%]
                hover:animate-gradient
                transition
              "
            >
              <Wand2 className="h-4 w-4" />
              <span>Chat with Career Agent</span>
            </Link>
          ) : (
            <Link
              href="/onboarding"
              className="rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-700 transition"
            >
              Set up profile
            </Link>
          )}
      </div>
        
        {/* Profile Summary */}
        {workerProfile && (
          <div className="mb-8 rounded-xl bg-white border p-6 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="space-y-1">
                <h2 className="text-lg font-semibold text-gray-900">
                  Your Profile Summary
                </h2>

                <p className="text-sm text-gray-600">
                  {workerProfile.nickname ||
                    workerProfile.firstName ||
                    "Candidate"}
                  {workerProfile.lastName ? ` ${workerProfile.lastName}` : ""}
                </p>

                <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-1 text-sm text-gray-700">
                  <div>
                    <span className="font-medium">Desired Role:</span>{" "}
                    {workerProfile.desiredPosition || "Not specified"}
                  </div>

                  <div>
                    <span className="font-medium">Experience:</span>{" "}
                    {workerProfile.yearsExperience || "0"} years
                  </div>

                  <div>
                    <span className="font-medium">Location:</span>{" "}
                    {workerProfile.currentAddressCity && workerProfile.currentAddressState
                      ? `${workerProfile.currentAddressCity}, ${workerProfile.currentAddressState}`
                      : "Not specified"}
                  </div>
                </div>
              </div>

              <Link
                href="/onboarding"
                className="inline-flex items-center justify-center rounded-lg
                          border border-blue-600 px-4 py-2 text-sm font-medium
                          text-blue-600 hover:bg-blue-50 transition"
              >
                Edit Profile
              </Link>
            </div>
          </div>
        )}

        {/* Jobs Grid */}
          {jobs.length > 0 ? (
            <div className="space-y-10">
              {/* Best Matches Section */}
              {hasProfile && bestMatches.length > 0 && (
                <div>
                  <h2 className="mb-4 text-xl font-bold text-gray-900">
                    Best Matches
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {bestMatches.map((job, index) => (
                      <JobCard
                        key={job.id}
                        job={job}
                        highlight
                        badge={`#${index + 1} Best Match`}
                        tooltip="Matched based on your experience"
                        animate
                        onViewDetails={setSelectedJob}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Other Jobs Section */}
              {otherJobs.length > 0 && (
                <div>
                  {hasProfile && (
                    <h2 className="mb-4 text-lg font-semibold text-gray-800">
                      Other Opportunities
                    </h2>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {otherJobs.map((job) => (
                      <JobCard
                        key={job.id}
                        job={job}
                        onViewDetails={setSelectedJob}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="rounded-lg bg-white p-12 text-center shadow-sm">
              <p className="text-gray-600 text-lg mb-4">
                No job matches found. Try updating your profile.
              </p>
              <Link
                href="/onboarding"
                className="inline-block rounded-lg bg-blue-600 px-6 py-2 text-white hover:bg-blue-700"
              >
                Update Profile
              </Link>
            </div>
          )}
        </div>
      {selectedJob && (
        <JobModal job={selectedJob} onClose={() => setSelectedJob(null)} />
      )}
    </main>

  );
}
