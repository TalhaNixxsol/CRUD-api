const mongoose=require('mongoose');
const Cryptr = require('cryptr');
const cryptr = new Cryptr('myTotallySecretKey');
const signupSchema=new mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
});

const signupModel=mongoose.model('users',signupSchema);
module.exports=signupModel;