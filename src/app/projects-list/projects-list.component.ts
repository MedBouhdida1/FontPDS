import { Component, OnInit } from '@angular/core';
import { Project } from '../_Models/project.model';
import { SupervisorServicesService } from '../supervisor/Services/supervisor-services.service';
import { UserAuthService } from '../_Services/user-auth.service';
import { Supervisor } from '../_Models/supervisor.model';


@Component({
  selector: 'app-projects-list',
  templateUrl: './projects-list.component.html',
  styleUrl: './projects-list.component.css'
})
export class ProjectsListComponent implements OnInit {


  ListProjet: Project[] = [];
  supervisor = new Supervisor();
  project = new Project();
  constructor(
    private supervisorServices: SupervisorServicesService,
    private userAuthService: UserAuthService
  ) { }



  // Add project
  addProject(Project: Project) {
    this.supervisorServices.addProject(Project, this.supervisor.id!).subscribe(res => {
      console.log(res);
    })

  }

  // getProjectBySupervisorId() {

  //   this.supervisorServices.getSupervisorByName(this.userAuthService.getSubjectFromToken()).subscribe(res => {
  //     this.supervisor = res;
  //     this.supervisorServices.getprojectsBySupervisorId(this.supervisor.id!).subscribe(res => {
  //       this.ListProjet = res;
  //       console.log(this.ListProjet);
  //     })

  //   })
  // }

  getAllProjects() {
    this.supervisorServices.getAllProjects().subscribe(
      res => {
        this.ListProjet = res;
        console.log(this.ListProjet);
      }
    );
  }

  // getUser() {
  //   console.log(this.userAuthService.getSubjectFromToken());
  //   this.supervisorServices.getSupervisorByName(this.userAuthService.getSubjectFromToken()).subscribe(res => {
  //     this.supervisor = res;
  //   })
  // }

  ngOnInit(): void {

    this.getAllProjects();
  }


}
