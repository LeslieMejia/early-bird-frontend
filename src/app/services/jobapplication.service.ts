import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JobApplication } from '../../models/job-application.model';

@Injectable({
  providedIn: 'root'
})
export class JobapplicationService {
  private apiUrl = '/api/jobapplication';
  private baseUrl: string = 'http://localhost:5147/api/jobapplication';
  
  constructor(private http: HttpClient) { }

  create(application: JobApplication): Observable<JobApplication> {
    return this.http.post<JobApplication>(this.apiUrl, application);
  }
  getByJobseekerId(jobseekerId: number): Observable<JobApplication[]> {
    return this.http.get<JobApplication[]>(`${this.baseUrl}/jobseeker/${jobseekerId}`);
  }
  
  // Add more methods as needed
}
