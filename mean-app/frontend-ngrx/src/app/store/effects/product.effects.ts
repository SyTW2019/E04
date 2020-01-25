import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, exhaustMap, filter, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { ProductService } from '../../services/product.service';
import { AddProduct, AddProductFailure, AddProductSuccess, GetProductFilter, GetProductsSuccess, ProductActionTypes } from '../actions/products.actions';
import { AppState } from '../app.states';



// @namespace productEffects
// effect dispatched when product actions
@Injectable()
export class ProductEffects {
    constructor(
        private actions: Actions,
        private store: Store<AppState>,
        private productService: ProductService,
        private router: Router,
    ) {}
    
    // @namespace addProductEffect
    // @effect used to add a product calling to product service
    @Effect()
    AddProduct: Observable<any> = this.actions.pipe(
        ofType(ProductActionTypes.ADD_PRODUCT)).pipe(
            map((action: AddProduct) => action.payload)).pipe(
                switchMap(payload => {
                    return this.productService.addProduct(payload).pipe(
                        map((product) => {
                    return new AddProductSuccess({products: this.productService.getProducts()});
                })).pipe(catchError((error) => {
            return of(new AddProductFailure({ error: error}));
        }));
    }));


    // @namespace getProductEffect
    // @effect used to get all products calling to product service
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

    // @namespace getProductEffectFilter
    // @effect used to get all products with filter calling to product service
    @Effect()
    GetProductsFilter = this.actions.pipe(
        ofType(ProductActionTypes.GET_PRODUCTS_FILTER)).pipe(
            map((action: GetProductFilter) => action.payload)).pipe(
                switchMap(payload => {
                    return this.productService.getProductsFilter(payload).pipe(
                        map((payload) => {
                            return new GetProductsSuccess(payload);
                        }
                    )
                )
            }
        )
    )

}