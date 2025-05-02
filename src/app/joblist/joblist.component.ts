import { Component, OnInit } from '@angular/core';
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
export class JoblistComponent implements OnInit {
  searchTerm = '';
  jobs: Job[] = [];

  constructor(private jobService: JobService) { }

  ngOnInit(): void {
    this.jobService.getJobs().subscribe(jobs => {
      this.jobs = jobs;
    });
  }

  get filteredJobs(): Job[] {
    const term = this.searchTerm.trim().toLowerCase();
    if (!term) return this.jobs;

    return this.jobs.filter(j =>
      j.title.toLowerCase().includes(term)
    );
  }
}
