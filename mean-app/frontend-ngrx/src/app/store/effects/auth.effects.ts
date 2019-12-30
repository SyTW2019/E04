import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';  
import { switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { tap } from 'rxjs/operators';

import { AuthService } from '../../services/auth.service';
import {
  AuthActionTypes,
  LogIn, LogInSuccess, LogInFailure,
  SignUp, SignUpSuccess, SignUpFailure,
  SignUp2, SignUpSuccess2, SignUpFailure2,
  LogOut,
} from '../actions/auth.actions';


@Injectable()
export class AuthEffects {

  constructor(
    private actions: Actions,
    private authService: AuthService,
    private router: Router,
  ) {}

  @Effect()
  LogIn: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.LOGIN)).pipe(
    map((action: LogIn) => action.payload)).pipe(
    switchMap(payload => {
      return this.authService.logIn(payload.email, payload.password).pipe(
        map((user) => {
          return new LogInSuccess({token: user.token, email: payload.email, type: user.type});
        })).pipe(
        catchError((error) => {
          return of(new LogInFailure({ error: error }));
        }));
    }));


  @Effect({ dispatch: false })
  LogInSuccess: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.LOGIN_SUCCESS),
    tap((user) => {
      localStorage.setItem('token', user.payload.token);
      localStorage.setItem('user', user.payload.email);
      this.router.navigateByUrl('/home');
    })
  );

  @Effect({ dispatch: false })
  LogInFailure: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.LOGIN_FAILURE)
  );

  @Effect()
  SignUp: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.SIGNUP)).pipe(
    map((action: SignUp) => action.payload)).pipe(
    switchMap(payload => {
      return this.authService.signUp(payload.email, payload.password, payload.nickname).pipe(
        map((user) => {
          return new SignUpSuccess({token: user.token, email: payload.email});
        })).pipe(
        catchError((error) => {
          return of(new SignUpFailure({ error: error }));
        }));
    }));
    

  @Effect({ dispatch: false })
  SignUpSuccess: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.SIGNUP_SUCCESS),
    tap((user) => {
      localStorage.setItem('token', user.payload.token);
      localStorage.setItem('user', user.payload.email);
      this.router.navigateByUrl('/home');
    })
  );

  @Effect({ dispatch: false })
  SignUpFailure: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.SIGNUP_FAILURE)
  );

  @Effect()
  SignUp2: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.SIGNUP2)).pipe(
    map((action: SignUp2) => action.payload)).pipe(
    switchMap(payload => {
      return this.authService.signUp2(payload.email, payload.password, payload.nickname, payload.address, payload.enterprise, payload.cif).pipe(
        map((user) => {
          return new SignUpSuccess2({token: user.token, email: payload.email});
        })).pipe(
        catchError((error) => {
          return of(new SignUpFailure2({ error: error }));
        }));
    }));

  @Effect({ dispatch: false })
  SignUpSuccess2: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.SIGNUP_SUCCESS2),
    tap((user) => {
      localStorage.setItem('token', user.payload.token);
      localStorage.setItem('user', user.payload.email);
      this.router.navigateByUrl('/');
    })
  );

  @Effect({ dispatch: false })
  SignUpFailure2: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.SIGNUP_FAILURE2)
  );

  @Effect({ dispatch: false })
  public LogOut: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.LOGOUT),
    tap((user) => {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      this.router.navigateByUrl('/');
    })
  );

  @Effect({ dispatch: false })
  GetStatus: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.GET_STATUS)).pipe(
    switchMap(payload => {
      return this.authService.getStatus();
    }));

}
