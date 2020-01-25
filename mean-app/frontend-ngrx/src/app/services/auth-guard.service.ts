import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

import { AuthService } from './auth.service';

// @namespace authGuardServide
// service to control if the requester of the page
// has the neccesary session token for getting it
@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(
    public auth: AuthService,
    public router: Router
  ) {}

  // @namespace activate 
  // function to return if there is a token and a user 
  // @Params
  // authService (cookies)
  // @Return
  // boolean if is correct the session
  canActivate(): boolean {
    console.log(this.auth.getToken());
    console.log(this.auth.getUser());
    if (!this.auth.getToken() || !this.auth.getUser()) {
      this.router.navigateByUrl('/log-in');
      return false;
    }
    return true;
  }

  // @namespace loggedIn
  // function to call canActivated
  loggedin(): boolean{
    return this.canActivate()
  }
}
