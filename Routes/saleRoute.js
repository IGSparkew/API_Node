const express = require('express');

const router = express.Router();

const { body } = require('express-validator');

const saleController = require('../Controller/saleController');


//GET 
router.get('/list',saleController.getSales);

//GET by ID
router.get('/:saleId',saleController.getSalebyId);

//POST
router.post('/add',[body('mark').trim().isLength({min: 3}).toLowerCase() ,body('model').trim().toLowerCase()],saleController.newSale);


module.exports = router;