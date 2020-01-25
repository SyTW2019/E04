import { createFeatureSelector, createSelector, ActionReducerMap } from '@ngrx/store';

import * as auth from './reducers/auth.reducers';
import * as product from './reducers/product.reducers';

// @namespace AppState
// State of the application
// authState: state of the auth
// productState: state of the products
export interface AppState {
  authState: auth.AuthState;
  productState: product.ProductsState;
}

// @namespace AppReducerMap
// map of the reducers of the application
// @var
// authState: reducer of aut
// productState: reducer of products
export const reducers: ActionReducerMap<AppState> = {
  authState: auth.reducer,
  productState: product.reducer
};

// @namespace selector
// different selectors of the information of the spate
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
