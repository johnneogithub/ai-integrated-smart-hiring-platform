import { Suspense } from "react";
import JobMatches from "./jobmatches";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading job matches...</div>}>
      <JobMatches />
    </Suspense>
  );
}
