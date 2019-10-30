var mongoose = require('mongoose');

const Schema = mongoose.Schema;

let User = new Schema({
    email: {
        type: String
    },
    password: {
        type: String
    }
});


// No sé porqué los imports y exports fallan
export default mongoose.model('User', User);
// module.exports = User