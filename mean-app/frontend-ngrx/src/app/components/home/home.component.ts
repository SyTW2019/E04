import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { AppState, selectAuthState, selectProductState } from '../../store/app.states';
import { LogOut } from '../../store/actions/auth.actions';
import { Product } from '../../models/product';
import { GetProducts, AddProduct } from 'src/app/store/actions/products.actions';
import { Enterprise } from 'src/app/models/enterprise';
import { User } from 'src/app/models/user';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  getState: Observable<any>;
  user: Enterprise | User;
  products: Observable<Product[]>;
  name: string;
  description: string;

  constructor(
    private store: Store<AppState>
  ) {
    this.getState = this.store.select(selectAuthState);
    this.getState = this.store.select(selectProductState);
  }

  ngOnInit() {
    this.getState.subscribe((state) => {
      console.log(state);
      this.user = state.user;
      console.log("user: " + this.user);
      this.products = state.allProducts.products;
      console.log(this.products); 
    });
    this.store.dispatch(new GetProducts());
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
  }

}
