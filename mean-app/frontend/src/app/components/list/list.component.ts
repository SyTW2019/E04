import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material';

import { User } from '../../user.model';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  users: User[];
  displayedColumns = ['email', 'password', 'nickname', 'actions', 'name', 'surname', 'birthdate', 'description'];

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.fetchUsers();
  }

  fetchUsers() {
    this.userService
      .getUsers()
        .subscribe((data: User[]) => {
          this.users = data;
          console.log('Data requested ...');
          console.log(this.users);
        });
  }

  editUser(id) {
    this.router.navigate([`/edit/${id}`]);
  }

  deleteUser(id) {
    this.userService.deleteUser(id).subscribe(() => {
      this.fetchUsers
    });
  }
}
