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
      {/* ... your existing JSX ... */}
      <JobModal job={selectedJob} onClose={() => setSelectedJob(null)} />
    </main>
  );
}
