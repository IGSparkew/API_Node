const Seller = require('../Model/sellerModel');
const { validationResult, body } = require('express-validator');
const bcrypt = require('bcrypt');

exports.register = (req, res, next) => {
    const bodyContent = validationResult(req);

    if (bodyContent.isEmpty()) {
        const error = new Error("Invalid field or empty field");
        error.statusCode = 422;
        throw error;
    }

    const name = req.body.name;
    const firstname = req.body.firstname;
    const email = req.body.email;
    const password = req.body.password;

    Seller.find({ email: email }).then(result => {
        console.log(password)
        if (result.length === 0 && password !== undefined) {
            const seller = new Seller({
                name: name,
                firstname: firstname,
                email: email,
                password: password
            });
            const salt =  bcrypt.genSalt(10);
            seller.password =  bcrypt.hash(seller.password, salt);
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
        } else {
            const error = new Error('Mail already have an account please login!');
            error.statusCode = 401;
            throw error;
        }
    });
}