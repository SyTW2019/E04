import { Action } from '@ngrx/store';

export enum ProductActionTypes {
    ADD_PRODUCT = '[Product] Add product',
    ADD_PRODUCT_FAILURE = '[Product] Add product failure',
    ADD_PRODUCT_SUCCESS = '[Product] Add products SUCCESS',
    GET_PRODUCTS = '[Product] Get all products',
    GET_PRODUCTS_FAILURE = '[Product] Get all products failure',
    GET_PRODUCTS_SUCCESS = '[Product] Get all products success',
    GET_PRODUCTS_FILTER = '[Product] Get products filter'
}

export class AddProduct implements Action {
    readonly type = ProductActionTypes.ADD_PRODUCT;
    constructor(public payload: any) {
    }
}

export class AddProductFailure implements Action {
    readonly type = ProductActionTypes.ADD_PRODUCT_FAILURE;
    constructor(public payload: any) {}
}

export class AddProductSuccess implements Action {
    readonly type = ProductActionTypes.ADD_PRODUCT_SUCCESS;
    constructor(public payload: any) {}
}

export class GetProducts implements Action {
    readonly type = ProductActionTypes.GET_PRODUCTS;
    constructor() {}
}

export class GetProductsFailure implements Action {
    readonly type = ProductActionTypes.GET_PRODUCTS_FAILURE;
    constructor(public payload: any) {}
}

export class GetProductsSuccess implements Action {
    readonly type = ProductActionTypes.GET_PRODUCTS_SUCCESS;
    constructor(public payload: any) {}
}

export class GetProductFilter implements Action {
    readonly type = ProductActionTypes.GET_PRODUCTS_FILTER;
    constructor(public payload: any) {}
}

export type All =
    | AddProduct
    | AddProductFailure
    | AddProductSuccess
    | GetProducts
    | GetProductsFailure
    | GetProductsSuccess
    | GetProductFilter;