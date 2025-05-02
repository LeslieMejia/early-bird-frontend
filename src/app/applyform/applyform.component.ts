import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { JobService, Job } from '../services/job.service';

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
    this.job = this.jobService.getById(id);
  }

  submitApplication(): void {
    if (!this.job) return;

    this.jobService.submitApplication({
      jobid: this.job.id,
      jobseekerid: 10, // hardcoded for now
      resumecontent: this.resumeText,
      coverletter: this.coverLetter,
      id: 0,
      jobseekername: '',
      status: ''
    });

    alert('✅ Application submitted!');
    this.router.navigate(['/applications']);
  }
}
