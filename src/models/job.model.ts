export type JobStatus = 'active' | 'expired' | 'closed';

export interface Job {
  id: number;
  employerId: number;
  title: string;
  description?: string;
  location?: string;
  salaryRange?: string;
  category?: string;
  status: JobStatus;
  company: string;
  type: string;
}
