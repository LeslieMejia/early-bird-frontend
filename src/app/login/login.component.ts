// src/app/login/login.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { AuthService, UserRole } from '../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email = '';
  password = '';
  role: UserRole = 'jobseeker';  // default

  constructor(
    private router: Router,
    private auth: AuthService
  ) { }

  onSubmit() {
    this.auth.login(this.email, this.password, this.role).subscribe(() => {
      if (this.auth.role === 'employer') {
        this.router.navigate(['/manage-jobs']);
      } else {
        this.router.navigate(['/dashboard']);
      }
    });
  }
}
