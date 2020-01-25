import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Enterprise } from '../../models/enterprise';
import { SignUp2 } from '../../store/actions/auth.actions';
import { AppState, selectAuthState } from '../../store/app.states';



// @namespace signUpEnterprise
// page with the form to sign up as enterprise
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
        console.log(this.getState);
    }

    ngOnInit() {
        this.getState.subscribe((state) => {
            this.errorMessage = state.errorMessage;
        });
    }

    // @namespace submitSignUpEnterprise
    // function to sign up a new enterprise with the values of the form
    // @Params
    // local variables from form
    // email: email from the enterise in the form
    // password: password from the enterprise in the form
    // nickname: nicknmae from the enterprise in the form
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
            nickname: this.user.nickname,
            address: this.user.address,
            enterprise: this.user.enterprise,
            cif: this.user.cif
        };
        this.store.dispatch(new SignUp2(payload));
    }
}