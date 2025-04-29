// src/app/applyform/applyform.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { JobService, Job } from '../job.service';

@Component({
  selector: 'app-applyform',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './applyform.component.html',
  styleUrls: ['./applyform.component.css']
})
export class ApplyformComponent implements OnInit {
  job?: Job;
  coverLetter = '';

  constructor(
    private route: ActivatedRoute,
    private jobService: JobService
  ) { }

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.job = this.jobService.getById(id);
  }

  submit() {
    alert(`Applied to "${this.job?.title}" with letter:\n\n${this.coverLetter}`);
  }
}
