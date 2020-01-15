import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { AppState, selectUser, selectProducts, selectAuthState, getAppState, getProducts, getUser } from '../../store/app.states';
import { LogOut } from '../../store/actions/auth.actions';
import { Product } from '../../models/product';
import { GetProducts, AddProduct } from 'src/app/store/actions/products.actions';
import { Enterprise } from 'src/app/models/enterprise';
import { User } from 'src/app/models/user';
import { map } from 'rxjs/operators';
import { ProductsState } from 'src/app/store/reducers/product.reducers';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  // getState: Observable<any>;
  userObs: Observable<Enterprise | User>;
  user: Enterprise | User;
  products: Observable<[Product]>;
  name: string;
  description: string;

  constructor(
    private store: Store<AppState>
  ) {
  }

  ngOnInit() {
   this.store.dispatch(new GetProducts());
   this.userObs = this.store.select(getUser);
   this.userObs.subscribe(user => this.user = user);
   console.log('user');
   this.products = this.store.select(getProducts);
   console.log(this.products);

  }

  logOut(): void {
    this.store.dispatch(new LogOut);
  }
  

  addProduct(): void {
    /*const payload = {
      name: this.name,
      description: this.description,
      enterprise: this.user
    }*/
    let payload = new Product();
    payload.name = this.name;
    payload.description = this.description;
    payload.enterprise = this.user.id;
    payload.category =  "no category";
    // console.log("component payload: " + payload.name + " " + payload.description + " " + payload.enterprise);
    this.store.dispatch(new AddProduct(payload));
    window.location.reload();
  }
}