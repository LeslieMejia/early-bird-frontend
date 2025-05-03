import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { JobService } from '../services/job.service';
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
  jobseekerId = 10; // hardcoded

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private jobService: JobService
  ) { }

  ngOnInit(): void {
    const jobId = Number(this.route.snapshot.paramMap.get('id'));
    this.jobService.getById(jobId).subscribe((job) => {
      this.job = job;
    });
  }

  submitApplication(): void {
    if (!this.job) return;

    const application: JobApplication = {
      jobId: this.job.id,
      jobseekerId: this.jobseekerId,
      resumeContent: this.resumeText,
      coverLetter: this.coverLetter
    };

    this.jobService.submitApplication(application).subscribe(() => {
      alert('✅ Application submitted!');
      this.router.navigate(['/applications']);
    });
  }
}
