import { Injectable } from '@angular/core';
import { HttpClient  } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  uri = 'http://localhost:4000';

  constructor(private http: HttpClient) { }

  getUsers() {
    return this.http.get(`${this.uri}/users`);
  }

  getUsersById(id){
    return this.http.get(`${this.uri}/users/${id}`);
  }

  addUser(email, password){
    const user = {
      email: email,
      password: password
    };
    return this.http.post(`${this.uri}/users/add`, user);
  }

  updateUser(id, email, password){
    const user = {
      email: email,
      password: password
    };
    return this.http.post(`${this.uri}/users/update/${id}`, user);
  }

  deleteUser(id){
    return this.http.get(`${this.uri}/users/delete/${id}`)
  }
}
