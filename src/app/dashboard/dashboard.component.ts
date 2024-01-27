import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UserAuthService } from '../_Services/user-auth.service';
import { UserService } from '../_Services/user.service';
import { get } from 'http';
import { Student } from '../_Models/student.model';
import { Supervisor } from '../_Models/supervisor.model';
import { Task } from '../_Models/task.model';
import { Stage } from '../_Models/stage.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {


  roles: any[] = []
  userRole?: string
  username?: string;
  student = new Student()
  supervisor = new Supervisor()
  compeletedTasks: Task[] = []
  PendingTasks: Task[] = []
  NbrOfStages: number = 0
  NbrOfTasks: number = 0
  NbrOfComepletedTasks: number = 0
  NbrOfPendingTasks: number = 0
  tasks: Task[] = []
  percentageCompleted: any
  percentagePending: any
  NbrOfProjects: number = 0
  NbrOfStudentEnrolled: number = 0
  validatedRequirements: number = 0
  projects: any[] = []
  currentProject?: any
  @ViewChild('clickMeElement', { static: false }) clickMeElement?: ElementRef;

  constructor(
    private userAuthService: UserAuthService,
    private userService: UserService
  ) { }



  getUser() {
    this.username = this.userAuthService.getSubjectFromToken();
    console.log(this.username)
  }

  getUserByUsername() {
    if (this.userRole == "Student") {
      this.userService.getStudentByName(this.username!).subscribe(res => {
        this.student = res
        this.NbrOfStages = this.student.project!.stages!.length


        for (const stage of this.student.project!.stages!) {
          if (stage.tasks) {
            this.NbrOfTasks += stage.tasks.length;

            for (const task of stage.tasks) {
              this.tasks.push(task);

              if (task.status == "done") {
                this.compeletedTasks.push(task)
                this.NbrOfComepletedTasks++;
              } else if (task.status == "pending") {
                this.PendingTasks.push(task)
                this.NbrOfPendingTasks++;
              }
            }
          }
        }

        this.percentageCompleted = ((this.NbrOfComepletedTasks / this.NbrOfTasks) * 100).toFixed(2);
        this.percentagePending = ((this.NbrOfPendingTasks / this.NbrOfTasks) * 100).toFixed(2);

        // console.log(this.NbrOfTasks)
        // console.log(this.NbrOfStages)
        // console.log(this.NbrOfComepletedTasks)
        // console.log(this.NbrOfPendingTasks)
        // console.log(this.percentageCompleted)
        // console.log(this.percentagePending)
      }
      )
    }
    else {
      this.userService.getSupervisorByName(this.username!).subscribe(res => {
        this.supervisor = res
        this.NbrOfProjects = this.supervisor.projects!.length
        this.projects = this.supervisor.projects!
        for (const project of this.supervisor.projects!) {
          this.NbrOfStudentEnrolled += project.team!.members.length
          if (project.document?.status == "Validated") {
            this.validatedRequirements++
          }
          for (const stage of project.stages!) {
            for (const task of stage.tasks!) {
              this.NbrOfTasks++
            }
          }
        }

        console.log(this.NbrOfTasks)
        console.log(this.NbrOfStudentEnrolled)
        console.log(this.validatedRequirements)
        console.log(this.NbrOfProjects)
      }
      )
    }



  }


  getUserRole() {
    this.roles = this.userAuthService.getRoles();
    if (this.roles.length > 0) {
      this.userRole = this.roles[0].roleName;
      console.log(this.userRole)
    }
  }


  ngOnInit(): void {
    this.getUser()
    this.getUserRole()
    this.getUserByUsername()

  }

}
