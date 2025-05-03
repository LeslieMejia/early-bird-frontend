// src/app/services/job.service.ts

import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

import { Job, JobStatus } from '../../models/job.model';
import { JobApplication } from '../../models/job-application.model';


// Two sample jobs for your mock
const sampleJobs: Job[] = [
  {
    id: 1,
    employerId: 2,
    title: 'Frontend Developer',
    company: 'CoolStartup',
    description: 'Build great UIs',
    location: 'Copenhagen',
    salaryRange: 'DKK 45,000–55,000',
    category: 'Full-time',
    status: JobStatus.active // ✅ enum value

  },
  {
    id: 2,
    employerId: 8,
    title: 'Backend Developer',
    company: 'TechCorp',
    description: 'Design robust APIs',
    location: 'Aarhus',
    salaryRange: 'DKK 50,000–65,000',
    category: 'Part-time',
    status: JobStatus.active // ✅ enum value

  }
];

@Injectable({
  providedIn: 'root'
})
export class JobService {
  private apiUrl = 'https://leslies-backend.example.com/api';
  constructor(private http: HttpClient) { }

  /** Fetch all jobs; fallback to sampleJobs on error */
  getJobs(): Observable<Job[]> {
    return this.http.get<Job[]>(`${this.apiUrl}/jobs`).pipe(
      catchError(err => {
        console.warn('getJobs() failed, falling back to sampleJobs', err);
        return of(sampleJobs);
      })
    );
  }

  /** Fetch one job by ID; fallback to sampleJobs on error */
  getById(id: number): Observable<Job> {
    return this.http.get<Job>(`${this.apiUrl}/jobs/${id}`).pipe(
      catchError(err => {
        console.warn(`getById(${id}) failed, falling back to sampleJobs`, err);
        const job = sampleJobs.find(j => j.id === id)!;
        return of(job);
      })
    );
  }

  /** Create a new job (mock) */
  createJob(job: Job): Observable<any> {
    console.log('Mock createJob()', job);
    return of({ success: true });
  }

  /** Update an existing job (mock) */
  updateJob(id: number, job: Job): Observable<any> {
    console.log('Mock updateJob()', id, job);
    return of({ success: true });
  }

  /** Delete a job (mock) */
  deleteJob(id: number): Observable<any> {
    console.log('Mock deleteJob()', id);
    return of({ success: true });
  }

  /** Submit an application; fallback to console.log on error */
  submitApplication(app: JobApplication): Observable<any> {
    return this.http.post(`${this.apiUrl}/applications`, app).pipe(
      tap(() => console.log('submitApplication() → real API call')),
      catchError(err => {
        console.warn('submitApplication() failed, logging locally', err);
        console.log('📬 Mock Applied:', app);
        return of(null);
      })
    );
  }

  /** Fetch applications for a specific job; fallback to empty array on error */
  getApplicationsByJobId(jobId: number): Observable<JobApplication[]> {
    return this.http.get<JobApplication[]>(`${this.apiUrl}/applications/job/${jobId}`).pipe(
      catchError(err => {
        console.warn(`getApplicationsByJobId(${jobId}) failed, returning []`, err);
        return of([]);
      })
    );
  }
}
