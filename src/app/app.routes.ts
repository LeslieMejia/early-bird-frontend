import { Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { JoblistComponent } from './joblist/joblist.component';
import { JobdetailComponent } from './jobdetail/jobdetail.component';
import { ApplyformComponent } from './applyform/applyform.component';
import { ApplicationsComponent } from './applications/applications.component';
import { PostjobComponent } from './postjob/postjob.component';
import { ManagejobsComponent } from './managejobs/managejobs.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'dashboard', component: DashboardComponent },

  // JOB SEEKER FLOW
  { path: 'jobs', component: JoblistComponent },
  { path: 'jobs/:id', component: JobdetailComponent },
  { path: 'apply/:id', component: ApplyformComponent },
  { path: 'applications', component: ApplicationsComponent },

  // EMPLOYER FLOW
  { path: 'post-job', component: PostjobComponent },
  { path: 'post-job/:id', component: PostjobComponent },
  { path: 'manage-jobs', component: ManagejobsComponent }
];
