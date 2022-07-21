//Get express module
const express = require('express');

//import path
const path = require('path');

//import mongoose
const mongoose = require('mongoose');

//Get Body Parser module
const bodyParser = require('body-parser'); 

//Create app in Express
const app = express();

//Route sell import 
const sellRoute = require('./Routes/saleRoute');

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

//make static file 
app.use('images',express.static(path.join(__dirname,'images')));


//app on port 3000
mongoose
    .connect(
    'mongodb+srv://admin:1yTHZUIfqZ9fDT7N@cluster0.l49fyqh.mongodb.net/api'
    ).then(result => {
        app.listen(8080)
    }).catch(err=>console.log(err));
