import { Product } from './product.model'


export interface Enterprise {
    email:String;
    password:String;
    nickname:String;
    name:String;
    phone:Int16Array;
    description:String;
    products:Product[];
}

export class Enterprise {

}