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

export default function JobMatches() {
  const [jobs, setJobs] = useState<JobListing[]>(mockJobs);
  const [selectedJob, setSelectedJob] = useState<JobListing | null>(null);
  const [workerProfile, setWorkerProfile] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  const searchParams = useSearchParams();
  const filter = searchParams.get("filter");

    useEffect(() => {
    const saved = localStorage.getItem("workerProfile");
    if (saved) {
        try {
        const profile = JSON.parse(saved);
        setWorkerProfile(profile);
        const matchedJobs = getMatchedJobs(profile, 12);
        setJobs(matchedJobs.length ? matchedJobs : mockJobs); //
        } catch {
        setJobs(mockJobs);
        }
    } else {
        setJobs(mockJobs); // 
    }
    setIsLoading(false);
    }, []);


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

console.log("Mock jobs:", mockJobs);

  return (
    <main className="min-h-screen bg-gray-100 py-12">
    <div className="mx-auto max-w-7xl px-6">
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

    {selectedJob && (
        <JobModal job={selectedJob} onClose={() => setSelectedJob(null)} />
    )}
    </main>

  );
}
