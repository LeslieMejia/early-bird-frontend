import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common'; // 🛠️ You must import this!

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink, CommonModule], // 🛠️ Add CommonModule here
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  userRole: string = '';

  ngOnInit() {
    this.userRole = 'jobseeker'; // or 'employer' for TESTING
    // LATER ON REPLACE IT WITH this.userRole = localStorage.getItem('userRole') || '';

  }
}
