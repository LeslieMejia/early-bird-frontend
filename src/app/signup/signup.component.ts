import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { AuthService, UserRole } from '../services/auth.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  fullName = '';
  email = '';
  phone = '';
  role: UserRole = 'jobseeker';
  password = '';
  confirmPassword = '';

  constructor(
    private router: Router,
    private auth: AuthService
  ) { }

  onSubmit() {
    this.auth.signup(this.fullName, this.email, this.password, this.role)
      .subscribe(() => {
        if (this.auth.role === 'employer') {
          this.router.navigate(['/manage-jobs']);
        } else {
          this.router.navigate(['/dashboard']);
        }
      });
  }
}
