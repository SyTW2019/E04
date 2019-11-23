import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, Form, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  serverErrorMessages: string;


  constructor(private userService: UserService, private fb: FormBuilder, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
   }

  login(email: String, password: String) {
    this.userService.checkUser(email, password).subscribe(
      res => {
        this.userService.initSession(res['user']);
        this.router.navigateByUrl('/home');
    },
    err => {
      this.serverErrorMessages = err.error.message;
      }
    );
  }

  ngOnInit() {
  }

}
