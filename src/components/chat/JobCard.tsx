// components/chat/JobCard.tsx

import Link from "next/link";

interface JobCardProps {
  title: string;
  company: string;
  location: string;
  salary: string;
  employmentType: string;
  matchScore: number;
  jobId: string;
}

export function JobCard({
  title,
  company,
  location,
  salary,
  employmentType,
  matchScore,
  jobId,
}: JobCardProps) {
  return (
    <Link
      href={`/job-matches?job=${jobId}`}
      className="block"
    >
      <div className="my-4 rounded-xl border border-gray-200 bg-gray-50 p-4 shadow-sm transition hover:border-blue-500 hover:shadow-md cursor-pointer">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-base font-semibold text-gray-900">
              {title}
            </h3>
            <p className="text-sm text-gray-600">{company}</p>
          </div>

        </div>

        <div className="mt-3 space-y-1 text-sm text-gray-700">
          <p>📍 {location}</p>
          <p>💼 {employmentType}</p>
          <p>💰 {salary}</p>
        </div>

        <div className="mt-3 text-xs text-blue-600 font-medium">
          View full details →
        </div>
      </div>
    </Link>
  );
}