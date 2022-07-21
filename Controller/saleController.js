const Sale = require('../Model/saleModel');
const {validationResult} = require('express-validator');

//GET all cars
exports.getSales = (req, res, next) => {
    Sale.find().then(sales => {
        res.status(200).json({
            message: "Get the list of sales with owner!",
            sales: sales
        });

    }).catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    })
};

//GET by ID
exports.getSalebyId = (req, res, next) => {
    const Id = req.params.saleId;
    Sale.findById(Id)
        .then(sale => {
            if (!sale) {
                const error = new Error("id of the sale not find");
                error.statusCode = 404;
                throw error;
            }
            res.status(200).json({
                message: "we find the sale",
                sale: sale
            });
        }).catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        })
}

//Add car 
exports.newSale = (req, res, next) => {
    
    const bodyContent = validationResult(req);

    if(bodyContent.isEmpty()) {
        const error = new Error('Invalid data in field please enter correct field');
        error.statusCode = 422;
        throw error;
    }

    const mark = req.body.mark;
    const model = req.body.model;
    const owner = req.body.owner;
    const seller = req.body.seller;

    const _sale = new Sale({
        mark: mark,
        model: model,
        owner: owner,
        seller: seller
    });

    _sale.save()
        .then(result => {
            res.status(201).json({
                message: "New sale!",
                sale: result
            });
        }).catch(err => {
            console.log(err);
        });


};

//Update car


//Delete 