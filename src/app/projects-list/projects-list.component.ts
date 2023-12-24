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



  getAllProjects() {
    this.supervisorServices.getAllProjects().subscribe(
      res => {
        this.ListProjet = res;
        console.log(this.ListProjet);
      }
    );
  }



  ngOnInit(): void {

    this.getAllProjects();
  }


}
