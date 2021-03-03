import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './main/dashboard/dashboard.component';
import { LoginComponent } from './main/login/login.component';
import { AuthGuardService as AuthGuard } from './_services/auth/auth-guard.service';

const routes: Routes = [

  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'home',
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'login', 
    component: LoginComponent
  },
  { path: '**', redirectTo: '/', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
