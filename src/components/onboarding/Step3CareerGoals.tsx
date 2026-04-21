// components/onboarding/Step3CareerGoals.tsx

import { FormData } from "@/types/formTypes";

interface Step3CareerGoalsProps {
  formData: FormData;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const inputClass =
  "w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 shadow-sm outline-none focus:border-blue-500";

export function Step3CareerGoals({ formData, onChange }: Step3CareerGoalsProps) {
  return (
    <section className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">Career Goals & Expectations</h2>

      {/* Location & Position Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input
          name="preferredLocation"
          placeholder="Preferred Work Location"
          className={inputClass}
          value={formData.preferredLocation}
          onChange={onChange}
        />
        <input
          name="desiredPosition"
          placeholder="Desired Next Position"
          className={inputClass}
          value={formData.desiredPosition}
          onChange={onChange}
        />
      </div>

      {/* Salary Expectation */}
      <input
        name="salaryExpectation"
        placeholder="Salary Expectation (e.g., $50,000 - $60,000)"
        className={inputClass}
        value={formData.salaryExpectation}
        onChange={onChange}
      />

      {/* Career Goal Summary */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Career Goal Summary
        </label>
        <textarea
          name="careerGoal"
          placeholder="Describe your long-term career goals and aspirations..."
          rows={4}
          className={inputClass}
          value={formData.careerGoal}
          onChange={onChange}
        />
      </div>

      {/* Why Hire You */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Why Should Employers Hire You?
        </label>
        <textarea
          name="employerReason"
          placeholder="Highlight your unique strengths, achievements, and what makes you stand out..."
          rows={4}
          className={inputClass}
          value={formData.employerReason}
          onChange={onChange}
        />
      </div>
    </section>
  );
}
