import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { MatSnackBar } from '@angular/material';

import { UserService } from '../../user.service';
import { User } from '../../user.model';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  id: String
  user: any = {

  };
  updateForm: FormGroup;

  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute, private snackBar: MatSnackBar, private fb: FormBuilder) {
    this.createForm();
  }

  createForm() {
    this.updateForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params.id;
      this.userService.getUsersById(this.id).subscribe(res => {
        this.user = res;
        this.updateForm.get('email').setValue(this.user.email);
        this.updateForm.get('password').setValue(this.user.password);
      });
    });
  }


  updateUser(email, password) {
    this.userService.updateUser(this.id, email, password).subscribe(() => {
      this.snackBar.open('User updated successfully', 'OK', {
        duration: 3000
      });
    });
  }
}
