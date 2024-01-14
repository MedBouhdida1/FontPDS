import { Component, OnInit } from '@angular/core';
import { UserAuthService } from '../../_Services/user-auth.service';
import { UserService } from '../../_Services/user.service';
import { Student } from '../../_Models/student.model';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit {

  UserRole?: string;
  Roles: any[] = []
  student = new Student();
  constructor(
    private userAuthService: UserAuthService,
    private userService: UserService,
    private Router: Router,
    private toast: NgToastService
  ) { }



  getUser() {
    this.userService.getStudentByName(this.userAuthService.getSubjectFromToken()).subscribe(res => {
      this.student = res;
      console.log(this.student);
    })
  }

  navigateToTeam() {
    if (this.UserRole == "Supervisor") {
      this.Router.navigateByUrl('/supervisor/myprojects');
      this.toast.info({
        detail: "Info",
        summary: "Choose a project first"
      })

    }
    else if (this.UserRole == "Student") {
      if (this.student.project != null) {
        this.Router.navigateByUrl('/team/' + this.student.project!.id);
      }
      else {
        this.Router.navigateByUrl('/projects');
        this.toast.info({
          detail: "Info",
          summary: "Please enroll in a project first"
        })
      }
    }
  }

  navigateToresuirement() {
    if (this.student.project != null) {
      this.Router.navigateByUrl('/requirement/' + this.student.project.id);;
    }
    else {
      this.Router.navigateByUrl('/projects');
      this.toast.info({
        detail: "Info",
        summary: "Please enroll in a project first"
      })

    }


  }


  ngOnInit(): void {
    this.Roles = this.userAuthService.getRoles();
    if (this.Roles.length > 0) {
      this.UserRole = this.Roles[0].roleName;
      if (this.UserRole == "Student") {
        this.getUser();
      }
    }

  }

}
