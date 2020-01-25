import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { AppState, selectAuthState } from '../../store/app.states';
import { LogOut } from '../../store/actions/auth.actions';



// @namespace landingComponent
// First page that apper when you run the aplication
@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  getState: Observable<any>;
  isAuthenticated: false;
  user = null;
  token = null;
  errorMessage = null;
  type = null;

  constructor(
    private store: Store<AppState>
  ) {
    this.getState = this.store.select(selectAuthState);
  }

  ngOnInit() {
    this.getState.subscribe((state) => {
      this.isAuthenticated = state.isAuthenticated;
      this.user = state.user;
      this.token = state.token;
      this.errorMessage = state.errorMessage;
      this.type = state.type;
    });
  }

  // @namespace logOut
  // Function for log out from the aplication
  logOut(): void {
    this.store.dispatch(new LogOut);
  }

}
