// components/jobs/JobCard.tsx

import { JobListing } from "@/data/mockJobs";
import { MapPin, Clock, DollarSign } from "lucide-react";

type JobCardProps = {
  job: JobListing;
  onViewDetails: (job: JobListing) => void;

  highlight?: boolean;
  badge?: string;
  tooltip?: string;
  animate?: boolean;
};

export function JobCard({
  job,
  onViewDetails,
  highlight,
  badge,
  tooltip,
  animate
}: JobCardProps) {
  const salaryDisplay = `$${job.salaryMin.toLocaleString()}-${job.salaryMax.toLocaleString()}/${job.salaryType === "hour" ? "hr" : "yr"}`;

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
      <div
        onClick={() => onViewDetails(job)}
        className={`relative group cursor-pointer rounded-lg border p-6 shadow-sm transition-all
          ${highlight
            ? "border-blue-500 ring-2 ring-blue-200 bg-blue-50"
            : "border-gray-200 bg-white hover:shadow-lg hover:border-blue-300"}
          ${animate ? "animate-fade-in-up" : ""}
        `}
      >
      {/* Best Match Badge */}
      {badge && (
        <div className="absolute top-3 right-3 group/badge">
          <span className="rounded-full bg-blue-600 px-3 py-1 text-xs font-semibold text-white">
            {badge}
          </span>

          {tooltip && (
            <div className="pointer-events-none absolute right-0 mt-2 w-48
                            rounded-md bg-gray-900 px-3 py-2 text-xs text-white
                            opacity-0 group-hover/badge:opacity-100 transition">
              {tooltip}
            </div>
          )}
        </div>
      )}

      {/* Header */}
      <div className="mb-3 flex items-start justify-between">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition">
            {job.title}
          </h3>
          <p className="text-sm text-gray-600 mt-1">{job.company}</p>
        </div>
      </div>

      {/* Description */}
      <p className="text-sm text-gray-600 line-clamp-2 mb-4">
        {job.description}
      </p>

      {/* Tags */}
      <div className="mb-4 flex flex-wrap gap-2">
        <span
          className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${getEmploymentTypeColor(
            job.employmentType
          )}`}
        >
          {job.employmentType}
        </span>

        {job.applicationsOpen && (
          <span className="inline-block rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-800">
            Open
          </span>
        )}
      </div>

      {/* Details Grid */}
      <div className="space-y-3 mb-6 border-t border-gray-200 pt-4">
        {/* Salary */}
        <div className="flex items-center gap-2">
          <DollarSign className="h-4 w-4 text-green-600" />
          <span className="text-sm font-semibold text-gray-900">
            {salaryDisplay}
          </span>
        </div>

        {/* Location */}
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-red-600" />
          <div className="flex-1">
            <span className="text-sm text-gray-700">{job.location}</span>
            {job.distance > 0 && (
              <span className="text-xs text-gray-500 ml-1">
                ({job.distance} miles)
              </span>
            )}
          </div>
        </div>

        {/* Posted Date */}
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-blue-600" />
          <span className="text-sm text-gray-700">
            Posted {new Date(job.postedDate).toLocaleDateString()}
          </span>
        </div>
      </div>

      {/* CTA Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onViewDetails(job);
        }}
        className="w-full rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 transition"
      >
        View Details & Apply
      </button>
    </div>
  );
}