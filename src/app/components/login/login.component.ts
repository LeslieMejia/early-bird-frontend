import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';

import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  user = {
    email: '',
    password: ''
  };

  constructor(private router: Router, private userService: UserService) { }

  onSubmit(form: NgForm) {
    if (form.invalid) {
      alert('Please enter both email and password correctly.');
      return;
    }

    this.userService.login(this.user).subscribe({
      next: res => {
        console.log('Login successful:', res);
    
        this.userService.setUserId(res.id);
        localStorage.setItem('userId', res.id);      // ✅ Store ID
        localStorage.setItem('userRole', res.role);      // ✅ Store role
        localStorage.setItem('userName', res.name);      // ✅ Store name
    
        this.router.navigate(['/dashboard']);
      },
      error: err => {
        console.error('Login failed:', err);
        alert('Invalid credentials');
      }
    });    
  }
}
