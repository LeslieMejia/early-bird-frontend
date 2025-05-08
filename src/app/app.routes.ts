// src/app/app.routes.ts
import { Routes } from '@angular/router';

export const routes: Routes = [
  // 1. Redirect empty path to home
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  // 2. Home
  {
    path: 'home',
    loadComponent: () =>
      import('./components/home/home.component').then(m => m.HomeComponent)
  },

  // 3. Auth
  {
    path: 'login',
    loadComponent: () =>
      import('./components/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'signup',
    loadComponent: () =>
      import('./components/signup/signup.component').then(m => m.SignupComponent)
  },

  // 4. Dashboard
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./components/dashboard/dashboard.component').then(m => m.DashboardComponent)
  },

  // 5. Jobseeker Flow
  {
    path: 'jobs',
    loadComponent: () =>
      import('./components/joblist/joblist.component').then(m => m.JoblistComponent)
  },
  {
    path: 'jobs/:id',
    loadComponent: () =>
      import('./components/jobdetail/jobdetail.component').then(m => m.JobdetailComponent)
  },
  {
    path: 'apply/:id',
    loadComponent: () =>
      import('./components/applyform/applyform.component').then(m => m.ApplyformComponent)
  },
  {
    path: 'applications',
    loadComponent: () =>
      import('./components/applications/applications.component').then(m => m.ApplicationsComponent)
  },

  // 6. Employer Flow
  {
    path: 'post-job',
    loadComponent: () =>
      import('./components/postjob/postjob.component').then(m => m.PostjobComponent)
  },
  {
    path: 'post-job/:id',
    loadComponent: () =>
      import('./components/postjob/postjob.component').then(m => m.PostjobComponent)
  },
  {
    path: 'manage-jobs',
    loadComponent: () =>
      import('./components/managejobs/managejobs.component').then(m => m.ManagejobsComponent)
  },

  // 7. Wildcard fallback
  { path: '**', redirectTo: 'home', pathMatch: 'full' }
];
