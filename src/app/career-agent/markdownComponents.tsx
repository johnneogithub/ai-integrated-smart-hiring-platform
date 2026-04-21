"use client";

import type { Components } from "react-markdown";
import { getJobById } from "@/data/mockJobs";
import { JobCard } from "@/components/chat/JobCard";

type CodeProps = {
  inline?: boolean;
  className?: string;
  children?: React.ReactNode;
  node?: any;
  [key: string]: any;
};

export const markdownComponents: Components = {
  h1: ({ children }) => (
    <h1 className="mt-4 mb-3 text-2xl font-bold">{children}</h1>
  ),

  h2: ({ children }) => (
    <h2 className="mt-3 mb-2 text-xl font-bold">{children}</h2>
  ),

  p: ({ children }) => (
    <p className="mb-3 leading-relaxed">{children}</p>
  ),

  li: ({ children }) => (
    <li className="leading-relaxed">{children}</li>
  ),

  code: ({ inline, className, children, ...props }: CodeProps) => {
    /* Job card fence: ```job */
    if (className === "language-job") {
      const jobId = String(children).trim();
      const job = getJobById(jobId);

      if (!job) {
        return (
          <div className="rounded bg-red-100 p-2 text-sm text-red-700">
            Invalid job reference: {jobId}
          </div>
        );
      }

      return (
        <JobCard
          jobId={job.id}
          title={job.title}
          company={job.company}
          location={job.location}
          salary={`$${job.salaryMin}-${job.salaryMax}/${job.salaryType}`}
          employmentType={job.employmentType}
          matchScore={job.matchScore ?? 0}
        />
      );
    }

    /* Inline code */
    if (inline) {
      return (
        <code
          className="rounded bg-gray-200 px-1 text-sm font-mono"
          {...props}
        >
          {children}
        </code>
      );
    }

    /* Normal code block */
    return (
      <pre className="mt-3 overflow-x-auto rounded-lg bg-gray-900 p-4 text-sm text-gray-100">
        <code>{children}</code>
      </pre>
    );
  },
};