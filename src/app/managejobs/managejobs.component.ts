import { Component, OnInit } from '@angular/core';
import { JobService, Job, JobApplication } from '../services/job.service';

@Component({
  selector: 'app-managejobs',
  templateUrl: './managejobs.component.html',
  styleUrls: ['./managejobs.component.css']
})
export class ManagejobsComponent implements OnInit {
  jobs: Job[] = [];
  applications: { [jobId: number]: JobApplication[] } = {};
  expandedJobId: number | null = null;

  constructor(private jobService: JobService) { }

  ngOnInit(): void {
    this.loadJobs();
  }

  loadJobs(): void {
    this.jobs = this.jobService.getJobs();
    this.jobs.forEach(job => {
      this.applications[job.id] = this.jobService.getApplicationsByJobId(job.id);
    });
  }

  deleteJob(id: number): void {
    this.jobService.deleteJob(id);
    this.loadJobs();
  }

  toggleApplications(jobId: number): void {
    this.expandedJobId = this.expandedJobId === jobId ? null : jobId;
  }

  editJob(id: number): void {
    // Implement routing if needed
  }
}
