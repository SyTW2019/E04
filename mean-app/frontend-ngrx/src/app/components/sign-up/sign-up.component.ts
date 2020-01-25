import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { User } from '../../models/user';
import { AppState, selectAuthState } from '../../store/app.states';
import { SignUp } from '../../store/actions/auth.actions';

// @namespace signUpUser
// page with the form to sign up as user
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  user: User = new User();
  getState: Observable<any>;
  errorMessage: string | null;

  constructor(
    private store: Store<AppState>
  ) {
    this.getState = this.store.select(selectAuthState);
  }

  ngOnInit() {
    this.getState.subscribe((state) => {
      this.errorMessage = state.errorMessage;
    });
  }

  // @namespace submitSignUpUser
  // function to sign up a new user with the values of the form
  // @Params
  // local variables from form
  // email: email from the user in the form
  // password: password from the user in the form
  // nickname: nicknmae from the user in the form
  // @Return
  // if succes
  // new token with the session
  // redirection to home page
  // if fail
  // errorMessage
  onSubmit(): void {
    const payload = {
      email: this.user.email,
      password: this.user.password,
      nickname: this.user.nickname
    };
    this.store.dispatch(new SignUp(payload));
    localStorage.setItem('state', JSON.stringify(this.getState)); // This line doesnt know if it works
  }

}
