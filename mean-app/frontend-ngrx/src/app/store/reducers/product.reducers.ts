import { Product } from '../../models/product';
import { ProductActionTypes, All } from '../actions/products.actions';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export interface ProductsState {
    allProducts: [Product] | null
    product: Product | null
    error: string | null
};

export const initialState: ProductsState = {
    allProducts: null,
    product: null,
    error: null
};


export function productReducer(state = initialState, action: All): ProductsState{
    console.log(state);
    
    switch (action.type) {

        case ProductActionTypes.GET_PRODUCTS_SUCCESS: {
            return {
                ...state,
                allProducts: action.payload,
                product: null,
                error: null
            };
        }
        case ProductActionTypes.GET_PRODUCTS_FAILURE: {
            return {
                ...state,
                allProducts: null,
                product: null,
                error: 'Failed to load products.'
            };
        }
        case ProductActionTypes.ADD_PRODUCT_SUCCESS: {
            return {
                ...state,
                allProducts: action.payload.allProducts,
                product: action.payload.product,
                error: null
            }
        }
        case ProductActionTypes.ADD_PRODUCT_FAILURE: {
            return {
                ...state,
                error: 'Failed to add new product.'
            }
        }
        default: {
            return state;
        }
    }
}
/*
const getProducts = createFeatureSelector('allProducts');

export const getAllProductsLocal = createSelector(getProducts, state => state.allProducts);
export const getAllProductsBd = createSelector(getProducts, state =>
    state.getProducts);
*/