import { Suspense } from "react";
import JobMatches from "./jobmatches";
import ModeSwitcher from "@/components/navigation/ModeSwitcher";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading job matches...</div>}>
      <ModeSwitcher />
      <JobMatches />
    </Suspense>
  );
}
