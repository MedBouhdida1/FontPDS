import { Component, OnInit } from '@angular/core';
import { UserAuthService } from '../../_Services/user-auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit {

  UserRole?: string;
  Roles: any[] = []
  constructor(
    private userAuthService: UserAuthService
  ) { }



  ngOnInit(): void {
    this.Roles = this.userAuthService.getRoles();
    if (this.Roles.length > 0) {
      this.UserRole = this.Roles[0].roleName;

    }

  }

}
