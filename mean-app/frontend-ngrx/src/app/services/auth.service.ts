import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Enterprise } from '../models/enterprise';
import { User } from '../models/user';


// @namespace: authService
// service to join function from authentication
@Injectable()
export class AuthService {

  // @namespace baseUrl url used to request to the ddbb
  private BASE_URL = 'http://localhost:4000';

  constructor(private http: HttpClient) {}

  // @namespace getToken 
  // get token from the localStorage(cookies)
  // @Return
  // token from local storage
  getToken(): string {
    console.log("token from localstorage: " +localStorage.getItem('token'));
    return localStorage.getItem('token');
  }
  // @namespace getSesion
  // get sesion from the localStorage(cookies)
  // @Return
  // sesion from local storage
  getSesion(): string {
    console.log("sesion from localstorage: " +localStorage.getItem('sesion'));
    return localStorage.getItem('sesion');
  }
  
  // @namespace getUserLocalStorage
  // get user from the localStorage(cookies)
  // @Return
  // user from local storage
  getUser(): string {
    console.log("user from localstorage: " + localStorage.getItem('user'));
    return localStorage.getItem('user');
  }

  // @namespace getState
  // get state from the localStorage(cookies)
  // @Return
  // state from local storage
  getState(): any {
    console.log('get state from localStorage');
    let user = this.getUser();
    let token = this.getToken();
    console.log('user: ' + user + ' token: ' + token);
    if (user !== null && token !== null){
      let userEntity = new User();
      userEntity.email = user;
      return {user: userEntity, token: token}
    }
    return null;
  }

  // @namespace getUserDb 
  // request the user to the server
  // @Params
  // email: string with the email of the user requested
  // @Return
  // An observable with the user
  getUserDb(email: string): Observable<User> {
    console.log('getUserdb: '+ email);
    const url = `${this.BASE_URL}/user`;
    return this.http.post<User>(url,{email: email});
  }

  // @namespace logIn
  // request login to the server
  // @Params 
  // email: string with the email of the user
  // password: string with the password
  // @Return
  // Observable with the pag answered by the server
  logIn(email: string, password: string): Observable<any> {
    const url = `${this.BASE_URL}/login`;
    return this.http.post(url, {email, password});
  }

  // @namespace signUp
  // request signUp of a user to the server
  // @Params 
  // email: string with the email of the user
  // password: string with the password
  // nickname: string with the nickname of the user
  // @Return
  // Observable with the pag answered by the server
  signUp(email: string, password: string, nickname: string): Observable<User> {
    const url = `${this.BASE_URL}/register`;
    return this.http.post<User>(url, {email, password, nickname});
  }
  // @namespace signUpEnterprise
  // request signUp of a Enterprise to the server
  // @Params 
  // email: string with the email of the Enterprise
  // password: string with the password of the user
  // nickname: string with the nickname of the Enterprise
  // @Return
  // Observable with the pag answered by the server
  signUp2(email: string, password: string, nickname: string, address: string, enterprise: string, cif: string): Observable<Enterprise> {
    const url = `${this.BASE_URL}/register-enterprise`;
    return this.http.post<Enterprise>(url, {email, password, nickname, address, enterprise, cif});
  }

  getStatus(): Observable<User> {
    const url = `${this.BASE_URL}/status`;
    return this.http.get<User>(url);
  }
}
