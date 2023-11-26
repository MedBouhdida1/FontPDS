import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { UserAuthService } from '../_Services/user-auth.service';
import { Observable } from 'rxjs';
import { NgToastService } from 'ng-angular-popup';


@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(
    private userAuthService: UserAuthService,
    private router: Router,
    private toast: NgToastService
  ) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if (this.userAuthService.getToken() == null) {
      return true;
    }
    this.toast.warning({
      detail: "Warning",
      summary: "You are already logged in",
    })
    this.router.navigateByUrl('/dashboard');
    return false;

  }

}
