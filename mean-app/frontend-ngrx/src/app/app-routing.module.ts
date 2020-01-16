import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LogInComponent } from './components/log-in/log-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { SignUp2Component } from './components/sign-up-2/sign-up.component';
import { StatusComponent } from './components/status/status.component';
import { AuthGuardService as AuthGuard } from './services/auth-guard.service';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { LandingComponent } from './components/landing/landing.component';

const routes : Routes = [ 
{ 
  path: 'log-in', component: LogInComponent
},
{
  path: 'sign-up', component: SignUpComponent
},
{ 
  path: 'sign-up-2', component: SignUp2Component
},
{ 
  path: 'status', component: StatusComponent, canActivate: [AuthGuard]
},
{
  path: 'home', component: HomeComponent, canActivate: [AuthGuard]
},
{
  path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]
},
{
  path: 'land', component: LandingComponent, canActivate: [AuthGuard]
},
{ 
  path: '**', redirectTo: 'land'
} ]; 



//const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
