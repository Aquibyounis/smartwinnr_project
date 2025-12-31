import { Routes } from '@angular/router';
import { SignupComponent } from '../pages/signup/signup';
import { LoginComponent } from '../pages/login/login';
import { AdminDashboardComponent } from '../pages/admin-dashboard/admin-dashboard';
import { AdminGuard } from './guards/admin-guard';

export const routes: Routes = [
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: 'admin/login',
    component: LoginComponent
  },
  {
    path: 'admin',
    component: AdminDashboardComponent,
    canActivate: [AdminGuard]
  },
  {
    path: '',
    redirectTo: 'admin/login',
    pathMatch: 'full'
  }
];
