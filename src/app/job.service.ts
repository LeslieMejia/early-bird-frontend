import { Injectable } from '@angular/core';

export interface Job {
    id: number;
    title: string;
    company: string;
    location: string;
    description: string;
    type: string;
}

export interface JobApplication {
    id: number;
    jobid: number;
    jobseekerid: number;
    jobseekername: string;
    resumecontent: string;
    coverletter: string;
    status: string;
}

@Injectable({
    providedIn: 'root'
})
export class JobService {
    private jobs: Job[] = [
        {
            id: 1,
            title: 'Frontend Developer',
            company: 'CoolStartup',
            location: 'Copenhagen',
            description: 'UI development with Angular',
            type: 'Full-time'
        },
        {
            id: 2,
            title: 'Backend Developer',
            company: 'TechCorp',
            location: 'Aarhus',
            description: 'Backend systems using Node.js',
            type: 'Part-time'
        }
    ];

    private applications: JobApplication[] = [
        {
            id: 1,
            jobid: 1,
            jobseekerid: 10,
            jobseekername: 'John Doe',
            resumecontent: 'Experienced in Angular...',
            coverletter: 'Looking forward to contributing...',
            status: 'Submitted'
        },
        {
            id: 2,
            jobid: 2,
            jobseekerid: 11,
            jobseekername: 'Jane Smith',
            resumecontent: 'Skilled in backend systems...',
            coverletter: 'Excited about this opportunity.',
            status: 'Pending Review'
        }
    ];

    // ✅ Return all jobs
    getJobs(): Job[] {
        return [...this.jobs];
    }

    // ✅ Get job by ID
    getById(id: number): Job | undefined {
        return this.jobs.find(job => job.id === id);
    }

    // ✅ Submit application
    submitApplication(application: JobApplication): void {
        application.id = this.applications.length + 1;
        application.status = 'Submitted';
        application.jobseekername = 'Hardcoded Name'; // Or dynamically assign
        this.applications.push(application);
    }

    // ✅ Get applications by job ID
    getApplicationsByJobId(jobId: number): JobApplication[] {
        return this.applications.filter(app => app.jobid === jobId);
    }

    // ✅ Create a new job
    createJob(job: Job): void {
        job.id = this.jobs.length + 1;
        this.jobs.push(job);
    }

    // ✅ Update existing job
    updateJob(id: number, updatedJob: Partial<Job>): void {
        const index = this.jobs.findIndex(job => job.id === id);
        if (index !== -1) {
            this.jobs[index] = { ...this.jobs[index], ...updatedJob };
        }
    }

    // ✅ Delete job and its applications
    deleteJob(id: number): void {
        this.jobs = this.jobs.filter(job => job.id !== id);
        this.applications = this.applications.filter(app => app.jobid !== id);
    }
}
