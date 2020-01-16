import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Enterprise } from 'src/app/models/enterprise';
import { User } from 'src/app/models/user';
import { GetUserBd, LogOut } from 'src/app/store/actions/auth.actions';
import { AppState, getUser } from 'src/app/store/app.states';
import { AuthEffects } from 'src/app/store/effects/auth.effects';



@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  getState: Observable<any>;
  userObs: Observable<any>;
  user: Enterprise | User;
  url = '';

  constructor(
    private effect : AuthEffects,
    private store: Store<AppState>
  ) {
    
  }


  ngOnInit() {
    this.userObs = this.store.select(getUser);
    this.userObs.subscribe(user =>{this.user = user.user});
    this.store.dispatch(new GetUserBd(this.user.email));
  }

  logOut(): void {
    this.store.dispatch(new LogOut);
  }

 

}
