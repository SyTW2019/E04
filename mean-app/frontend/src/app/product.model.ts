import { User } from './user.model';
import { Enterprise } from './enterprise.model';

export interface Product {
    code:String;
    name:String;
    category:String;
    description:String;
    enterprise:Enterprise;
    users:User[];
}

export class Product {

}