import { Action } from '@ngrx/store';

// @namespace authActionTypes
// Action types of the auth reducer
export enum AuthActionTypes {
  LOGIN = '[Auth] Login',
  LOGIN_SUCCESS = '[Auth] Login Success',
  LOGIN_FAILURE = '[Auth] Login Failure',
  SIGNUP = '[Auth] Signup',
  SIGNUP_SUCCESS = '[Auth] Signup Success',
  SIGNUP_FAILURE = '[Auth] Signup Failure',
  SIGNUP2 = '[Auth] Signup2',
  SIGNUP_SUCCESS2 = '[Auth] Signup Success2',
  SIGNUP_FAILURE2 = '[Auth] Signup Failure2',
  LOGOUT = '[Auth] Logout',
  GET_STATUS = '[Auth] GetStatus',
  GET_USER_STORAGE = '[Auth] Get User from storage',
  GET_USER_STORAGE_SUCCESS = '[Auth] Get User success',
  ofType = "ofType"
}

// functions to dispatch all the actions
export class LogIn implements Action {
  readonly type = AuthActionTypes.LOGIN;
  
  constructor(public payload: any) {}
}


export class LogInSuccess implements Action {
  readonly type = AuthActionTypes.LOGIN_SUCCESS;
  constructor(public payload: any) {}
}

export class LogInFailure implements Action {
  readonly type = AuthActionTypes.LOGIN_FAILURE;
  constructor(public payload: any) {}
}

export class SignUp implements Action {
  readonly type = AuthActionTypes.SIGNUP;
  constructor(public payload: any) {}
}

export class SignUpSuccess implements Action {
  readonly type = AuthActionTypes.SIGNUP_SUCCESS;
  constructor(public payload: any) {}
}

export class SignUpFailure implements Action {
  readonly type = AuthActionTypes.SIGNUP_FAILURE;
  constructor(public payload: any) {}
}

export class SignUp2 implements Action {
  readonly type = AuthActionTypes.SIGNUP2;
  constructor(public payload: any) {}
}

export class SignUpSuccess2 implements Action {
  readonly type = AuthActionTypes.SIGNUP_SUCCESS2;
  constructor(public payload: any) {}
}

export class SignUpFailure2 implements Action {
  readonly type = AuthActionTypes.SIGNUP_FAILURE2;
  constructor(public payload: any) {}
}

export class LogOut implements Action {
  readonly type = AuthActionTypes.LOGOUT;
}

export class GetStatus implements Action {
  readonly type = AuthActionTypes.GET_STATUS;
}

export class GetUserBd implements Action {
  readonly type = AuthActionTypes.GET_USER_STORAGE;
  constructor(public payload: any) {
  }
}

export class GetUserBdSuccess implements Action {
  readonly type = AuthActionTypes.GET_USER_STORAGE_SUCCESS;
  constructor(public payload: any) {
  }
}

// Different types of actions dispatched
export type All =
  | LogIn
  | LogInSuccess
  | LogInFailure
  | SignUp
  | SignUpSuccess
  | SignUpFailure
  | SignUp2
  | SignUpSuccess2
  | SignUpFailure2
  | LogOut
  | GetStatus
  | GetUserBd
  | GetUserBdSuccess;
