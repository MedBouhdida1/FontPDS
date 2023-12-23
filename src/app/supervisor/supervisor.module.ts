import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SupervisorRoutingModule } from './supervisor-routing.module';
import { ProjectsListsComponent } from './projects-lists/projects-lists.component';


@NgModule({
  declarations: [
    ProjectsListsComponent
  ],
  imports: [
    CommonModule,
    SupervisorRoutingModule
  ]
})
export class SupervisorModule { }
