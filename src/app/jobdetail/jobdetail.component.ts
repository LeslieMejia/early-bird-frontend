// src/app/jobdetail/jobdetail.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { JobService, Job } from '../job.service';

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
    private jobService: JobService
  ) { }

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.job = this.jobService.getById(id);
  }
}
