import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { User } from '../../models/user';
import { AppState, selectAuthState } from '../../store/app.states';
import { LogIn } from '../../store/actions/auth.actions';


// @namespace login
// This is the login page for enterprises and users
@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {

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
  // @namespace submitLogin
  // This function is dispatched when you click login
  // @Params:
  // local variables
  // email: email of the user introduced
  // password: password of the user introduced 
  onSubmit(): void {
    const payload = {
      email: this.user.email,
      password: this.user.password
    };
    console.log("user: "+ this.user.email + " password: " + this.user.password)
    this.store.dispatch(new LogIn(payload));
  }

}
