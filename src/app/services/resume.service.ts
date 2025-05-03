// src/app/services/resume.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Korrekt sti: gå to niveauer op fra services til src/models
import { Resume } from '../../models/resume.model';

@Injectable({
  providedIn: 'root'
})
export class ResumeService {
  private apiUrl = '/api/resumes';

  constructor(private http: HttpClient) { }

  /** Hent alle resumes for en given jobseeker */
  getAll(jobseekerId: number): Observable<Resume[]> {
    return this.http.get<Resume[]>(`${this.apiUrl}?jobseekerId=${jobseekerId}`);
  }

  /** Opret nyt resume */
  create(resume: { jobseekerId: number; content: string }): Observable<Resume> {
    return this.http.post<Resume>(this.apiUrl, resume);
  }

  /** Slet et resume */
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
