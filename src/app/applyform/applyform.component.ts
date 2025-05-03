import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { JobService } from '../services/job.service';
import { ResumeService } from '../services/resume.service';
import { JobapplicationService } from '../services/jobapplication.service';
import { Job } from '../../models/job.model';
import { JobApplication } from '../../models/job-application.model';
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
  jobseekerId = 10; // hardcoded, for testing purposes!!!!

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private jobService: JobService,
    private resumeService: ResumeService,
    private jobApplicationService: JobapplicationService
  ) { }

  ngOnInit(): void {
    const jobId = Number(this.route.snapshot.paramMap.get('id'));
    this.jobService.getById(jobId).subscribe((job) => {
      this.job = job;
    });
  }

  submitApplication(): void {
    if (!this.job || !this.job.id || !this.resumeText.trim()) return;
  
    const jobId = this.job.id!; // ✔️ store safely since we've checked it exists
  
    // Step 1: Create the resume
    this.resumeService.create({
      jobseekerId: this.jobseekerId,
      content: this.resumeText
    }).subscribe({
      next: (createdResume) => {
        // Step 2: Use the resumeId to submit the application
        const application: JobApplication = {
          jobId: jobId,
          jobseekerId: this.jobseekerId,
          resumeId: createdResume.id,
          coverLetter: this.coverLetter,
          status: 'pending'
        };
  
        this.jobApplicationService.create(application).subscribe(() => {
          alert('✅ Application submitted!');
          this.router.navigate(['/applications']);
        });
      },
      error: () => alert('❌ Failed to create resume.')
    });
  }
}

