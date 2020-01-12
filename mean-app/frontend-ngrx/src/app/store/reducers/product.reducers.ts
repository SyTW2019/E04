import { Product } from '../../models/product';
import { ProductActionTypes, All } from '../actions/products.actions';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from '../app.states';

export interface ProductsState {
    products: [Product] | null
    selectedProduct: Product | null
    error: string | null
};

export const initialState: ProductsState = {
    products: null,
    selectedProduct: null,
    error: null
};


export function reducer(state = initialState, action): ProductsState{
    //console.log(state);
    console.log(action.payload);
    
    switch (action.type) {

        case ProductActionTypes.GET_PRODUCTS_SUCCESS: {
            return {
                ...state,
                products: action.payload.products,
                selectedProduct: null,
                error: null
            };
        }
        case ProductActionTypes.GET_PRODUCTS_FAILURE: {
            return {
                ...state,
                products: null,
                selectedProduct: null,
                error: 'Failed to load products.'
            };
        }
        case ProductActionTypes.ADD_PRODUCT_SUCCESS: {
            return {
                ...state,
                products: action.payload.allProducts,
                selectedProduct: action.payload.product,
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

export const getProductsEntities = (state: ProductsState) => state.products
