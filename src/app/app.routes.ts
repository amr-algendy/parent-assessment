import { Routes } from '@angular/router';
import { LoginComponent } from './presentation/login/login.component';
import { DashboardComponent } from './presentation/dashboard/dashboard.component';
import { AuthGuard } from './presentation/shared/guards/auth.guard';

export const ROUTE_PATHS = {
  LOGIN: 'login',
  DASHBOARD: 'dashboard',
};

export const routes: Routes = [
  {
    path: ROUTE_PATHS.LOGIN,
    component: LoginComponent,
    canActivate: [AuthGuard],
  },
  {
    path: ROUTE_PATHS.DASHBOARD,
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
  { path: '**', redirectTo: ROUTE_PATHS.LOGIN },
];
