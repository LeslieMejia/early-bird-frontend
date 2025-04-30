import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { JobService, Job } from '../job.service';

@Component({
  selector: 'app-joblist',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './joblist.component.html',
  styleUrls: ['./joblist.component.css']
})
export class JoblistComponent {
  searchTerm = '';
  jobs: Job[] = [];

  constructor(private jobService: JobService) {
    this.jobs = this.jobService.getJobs();
  }

  get filteredJobs(): Job[] {
    const term = this.searchTerm.trim().toLowerCase();
    if (!term) {

      return this.jobs;
    }
    return this.jobs.filter(j =>
      j.title.toLowerCase().includes(term)
    );
  }
}