import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})



export class UserService {

  uri = 'http://localhost:4000';

  constructor(private http: HttpClient) { }

  noAuthHeader = { headers: new HttpHeaders({ 'NoAuth': 'True' }) };


  getUsers() {
    return this.http.get(`${this.uri}/users`);
  }

  getUsersById(id){
    return this.http.get(`${this.uri}/users/${id}`);
  }

  registerUser(email, password, nickname, name, surname, birthdate, description, instagram, facebook, twitter){
    const user = {
      email: email,
      password: password,
      nickname: nickname,
      name: name,
      surname: surname,
      birthdate: birthdate,
      description: description,
      instagram: instagram,
      facebook: facebook,
      twitter: twitter
    };
    return this.http.post(`${this.uri}/users/add`, user);
  }

  updateUser(id, email, password, nickname){
    const user = {
      email: email,
      password: password,
      nickname: nickname
    };
    return this.http.post(`${this.uri}/users/update/${id}`, user);
  }

  deleteUser(email){
    return this.http.get(`${this.uri}/users/delete/${email}`)
  }

  checkUser(email, password){
    // This function check the user for login
    const user = {
      email: email,
      password: password
    }
    return this.http.post(`${this.uri}/users/login/${email}`, user);
  }

  initSession(user: string){
    sessionStorage.setItem('user', user);
  }
}
