import { Component, OnInit, ViewChild } from '@angular/core';
import { UserAuthService } from '../_Services/user-auth.service';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {

  @ViewChild('myForm') myForm?: NgForm;
  registerRequest: any = {

    userName: "",
    userEmail: "",
    userPassword: "",

    userRole: "Student"
  }
  constructor(
    private userAuthService: UserAuthService,
    private router: Router,
    private toast: NgToastService

  ) { }
  ngOnInit(): void {


  }





  Register() {
    if (this.myForm?.valid) {
      this.userAuthService.register(this.registerRequest).subscribe(res => {
        console.log(res);
        this.router.navigate(["/login"]);
        this.toast.success({
          detail: "Success",
          summary: "Registration Successful"
        })

      }, err => {
        this.toast.error({
          detail: "Error",
          summary: "Username is already taken"
        })
        console.log(err);
      })

    }
    else {
      this.toast.error({
        detail: "Error",
        summary: "Please fill all the fields"
      })
    }
  }

}
