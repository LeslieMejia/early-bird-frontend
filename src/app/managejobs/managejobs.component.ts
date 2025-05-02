import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { JobService } from '../services/job.service';
import { Job } from '../../models/job.model';
import { JobApplication } from '../../models/job-application.model';

@Component({
  selector: 'app-managejobs',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './managejobs.component.html',
  styleUrls: ['./managejobs.component.css']
})
export class ManagejobsComponent implements OnInit {
  jobs: Job[] = [];
  applications: { [jobId: number]: JobApplication[] } = {};
  expandedJobId: number | null = null;

  constructor(private jobService: JobService, private router: Router) { }

  ngOnInit(): void {
    this.jobService.getJobs().subscribe((jobs) => {
      this.jobs = jobs;
      for (const job of jobs) {
        this.jobService.getApplicationsByJobId(job.id).subscribe((apps) => {
          this.applications[job.id] = apps;
        });
      }
    });
  }

  editJob(id: number): void {
    this.router.navigate(['/postjob', id]);
  }

  deleteJob(id: number): void {
    this.jobService.deleteJob(id).subscribe(() => {
      this.jobs = this.jobs.filter((j) => j.id !== id);
    });
  }

  toggleApplications(jobId: number): void {
    this.expandedJobId = this.expandedJobId === jobId ? null : jobId;
  }
}
