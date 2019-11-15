import {Enterprise} from './enterprise';
import {User} from './user';

export class Product {

    code:String;
    name:String;
    category:String;
    description:String;
    enterprise:Enterprise;
    users:User[];

    constructor(code:String, name:String, category:String, description:String, enterprise: Enterprise){
        this.code = code;
        this.name = name;
        this.category = category;
        this.description = description;
        this.enterprise = enterprise;
    }
}
