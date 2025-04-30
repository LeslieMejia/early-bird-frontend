import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { JobService } from '../job.service';

@Component({
  selector: 'app-jobdetail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './jobdetail.component.html',
  styleUrls: ['./jobdetail.component.css']
})
export class JobdetailComponent implements OnInit {
  job: any;

  constructor(private router: Router, private jobService: JobService) { }

  ngOnInit(): void {
    this.job = this.jobService.getById(1); // You can update the ID logic later
  }

  apply(): void {
    this.router.navigate(['/apply', this.job.id]);
  }
}