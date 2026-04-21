// components/onboarding/Step1Personal.tsx

import { FormData } from "@/types/formTypes";

interface Step1PersonalProps {
  formData: FormData;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

const inputClass =
  "w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 shadow-sm outline-none focus:border-blue-500";

export function Step1Personal({ formData, onChange }: Step1PersonalProps) {
  return (
    <section className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">Personal Information</h2>

      {/* Full Name */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input
          name="firstName"
          placeholder="First Name"
          className={inputClass}
          value={formData.firstName}
          onChange={onChange}
        />

        <input
          name="middleName"
          placeholder="Middle Name (Optional)"
          className={inputClass}
          value={formData.middleName}
          onChange={onChange}
        />

        <input
          name="lastName"
          placeholder="Last Name"
          className={inputClass}
          value={formData.lastName}
          onChange={onChange}
        />

        <input
          name="nickname"
          placeholder="Nickname (How should we call you?)"
          className={inputClass}
          value={formData.nickname}
          onChange={onChange}
        />
      </div>


      {/* Age & Sex Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input
          name="age"
          type="number"
          placeholder="Age"
          className={inputClass}
          value={formData.age}
          onChange={onChange}
        />
        <select
          name="sex"
          className={inputClass}
          value={formData.sex}
          onChange={onChange}
        >
          <option value="">Select Sex</option>
          <option>Male</option>
          <option>Female</option>
          <option>Other</option>
        </select>
      </div>

      {/* Preferred Gender & Birthdate Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input
          name="preferredGender"
          placeholder="Preferred Gender (Optional)"
          className={inputClass}
          value={formData.preferredGender}
          onChange={onChange}
        />
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Date of Birth
          </label>
          <input
            type="date"
            name="birthdate"
            className={inputClass}
            value={formData.birthdate}
            onChange={onChange}
          />
        </div>
      </div>

      {/* Current Address */}
      <div>
        <label className="block text-sm font-semibold text-gray-900 mb-3">
          Current Address
        </label>
        <div className="space-y-3">
          <input
            name="currentAddressStreet"
            placeholder="Street Address"
            className={inputClass}
            value={formData.currentAddressStreet}
            onChange={onChange}
          />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <input
              name="currentAddressCity"
              placeholder="City"
              className={inputClass}
              value={formData.currentAddressCity}
              onChange={onChange}
            />
            <input
              name="currentAddressState"
              placeholder="State"
              maxLength={2}
              className={inputClass}
              value={formData.currentAddressState}
              onChange={onChange}
            />
            <input
              name="currentAddressZip"
              placeholder="ZIP Code"
              className={inputClass}
              value={formData.currentAddressZip}
              onChange={onChange}
            />
          </div>
        </div>
      </div>

      {/* Birth Address */}
      <div>
        <label className="block text-sm font-semibold text-gray-900 mb-3">
          Birth Address
        </label>
        <div className="space-y-3">
          <input
            name="birthAddressStreet"
            placeholder="Street Address"
            className={inputClass}
            value={formData.birthAddressStreet}
            onChange={onChange}
          />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <input
              name="birthAddressCity"
              placeholder="City"
              className={inputClass}
              value={formData.birthAddressCity}
              onChange={onChange}
            />
            <input
              name="birthAddressState"
              placeholder="State"
              maxLength={2}
              className={inputClass}
              value={formData.birthAddressState}
              onChange={onChange}
            />
            <input
              name="birthAddressZip"
              placeholder="ZIP Code"
              className={inputClass}
              value={formData.birthAddressZip}
              onChange={onChange}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
