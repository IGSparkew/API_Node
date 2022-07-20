//Get express module
const express = require('express');

//Get Body Parser module
const bodyParser = require('body-parser'); 

//Create app in Express
const app = express();

//Route import 
const carRoute = require('./Routes/carRoute');

app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.use(bodyParser.urlencoded());
//app.use(bodyParser.json());

app.use((req,res,next)=>{
    res.setHeader('Access-Allow-Origin', '*');
    res.setHeader('Access-Allow-Methods', 'OPTIONS GET POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type', 'Authorization');
    next();
})

app.use('/car',carRoute);


//app on port 3000
app.listen(3000);