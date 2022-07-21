const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const SellerModel = new Schema({
    nom:{
        type:String,
        required:true
    },
    prenom:{
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