import { Component, OnInit } from '@angular/core';
import { UserService } from '../_Services/user.service';
import { ActivatedRoute } from '@angular/router';
import { Project } from '../_Models/project.model';
import { Stage } from '../_Models/stage.model';
import { UserAuthService } from '../_Services/user-auth.service';

@Component({
  selector: 'app-stages-list',
  templateUrl: './stages-list.component.html',
  styleUrl: './stages-list.component.css'
})
export class StagesListComponent implements OnInit {



  roles: any[] = []
  userRole?: string
  projectId: string = this.route.snapshot.params['id'];
  project = new Project();
  stages: Stage[] = []
  stage: any = {
    title: null

  };

  stageId?: string
  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private userAuhtService: UserAuthService
  ) { }


  showTasks(index: number) {
    this.userService.sharedData = "Stage " + index


  }


  getProjectById() {
    this.userService.getProjectById(this.projectId).subscribe(res => {
      this.project = res
      this.stages = this.project.stages!
      console.log(this.stages)
    })

  }

  addStage() {
    this.userService.addStage(this.projectId, this.stage).subscribe(res => {
      console.log(res)
      this.getProjectById();
    })
  }

  OpenDeleteModal(stageId: string) {
    this.stageId = stageId
    console.log(this.stageId)
  }

  deleteStage(stageId: string) {

    this.userService.deleteStage(stageId).subscribe(res => {
      console.log(res)
      this.getProjectById();
    })
  }

  getUserRole() {
    this.roles = this.userAuhtService.getRoles();
    if (this.roles.length > 0) {
      this.userRole = this.roles[0].roleName;
      console.log(this.userRole)
    }
  }


  ngOnInit(): void {
    this.getProjectById();
    this.getUserRole()

  }

}
