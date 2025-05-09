// src/app/services/jobapplication.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JobApplication } from '../../models/job-application.model';

@Injectable({ providedIn: 'root' })
export class JobapplicationService {
  private baseUrl = 'http://localhost:5147/api/JobApplication';

  constructor(private http: HttpClient) {}

  create(application: JobApplication): Observable<JobApplication> {
    return this.http.post<JobApplication>(this.baseUrl, application);
  }

  getById(id: number): Observable<JobApplication> {
    return this.http.get<JobApplication>(`${this.baseUrl}/${id}`);
  }

  getByJobseekerId(jobseekerId: number): Observable<JobApplication[]> {
    return this.http.get<JobApplication[]>(`${this.baseUrl}/jobseeker/${jobseekerId}`);
  }

  update(application: JobApplication): Observable<JobApplication> {
    return this.http.put<JobApplication>(this.baseUrl, application);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
