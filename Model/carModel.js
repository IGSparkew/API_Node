const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const carSchema = new Schema({
    mark:{
        type: String,
        required: true
    },
    model:{
        type: String,
        required: true
    },
    owner:{
        type:String,
        required:true
    },
    seller:{
       type:String,
       required:true
    }
});

module.exports = mongoose.model('cars', carSchema);