import { createFeatureSelector } from '@ngrx/store';

import * as auth from './reducers/auth.reducers';
import * as product from './reducers/product.reducers';


export interface AppState {
  authState: auth.State;
  productState: product.ProductsState;
}

export const reducers = {
  auth: auth.reducer,
  product: product.productReducer
};

export const selectAuthState = createFeatureSelector<AppState>('auth');
export const selectProductState = createFeatureSelector<AppState>('product');