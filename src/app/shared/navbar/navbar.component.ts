import { Component, OnInit } from '@angular/core';
import { UserAuthService } from '../../_Services/user-auth.service';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {


  roles: any[] = []
  userRole?: string
  constructor(
    private userAuthService: UserAuthService,
    private router: Router,
    private toast: NgToastService
  ) { }




  getUserRole() {
    this.roles = this.userAuthService.getRoles();
    if (this.roles.length > 0) {
      this.userRole = this.roles[0].roleName;
      // console.log(this.userRole)
    }
  }



  logout() {
    this.userAuthService.clear();
    this.router.navigate(["/login"]);
    this.toast.success({
      detail: "Success",
      summary: "Logout Successful"
    })
  }


  ngOnInit(): void {
    this.getUserRole();

  }


}
