// src/app/jobdetail/jobdetail.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { JobService } from '../services/job.service';
import { Job } from '../../models/job.model';

@Component({
  selector: 'app-jobdetail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './jobdetail.component.html',
  styleUrls: ['./jobdetail.component.css']
})
export class JobdetailComponent implements OnInit {
  job?: Job;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private jobService: JobService
  ) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.jobService.getById(id)
      .subscribe(j => this.job = j);
  }

  apply(): void {
    if (!this.job) return;
    this.router.navigate(['/apply', this.job.id]);
  }
}
