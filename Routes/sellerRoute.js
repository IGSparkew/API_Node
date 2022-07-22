const express = require('express');

const router = express.Router();

const userController = require('../Controller/sellerController');

const user = require('../Model/sellerModel');

const { body } = require('express-validator');


router.post('/register',[body('email')
                                .isEmail()
                                .withMessage('your Email is invalid')
                                .custom((value, { req }) =>{
                                    return user.findOne({ email: value })
                                .then(userDoc => {
                                        if(userDoc){
                                            return Promise.reject('Your Mail already exist please login');
                                        }
                                    });
                                }).normalizeEmail(),body('name').trim(),
                                            body('firstname').trim(),
                                            body('password').trim()],
                                            userController.register);

router.post('/login',[body('email').isEmail().withMessage('your Email is invalid').normalizeEmail(),body('password').trim()],userController.login);


module.exports = router;