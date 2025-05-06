export enum UserRole {
    Employer = 'employer',
    Jobseeker = 'jobseeker'
  }
  
  export interface User {
    id?: number;
    name: string;
    email: string;
    phone: string;
    role: UserRole; //Enum
    password?: string;
  }
  