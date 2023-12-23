import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  private jwtHelper: JwtHelperService = new JwtHelperService();



  baseurl = "http://localhost:8282/";

  requestHeader = new HttpHeaders({ 'No-Auth': 'True' })
  constructor(
    private httpClient: HttpClient,
  ) { }


  public login(loginData: any) {
    return this.httpClient.post(this.baseurl + "authenticate", loginData, { headers: this.requestHeader });
  }


  public register(registerData: any) {
    return this.httpClient.post(this.baseurl + "registerNewUser", registerData, { headers: this.requestHeader });
  }

  public roleMatch(allowedRoles: any): boolean {
    let isMatch = false;
    const userRoles: any = this.getRoles()
    if (userRoles != null && userRoles) {
      for (let i = 0; i < userRoles.length; i++) {
        for (let j = 0; j < allowedRoles.length; j++) {
          if (userRoles[i].roleName == allowedRoles[j]) {
            isMatch = true;
            return isMatch;
          }
        }
      }
    }
    return isMatch;


  }


  public setRoles(roles: []) {
    localStorage.setItem("roles", JSON.stringify(roles));
  }


  public getRoles(): [] {
    return JSON.parse(localStorage.getItem("roles")!);
  }

  public setToken(token: string) {
    localStorage.setItem("token", token);
  }


  public getToken(): string {
    return localStorage.getItem("token")!;

  }
  public clear() {
    localStorage.clear();
  }

  public isLoggedIn() {
    return this.getToken() && this.getRoles();
  }


  getSubjectFromToken(): string {
    const token = this.getToken();

    if (token && !this.jwtHelper.isTokenExpired(token)) {
      const decodedToken = this.jwtHelper.decodeToken(token);
      return decodedToken.sub;
    }

    return "erreur";
  }
}
