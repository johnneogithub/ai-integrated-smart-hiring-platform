// components/onboarding/Step2Professional.tsx

import { FormData } from "@/types/formTypes";

interface Step2ProfessionalProps {
  formData: FormData;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

const inputClass =
  "w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 shadow-sm outline-none focus:border-blue-500";

const certifications = [
  ["twicCard", "TWIC Card Status"],
  ["dotMedical", "DOT Medical Certificate"],
  ["hazmat", "Hazmat Endorsement"],
  ["tanker", "Tanker Endorsement"],
  ["doublesTriples", "Doubles / Triples Endorsement"],
  ["forklift", "Forklift Certification"],
  ["osha", "OSHA Certification"],
  ["cleanDrivingRecord", "Clean Driving Record"],
  ["relocate", "Willing to Relocate"],
];

export function Step2Professional({ formData, onChange }: Step2ProfessionalProps) {
  return (
    <section className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">Professional Driver Profile</h2>

      {/* Current Role & Years Experience */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input
          name="currentRole"
          placeholder="Current Role"
          className={inputClass}
          value={formData.currentRole}
          onChange={onChange}
        />
        <input
          name="yearsExperience"
          type="number"
          placeholder="Years of Experience"
          className={inputClass}
          value={formData.yearsExperience}
          onChange={onChange}
        />
      </div>

      {/* CDL Type */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          CDL Type
        </label>
        <select
          name="cdlType"
          className={inputClass}
          value={formData.cdlType}
          onChange={onChange}
        >
          <option value="">Select CDL Type</option>
          <option>Class A</option>
          <option>Class B</option>
          <option>Class C</option>
        </select>
      </div>

      {/* Certifications */}
      <div>
        <label className="block text-sm font-semibold text-gray-900 mb-3">
          Certifications & Endorsements
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {certifications.map(([name, label]) => (
            <select
              key={name}
              name={name}
              className={inputClass}
              value={(formData as any)[name]}
              onChange={onChange}
            >
              <option value="">{label}</option>
              <option>Yes</option>
              <option>No</option>
            </select>
          ))}
        </div>
      </div>
    </section>
  );
}
