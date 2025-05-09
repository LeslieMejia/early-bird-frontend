import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  // This user object is bound to the form using [(ngModel)]
  user = {
    name: '',
    email: '',
    phone: '',
    role: '',
    passwordHash: '' // NOTE: this maps to the column in your database
  };

  // Separate field for confirm password (not saved to DB)
  confirmPassword = '';

  constructor(
    private userService: UserService,
    private router: Router
  ) {}

  // Called when form is submitted and validations have passed
  onSubmit() {
    // Final check in TypeScript (redundant with HTML check but safe)
    if (this.user.passwordHash !== this.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    // Call your service to send user data to the backend
    this.userService.createUser(this.user).subscribe({
      next: () => this.router.navigate(['/dashboard']),
      error: (err) => {
        console.error('Signup failed:', err);
        alert('Signup failed. Please try again.');
      }
    });
  }
}
