export enum ApplicationStatus {
  Applied = 'applied',
  Reviewed = 'reviewed',
  Interview = 'interview',
  Rejected = 'rejected'
}

export interface JobApplication {
  id?: number;
  jobId: number;
  jobseekerId: number;
  resumeId: number;
  coverLetter: string;
  status: ApplicationStatus; //Enum
  resumeContent?: string;
  jobTitle?: string; // ✅ Add this line
  jobSeekerName?: string; 
}

