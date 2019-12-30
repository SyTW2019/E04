import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

import { AuthService } from './auth.service';


@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(
    public auth: AuthService,
    public router: Router
  ) {}
  canActivate(): boolean {
    console.log(this.auth.getToken());
    console.log(this.auth.getUser());
    if (!this.auth.getToken() || !this.auth.getUser()) {
      this.router.navigateByUrl('/log-in');
      return false;
    }
    return true;
  }
}
