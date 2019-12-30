import { User } from '../../models/user';
import { AuthActionTypes, All } from '../actions/auth.actions';


export interface State {
  // is a user authenticated?
  isAuthenticated: boolean;
  // if authenticated, there should be a user object
  user: User | null;
  type: null;
  // error message
  errorMessage: string | null;
  token: string | null;
}

export const initialState: State = {
  isAuthenticated: false,
  user: null,
  type: null,
  errorMessage: null,
  token: null,
};

export function reducer(state = initialState, action: All): State {
  console.log(state);
  switch (action.type) {
    
    case AuthActionTypes.LOGIN_SUCCESS: {
      return {
        ...state,
        isAuthenticated: true,
        user: {
          email: action.payload.email
        },
        type: action.payload.type,
        errorMessage: null,
        token: action.payload.token       
      };
    }
    case AuthActionTypes.LOGIN_FAILURE: {
      return {
        ...state,
        errorMessage: 'Incorrect email and/or password.'
      };
    }
    case AuthActionTypes.SIGNUP_SUCCESS: {
      return {
        ...state,
        isAuthenticated: true,
        user: {
          email: action.payload.email
        },
        token: action.payload.token,
        errorMessage: null
      };
    }
    case AuthActionTypes.SIGNUP_FAILURE: {
      return {
        ...state,
        errorMessage: 'That email is already in use.'
      };
    }
    case AuthActionTypes.SIGNUP_SUCCESS2: {
      return {
        ...state,
        isAuthenticated: true,
        user: {
          email: action.payload.email
        },
        token: action.payload.token,
        errorMessage: null
      };
    }
    case AuthActionTypes.SIGNUP_FAILURE2: {
      return {
        ...state,
        errorMessage: 'That email is already in use.'
      };
    }
    case AuthActionTypes.LOGOUT: {
      return initialState;
    }
    default: {
      return state;
    }
  }
}
