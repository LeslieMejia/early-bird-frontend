export interface JobApplication {
    id?: number;               // Optional, assigned by backend
    jobId: number;
    jobseekerId: number;
    resumeId: number;          // ✅ Required to match DB schema
    coverLetter: string;
    status: string;            // E.g., 'pending'
    resumeContent?: string; 
  }
  