//Get express module
const express = require('express');

//import mongoose
const mongoose = require('mongoose');

//Get Body Parser module
const bodyParser = require('body-parser'); 

//Create app in Express
const app = express();

//Route car import 
const carRoute = require('./Routes/carRoute');

app.get('/', (req, res) => {
    res.send('Hello World!');
});

//user body parser to get body for post request in x-www-form-encoded
app.use(bodyParser.urlencoded());
//app.use(bodyParser.json());

app.use((req,res,next)=>{
    res.setHeader('Access-Allow-Origin', '*');
    res.setHeader('Access-Allow-Methods', 'OPTIONS GET POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type', 'Authorization');
    next();
})

// Access to car Routes by /car url 
app.use('/car',carRoute);


//app on port 3000
mongoose
    .connect(
    'mongodb+srv://admin:1yTHZUIfqZ9fDT7N@cluster0.l49fyqh.mongodb.net/api'
    ).then(result => {
        app.listen(3000)
    }).catch(err=>console.log(err));
