import {Product} from './product'


export class Enterprise {
    email:String;
    password:String;
    nickname:String;
    name:String;
    phone:Int16Array;
    description:String;
    products:Product[];

    constructor(email:String, password:String, nickname:String, name:String, phone:Int16Array, description:String) {
        this.email = email;
        this.password = password;
        this.nickname = nickname;
        this.name = name;
        this.phone = phone;
        this.description = description;
    }

}
