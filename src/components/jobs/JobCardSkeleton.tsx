export function JobCardSkeleton() {
  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm animate-pulse">
      {/* Badge */}
      <div className="mb-3 h-5 w-24 rounded-full bg-gray-200" />

      {/* Job title */}
      <div className="mb-2 h-5 w-3/4 rounded bg-gray-200" />

      {/* Company */}
      <div className="mb-4 h-4 w-1/2 rounded bg-gray-100" />

      {/* Description */}
      <div className="space-y-2 mb-6">
        <div className="h-3 w-full rounded bg-gray-100" />
        <div className="h-3 w-5/6 rounded bg-gray-100" />
      </div>

      {/* Meta */}
      <div className="flex justify-between">
        <div className="h-4 w-20 rounded bg-gray-100" />
        <div className="h-4 w-16 rounded bg-gray-100" />
      </div>

      {/* CTA */}
      <div className="mt-6 h-10 w-full rounded-lg bg-gray-200" />
    </div>
  );
}