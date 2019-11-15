import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';


import { MatToolbarModule, MatFormFieldModule, MatInputModule, MatOptionModule, MatSelectModule, MatIconModule, MatButtonModule, MatCardModule, MatTableModule, MatDividerModule, MatSnackBarModule, MatDatepickerModule, MatNativeDateModule } from '@angular/material';

import { AlertModule } from 'ngx-bootstrap'
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { UserService } from './user.service';
import { EnterpriseService } from './enterprise.service';
import { PaymentService } from './payment.service';
import { ProductService } from './product.service';
import { StatService } from './stat.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ListComponent } from './components/list/list.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { AuthService } from './services/auth.service';
import { AuthEffects } from './store/effects/auth.effects';
import { reducers } from './store/app.states';

const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'list', component: ListComponent},
  { path: 'home', component: HomeComponent},
  { path: '', redirectTo: 'list', pathMatch: 'full'}
];

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AlertModule.forRoot(), // Boostrap
    StoreModule.forRoot(reducers, {}),
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
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
    MatNativeDateModule
  ],
  providers: [UserService, EnterpriseService, PaymentService, ProductService, StatService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
