import { User } from '../../models/user';
import { AuthActionTypes, All } from '../actions/auth.actions';
import { Enterprise } from 'src/app/models/enterprise';


export interface AuthState {
  // is a user authenticated?
  isAuthenticated: boolean;
  // if authenticated, there should be a user object
  user: User | Enterprise | null;
  type: null;
  // error message
  errorMessage: string | null;
  token: string | null;
}

export const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  type: null,
  errorMessage: null,
  token: null,
};

export function reducer(state = initialState, action: All): AuthState {
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
    case AuthActionTypes.GET_USER_STORAGE_SUCCESS: {
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        errorMessage: 'user retrieve from database',
        token: action.payload.token
      }
    }
    case AuthActionTypes.LOGOUT: {
      return initialState;
    }

    default: {
      // This retrieve info from localStorage if is lost and there is
      if(state.user == null && localStorage.getItem('user') !== null){
        return {
          ...state,
          isAuthenticated: (localStorage.getItem('user') !== null),
          user: {
            email: localStorage.getItem('user')
          },
          errorMessage: 'user retrieve from localStorage',
          token: localStorage.getItem('token')
        }
      }
      return state;
    }
  }
}

export const getUserEntity = (state: AuthState) => state.user;

