import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-applications',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.css']
})
export class ApplicationsComponent implements OnInit {
  applications: { jobTitle: string; status: string }[] = [];


  ngOnInit(): void {
    // For now, mock data to simulate actual application entries
    this.applications = [
      { jobTitle: 'Frontend Developer', status: 'Submitted' },
      { jobTitle: 'Backend Developer', status: 'Pending Review' }
    ];
  }
}
