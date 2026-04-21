// components/jobs/JobModal.tsx

import { JobListing } from "@/data/mockJobs";
import { X, MapPin, DollarSign, Briefcase, Clock, CheckCircle } from "lucide-react";
import { useState } from "react";

interface JobModalProps {
  job: JobListing | null;
  onClose: () => void;
}

export function JobModal({ job, onClose }: JobModalProps) {
  const [isApplying, setIsApplying] = useState(false);

  if (!job) return null;

  const handleApply = async () => {
    setIsApplying(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Here you would send the application to your backend
      // const workerProfile = JSON.parse(localStorage.getItem("workerProfile") || "{}");
      // await fetch("/api/apply", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ jobId: job.id, profile: workerProfile }),
      // });

      alert(
        `Application submitted for ${job.title}!\nYou'll hear back soon from ${job.company}.`
      );
      onClose();
    } catch (error) {
      alert("Failed to submit application. Please try again.");
    } finally {
      setIsApplying(false);
    }
  };

  const salaryDisplay = `$${job.salaryMin.toLocaleString()}-$${job.salaryMax.toLocaleString()}/${job.salaryType === "hour" ? "hr" : "yr"}`;

  const getEmploymentTypeColor = (type: string) => {
    switch (type) {
      case "Full-time":
        return "bg-blue-100 text-blue-800";
      case "Part-time":
        return "bg-amber-100 text-amber-800";
      case "Contract":
        return "bg-purple-100 text-purple-800";
      case "Freelance":
        return "bg-green-100 text-green-800";
      case "For Hire":
        return "bg-pink-100 text-pink-800";
      case "Pooling":
        return "bg-cyan-100 text-cyan-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-lg bg-white shadow-2xl">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close modal"
          title="Close modal"
          className="sticky top-4 right-4 z-10 ml-auto block rounded-full bg-white p-2 hover:bg-gray-100"
        >
          <X className="h-6 w-6 text-gray-600" />
        </button>

        {/* Modal Content */}
        <div className="p-8">
          {/* Header */}
          <div className="mb-8">
            <div className="mb-4 flex items-start justify-between gap-4">
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-gray-900">
                  {job.title}
                </h1>
                <p className="mt-2 text-lg text-gray-600">{job.company}</p>
              </div>
            </div>

            {/* Status Badge */}
            <div className="flex flex-wrap gap-2">
              <span
                className={`inline-block rounded-full px-3 py-1 text-sm font-medium ${getEmploymentTypeColor(
                  job.employmentType
                )}`}
              >
                {job.employmentType}
              </span>
              {job.applicationsOpen && (
                <span className="inline-block rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800">
                  Accepting Applications
                </span>
              )}
            </div>
          </div>

          {/* Key Details */}
          <div className="mb-8 grid grid-cols-1 gap-4 rounded-lg bg-gray-50 p-6 sm:grid-cols-2">
            <div>
              <div className="mb-2 flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-green-600" />
                <span className="text-sm font-medium text-gray-600">
                  Salary Range
                </span>
              </div>
              <p className="text-lg font-bold text-gray-900">
                {salaryDisplay}
              </p>
            </div>

            <div>
              <div className="mb-2 flex items-center gap-2">
                <MapPin className="h-5 w-5 text-red-600" />
                <span className="text-sm font-medium text-gray-600">
                  Location
                </span>
              </div>
              <p className="text-lg font-bold text-gray-900">
                {job.location}
                {job.distance > 0 && (
                  <span className="ml-2 text-sm text-gray-600">
                    ({job.distance} miles)
                  </span>
                )}
              </p>
            </div>

            <div>
              <div className="mb-2 flex items-center gap-2">
                <Briefcase className="h-5 w-5 text-blue-600" />
                <span className="text-sm font-medium text-gray-600">
                  Type
                </span>
              </div>
              <p className="text-lg font-bold text-gray-900">
                {job.employmentType}
              </p>
            </div>

            <div>
              <div className="mb-2 flex items-center gap-2">
                <Clock className="h-5 w-5 text-amber-600" />
                <span className="text-sm font-medium text-gray-600">
                  Posted
                </span>
              </div>
              <p className="text-lg font-bold text-gray-900">
                {new Date(job.postedDate).toLocaleDateString()}
              </p>
            </div>
          </div>

          {/* Full Description */}
          <div className="mb-8">
            <h2 className="mb-4 text-xl font-bold text-gray-900">
              About This Role
            </h2>
            <div className="prose prose-sm max-w-none text-gray-700">
              {job.fullDescription.split("\n").map((paragraph, idx) => (
                <p key={idx} className="mb-3 whitespace-pre-wrap">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          {/* Requirements */}
          {job.requirements.length > 0 && (
            <div className="mb-8">
              <h3 className="mb-4 text-lg font-bold text-gray-900">
                Key Requirements
              </h3>
              <ul className="space-y-2">
                {job.requirements.map((req, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle className="mt-1 h-5 w-5 flex-shrink-0 text-green-600" />
                    <span className="text-gray-700">{req}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Benefits */}
          {job.benefits.length > 0 && (
            <div className="mb-8">
              <h3 className="mb-4 text-lg font-bold text-gray-900">
                Benefits & Perks
              </h3>
              <ul className="space-y-2">
                {job.benefits.map((benefit, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle className="mt-1 h-5 w-5 flex-shrink-0 text-blue-600" />
                    <span className="text-gray-700">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Apply Button */}
          <div className="border-t pt-6">
            <button
              onClick={handleApply}
              disabled={!job.applicationsOpen || isApplying}
              className="w-full rounded-lg bg-blue-600 py-3 text-lg font-bold text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              {isApplying ? "Submitting Application..." : "Apply Now"}
            </button>
            {!job.applicationsOpen && (
              <p className="mt-3 text-center text-sm text-red-600">
                This position is currently closed
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
