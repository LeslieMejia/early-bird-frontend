// src/app/components/postjob/postjob.component.ts

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Needed for [(ngModel)] two-way binding
import { Router, ActivatedRoute } from '@angular/router';
import { Job, JobStatus } from '../../../models/job.model';
import { JobService } from '../../services/job.service';

@Component({
  selector: 'app-postjob',
  standalone: true,
  imports: [CommonModule, FormsModule], // Template-driven forms need FormsModule
  templateUrl: './postjob.component.html'
})
export class PostjobComponent {

  // This job object is bound to the form using [(ngModel)]
  // Any updates in the form will reflect here automatically
  job: Job = {
    id: 0,
    employerId: 8, // Static for now, can be dynamic if you support logins
    title: '',
    company: '',
    location: '',
    description: '',
    category: '',
    salaryRange: '',
    status: JobStatus.active // Default to 'active'
  };

  editing = false;           // Flag to determine if we’re editing or posting a new job
  jobId: number | null = null; // Will hold the job ID if we're editing an existing one

  constructor(
    private jobService: JobService, // Service to handle backend API calls
    private router: Router,         // Used to navigate between routes
    private route: ActivatedRoute   // Used to read route parameters (like job ID)
  ) { }

  // ngOnInit runs when the component is first loaded
  // Checks if there's an 'id' in the URL → means we are editing a job
  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.editing = true;
      this.jobId = +idParam; // Convert string to number

      // Load the existing job data from the backend
      this.jobService.getById(this.jobId).subscribe({
        next: (jobData) => {
          this.job = jobData; // Populate the form with existing data
        },
        error: (err) => {
          console.error('Failed to load job:', err);
          alert('Could not load job details.');
        }
      });
    }
  }

  // Handles form submission
  submit(): void {
    // Basic client-side validation for required fields
    if (!this.job.title || !this.job.company || !this.job.location) {
      alert('Please fill out all required fields.');
      return;
    }

    // If editing an existing job → update it
    if (this.editing && this.jobId !== null) {
      this.jobService.updateJob(this.jobId, this.job).subscribe({
        next: () => {
          alert('Job updated!');
          this.router.navigate(['/manage-jobs']); // Redirect after success
        },
        error: (err) => {
          console.error('Update failed:', err);
          alert('Failed to update job.');
        }
      });

      // If posting a new job → create it
    } else {
      this.jobService.createJob(this.job).subscribe({
        next: () => {
          alert('Job posted!');
          this.router.navigate(['/manage-jobs']); // Redirect after success
        },
        error: (err) => {
          console.error('Creation failed:', err);
          alert('Failed to post job.');
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
