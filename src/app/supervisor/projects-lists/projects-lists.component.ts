import { Component, OnInit } from '@angular/core';
import { SupervisorServicesService } from '../Services/supervisor-services.service';
import { Project } from '../../_Models/project.model';
import { UserAuthService } from '../../_Services/user-auth.service';
import { Supervisor } from '../../_Models/supervisor.model';

@Component({
  selector: 'app-projects-lists',
  templateUrl: './projects-lists.component.html',
  styleUrl: './projects-lists.component.css'
})
export class ProjectsListsComponent implements OnInit {


  ListProjet: Project[] = [];
  supervisorId: number = 0;
  supervisor = new Supervisor();
  project = new Project();
  constructor(
    private supervisorServices: SupervisorServicesService,
    private userAuthService: UserAuthService
  ) { }



  // Add project
  addProject(Project: Project) {
    this.supervisorServices.addProject(Project, this.supervisorId).subscribe(res => {
      console.log(res);
    })

  }

  getProjectBySupervisorId() {

    this.supervisorServices.getSupervisorByName(this.userAuthService.getSubjectFromToken()).subscribe(res => {
      this.supervisor = res;
      this.supervisorServices.getprojectsBySupervisorId(this.supervisor.id!).subscribe(res => {
        this.ListProjet = res;
        console.log(this.ListProjet);
      })

    })
  }

  // getAllProjects() {
  //   this.supervisorServices.getAllProjects().subscribe(
  //     res => {
  //       this.ListProjet = res;
  //       console.log(this.ListProjet);
  //     }
  //   );
  // }

  // getUser() {
  //   console.log(this.userAuthService.getSubjectFromToken());
  //   this.supervisorServices.getSupervisorByName(this.userAuthService.getSubjectFromToken()).subscribe(res => {
  //     this.supervisor = res;
  //   })
  // }

  ngOnInit(): void {

    this.getProjectBySupervisorId();
  }


}
