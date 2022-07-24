const Seller = require('../Model/sellerModel');
const { validationResult, body } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

require('dotenv').config();

exports.register = (req, res, next) => {
    const bodyContent = validationResult(req);

    if (!bodyContent.isEmpty()) {
        const error = new Error("Verification failed!");
        error.statusCode = 422;
        error.data = bodyContent.array();
        throw error;
    }

    const name = req.body.name;
    const firstname = req.body.firstname;
    const email = req.body.email;
    const password = req.body.password;

        bcrypt.hash(password, 12).then((pswdHash) => {
            const seller = new Seller({
                name: name,
                firstname: firstname,
                email: email,
                password: pswdHash
            });

            seller.save()
                .then(result => {
                    res.status(200).json({
                    message: "New Seller Create"
                    })
                }
                ).catch(err => {
                    if (!err.statusCode) {
                        err.statusCode = 500;
                    }
                    next(err);
                });
        });    
   
}

exports.login = (req, res, next) =>{
    const bodyContent = validationResult(req);
    if (!bodyContent.isEmpty()) {
        const error = new Error("Verification failed!");
        error.statusCode = 422;
        throw error;
    }

    const email = req.body.email;
    const password = req.body.password;
    let loginedUser;
    Seller.findOne({email: email }).then(user =>{
        if(!user){
            const error = new Error("user Not found");
            error.statusCode = 422;
            throw error;            
        }
        loginedUser = user
        return bcrypt.compare(password,user.password);

    }).then(isEqual =>{
        if(!isEqual){
            const error = new Error("wrong password!");
            error.statusCode = 422;
            throw error;            
        }

        const token = jwt.sign({email: loginedUser.email, userId: loginedUser._id.toString()},process.env.TOKEN,{expiresIn: '1h'});
        res.status(200).json({
            token: token,
            userId: loginedUser._id.toString()
        });
        
    }) .catch(err => {
        if (!err.statusCode) {
          err.statusCode = 500;
        }
        next(err);
      });
};