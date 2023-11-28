import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoggedInGuardService } from 'services/logged-in-guard.service';
import { LoggedOutGuardService } from 'services/logged-out-guard.service';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    data: { title: 'Login' },
    canActivate: [LoggedOutGuardService]
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    data: { title: 'Dashboard' },
    canActivate: [LoggedInGuardService]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
