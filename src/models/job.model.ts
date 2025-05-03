export enum JobStatus {
  active = 'active',
  expired = 'expired',
  closed = 'closed'
}

export interface Job {
  id?: number;
  employerId?: number;
  title: string;
  company: string;
  description: string;
  location: string;
  salaryRange: string;
  category: string;
  status: JobStatus; // <-- ENUM used here
}