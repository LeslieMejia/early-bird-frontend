import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Resume } from '../../models/resume.model';

@Injectable({ providedIn: 'root' })
export class ResumeService {
  private baseUrl = 'http://localhost:5147/api/Resume';

  constructor(private http: HttpClient) {}

  getAll(jobseekerId?: number): Observable<Resume[]> {
    const url = jobseekerId
      ? `${this.baseUrl}?jobseekerId=${jobseekerId}`
      : this.baseUrl;
    return this.http.get<Resume[]>(url);
  }

  getById(id: number): Observable<Resume> {
    return this.http.get<Resume>(`${this.baseUrl}/${id}`);
  }

  create(payload: { jobseekerId: number; content: string }): Observable<Resume> {
    return this.http.post<Resume>(this.baseUrl, payload);
  }

  update(resume: Resume): Observable<Resume> {
    return this.http.put<Resume>(this.baseUrl, resume);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
