var mongoose = require('mongoose');

const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator')

let Enterprise = new Schema({
    email: {
        type: String,
        unique: true,
        required: true,
        dropDups: true 
    },
    password: {
        type: String
    },
    nickname: {
        type: String,
        unique: true,
        required: true,
        dropDups: true 
    },
    name: {
        type: String
    },
    address: {
        type: String,
        required: true,
        dropDups: true
    },
    //phone: {
    //    type: Int16Array
    //},
    description: {
        type: String
    }
    //products: [{
      //  type: mongoose.Schema.Types.ObjectId, ref: 'Product'
    //}]
});

Enterprise.plugin(uniqueValidator)

export default mongoose.model('Enterprise', Enterprise);
