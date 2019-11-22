var mongoose = require('mongoose');

const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator')

let Payment = new Schema({
    method: {
        type: String
    },
    quantity: {
        type: double
    },
    enterprise: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Enterprise'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
    },
    description: {
        type: String
    }

});

Payment.plugin(uniqueValidator)

export default mongoose.model('Payment', Payment);
