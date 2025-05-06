// src/app/components/postjob/postjob.component.ts

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Job, JobStatus } from '../../../models/job.model';
import { JobService } from '../../services/job.service';

@Component({
  selector: 'app-postjob',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './postjob.component.html'
})
export class PostjobComponent {
  // Create a job object to bind with the form fields
  job: Job = {
    id: 0,
    employerId: 8, // static default ID for now
    title: '',
    company: '',
    location: '',
    description: '',
    category: '',
    salaryRange: '',
    status: JobStatus.active
  };

  editing = false;
  jobId: number | null = null;

  constructor(
    private jobService: JobService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.editing = true;
      this.jobId = +idParam;
      this.jobService.getById(this.jobId).subscribe({
        next: (jobData) => {
          this.job = jobData;
        },
        error: (err) => {
          console.error('Failed to load job:', err);
          alert('Could not load job details.');
        }
      });
    }
  }

  submit(): void {
    if (!this.job.title || !this.job.company || !this.job.location) {
      alert('Please fill out all required fields.');
      return;
    }

    if (this.editing && this.jobId !== null) {
      this.jobService.updateJob(this.jobId, this.job).subscribe({
        next: () => {
          alert('✅ Job updated!');
          this.router.navigate(['/manage-jobs']);
        },
        error: (err) => {
          console.error('Update failed:', err);
          alert('❌ Failed to update job.');
        }
      });
    } else {
      this.jobService.createJob(this.job).subscribe({
        next: () => {
          alert('✅ Job posted!');
          this.router.navigate(['/manage-jobs']);
        },
        error: (err) => {
          console.error('Creation failed:', err);
          alert('❌ Failed to post job.');
        }
      });
    }
  }
}

/**
 * Summary of Changes:
 * 
 * - ✅ Switched from Reactive Forms to Template-Driven Forms using [(ngModel)] for two-way data binding.
 * - ✅ Implemented basic validation on required fields (title, company, location, category).
 * - ✅ Removed FormBuilder and FormGroup logic to simplify and match professor's template-driven style.
 * - ✅ Updated HTML to use #templateRefs for field-level validation (e.g., #title="ngModel").
 * - ✅ Validation errors are shown only when a field is touched and invalid.
 * - ✅ Improved user guidance (e.g., notes under "Category" field to clarify input like "Full-time").
 * - ✅ Added [disabled] to the submit button when the form is invalid.
 */
