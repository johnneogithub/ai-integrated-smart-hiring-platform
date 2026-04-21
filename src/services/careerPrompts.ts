// services/careerPrompts.ts

import { FormData } from "@/types/formTypes";
import { JobListing } from "@/data/mockJobs";

/**
 * Generate system prompt for career agent with candidate context
 */
export function getCareerAgentSystemPrompt(profile: FormData): string {
  return `You are an intelligent Career Agent AI assistant specialized in helping logistics and transportation workers advance their careers.

**CANDIDATE PROFILE:**
- Name: ${profile.fullName || "Candidate"}
- Current Role: ${profile.currentRole || "Not specified"}
- Years of Experience: ${profile.yearsExperience || "0"} years
- Location: ${profile.currentAddressCity}, ${profile.currentAddressState}
- Desired Position: ${profile.desiredPosition || "Not specified"}
- Salary Expectation: ${profile.salaryExpectation || "Not specified"}
- Career Goal: ${profile.careerGoal || "Not specified"}

**CERTIFICATIONS & ENDORSEMENTS:**
- CDL Type: ${profile.cdlType || "None"}
- TWIC Card: ${profile.twicCard || "No"}
- DOT Medical: ${profile.dotMedical || "No"}
- HAZMAT: ${profile.hazmat || "No"}
- TANKER: ${profile.tanker || "No"}
- Doubles/Triples: ${profile.doublesTriples || "No"}
- Forklift: ${profile.forklift || "No"}
- OSHA: ${profile.osha || "No"}
- Clean Driving Record: ${profile.cleanDrivingRecord || "No"}
- Willing to Relocate: ${profile.relocate || "No"}

**WHY HIRE YOU:**
${profile.employerReason || "Not specified"}

**YOUR ROLE:**
1. Analyze the candidate's profile and strengths
2. Provide personalized career advice and guidance
3. Explain job matches and why they're a good fit
4. Answer questions about career progression
5. Help with interview preparation
6. Provide industry insights for logistics/transportation sector
7. Be encouraging and supportive

**TONE:** Professional, encouraging, knowledgeable, and supportive. Act as a career mentor.

**IMPORTANT:** Always reference their specific profile data when making recommendations.`;
}

/**
 * Generate analysis prompt for initial profile summary
 */
export function getProfileAnalysisPrompt(profile: FormData): string {
  const certCount = [
    profile.cdlType,
    profile.twicCard === "Yes",
    profile.dotMedical === "Yes",
    profile.hazmat === "Yes",
    profile.tanker === "Yes",
    profile.doublesTriples === "Yes",
    profile.forklift === "Yes",
    profile.osha === "Yes",
  ].filter(Boolean).length;

  return `Analyze this logistics worker's profile and provide a comprehensive career summary:

**CANDIDATE:**
- Name: ${profile.fullName}
- Experience: ${profile.yearsExperience} years as a ${profile.currentRole}
- Location: ${profile.currentAddressCity}, ${profile.currentAddressState}
- Goal: Transition to ${profile.desiredPosition}

**STRENGTHS & QUALIFICATIONS:**
- Number of certifications: ${certCount}
- CDL Status: ${profile.cdlType}
- Additional certifications: ${[
    profile.hazmat === "Yes" && "HAZMAT Endorsement",
    profile.tanker === "Yes" && "Tanker Endorsement",
    profile.doublesTriples === "Yes" && "Doubles/Triples",
    profile.forklift === "Yes" && "Forklift",
    profile.osha === "Yes" && "OSHA",
  ]
    .filter(Boolean)
    .join(", ") || "None listed"}

**CAREER MOTIVATION:**
${profile.employerReason}

Please provide:
1. A 2-3 sentence professional summary of their strengths
2. Key competitive advantages (3-4 points)
3. Areas for skill development (2-3 recommendations)
4. Career progression opportunities for their next 2-3 years
5. Recommended immediate actions to strengthen their candidacy

Format as clear, encouraging bullet points. Be specific to their profile.`;
}

/**
 * Generate prompt for job matching explanation
 */
export function getJobMatchExplanationPrompt(
  profile: FormData,
  job: JobListing,
  matchScore: number
): string {
  return `Based on this candidate's profile and job listing, explain why this is a ${matchScore}% match:

**CANDIDATE:**
- Current Role: ${profile.currentRole}
- Experience: ${profile.yearsExperience} years
- Desired Position: ${profile.desiredPosition}
- Willing to Relocate: ${profile.relocate}
- Location: ${profile.currentAddressCity}, ${profile.currentAddressState}

**JOB OPPORTUNITY:**
- Title: ${job.title}
- Company: ${job.company}
- Type: ${job.employmentType}
- Location: ${job.location}
- Salary: $${job.salaryMin}-$${job.salaryMax}/${job.salaryType}
- Requirements: ${job.requirements.join(", ")}

**TASK:**
1. Explain the match score (${matchScore}%)
2. Highlight 3-4 specific reasons why this job is a good fit
3. Identify any skill gaps to address
4. Provide specific advice for a strong application/interview
5. Mention salary alignment or negotiation suggestions

Be encouraging and specific to their profile and experience level.`;
}

/**
 * Format job matches for context in conversations
 */
export function formatJobsForContext(jobs: JobListing[]): string {
  return `
**AVAILABLE JOB OPPORTUNITIES:**

${jobs
  .map(
    (job, idx) => `
${idx + 1}. **${job.title}** at ${job.company}
   - Type: ${job.employmentType}
   - Location: ${job.location}
   - Salary: $${job.salaryMin}-$${job.salaryMax}/${job.salaryType}
   - Match Score: ${job.matchScore || "Pending"}%
   - Open: ${job.applicationsOpen ? "Yes" : "Closed"}
`
  )
  .join("\n")}

Use this context when the candidate asks about job recommendations or wants advice on specific positions.`;
}

/**
 * Generate prompt for interview preparation
 */
export function getInterviewPrepPrompt(
  profile: FormData,
  jobTitle: string
): string {
  return `Help this ${profile.yearsExperience}-year experienced ${profile.currentRole} prepare for a ${jobTitle} interview.

**CANDIDATE BACKGROUND:**
- Experience Level: ${profile.yearsExperience} years
- Key Skills: ${profile.employerReason}
- Current Goals: ${profile.careerGoal}

Provide:
1. 5 likely interview questions for this role
2. Strong answer framework for each question (using their experience)
3. Questions they should ask the employer
4. Salary negotiation tips for this position
5. Common red flags or mistakes to avoid

Make answers specific to their ${profile.currentRole} background and ${profile.yearsExperience} years of experience.`;
}
