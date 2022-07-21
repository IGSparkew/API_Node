//Get express module
const express = require('express');

//import path
const path = require('path');

//import mongoose
const mongoose = require('mongoose');

//Get Body Parser module
const bodyParser = require('body-parser'); 

//dot-env import 
require('dotenv').config();

//Create app in Express
const app = express();

//Route sell import 
const sellRoute = require('./Routes/saleRoute');
//Route for Users 
const userRoute = require('./Routes/sellerRoute');

app.get('/', (req, res) => {
    res.send('Hello World!');
});

//user body parser to get body for post request 
app.use(bodyParser.json());

//setup response header 
app.use((req,res,next)=>{
    res.setHeader('Access-Allow-Origin', '*');
    res.setHeader('Access-Allow-Methods', 'OPTIONS GET POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type', 'Authorization');
    next();
})

// Access to sale Routes by /sale url 
app.use('/sale',sellRoute);

//Access to user Routes by /user
app.use('/user',userRoute);

//make static file 
app.use('images',express.static(path.join(__dirname,'images')));


//app on port 3000
mongoose
    .connect(
    `mongodb+srv://${process.env.USER_DB}:${process.env.PASSWORD_DB}@cluster0.l49fyqh.mongodb.net/api`
    ).then(result => {
        app.listen(8080)
    }).catch(err=>console.log(err));
