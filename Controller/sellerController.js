const Seller = require('../Model/sellerModel');
const {validationResult, body} = require('express-validator');

exports.register = (req, res, next) => {
    const bodyContent = validationResult(req);

    if(bodyContent.isEmpty()){
        const error = new Error("Invalid field or empty field");
        error.statusCode = 422;
        throw error;
    }

    const name = req.body.name;
    const firstname = req.body.firstname;
    const email = req.body.email;
    const password = req.body.password;

    



}