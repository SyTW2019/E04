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

  registerUser(email, password, nickname, name, surname, birthdate, description){
    const user = {
      email: email,
      password: password,
      nickname: nickname,
      name: name,
      surname: surname,
      birthdate: birthdate,
      description: description
    };
    return this.http.post(`${this.uri}/users/add`, user);
  }

  updateUser(id, email, password, nickname){
    const user = {
      email: email,
      password: password,
      nickname
    };
    return this.http.post(`${this.uri}/users/update/${id}`, user);
  }

  deleteUser(email){
    return this.http.get(`${this.uri}/users/delete/${email}`)
  }

  checkUser(authCredentials){
    // This function check the user for login
    return this.http.post(/*environment.apiBaseUrl +*/ '/authenticate', authCredentials,this.noAuthHeader);

  }

  setToken(token: string){
    localStorage.setItem('token', token);
  }
}
