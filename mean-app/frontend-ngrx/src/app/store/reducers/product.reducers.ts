import { Product } from '../../models/product';
import { ProductActionTypes } from '../actions/products.actions';


// @namespace productState
// information from the state of products
export interface ProductsState {
    products: [Product] | null
    selectedProduct: Product | null
    error: string | null
};

// initialState when app is launched 
export const initialState: ProductsState = {
    products: null,
    selectedProduct: null,
    error: null
};

// @namespace productsReducer
// reducer of the different actions that are dispatched
export function reducer(state = initialState, action): ProductsState{
    console.log(state);
    
    switch (action.type) {
        // each option assing the information to the state
        // from the action correspondent
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
