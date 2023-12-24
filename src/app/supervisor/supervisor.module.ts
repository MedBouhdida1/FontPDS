import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SupervisorRoutingModule } from './supervisor-routing.module';
import { SharedModule } from '../shared/shared.module';
import { MyProjectsComponent } from './my-projects/my-projects.component';


@NgModule({
  declarations: [
  
    MyProjectsComponent
  ],
  imports: [
    CommonModule,
    SupervisorRoutingModule,
    SharedModule
  ]
})
export class SupervisorModule { }
