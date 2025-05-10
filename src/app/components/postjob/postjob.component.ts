import { Component, OnInit } from '@angular/core';
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
export class PostjobComponent implements OnInit {

  job: Job = {
    id: 0,
    employerId: 0, // Will be assigned dynamically
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
    const storedId = localStorage.getItem('userId');
    if (storedId) {
      this.job.employerId = Number(storedId); // ✅ Set dynamically
    }

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

    console.log('📤 Job to post:', this.job); // 🧠 Helpful debug

    if (this.editing && this.jobId !== null) {
      this.jobService.updateJob(this.jobId, this.job).subscribe({
        next: () => {
          alert('✅ Job updated successfully!');
          this.router.navigate(['/manage-jobs']);
        },
        error: (err) => {
          console.error('❌ Update failed:', err);
          alert('Failed to update job.');
        }
      });
    } else {
      this.jobService.createJob(this.job).subscribe({
        next: () => {
          alert('✅ Job posted successfully!');
          this.router.navigate(['/manage-jobs']);
        },
        error: (err) => {
          console.error('❌ Creation failed:', err);
          alert('Failed to post job.');
        }
      });
    }
  }
}
