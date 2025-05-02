import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { JobService } from '../services/job.service';
import { Job } from '../../models/job.model';
import { JobApplication } from '../../models/job-application.model';

@Component({
  selector: 'app-applyform',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './applyform.component.html',
  styleUrls: ['./applyform.component.css']
})
export class ApplyformComponent implements OnInit {
  job: Job | undefined;
  coverLetter: string = '';
  resumeText: string = '';
  jobseekerId: number = 10; // 🔒 hardcoded for now

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private jobService: JobService
  ) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.jobService.getById(id).subscribe(job => {
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
