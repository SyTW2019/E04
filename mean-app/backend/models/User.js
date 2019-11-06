var mongoose = require('mongoose');

const Schema = mongoose.Schema;

let User = new Schema({
    email: {
        type: String, unique: true, required: true, dropDups: true 
    },
    password: {
        type: String
    },
    nickname: {
        type: String, unique: true, required: true, dropDups: true 
    }
});

export default mongoose.model('User', User);
