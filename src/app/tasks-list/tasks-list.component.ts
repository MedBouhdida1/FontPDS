import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../_Services/user.service';
import { UserAuthService } from '../_Services/user-auth.service';
import { ActivatedRoute } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { Student } from '../_Models/student.model';
import { Stage } from '../_Models/stage.model';
import { get } from 'node:http';
import { NgForm } from '@angular/forms';
import { Comment } from '../_Models/comment.model';
import { Supervisor } from '../_Models/supervisor.model';
import { SupervisorServicesService } from '../supervisor/Services/supervisor-services.service';
import { Task } from '../_Models/task.model';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrl: './tasks-list.component.css'
})
export class TasksListComponent implements OnInit {


  p: number = 1
  tasks: any[] = []

  stage = new Stage()

  taskDto: any = {
    title: null,
    description: null

  };
  stageId: string = this.route.snapshot.params['id'];
  UserRole?: string;
  Roles: any[] = []
  Comments: any[] = []
  userName?: string
  student = new Student()
  supervisor = new Supervisor()
  stageIndex?: string
  active: boolean = false
  projectId?: string
  TaskId?: string
  comment: any = {
    content: null

  };
  @ViewChild('myModal') myModal!: ElementRef;

  @ViewChild('myForm') myForm?: NgForm;


  constructor(
    private userServices: UserService,
    private userAuthService: UserAuthService,
    private route: ActivatedRoute,
    private toast: NgToastService,
    private supervisorService: SupervisorServicesService
  ) { }






  getTasksByStageId() {
    this.userServices.getTasksByStageId(this.stageId).subscribe(res => {
      console.log(res)
      this.tasks = res
    })
  }


  async addTask() {
    if (this.myForm!.valid) {
      try {
        await this.getUser();

        this.userServices.addTask(this.stageId, this.taskDto, this.student.id!).subscribe(res => {
          console.log(res);
          this.myModal.nativeElement.click();
          this.myForm?.resetForm();
          this.toast.success({
            detail: "Success",
            summary: "Task Added Successfully"
          });
          this.getTasksByStageId()
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
    else {
      this.toast.error({
        detail: "Error",
        summary: "Please fill all the fields"
      });
    }

  }

  addComment() {
    if (this.comment.content != null) {
      this.userServices.addComment(this.stage.project?.supervisorId?.id!, this.stageId, this.comment).subscribe(res => {
        console.log(res)
        this.getCommentsByStageId()
        this.toast.success({
          detail: "Success",
          summary: "Comment Added Successfully"
        });
      }

      )
    }

  }

  getCommentsByStageId() {
    this.userServices.getCommentsStage(this.stageId).subscribe(res => {
      console.log(res)
      this.Comments = res
    })
  }

  OpenDeleteModal(taskId: string) {
    this.TaskId = taskId
    console.log(this.TaskId)

  }


  deleteTask(taskId: string) {
    this.userServices.deleteTask(taskId, this.stageId).subscribe(res => {
      console.log(res)
      this.toast.success({
        detail: "Success",
        summary: "Task Deleted Successfully"
      });
      this.getTasksByStageId()
    })
  }


  getSubjectFromToken() {
    return this.userAuthService.getSubjectFromToken();
  }

  getUsername() {
    this.Roles = this.userAuthService.getRoles();
    if (this.Roles.length > 0) {
      this.UserRole = this.Roles[0].roleName;
      this.userName = this.getSubjectFromToken();
      console.log(this.userName)


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

  updateTask(task: any) {
    console.log(task.status)
    if (task.status == "pending") {
      this.userServices.setTaskPending(this.projectId!, task.id).subscribe(res => {
        console.log(res)
        this.toast.success({
          detail: "Success",
          summary: "Task Updated Successfully"
        });
      }
      )
    }
    else {
      this.userServices.updateTaskState(this.projectId!, task.id).subscribe(res => {
        console.log(res)
        this.toast.success({
          detail: "Success",
          summary: "Task Updated Successfully"
        });
      })
    }


  }

  ngOnInit(): void {
    this.stageIndex = this.userServices.sharedData
    this.getUsername();
    this.getTasksByStageId()
    this.getProjectId()
    this.getCommentsByStageId()
  }



}
