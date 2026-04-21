// data/mockJobs.ts

export type JobListing = {
  id: string;
  title: string;
  company: string;
  description: string;
  fullDescription: string;
  employmentType: "Full-time" | "Part-time" | "Freelance" | "Contract" | "For Hire" | "Pooling";
  salaryMin: number;
  salaryMax: number;
  salaryType: "hour" | "year";
  location: string;
  distance: number; // in miles
  requirements: string[];
  benefits: string[];
  postedDate: string;
  applicationsOpen: boolean;
  matchScore?: number; // For AI matching later
};

export const mockJobs: JobListing[] = [
  {
    id: "job-001",
    title: "Senior Logistics Manager",
    company: "TransLogix Solutions",
    description:
      "Lead our operations team managing fleet logistics and supply chain optimization across the Southeast region.",
    fullDescription: `
      TransLogix Solutions is seeking an experienced Senior Logistics Manager to oversee our regional operations. 
      
      **Responsibilities:**
      • Manage fleet operations and logistics for 50+ vehicles
      • Optimize routing and delivery schedules
      • Lead and mentor a team of 8-10 logistics coordinators
      • Monitor compliance with DOT regulations
      • Reduce operational costs while improving efficiency
      • Handle customer relationships and resolve logistics issues
      
      **Requirements:**
      • 8+ years of logistics/supply chain experience
      • Class A CDL preferred
      • Strong leadership skills
      • Proficiency in logistics management software
      • Excellent communication abilities
      
      **Why Join Us:**
      • Competitive salary with performance bonuses
      • Comprehensive health insurance
      • 401(k) matching program
      • Paid time off and holidays
      • Professional development opportunities
      • Modern logistics technology
    `,
    employmentType: "Full-time",
    salaryMin: 65,
    salaryMax: 85,
    salaryType: "hour",
    location: "Charlotte, NC",
    distance: 156,
    requirements: [
      "Class A CDL",
      "8+ years experience",
      "Leadership experience",
      "DOT Medical Certificate",
    ],
    benefits: [
      "Health Insurance",
      "401(k) Matching",
      "Paid Time Off",
      "Performance Bonuses",
    ],
    postedDate: "2024-04-15",
    applicationsOpen: true,
  },
  {
    id: "job-002",
    title: "Regional Operations Supervisor",
    company: "Premier Freight Services",
    description:
      "Oversee daily operations for our Northeast distribution center. Manage staff, ensure on-time deliveries, and maintain safety standards.",
    fullDescription: `
      Premier Freight Services is expanding and looking for an Operations Supervisor to manage our growing Northeast distribution hub.
      
      **Responsibilities:**
      • Oversee 30+ drivers and logistics staff
      • Ensure 99%+ on-time delivery rate
      • Implement safety protocols and training
      • Manage warehouse operations and inventory
      • Monitor KPIs and prepare performance reports
      • Coordinate with dispatch and customer service teams
      
      **Requirements:**
      • 5+ years in logistics or transportation
      • Class A CDL or supervisory experience
      • Strong organizational and problem-solving skills
      • Experience with dispatch systems
      • Ability to work flexible hours
      
      **Benefits:**
      • Competitive salary with bonuses
      • Health, dental, and vision insurance
      • Retirement plan with matching
      • Continuing education support
      • Career advancement opportunities
    `,
    employmentType: "Full-time",
    salaryMin: 52,
    salaryMax: 68,
    salaryType: "hour",
    location: "Newark, NJ",
    distance: 245,
    requirements: [
      "5+ years logistics experience",
      "Supervisory skills",
      "DOT Medical Certificate",
      "Clean driving record",
    ],
    benefits: [
      "Health Insurance",
      "Dental & Vision",
      "Retirement Plan",
      "Bonuses",
    ],
    postedDate: "2024-04-14",
    applicationsOpen: true,
  },
  {
    id: "job-003",
    title: "Contract Driver - OTR Long Haul",
    company: "Continental Trucking Corp",
    description:
      "Independent contractor position for experienced long-haul drivers. Work your own schedule on our freight network across North America.",
    fullDescription: `
      Continental Trucking Corp is hiring experienced OTR drivers for contract work.
      
      **Position Details:**
      • Long-haul routes across North America
      • Work as independent contractor
      • Flexible scheduling - choose your loads
      • High-value freight lanes
      • Dedicated load matching
      • Weekly payment options available
      
      **Requirements:**
      • Class A CDL required
      • Minimum 3 years OTR experience
      • HAZMAT and TANKER endorsements preferred
      • Clean MVR and background check
      • Reliable, late-model truck
      • Professional liability insurance
      
      **Compensation:**
      • Per-mile or per-load rates (highly competitive)
      • Fuel surcharges
      • Detention pay
      • Stop payments
      • Bonus incentives for compliance
      
      **Why Join:**
      • Owner-operator friendly
      • No forced dispatch
      • Load optimization tools
      • 24/7 support team
    `,
    employmentType: "Contract",
    salaryMin: 48,
    salaryMax: 72,
    salaryType: "hour",
    location: "Atlanta, GA",
    distance: 398,
    requirements: [
      "Class A CDL",
      "3+ years OTR",
      "HAZMAT Endorsement",
      "Clean MVR",
    ],
    benefits: [
      "Flexible Schedule",
      "Weekly Pay",
      "Fuel Surcharges",
      "Load Matching",
    ],
    postedDate: "2024-04-13",
    applicationsOpen: true,
  },
  {
    id: "job-004",
    title: "Part-Time Delivery Driver",
    company: "Urban Express Logistics",
    description:
      "Flexible part-time delivery driver for local same-day delivery service. Perfect for supplemental income or transitioning to full-time.",
    fullDescription: `
      Urban Express Logistics is hiring flexible delivery drivers for our growing same-day delivery network.
      
      **Position Overview:**
      • Local delivery routes (city-wide)
      • Flexible hours - work 20-40 hours per week
      • Evening and weekend shifts available
      • Autonomous vehicle support system
      • Real-time route optimization
      
      **What You'll Do:**
      • Deliver packages to residential and commercial customers
      • Maintain vehicle in good condition
      • Collect payments and handle returns
      • Provide excellent customer service
      • Document deliveries with photo evidence
      
      **Requirements:**
      • Valid driver's license
      • Reliable vehicle (or use company vehicle)
      • Background check
      • Customer service skills
      • Smartphone required
      
      **Flexibility:**
      • Set your own schedule
      • Work as many or as few hours as you want
      • Choose your shifts
      • No minimum commitment
      
      **Pay & Perks:**
      • Hourly rate plus delivery bonuses
      • Fuel reimbursement
      • Weekly pay
      • Referral bonuses
    `,
    employmentType: "Part-time",
    salaryMin: 20,
    salaryMax: 28,
    salaryType: "hour",
    location: "Wilmington, NC",
    distance: 0,
    requirements: [
      "Valid driver's license",
      "Reliable vehicle",
      "Clean background",
      "Smartphone",
    ],
    benefits: [
      "Flexible Hours",
      "Weekly Pay",
      "Fuel Reimbursement",
      "Bonuses",
    ],
    postedDate: "2024-04-12",
    applicationsOpen: true,
  },
  {
    id: "job-005",
    title: "Fleet Operations Coordinator",
    company: "Southeast Logistics Hub",
    description:
      "Coordinate daily fleet operations, dispatch, and maintenance for our 100+ vehicle operation. Ideal for operations specialist looking to grow.",
    fullDescription: `
      Southeast Logistics Hub seeks a detail-oriented Fleet Operations Coordinator to support our growing operations team.
      
      **Role Highlights:**
      • Coordinate driver schedules and dispatching
      • Monitor vehicle maintenance and repairs
      • Track fleet utilization and performance metrics
      • Communicate with drivers and customers
      • Maintain compliance documentation
      • Use fleet management software
      
      **Key Responsibilities:**
      • Daily dispatch coordination for 100+ vehicles
      • Maintenance tracking and scheduling
      • Driver communication and support
      • Performance reporting and analysis
      • Safety compliance monitoring
      • Customer communication on delivery status
      
      **Qualifications:**
      • 2+ years in logistics coordination
      • Proficiency with dispatch/fleet software
      • Excellent communication skills
      • Problem-solving ability
      • Attention to detail
      • Ability to multitask
      
      **Why This Role:**
      • Clear path to Operations Manager
      • Modern technology and tools
      • Supportive team environment
      • Competitive compensation
      • Professional growth opportunities
    `,
    employmentType: "Full-time",
    salaryMin: 38,
    salaryMax: 48,
    salaryType: "hour",
    location: "Columbia, SC",
    distance: 98,
    requirements: [
      "2+ years logistics experience",
      "Fleet management software",
      "Strong communication",
      "DOT knowledge",
    ],
    benefits: [
      "Health Insurance",
      "Career Development",
      "401(k)",
      "Paid Time Off",
    ],
    postedDate: "2024-04-11",
    applicationsOpen: true,
  },
  {
    id: "job-006",
    title: "For-Hire Consultant - Logistics Optimization",
    company: "Strategic Logistics Consulting",
    description:
      "Freelance consultant needed for short-term and ongoing logistics optimization projects. Share your expertise with multiple clients.",
    fullDescription: `
      Strategic Logistics Consulting is building a network of experienced logistics consultants for project-based work.
      
      **Engagement Model:**
      • Project-based consulting (4-12 week engagements)
      • Multiple concurrent clients
      • Remote work available
      • Flexible availability
      • High-value strategic projects
      
      **Typical Projects:**
      • Route optimization analysis
      • Operational efficiency reviews
      • Cost reduction initiatives
      • Technology implementation guidance
      • Training and mentoring
      • Process improvement consulting
      
      **Your Background Should Include:**
      • 5+ years in logistics operations
      • Proven optimization experience
      • Project management skills
      • Industry expertise (preferred: trucking/freight)
      • Strong analytical skills
      • Excellent presentation abilities
      
      **Why Work With Us:**
      • Choose your projects
      • Set your rate
      • Build your consulting brand
      • Work with quality clients
      • Flexible schedule
      • Growing opportunity
      
      **Typical Rates:**
      • $65-$150 per hour (varies by expertise)
      • Project-based fees available
      • Retainer arrangements possible
    `,
    employmentType: "For Hire",
    salaryMin: 65,
    salaryMax: 150,
    salaryType: "hour",
    location: "Remote",
    distance: 0,
    requirements: [
      "5+ years logistics experience",
      "Optimization expertise",
      "Project management",
      "Strong communication",
    ],
    benefits: [
      "Flexible Schedule",
      "Remote Work",
      "High Rates",
      "Project Variety",
    ],
    postedDate: "2024-04-10",
    applicationsOpen: true,
  },
];

