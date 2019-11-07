import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../user.service';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;

  constructor(private userService: UserService, private fb: FormBuilder, private router: Router) { 
    this.registerForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      nickname: ['', Validators.required]
    })
  }

  registerUser(email, password, nickname) {
    this.userService.registerUser(email, password, nickname).subscribe(() => {
      this.router.navigate(['/login']);
    });
  }

  ngOnInit() {
  }

}
