import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { JobService } from '../../services/job.service';
import { Job } from '../../../models/job.model';

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
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    const id = idParam ? Number(idParam) : null;

    if (!id || isNaN(id)) {
      console.warn('Invalid job ID in route');
      alert('Invalid job ID');
      this.router.navigate(['/joblist']);
      return;
    }

    this.jobService.getById(id).subscribe({
      next: (job) => {
        this.job = job;
      },
      error: (err) => {
        console.error('❌ Failed to load job details:', err);
        alert('Could not find job.');
        this.router.navigate(['/joblist']);
      }
    });
  }

  apply(): void {
    if (!this.job) return;
    this.router.navigate(['/apply', this.job.id]);
  }
}
