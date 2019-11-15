import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  uri = 'http://localhost:4000';

  constructor(private http: HttpClient) { }

  noAuthHeader = { headers: new HttpHeaders({ 'NoAuth': 'True' }) };

}
