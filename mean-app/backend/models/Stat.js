var mongoose = require('mongoose');

const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator')

let Stat = new Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Product'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
    },
    quantity_sold:{
        type: int
    },
    prestige: {
        type: int
    }
});
Stat.plugin(uniqueValidator)

export default mongoose.model('Stat', Stat);
