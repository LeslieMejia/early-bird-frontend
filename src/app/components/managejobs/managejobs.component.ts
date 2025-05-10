import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { JobService } from '../../services/job.service';
import { Job } from '../../../models/job.model';
import { JobApplication } from '../../../models/jobapplication.model';

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
  private employerId = Number(localStorage.getItem('userId'));

  constructor(private jobService: JobService, private router: Router) {}

  ngOnInit(): void {
    this.jobService.getJobs().subscribe(allJobs => {
      this.jobs = allJobs.filter(j => j.employerId === this.employerId);
      for (const job of this.jobs) {
        this.jobService.getApplicationsByJobId(job.id!)
          .subscribe(apps => this.applications[job.id!] = apps);
      }
    });
  }

  editJob(id: number): void {
    this.router.navigate(['/post-job', id]);
  }

  deleteJob(id: number): void {
    this.jobService.deleteJob(id).subscribe(() => {
      this.jobs = this.jobs.filter(j => j.id !== id);
      delete this.applications[id];
      if (this.expandedJobId === id) {
        this.expandedJobId = null;
      }
    });
  }

  toggleApplications(jobId: number): void {
    this.expandedJobId = this.expandedJobId === jobId ? null : jobId;
  }
}
