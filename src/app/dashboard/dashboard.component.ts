// src/app/dashboard/dashboard.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],  // ✅ CommonModule + RouterModule
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  userRole = '';

  ngOnInit(): void {
    // Sætter midlertidigt rollen, så du kan teste begge views
    this.userRole = 'jobseeker'; // skift til 'employer' for at teste employer‐visningen
    // Senere: this.userRole = localStorage.getItem('userRole') || '';
  }
}
