import { BrowserModule } from '@angular/platform-browser';
import { NgModule ,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule, CanActivate } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { reducers } from './store/app.states';
import { LogInComponent } from './components/log-in/log-in.component';
import { LandingComponent } from './components/landing/landing.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { SignUp2Component } from './components/sign-up-2/sign-up.component';
import { AuthService } from './services/auth.service';
import { AuthEffects } from './store/effects/auth.effects';
import {
  TokenInterceptor, ErrorInterceptor
} from './services/token.interceptor';
import { StatusComponent } from './components/status/status.component';
import { AuthGuardService as AuthGuard } from './services/auth-guard.service';

import { ReactiveFormsModule } from '@angular/forms';

import {  MatMenuModule, MatToolbarModule, MatFormFieldModule, MatInputModule, MatOptionModule, MatSelectModule, MatIconModule, MatButtonModule, MatCardModule, MatTableModule, MatDividerModule, MatSnackBarModule, MatDatepickerModule, MatNativeDateModule, MatGridListModule } from '@angular/material';
import { HomeComponent } from './components/home/home.component';
import { MatTabsModule } from '@angular/material';
<<<<<<< HEAD
import { RestrictedComponent } from './restricted/restricted.component';
import { UnrestrictedComponent } from './unrestricted/unrestricted.component';
=======
import { ProfileComponent } from './components/profile/profile.component';
>>>>>>> 41cce266f5f097ff3fc6773f435b1d835a6ec242






@NgModule({
  declarations: [
    AppComponent,
    LogInComponent,
    LandingComponent,
    SignUpComponent,
    SignUp2Component,
    StatusComponent,
    HomeComponent,
<<<<<<< HEAD
    RestrictedComponent,
    UnrestrictedComponent
=======
    ProfileComponent
>>>>>>> 41cce266f5f097ff3fc6773f435b1d835a6ec242
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    EffectsModule.forRoot([AuthEffects]),
    StoreModule.forRoot(reducers, {
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true
      }
    }),
    RouterModule.forRoot([
      { path: 'log-in', component: LogInComponent },
      { path: 'sign-up', component: SignUpComponent },
      { path: 'sign-up-2', component: SignUp2Component },
      { path: 'status', component: StatusComponent, canActivate: [AuthGuard] },
      { path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
      { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
      { path: '', component: LandingComponent },
      { path: '**', redirectTo: '/' }
    ]),
    ReactiveFormsModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatTableModule,
    MatDividerModule,
    MatSnackBarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    HttpClientModule,
    MatMenuModule,
    MatGridListModule,
    MatTabsModule
  ],
  providers: [
    AuthService,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    },
    HttpClientModule
  ],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
