import { Component, OnInit } from '@angular/core';
import { Project } from '../_Models/project.model';
import { SupervisorServicesService } from '../supervisor/Services/supervisor-services.service';
import { UserAuthService } from '../_Services/user-auth.service';
import { Supervisor } from '../_Models/supervisor.model';
import { UserService } from '../_Services/user.service';
import { Student } from '../_Models/student.model';


@Component({
  selector: 'app-projects-list',
  templateUrl: './projects-list.component.html',
  styleUrl: './projects-list.component.css'
})
export class ProjectsListComponent implements OnInit {

  Roles: any[] = []
  UserRole?: string;
  ListProjet: Project[] = [];
  supervisor = new Supervisor();
  project = new Project();
  student = new Student()
  constructor(
    private supervisorServices: SupervisorServicesService,
    private userAuthService: UserAuthService,
    private userService: UserService
  ) { }



  // Add project
  // addProject(Project: Project) {
  //   this.supervisorServices.addProject(Project, this.supervisor.id!).subscribe(res => {
  //     console.log(res);
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


  //enrollProject

  enrollProject(projectId: string) {
    console.log(this.student.id);
    this.userService.enrollProject(projectId, this.student.id!).subscribe(res => {

      console.log(res);
    })
  }


  getUser() {
    this.userService.getStudentByName(this.userAuthService.getSubjectFromToken()).subscribe(res => {
      this.student = res;
      console.log(this.student);
    })
  }


  ngOnInit(): void {
    this.getAllProjects();
    this.Roles = this.userAuthService.getRoles();
    if (this.Roles.length > 0) {
      this.UserRole = this.Roles[0].roleName;
      if (this.UserRole == "Student") {
        this.getUser();
      }

    }

  }


}