/**
 * Helper function for Claude AI to access and filter jobs
 * Can be called from the backend when matching candidates with jobs
 */
export function getJobById(id: string): JobListing | undefined {
  return mockJobs.find((job) => job.id === id);
}

export function getJobsByType(
  type: JobListing["employmentType"]
): JobListing[] {
  return mockJobs.filter((job) => job.employmentType === type);
}

export function getJobsByLocation(location: string): JobListing[] {
  return mockJobs.filter(
    (job) =>
      job.location.toLowerCase().includes(location.toLowerCase()) ||
      job.distance < 100
  );
}

/**
 * Calculate match score between candidate profile and job
 * This will be used by Claude AI for intelligent matching
 */
export function calculateJobMatchScore(
  candidateProfile: any,
  job: JobListing
): number {
  let score = 0;

  // Years of experience match
  const candidateYears = parseInt(candidateProfile.yearsExperience) || 0;
  if (candidateYears >= 5) score += 25;
  else if (candidateYears >= 3) score += 15;
  else if (candidateYears >= 1) score += 8;

  // Location proximity
  if (job.distance === 0) score += 20; // Remote or local
  else if (job.distance < 50) score += 15;
  else if (job.distance < 150) score += 10;
  else if (job.distance < 250) score += 5;

  // Employment type preference
  const candidateWillingToRelocate =
    candidateProfile.relocate === "Yes";
  if (
    job.employmentType === "Full-time" &&
    candidateWillingToRelocate
  )
    score += 20;
  else if (job.employmentType === "Part-time") score += 15;
  else if (job.employmentType === "Contract") score += 10;

  // Certifications match
  const candidateCerts = [
    candidateProfile.cdlType ? "CDL" : null,
    candidateProfile.hazmat === "Yes" ? "HAZMAT" : null,
    candidateProfile.tanker === "Yes" ? "TANKER" : null,
    candidateProfile.dotMedical === "Yes" ? "DOT Medical" : null,
  ].filter(Boolean);

  const jobReqCount = job.requirements.length;
  const matchingCerts = job.requirements.filter((req) =>
    candidateCerts.some((cert) => req.includes(cert as string))
  ).length;

  if (jobReqCount > 0) {
    score += (matchingCerts / jobReqCount) * 20;
  }

  // Salary expectation match
  const candidateSalary = parseInt(candidateProfile.salaryExpectation) || 0;
  const jobMidpoint = (job.salaryMin + job.salaryMax) / 2;

  if (job.salaryType === "hour") {
    if (candidateSalary <= jobMidpoint) score += 15;
    else if (candidateSalary <= jobMidpoint * 1.2) score += 10;
  }

  return Math.min(Math.round(score), 100);
}

/**
 * Get top matching jobs for a candidate
 * This will be the primary function Claude AI uses
 */
export function getMatchedJobs(candidateProfile: any, limit = 5) {
  const scoredJobs = mockJobs.map((job) => ({
    ...job,
    matchScore: calculateJobMatchScore(candidateProfile, job),
  }));

  return scoredJobs
    .sort((a, b) => (b.matchScore || 0) - (a.matchScore || 0))
    .slice(0, limit);
}
