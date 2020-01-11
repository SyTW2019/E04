import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { Actions, Effect, ofType, act } from '@ngrx/effects';
import { Observable } from 'rxjs';  
import { switchMap, map, catchError, filter, exhaustMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { tap, withLatestFrom } from 'rxjs/operators';

import { ProductService } from '../../services/product.service';
import {
    AddProduct, AddProductFailure, AddProductSuccess,
    GetProducts, GetProductsFailure, GetProductsSuccess,
    ProductActionTypes
} from '../actions/products.actions'


@Injectable()
export class ProductEffects {
    constructor(
        private actions: Actions,
        private productService: ProductService,
        private router: Router,
    ) {}

    @Effect()
    AddProduct: Observable<any> = this.actions.pipe(
        ofType(ProductActionTypes.ADD_PRODUCT)).pipe(
            map((action: AddProduct) => action.payload)).pipe(
                switchMap(payload => {
                    console.log("payload: name: " + payload.name + " description: "+ payload.description + " user: "+ payload.enterprise);
                    return this.productService.addProduct(payload).pipe(
                        map((product) => {
                    return new AddProductSuccess({msg: 'Product added succesfully'});
                })).pipe(catchError((error) => {
            return of(new AddProductFailure({ error: error}));
        }));
    }));



    @Effect()
    GetProducts = this.actions.pipe(
        ofType(ProductActionTypes.GET_PRODUCTS),
        withLatestFrom(),
        filter(([, loaded]) => !loaded),
        exhaustMap(() => this.productService.getProducts()
        .pipe(
            map(payload => new GetProductsSuccess(payload))
        ))
    )
    


}