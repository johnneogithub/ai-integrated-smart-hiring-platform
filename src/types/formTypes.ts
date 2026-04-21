// types/formTypes.ts

export type FormData = {
  // Personal Information
  firstName: string;
  middleName?: string;
  lastName: string;
  nickname?: string;
  age: string;
  sex: string;
  preferredGender: string;
  birthdate: string;
  currentAddressStreet: string;
  currentAddressCity: string;
  currentAddressState: string;
  currentAddressZip: string;
  birthAddressStreet: string;
  birthAddressCity: string;
  birthAddressState: string;
  birthAddressZip: string;

  // Professional Driver Profile
  currentRole: string;
  yearsExperience: string;
  cdlType: string;
  twicCard: string;
  dotMedical: string;
  hazmat: string;
  tanker: string;
  doublesTriples: string;
  forklift: string;
  osha: string;
  cleanDrivingRecord: string;
  relocate: string;

  // Career Goals
  preferredLocation: string;
  desiredPosition: string;
  salaryExpectation: string;
  careerGoal: string;
  employerReason: string;
};

export const initialFormData: FormData = {
  // Personal Information
  fullName: "",
  age: "",
  sex: "",
  preferredGender: "",
  birthdate: "",
  currentAddressStreet: "",
  currentAddressCity: "",
  currentAddressState: "",
  currentAddressZip: "",
  birthAddressStreet: "",
  birthAddressCity: "",
  birthAddressState: "",
  birthAddressZip: "",

  // Professional Driver Profile
  currentRole: "",
  yearsExperience: "",
  cdlType: "",
  twicCard: "",
  dotMedical: "",
  hazmat: "",
  tanker: "",
  doublesTriples: "",
  forklift: "",
  osha: "",
  cleanDrivingRecord: "",
  relocate: "",

  // Career Goals
  preferredLocation: "",
  desiredPosition: "",
  salaryExpectation: "",
  careerGoal: "",
  employerReason: "",
};
