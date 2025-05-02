
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Job } from '../models/job.model'


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
}

@Injectable({
  providedIn: 'root'
})
export class JobService {
  baseUrl: string = 'http://localhost:5147/api'; // Update port if needed

  constructor(private http: HttpClient) {}

  getJobs(): Observable<Job[]> {
    return this.http.get<Job[]>(`${this.baseUrl}/job`);
  }

  getById(id: number): Observable<Job> {
    return this.http.get<Job>(`${this.baseUrl}/job/${id}`);
  }

  createJob(job: Job): Observable<any> {
    return this.http.post(`${this.baseUrl}/job`, job);
  }

  updateJob(id: number, job: Job): Observable<any> {
    return this.http.put(`${this.baseUrl}/job/${id}`, job);
  }

  deleteJob(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/job/${id}`);
  }
}
