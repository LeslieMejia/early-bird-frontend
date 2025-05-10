// src/app/services/job.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Job, JobStatus } from '../../models/job.model';
import { JobApplication } from '../../models/jobapplication.model';

@Injectable({
  providedIn: 'root'
})
export class JobService {
  private baseUrl: string = 'http://localhost:5147/api/job';

  constructor(private http: HttpClient) {}

  /** Get all jobs from backend */
  getJobs(): Observable<Job[]> {
    return this.http.get<Job[]>(`${this.baseUrl}`);
  }

  /** Get one job by ID */
  getById(id: number): Observable<Job> {
    return this.http.get<Job>(`${this.baseUrl}/${id}`);
  }

  /** Create a new job */
  createJob(job: Job): Observable<any> {
    return this.http.post(`${this.baseUrl}`, job);
  }

  /** Update an existing job */
  updateJob(id: number, job: Job): Observable<any> {
    return this.http.put(`${this.baseUrl}`, job);
  }

  /** Delete a job */
  deleteJob(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  /** Submit a job application */
  submitApplication(app: JobApplication): Observable<any> {
    return this.http.post(`${this.baseUrl}/applications`, app);
  }

  /** Get applications for a specific job */
  getApplicationsByJobId(jobId: number): Observable<JobApplication[]> {
    return this.http.get<JobApplication[]>(`${this.baseUrl}/applications/job/${jobId}`);
  }
}
