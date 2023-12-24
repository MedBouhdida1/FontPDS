import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RegisterComponent } from './register/register.component';
import { Authguard } from './_Auth/auth.guard';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { LoginGuard } from './_Auth/login-guard.guard';
import { ProjectsListComponent } from './projects-list/projects-list.component';

const routes: Routes = [
  { path: 'forbidden', component: ForbiddenComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, canActivate: [LoginGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [LoginGuard] },
  { path: 'projects', component: ProjectsListComponent, canActivate: [Authguard], data: { roles: ["Student", "Supervisor"] } },
  { path: 'dashboard', component: DashboardComponent, canActivate: [Authguard], data: { roles: ["Admin", "Student", "Supervisor"] } },
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule), canActivate: [Authguard], data: { roles: ["Admin"] } },
  { path: 'student', loadChildren: () => import('./student/student.module').then(m => m.StudentModule), canActivate: [Authguard], data: { roles: ["Student"] } },
  { path: 'supervisor', loadChildren: () => import('./supervisor/supervisor.module').then(m => m.SupervisorModule), canActivate: [Authguard], data: { roles: ["Supervisor"] } },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
