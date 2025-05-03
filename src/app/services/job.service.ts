// src/app/services/job.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

// KORREKTE relative stier: to niveauer op til models-mappen
import { Job } from '../../models/job.model';
import { JobApplication } from '../../models/job-application.model';

const sampleJobs: Job[] = [
  {
    id: 1,
    employerId: 2,
    title: 'Frontend Developer',
    description: 'Build great UIs',
    location: 'Copenhagen',
    salaryRange: '45k-55k',
    category: 'IT',
    status: 'active',
    company: 'CoolStartup',
    type: 'Full-time'
  },
  {
    id: 2,
    employerId: 8,
    title: 'Backend Developer',
    description: 'Design robust APIs',
    location: 'Aarhus',
    salaryRange: '50k-65k',
    category: 'IT',
    status: 'active',
    company: 'TechCorp',
    type: 'Part-time'
  }
];

@Injectable({
  providedIn: 'root'
})
export class JobService {
  private apiUrl = '/api';

  constructor(private http: HttpClient) { }

  getJobs(): Observable<Job[]> {
    return of(sampleJobs);
  }

  getById(id: number): Observable<Job> {
    const job = sampleJobs.find(j => j.id === id)!;
    return of(job);
  }

  createJob(job: Job): Observable<any> {
    console.log('Mock createJob', job);
    return of({ success: true });
  }

  updateJob(id: number, job: Job): Observable<any> {
    console.log('Mock updateJob', id, job);
    return of({ success: true });
  }

  deleteJob(id: number): Observable<any> {
    console.log('Mock deleteJob', id);
    return of({ success: true });
  }

  submitApplication(application: JobApplication): Observable<any> {
    console.log('Mock submitApplication', application);
    return of({ success: true });
  }

  getApplicationsByJobId(jobId: number): Observable<JobApplication[]> {
    console.log('Mock getApplicationsByJobId for job', jobId);
    return of([]);
  }
}
