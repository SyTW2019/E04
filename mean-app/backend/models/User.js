var mongoose = require('mongoose');

const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator')

let User = new Schema({
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
    surname: {
        type: String
    },
    birthdate: {
        type: Date
    },
    description: {
        type: String
    }, 
    instagram: {
        type: String
    },
    facebook: {
        type: String
    },
    twitter: {
        type: String
    }
});
User.plugin(uniqueValidator)

export default mongoose.model('User', User);
