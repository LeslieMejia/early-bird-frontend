// src/app/app.routes.ts
import { Routes } from '@angular/router';

export const routes: Routes = [
  // 1) Tom sti ⇒ /home
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  // 2) Home (forside)
  {
    path: 'home',
    loadComponent: () => import('./home/home.component')
      .then(m => m.HomeComponent)
  },

  // 3) Auth  
  {
    path: 'login',
    loadComponent: () => import('./login/login.component')
      .then(m => m.LoginComponent)
  },
  {
    path: 'signup',
    loadComponent: () => import('./signup/signup.component')
      .then(m => m.SignupComponent)
  },

  // 4) Dashboard  
  {
    path: 'dashboard',
    loadComponent: () => import('./dashboard/dashboard.component')
      .then(m => m.DashboardComponent)
  },

  // 5) Jobseeker flow  
  {
    path: 'jobs',
    loadComponent: () => import('./joblist/joblist.component')
      .then(m => m.JoblistComponent)
  },
  {
    path: 'jobs/:id',
    loadComponent: () => import('./jobdetail/jobdetail.component')
      .then(m => m.JobdetailComponent)
  },
  {
    path: 'apply/:id',
    loadComponent: () => import('./applyform/applyform.component')
      .then(m => m.ApplyformComponent)
  },
  {
    path: 'applications',
    loadComponent: () => import('./applications/applications.component')
      .then(m => m.ApplicationsComponent)
  },

  // 6) Employer flow  
  {
    path: 'post-job',
    loadComponent: () => import('./postjob/postjob.component')
      .then(m => m.PostjobComponent)
  },
  {
    path: 'post-job/:id',
    loadComponent: () => import('./postjob/postjob.component')
      .then(m => m.PostjobComponent)
  },
  {
    path: 'manage-jobs',
    loadComponent: () => import('./managejobs/managejobs.component')
      .then(m => m.ManagejobsComponent)
  },

  // 7) Wildcard ⇒ /home
  { path: '**', redirectTo: 'home' }
];
