import { Component, OnInit } from '@angular/core';
import { UserService } from '../_Services/user.service';
import { ActivatedRoute } from '@angular/router';
import { Project } from '../_Models/project.model';
import { Stage } from '../_Models/stage.model';

@Component({
  selector: 'app-stages-list',
  templateUrl: './stages-list.component.html',
  styleUrl: './stages-list.component.css'
})
export class StagesListComponent implements OnInit {



  projectId: string = this.route.snapshot.params['id'];
  project = new Project();
  stages: Stage[] = []
  stage: any = {
    title: null

  };
  constructor(
    private userService: UserService,
    private route: ActivatedRoute
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

  deleteStage(stageId: string) {

    this.userService.deleteStage(stageId).subscribe(res => {
      console.log(res)
      this.getProjectById();
    })
  }


  ngOnInit(): void {
    this.getProjectById();

  }

}
