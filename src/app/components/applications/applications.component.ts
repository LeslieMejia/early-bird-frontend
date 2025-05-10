import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { JobapplicationService } from '../../services/jobapplication.service';
import { JobApplication } from '../../../models/jobapplication.model';

@Component({
  selector: 'app-applications',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.css']
})
export class ApplicationsComponent implements OnInit {
  applications: JobApplication[] = [];
  jobseekerId = Number(localStorage.getItem('userId'));

  constructor(private jobApplicationService: JobapplicationService) {}

  ngOnInit(): void {
    this.jobApplicationService.getByJobseekerId(this.jobseekerId).subscribe({
      next: (apps) => this.applications = apps,
      error: (err) => {
        console.error('Failed to load applications:', err);
        alert('Could not load your applications.');
      }
    });
  }
}
