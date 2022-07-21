const express = require('express');

const router = express.Router();

const userController = require('../Controller/sellerController');


const { body } = require('express-validator');


router.post('/register',[body('email').isEmail(),body('name').trim().isLength({min:2}),
            body('firstname').trim().isLength({min:2})],
            userController.register);


module.exports = router;