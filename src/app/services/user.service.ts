import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:5147/api/User';
  private jobseekerId: number = 0; // 🆕 added field

  constructor(private http: HttpClient) {}

  createUser(user: any): Observable<any> {
    return this.http.post(this.apiUrl, user);
  }

  login(user: any): Observable<any> {
    return this.http.post('http://localhost:5147/api/User/login', user);
  }

  // 🆕 Save logged-in user ID
  setUserId(id: number) {
    localStorage.setItem('userId', id.toString());
  }
  

  // 🆕 Retrieve current user ID
  getUserId(): number {
    const storedId = localStorage.getItem('userId');
    return storedId ? Number(storedId) : 0;
  }
  
}
