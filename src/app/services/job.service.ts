import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Job } from '../../models/job.model';
import { JobApplication } from '../../models/job-application.model';



@Injectable({
  providedIn: 'root'
})
export class JobService {
  private apiUrl = '/api';

  constructor(private http: HttpClient) { }

  getJobs(): Observable<Job[]> {
    return this.http.get<Job[]>(`${this.apiUrl}/jobs`);
  }

  getById(id: number): Observable<Job> {
    return this.http.get<Job>(`${this.apiUrl}/jobs/${id}`);
  }

  createJob(job: Job): Observable<any> {
    return this.http.post(`${this.apiUrl}/jobs`, job);
  }

  updateJob(id: number, job: Job): Observable<any> {
    return this.http.put(`${this.apiUrl}/jobs/${id}`, job);
  }

  deleteJob(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/jobs/${id}`);
  }

  submitApplication(application: JobApplication): Observable<any> {
    return this.http.post(`${this.apiUrl}/applications`, application);
  }

  getApplicationsByJobId(jobId: number): Observable<JobApplication[]> {
    return this.http.get<JobApplication[]>(`${this.apiUrl}/applications/job/${jobId}`);
  }
}
