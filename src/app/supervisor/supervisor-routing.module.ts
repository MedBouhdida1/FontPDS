import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectsListsComponent } from './projects-lists/projects-lists.component';

const routes: Routes = [
  { path: 'projects', component: ProjectsListsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SupervisorRoutingModule { }
