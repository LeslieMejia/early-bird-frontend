import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { JobStatus } from '../../models/job.model';
import { JobService } from '../services/job.service';



@Component({
  selector: 'app-postjob',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './postjob.component.html',
  styleUrls: ['./postjob.component.css']
})
export class PostjobComponent implements OnInit {
  jobForm: FormGroup;
  editing = false;
  jobId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private jobService: JobService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.jobForm = this.fb.group({
      title: [''],
      company: [''],
      location: [''],
      description: [''],
      category: [''],
      salaryrange: [''],
      status: [JobStatus.active] // ✅ correct enum usage
    });
  }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.editing = true;
      this.jobId = +idParam;
      const job = this.jobService.getById(this.jobId);
      if (job) {
        this.jobForm.patchValue(job);
      }
    }
  }

  submit(): void {
    if (this.editing && this.jobId !== null) {
      this.jobService.updateJob(this.jobId, this.jobForm.value);
    } else {
      this.jobService.createJob(this.jobForm.value);
    }
    alert(this.editing ? '✅ Job updated!' : '✅ Job posted!');
    this.router.navigate(['/manage-jobs']);
  }
}
