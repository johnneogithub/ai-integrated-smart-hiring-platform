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

export default function JobMatchesPage() {
  const [jobs, setJobs] = useState<JobListing[]>(mockJobs);
  const [selectedJob, setSelectedJob] = useState<JobListing | null>(null);
  const [workerProfile, setWorkerProfile] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  const searchParams = useSearchParams();

  // Load worker profile and calculate matches
  useEffect(() => {
    const saved = localStorage.getItem("workerProfile");

    if (saved) {
      try {
        const profile = JSON.parse(saved);
        setWorkerProfile(profile);

        const matchedJobs = getMatchedJobs(profile, 12);
        setJobs(matchedJobs as JobListing[]);
      } catch (error) {
        console.error("Failed to load profile:", error);
        setJobs(mockJobs);
      }
    } else {
      setJobs(mockJobs);
    }

    setIsLoading(false);
  }, []);

  // Open job modal via ?job=job-id
  useEffect(() => {
    const jobId = searchParams.get("job");
    if (!jobId) return;

    const job = getJobById(jobId);
    if (job) {
      setSelectedJob(job);
    }
  }, [searchParams]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin h-12 w-12 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4" />
          <p className="text-gray-600">Loading job matches...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100 py-12">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="mb-12">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900">
                Your Job Matches
              </h1>
              <p className="mt-2 text-lg text-gray-600">
                AI-powered recommendations based on your profile
              </p>
            </div>
            <Link
              href="/career-agent"
              className="rounded-lg bg-indigo-600 px-6 py-3 text-sm font-semibold text-white hover:bg-indigo-700 transition"
            >
              Chat with Career Agent
            </Link>
          </div>

          {/* Profile Summary */}
          {workerProfile && (
            <div className="rounded-lg bg-white p-6 shadow-sm border-l-4 border-blue-600">
              <h2 className="text-sm font-semibold text-gray-600 uppercase mb-3">
                Your Profile
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div>
                  <p className="text-xs text-gray-500">Current Role</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {workerProfile.currentRole || "Not specified"}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Experience</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {workerProfile.yearsExperience || "0"} years
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Location</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {workerProfile.currentAddressCity || "N/A"}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Looking For</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {workerProfile.desiredPosition || "Any role"}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Jobs Grid */}
        {jobs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                onViewDetails={setSelectedJob}
              />
            ))}
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

      {/* Job Detail Modal */}
      <JobModal
        job={selectedJob}
        onClose={() => setSelectedJob(null)}
      />
    </main>
  );
}
``