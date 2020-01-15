import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Product } from '../models/product';

@Injectable()
export class ProductService{
    private BASE_URL = 'http://localhost:4000';

    constructor(private http: HttpClient) {}

    getProducts(): Observable<any> {
        const url = `${this.BASE_URL}/products`;
        return this.http.get(url);

    }

    addProduct(product : Product): Observable<Product> {
        // console.log("SERVICE: name: "+ name + " description: " + description);
        // También podría pasar como parámetro uno de tipo producto y cambiar el backend
        // Coger en el backend de
        console.log(product)
        let name = product.name;
        let description = product.description;
        let enterprise = product.enterprise;
        let category = product.category;
        const url = `${this.BASE_URL}/add-product`;
        return this.http.post(url, {name, description, enterprise, category});
    }

    getProductsFilter(filter: String): Observable<any> {
        const url = `${this.BASE_URL}/products-filter`;
        return this.http.post(url, {filter: filter});
    }

}