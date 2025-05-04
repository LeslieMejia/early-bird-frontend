// src/app/services/resume.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Correct path: go two levels up from services to reach src/models
import { Resume } from '../../models/resume.model';

@Injectable({
  providedIn: 'root'
})
export class ResumeService {
  private apiUrl = '/api/resumes';
  private baseUrl: string = 'http://localhost:5147/api/resume';

  constructor(private http: HttpClient) { }

  /** Get all resumes for a specific jobseeker */
  getAll(jobseekerId: number): Observable<Resume[]> {
    return this.http.get<Resume[]>(`${this.apiUrl}?jobseekerId=${jobseekerId}`);
  }

  /** Get a single resume by its resumeId */
  getById(id: number): Observable<Resume> {
    return this.http.get<Resume>(`${this.apiUrl}/${id}`);
  }

  /** Create a new resume */
  create(resume: { jobseekerId: number; content: string }): Observable<Resume> {
    return this.http.post<Resume>(this.apiUrl, resume);
  }

  /** Delete a resume */
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
