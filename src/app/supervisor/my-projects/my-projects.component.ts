import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Project } from '../../_Models/project.model';
import { Supervisor } from '../../_Models/supervisor.model';
import { SupervisorServicesService } from '../Services/supervisor-services.service';
import { UserAuthService } from '../../_Services/user-auth.service';
import { NgForm } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';



@Component({
  selector: 'app-my-projects',
  templateUrl: './my-projects.component.html',
  styleUrl: './my-projects.component.css'
})
export class MyProjectsComponent implements OnInit {


  ListProjet: Project[] = [];
  supervisor = new Supervisor();
  project = new Project();
  projectId?: string;


  @ViewChild('myModal') myModal!: ElementRef;
  @ViewChild('myForm') myForm?: NgForm;

  constructor(
    private supervisorServices: SupervisorServicesService,
    private userAuthService: UserAuthService,
    private toast: NgToastService
  ) { }



  // Add project
  addProject(project: Project) {
    if (this.myForm!.valid) {
      console.log(project)
      console.log(this.supervisor.id)
      this.supervisorServices.addProject(project, this.supervisor.id!).subscribe(res => {
        console.log(res);
        this.getProjectBySupervisorId();

      });
      this.myModal.nativeElement.click();
      this.myForm?.resetForm();
      this.toast.success({
        detail: "Success",
        summary: "Project Added Successfully"
      })
    }
    else {
      this.toast.error({
        detail: "Error",
        summary: "Please fill all the fields"
      })
    }
  }

  //delete projects
  delete() {
    if (this.projectId) {
      this.supervisorServices.deleteProject(this.projectId).subscribe(res => {
        console.log(res);
        this.getProjectBySupervisorId();
        this.toast.success({
          detail: "Success",
          summary: "Project Deleted Successfully"
        })
      }, err => {
        console.log(err);
      })
    }

  }

  //open delete modal
  openModal(projectId: string): void {
    this.projectId = projectId;
  }



  //view my projects
  getProjectBySupervisorId() {
    this.supervisorServices.getSupervisorByName(this.userAuthService.getSubjectFromToken()).subscribe(res => {
      this.supervisor = res;
      this.supervisorServices.getprojectsBySupervisorId(this.supervisor.id!).subscribe(res => {
        this.ListProjet = res;
        console.log(this.ListProjet);
      })

    })

  }

  ngOnInit(): void {

    this.getProjectBySupervisorId();
  }


}
