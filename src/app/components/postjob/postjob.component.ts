import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Needed for template-driven forms
import { Router, ActivatedRoute } from '@angular/router';
import { Job, JobStatus } from '../../../models/job.model';
import { JobService } from '../../services/job.service';

@Component({
  selector: 'app-postjob',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './postjob.component.html'
})
export class PostjobComponent implements OnInit {

  // Two-way bound job object for the form
  job: Job = {
    id: 0,
    employerId: 8, // Static for now; can come from login/user context later
    title: '',
    company: '',
    location: '',
    description: '',
    category: '',
    salaryRange: '',
    status: JobStatus.active // Default selected option
  };

  // Tracks whether we’re creating or editing
  editing = false;

  // Holds job ID when editing an existing post
  jobId: number | null = null;

  constructor(
    private jobService: JobService, // Handles backend job-related API calls
    private router: Router,         // Used to navigate on success
    private route: ActivatedRoute   // Used to extract job ID from route
  ) {}

  /**
   * Lifecycle hook that runs when the component is initialized.
   * Checks if the route has an ID — if so, we are editing.
   * Loads job data from backend to prefill the form.
   */
  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.editing = true;
      this.jobId = +idParam;

      this.jobService.getById(this.jobId).subscribe({
        next: (jobData) => {
          this.job = jobData; // Prefill form with existing job data
        },
        error: (err) => {
          console.error('Failed to load job:', err);
          alert('Could not load job details.');
        }
      });
    }
  }

  /**
   * Called when the form is submitted.
   * Performs validation, then either creates or updates the job.
   */
  submit(): void {
    // Extended validation: check required fields
    if (
      !this.job.title ||
      !this.job.company ||
      !this.job.location ||
      !this.job.category ||
      !this.job.status
    ) {
      alert('Please fill out all required fields.');
      return;
    }

    // Update flow: if job ID is present and editing is true
    if (this.editing && this.jobId !== null) {
      this.jobService.updateJob(this.jobId, this.job).subscribe({
        next: () => {
          alert('✅ Job updated successfully!');
          this.router.navigate(['/manage-jobs']); // Redirect to job list
        },
        error: (err) => {
          console.error('❌ Update failed:', err);
          alert('Failed to update job.');
        }
      });

    // Create flow: new job post
    } else {
      this.jobService.createJob(this.job).subscribe({
        next: () => {
          alert('✅ Job posted successfully!');
          this.router.navigate(['/manage-jobs']); // Redirect to job list
        },
        error: (err) => {
          console.error('❌ Creation failed:', err);
          alert('Failed to post job.');
        }
      });
    }
  }
}
