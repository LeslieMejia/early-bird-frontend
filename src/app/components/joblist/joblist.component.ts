import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { JobService } from '../../services/job.service';
import { Job } from '../../../models/job.model';

@Component({
  selector: 'app-joblist',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './joblist.component.html',
  styleUrls: ['./joblist.component.css']
})
export class JoblistComponent implements OnInit {
  searchTerm = '';
  jobs: Job[] = [];

  constructor(private jobService: JobService) {}

  ngOnInit(): void {
    this.loadJobs();
  }

  loadJobs(): void {
    this.jobService.getJobs().subscribe({
      next: (jobs) => {
        this.jobs = jobs;
      },
      error: (err) => {
        console.error('❌ Failed to load jobs:', err);
        alert('Could not load job listings. Please try again later.');
      }
    });
  }

  get filteredJobs(): Job[] {
    const term = this.searchTerm.trim().toLowerCase();
    return term
      ? this.jobs.filter(j => j.title.toLowerCase().includes(term))
      : this.jobs;
  }
}
