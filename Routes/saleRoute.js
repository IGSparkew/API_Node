const express = require('express');

const router = express.Router();

const carController = require('../Controller/saleController');

//GET 
router.get('/list',carController.getSales);

//GET by ID
router.get('/:saleId',carController.getSalebyId);

//POST
router.post('/add',carController.newSale);


module.exports = router;