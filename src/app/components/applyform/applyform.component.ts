import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { NgForm, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { JobService } from '../../services/job.service';
import { ResumeService } from '../../services/resume.service';
import { JobapplicationService } from '../../services/jobapplication.service';

import { Job } from '../../../models/job.model';
import { JobApplication, ApplicationStatus } from '../../../models/job-application.model';

@Component({
  selector: 'app-applyform',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './applyform.component.html',
  styleUrls: ['./applyform.component.css']
})
export class ApplyformComponent implements OnInit {
  job: Job | undefined;
  resumeText = '';
  coverLetter = '';
  jobseekerId = 10; // TODO: wire up real user ID once auth is in place

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private jobService: JobService,
    private resumeService: ResumeService,
    private jobApplicationService: JobapplicationService
  ) { }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    const jobId = idParam ? Number(idParam) : null;

    if (!jobId || isNaN(jobId)) {
      alert('Invalid job ID');
      this.router.navigate(['/jobs']);
      return;
    }

    this.jobService.getById(jobId).subscribe({
      next: job => (this.job = job),
      error: err => {
        console.error('❌ Failed to load job:', err);
        alert('Job not found.');
        this.router.navigate(['/jobs']);
      }
    });
  }

  submitApplication(form: NgForm): void {
    // 1) Block if form validations fail
    if (form.invalid) {
      alert('Please fill in all required fields correctly.');
      return;
    }

    // 2) Ensure we have a job context
    if (!this.job || this.job.id === undefined) {
      alert('Invalid job context.');
      return;
    }

    // capture id with non-null assertion
    const validJobId: number = this.job.id!;

    // 3) Create resume record
    this.resumeService.create({
      jobseekerId: this.jobseekerId,
      content: this.resumeText.trim()
    }).subscribe({
      next: createdResume => {
        // 4) Build and submit application
        const application: JobApplication = {
          jobId: validJobId,
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
          error: err => {
            console.error('❌ Application submission failed:', err);
            alert('Could not submit application.');
          }
        });
      },
      error: err => {
        console.error('❌ Resume creation failed:', err);
        alert('Failed to create resume.');
      }
    });
  }
}
