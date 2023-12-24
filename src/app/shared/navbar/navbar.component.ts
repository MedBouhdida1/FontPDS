import { Component } from '@angular/core';
import { UserAuthService } from '../../_Services/user-auth.service';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {



  constructor(
    private userAuthService: UserAuthService,
    private router: Router,
    private toast: NgToastService
  ) { }



  logout() {
    this.userAuthService.clear();
    this.router.navigate(["/login"]);
    this.toast.success({
      detail: "Success",
      summary: "Logout Successful"
    })
  }

}
