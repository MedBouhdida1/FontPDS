import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../_Services/user.service';
import { Project } from '../_Models/project.model';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrl: './team.component.css'
})
export class TeamComponent implements OnInit {

  projectId?: string
  Project = new Project()
  members: any[] = [];
  constructor(
    private router: ActivatedRoute,
    private userServices: UserService,
  ) { }


  getProjectById() {

    this.userServices.getProjectById(this.projectId!).subscribe(res => {
      console.log(res);
      this.Project = res;
      console.log(this.Project.team!.members);
    })
  }


  ngOnInit(): void {
    this.projectId = this.router.snapshot.params['id'];
    console.log(this.projectId)
    this.getProjectById();
  }

}
