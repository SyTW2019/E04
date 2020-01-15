import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Enterprise } from '../models/enterprise';
import { User } from '../models/user';



@Injectable()
export class AuthService {
  private BASE_URL = 'http://localhost:4000';

  constructor(private http: HttpClient) {}

  getToken(): string {
    console.log("token from localstorage: " +localStorage.getItem('token'));
    return localStorage.getItem('token');
  }

  getSesion(): string {
    console.log("sesion from localstorage: " +localStorage.getItem('sesion'));
    return localStorage.getItem('sesion');
  }
  
  getUser(): string {
    console.log("user from localstorage: " + localStorage.getItem('user'));
    return localStorage.getItem('user');
  }

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
  
  getUserDb(email: string): Observable<User> {
    //let params = new HttpParams();
    //params.append('email', email);
    console.log('getUserdb: '+ email);
    const url = `${this.BASE_URL}/user`;
    return this.http.post<User>(url,{email: email});
  }

  logIn(email: string, password: string): Observable<any> {
    const url = `${this.BASE_URL}/login`;
    return this.http.post(url, {email, password});
  }

  signUp(email: string, password: string, nickname: string): Observable<User> {
    const url = `${this.BASE_URL}/register`;
    return this.http.post<User>(url, {email, password, nickname});
  }

  signUp2(email: string, password: string, nickname: string, address: string, enterprise: string, cif: string): Observable<Enterprise> {
    const url = `${this.BASE_URL}/register-enterprise`;
    return this.http.post<Enterprise>(url, {email, password, nickname, address, enterprise, cif});
  }

  getStatus(): Observable<User> {
    const url = `${this.BASE_URL}/status`;
    return this.http.get<User>(url);
  }
}
