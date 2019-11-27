import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';
import { tap } from 'rxjs/operators';

import { AuthService } from '../../services/auth.service';
import {
  AuthActionTypes,
  LogIn, LogInSuccess, LogInFailure,
  SignUp, SignUpSuccess, SignUpFailure,
  LogOut,
} from '../actions/auth.actions';
import { Store } from '@ngrx/store';
import { StoreModule } from '@ngrx/store';


@Injectable()
export class AuthEffects {

  constructor(
    private actions: Actions,
    private authService: AuthService,
    private router: Router,
  ) {}

  // effects go here    
    @Effect()
    LogIn: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.LOGIN)).pipe(
    map((action: LogIn) => action.payload)).pipe(
    switchMap(payload => {
        return this.authService.logIn(payload.email, payload.password)
        .pipe(map((user) => {
            console.log(user);
            return new LogInSuccess({token: user.token, email: payload.email});
        }));
    }));


    @Effect({ dispatch: false })
    LogInSuccess: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.LOGIN_SUCCESS),
    tap((user) => {
    localStorage.setItem('token', user.payload.token);
    this.router.navigateByUrl('/');
    })
    );  
}

