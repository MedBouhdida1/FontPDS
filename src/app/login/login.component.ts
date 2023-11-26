import { Component, ViewChild } from '@angular/core';
import { UserAuthService } from '../_Services/user-auth.service';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  @ViewChild('myForm') myForm?: NgForm;

  loginRequest: any = {
    userName: "",
    userPassword: ""
  };

  constructor(
    private userAuthService: UserAuthService,
    private router: Router,
    private toast: NgToastService
  ) { }

  login() {
    if (this.myForm?.valid) {
      this.userAuthService.login(this.loginRequest).subscribe(
        (res: any) => {
          console.log(res.jwtToken);
          console.log(res.user.role);
          this.userAuthService.setToken(res.jwtToken);
          this.userAuthService.setRoles(res.user.role);
          this.router.navigate(["/dashboard"]);
          this.toast.success({
            detail: "Success",
            summary: "Login Successful"
          });
        },
        err => {
          this.toast.error({
            detail: "Error",
            summary: "Invalid Credentials"
          })
          console.log(err);
        }
      )
    }
    else {
      this.toast.error({
        detail: "Error",
        summary: "Please fill all the fields"
      })
    }
  }





}
