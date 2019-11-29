import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Enterprise } from '../../models/enterprise';
import { AppState, selectAuthState } from '../../store/app.states';
import { SignUp } from '../../store/actions/auth.actions';


@Component({
    selector: 'app-sign-up',
    templateUrl: './sign-up.component.html',
    styleUrls: ['./sign-up.component.css']
})
export class SignUp2Component implements OnInit {

    user: Enterprise = new Enterprise();
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

    onSubmit(): void {
        console.log(this.user);
        const payload = {
            email: this.user.email,
            password: this.user.password,
            nickname: this.user.nickname,
            address: this.user.address,
            enterprise: this.user.enterprise,
            cif: this.user.cif
        };
        this.store.dispatch(new SignUp(payload));
    }

}