const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const SellerModel = new Schema({
    name:{
        type:String,
        required:true
    },
    firstname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    sales:[{
        type:mongoose.Schema.Types,
        ref:'sales'
    }]

});

module.exports = mongoose.model('Seller',SellerModel);