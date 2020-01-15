import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Enterprise } from 'src/app/models/enterprise';
import { User } from 'src/app/models/user';
import { AddProduct, GetProductFilter, GetProducts } from 'src/app/store/actions/products.actions';
import { Product } from '../../models/product';
import { GetUserBd, LogOut } from '../../store/actions/auth.actions';
import { AppState, getProducts, getUser } from '../../store/app.states';


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
  filter: string;

  constructor(
    private store: Store<AppState>,
    private router : Router
  ) {
  }

  ngOnInit() {
   this.store.dispatch(new GetProducts());
   this.userObs = this.store.select(getUser);
   this.userObs.subscribe(user => this.user = user);
   console.log('user');
   // this.store.dispatch(new GetUserStorage());
   this.products = this.store.select(getProducts);
   // console.log(this.products);

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
    payload.enterprise = this.user.email;
    payload.category =  "no category";
    // console.log("component payload: " + payload.name + " " + payload.description + " " + payload.enterprise);
    this.store.dispatch(new AddProduct(payload));
    this.store.dispatch(new GetProducts());
    this.products = this.store.select(getProducts);
    window.location.reload();
  }

  getProductsFilter(): void {
    let payload = this.filter;
    this.store.dispatch(new GetProductFilter(payload));
    // this.products = this.store.select(getProducts);
    //console.log(this.products);
  }

  getProfile(): void {
    this.store.dispatch(new GetUserBd(this.user.email));
    this.router.navigateByUrl('/profile');
  }
}