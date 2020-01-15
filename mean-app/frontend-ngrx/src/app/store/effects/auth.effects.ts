import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';
import { AuthActionTypes, GetUserBd, GetUserBdSuccess, LogIn, LogInFailure, LogInSuccess, LogOut, SignUp, SignUp2, SignUpFailure, SignUpFailure2, SignUpSuccess, SignUpSuccess2 } from '../actions/auth.actions';



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
/*
  @Effect({ dispatch: false })
  GetUserStorage: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.GET_USER_STORAGE),
    tap((action) => {
      console.log("Aqui entra");
      // console.log(action.payload.email);
      console.log(action);
      console.log("hola");
      return new GetUserStorageSuccess({user: this.authService.getUserDb(action.payload)});
    })
  );
  */
 @Effect()
 GetUserStorage: Observable<any> = this.actions.pipe(
   ofType(AuthActionTypes.GET_USER_STORAGE)).pipe(
    map((action: GetUserBd) => action.payload)).pipe(
      switchMap(payload => {
        console.log("payload effect: " + payload);
        return this.authService.getUserDb(payload).pipe(
          map((user) => {
            console.log("hola k ase");
            return new GetUserBdSuccess({user: user});
          })
        ).pipe(
          catchError((error) => {
            console.log(error);
            return of(new LogOut());
          })
        )
      })
    )
  
  
  GetUserStorageSuccess:  Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.GET_USER_STORAGE_SUCCESS),
    tap((user) => {
      console.log("por favor");
      console.log(user.payload.user);
      localStorage.setItem('user', user.payload.user);
      console.log('locale')
      // this.router.navigateByUrl('/profile');
    })
  );
} 
