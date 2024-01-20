import { Component, OnInit } from '@angular/core';
import { UserService } from '../_Services/user.service';
import { UserAuthService } from '../_Services/user-auth.service';
import { ActivatedRoute } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { Student } from '../_Models/student.model';
import { Stage } from '../_Models/stage.model';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrl: './tasks-list.component.css'
})
export class TasksListComponent implements OnInit {



  tasks: any[] = []

  stage = new Stage()

  taskDto: any = {
    title: null,
    description: null

  };
  stageId: string = this.route.snapshot.params['id'];
  UserRole?: string;
  Roles: any[] = []
  userName?: string
  student = new Student()
  stageIndex?: string
  active: boolean = false
  projectId?: string
  constructor(
    private userServices: UserService,
    private userAuthService: UserAuthService,
    private route: ActivatedRoute,
    private toast: NgToastService
  ) { }






  getTasksByStageId() {
    this.userServices.getTasksByStageId(this.stageId).subscribe(res => {
      console.log(res)
      this.tasks = res
    })
  }


  async addTask() {
    try {
      await this.getUser();

      this.userServices.addTask(this.stageId, this.taskDto, this.student.id!).subscribe(res => {
        console.log(res);
        this.toast.success({
          detail: "Success",
          summary: "Task Added Successfully"
        });
      }, err => {
        console.log(err);
        this.toast.error({
          detail: "Error",
          summary: "Please fill all the fields"
        });
      });
    } catch (error) {
      console.error(error);
      // Handle error if the getUser() method fails
    }
  }



  getSubjectFromToken() {
    return this.userAuthService.getSubjectFromToken();
  }

  getUsername() {
    this.Roles = this.userAuthService.getRoles();
    if (this.Roles.length > 0) {
      this.UserRole = this.Roles[0].roleName;
      if (this.UserRole == "Student") {
        this.userName = this.getSubjectFromToken();
        console.log(this.userName)
      }

    }
  }

  getUser() {
    return new Promise<void>((resolve, reject) => {
      this.userServices.getStudentByName(this.userName!).subscribe(
        res => {
          console.log(res);
          this.student = res;
          resolve();
        },
        err => {
          console.error(err);
          reject(err);
        }
      );
    });
  }
  getProjectId() {
    this.userServices.getStage(this.stageId).subscribe(res => {
      console.log(res)
      this.stage = res
      this.projectId = this.stage.project?.id
    })
  }

  updateTask(task: string) {
    console.log(task)
    this.userServices.updateTaskState(this.projectId!, task).subscribe(res => {
      console.log(res)
      this.toast.success({
        detail: "Success",
        summary: "Task Updated Successfully"
      });
    })
  }

  ngOnInit(): void {
    this.stageIndex = this.userServices.sharedData
    this.getUsername();
    this.getTasksByStageId()
    this.getProjectId()
  }



}
