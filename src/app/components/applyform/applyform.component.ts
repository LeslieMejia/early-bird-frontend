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
  jobseekerId = 10;

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
      error: () => {
        alert('Job not found.');
        this.router.navigate(['/jobs']);
      }
    });
  }

  submitApplication(form: NgForm): void {
    if (form.invalid || !this.job) {
      alert('Please fill in all required fields correctly.');
      return;
    }

    const applicationPayload: JobApplication = {
      jobId: this.job.id!,
      jobseekerId: this.jobseekerId,
      resumeId: 0, // will be set after resume creation
      coverLetter: this.coverLetter,
      status: ApplicationStatus.Interview
    };

    this.resumeService.create({
      jobseekerId: this.jobseekerId,
      content: this.resumeText.trim()
    }).subscribe({
      next: createdResume => {
        applicationPayload.resumeId = createdResume.id;
        this.jobApplicationService.create(applicationPayload).subscribe({
          next: () => {
            alert('✅ Application submitted!');
            this.router.navigate(['/applications']);
          },
          error: () => {
            alert('Could not submit application.');
          }
        });
      },
      error: () => {
        alert('Failed to create resume.');
      }
    });
  }
}
