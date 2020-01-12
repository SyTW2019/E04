import { createFeatureSelector, createSelector, ActionReducerMap } from '@ngrx/store';

import * as auth from './reducers/auth.reducers';
import * as product from './reducers/product.reducers';


export interface AppState {
  authState: auth.AuthState;
  productState: product.ProductsState;
}

export const reducers: ActionReducerMap<AppState> = {
  authState: auth.reducer,
  productState: product.reducer
};

export const getAppState = createFeatureSelector<AppState>('appState');

export const selectAuthToken = (state: auth.AuthState) => state.token;
export const selectUser = (state: auth.AuthState) => state.user;
export const selectProducts = (state: product.ProductsState) => state.products; 

export const getProductsState = createSelector(
  getAppState,
  (state: AppState) => state.productState
);

export const selectAuthState = createSelector(
  getAppState,
  (state: AppState) => state.authState
);

export const getProducts = createSelector(
  getProductsState,
  product.getProductsEntities
);

export const getUser = createSelector(
  selectAuthState,
  auth.getUserEntity
)