import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface User {
  name: string;
  email: string;
  password: string;
  role: string;
}


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:5000/api/user'; // Adjust the URL to match your backend

  constructor(private http: HttpClient) {}

  signup(user: User): Observable<any> {
    return this.http.post(this.apiUrl, user);
  }
}
