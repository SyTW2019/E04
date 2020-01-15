import { Product } from '../../models/product';
import { ProductActionTypes } from '../actions/products.actions';

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
    console.log(state);
    
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
                products: action.payload.products,
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
        case ProductActionTypes.GET_PRODUCTS_FILTER: {
            return {
                ...state,
                products: action.payload.products,
                selectedProduct: null,
                error: null
            }
        }
        default: {
            return state;
        }
    }
}

export const getProductsEntities = (state: ProductsState) => state.products
