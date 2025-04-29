// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { JoblistComponent } from './joblist/joblist.component';
import { JobdetailComponent } from './jobdetail/jobdetail.component';
import { ApplyformComponent } from './applyform/applyform.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'jobs', component: JoblistComponent },
  { path: 'jobs/:id', component: JobdetailComponent },
  { path: 'apply/:id', component: ApplyformComponent },
];
