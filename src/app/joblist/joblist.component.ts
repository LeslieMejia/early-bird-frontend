// src/app/joblist/joblist.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { JobService } from '../services/job.service';
import { Job } from '../../models/job.model';

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
    this.jobService.getJobs().subscribe(j => this.jobs = j);
  }

  get filteredJobs(): Job[] {
    const term = this.searchTerm.trim().toLowerCase();
    return term
      ? this.jobs.filter(j => j.title.toLowerCase().includes(term))
      : this.jobs;
  }
}
