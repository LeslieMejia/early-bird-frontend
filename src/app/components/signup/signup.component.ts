import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  user = {
    name: '',
    email: '',
    phone: '',
    role: '',
    passwordHash: ''
  };
  confirmPassword = '';

  constructor(private userService: UserService, private router: Router) {}

  onSubmit() {
    if (this.user.passwordHash !== this.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    this.userService.createUser(this.user).subscribe({
      next: () => this.router.navigate(['/dashboard']),
      error: (err) => {
        console.error('Signup failed:', err);
        alert('Signup failed. Please try again.');
      }
    });
  }
}
