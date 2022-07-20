const express = require('express');

const router = express.Router();

const carController = require('../controller/carController');

//GET 
router.get('/list',carController.getCars);

//POST
router.post('/add',carController.createCar);


module.exports = router;