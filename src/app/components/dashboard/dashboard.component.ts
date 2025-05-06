import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UserService } from '../../services/user.service';  // 🧠 inject a service when needed

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  userRole = '';

  constructor(private userService: UserService) {} // inject service (or fetch role from token/localStorage)

  ngOnInit(): void {
    this.userRole = localStorage.getItem('userRole') || '';
  }
}
