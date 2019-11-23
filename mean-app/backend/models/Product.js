var mongoose = require('mongoose');

const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator')

let Product = new Schema({
    code: {
        type: String,
        unique: true,
        required: true,
        dropDups: true 
    },
    name: {
        type: String
    },
    category: {
        type: String
    },
    description: {
        type: String
    },
    enterprise: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Enterprise'
    },
    users: {
       type: [
           { type: mongoose.Schema.Types.ObjectId, ref: 'User'}
       ] 
    },

});
Product.plugin(uniqueValidator)

export default mongoose.model('Product', Product);
