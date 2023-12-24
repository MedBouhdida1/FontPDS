import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SupervisorRoutingModule } from './supervisor-routing.module';
import { SharedModule } from '../shared/shared.module';
import { MyProjectsComponent } from './my-projects/my-projects.component';
import { FormsModule } from '@angular/forms';
import { NgToastModule } from 'ng-angular-popup';


@NgModule({
  declarations: [

    MyProjectsComponent
  ],
  imports: [
    CommonModule,
    SupervisorRoutingModule,
    SharedModule,
    FormsModule,
    NgToastModule
  ]
})
export class SupervisorModule { }
