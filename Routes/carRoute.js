const express = require('express');

const router = express.Router();

const carController = require('../controller/carController');

//GET 
router.get('/list',carController.getCars);

//GET by ID
router.get('/car/:carId',carController.getCarbyId);

//POST
router.post('/add',carController.createCar);


module.exports = router;