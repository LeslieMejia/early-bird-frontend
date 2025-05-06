import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { JobService } from '../../services/job.service';
import { ResumeService } from '../../services/resume.service';
import { JobapplicationService } from '../../services/jobapplication.service';
import { Job } from '../../../models/job.model';
import { JobApplication } from '../../../models/job-application.model';
import { ApplicationStatus } from '../../../models/job-application.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-applyform',
  standalone: true,
  templateUrl: './applyform.component.html',
  styleUrls: ['./applyform.component.css'],
  imports: [CommonModule, RouterModule, FormsModule]
})
export class ApplyformComponent implements OnInit {
  job: Job | undefined;
  coverLetter = '';
  resumeText = '';
  jobseekerId = 10; // TODO: Replace this with dynamic value once login is integrated

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private jobService: JobService,
    private resumeService: ResumeService,
    private jobApplicationService: JobapplicationService
  ) {}

  ngOnInit(): void {
    const jobIdParam = this.route.snapshot.paramMap.get('id');
    const jobId = jobIdParam ? Number(jobIdParam) : null;

    if (!jobId || isNaN(jobId)) {
      alert('Invalid job ID');
      this.router.navigate(['/joblist']);
      return;
    }

    this.jobService.getById(jobId).subscribe({
      next: (job) => {
        this.job = job;
      },
      error: (err) => {
        console.error('❌ Failed to load job:', err);
        alert('Job not found.');
        this.router.navigate(['/joblist']);
      }
    });
  }

  submitApplication(): void {
    if (!this.job || !this.job.id || !this.resumeText.trim()) {
      alert('Please fill out your resume before submitting.');
      return;
    }

    const jobId = this.job.id;

    this.resumeService.create({
      jobseekerId: this.jobseekerId,
      content: this.resumeText
    }).subscribe({
      next: (createdResume) => {
        const application: JobApplication = {
          jobId: jobId,
          jobseekerId: this.jobseekerId,
          resumeId: createdResume.id,
          coverLetter: this.coverLetter,
          status: ApplicationStatus.Interview

        };

        this.jobApplicationService.create(application).subscribe({
          next: () => {
            alert('✅ Application submitted!');
            this.router.navigate(['/applications']);
          },
          error: (err) => {
            console.error('❌ Application submission failed:', err);
            alert('Could not submit application.');
          }
        });
      },
      error: (err) => {
        console.error('❌ Resume creation failed:', err);
        alert('Failed to create resume.');
      }
    });
  }
}
