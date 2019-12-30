import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { User } from '../models/user';
import { Enterprise } from '../models/enterprise';


@Injectable()
export class AuthService {
  private BASE_URL = 'http://localhost:4000';

  constructor(private http: HttpClient) {}

  getToken(): string {
    return localStorage.getItem('token');
  }

  getSesion(): string {
    return localStorage.getItem('sesion');
  }
  
  getUser(): string {
    return localStorage.getItem('user');
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
