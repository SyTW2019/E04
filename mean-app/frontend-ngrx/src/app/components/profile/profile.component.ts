import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState, selectAuthState, getUser } from 'src/app/store/app.states';
import { LogOut } from 'src/app/store/actions/auth.actions';
import { Enterprise } from 'src/app/models/enterprise';
import { User } from 'src/app/models/user';
import {HttpClient} from '@angular/common/http';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userObs: Observable<Enterprise | User>;
  user: Enterprise | User;
  url = '';

  constructor(private http: HttpClient,
    private store: Store<AppState>
  ) {

  }


  ngOnInit() {
    this.userObs = this.store.select(getUser);
    this.userObs.subscribe(user => this.user = user);
  }

  logOut(): void {
    this.store.dispatch(new LogOut);
  }

 

}
