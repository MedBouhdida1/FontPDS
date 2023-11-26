import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { UserAuthService } from '../_Services/user-auth.service';
import { Observable } from 'rxjs';
import { NgToastService } from 'ng-angular-popup';


@Injectable()
export class Authguard implements CanActivate {

  constructor(
    private userAuthService: UserAuthService,
    private router: Router,
    private toast: NgToastService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if (this.userAuthService.getToken() != null) {
      const role = route.data["roles"] as Array<string>;
      if (role) {
        const match = this.userAuthService.roleMatch(role);
        if (match) {
          console.log("role matched");
          return true;
        } else {
          this.router.navigate(['/forbidden'])
          return false;
        }
      }
    }
    this.toast.warning({
      detail: "Warning",
      summary: "Please login to continue"
    })
    this.router.navigateByUrl('/login');
    return false;
  }
}

