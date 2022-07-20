const Car = require('../Model/carModel');

exports.getCars = (req, res, next) => {
    Car.find().then(cars =>{
        res.status(200).json({
            message:"Get the list of cars with owner!",
            cars:cars
        });

    }).catch(err =>{
        if(!err.statusCode){
            err.statusCode = 500;
        }
       next(err); 
    })
};

exports.getCarbyId = (req, res , next)=> {
    const Id = req.params.carId;
    Car.findById(Id)
        .then(car => {
            if(!car){
                const error = new Error("id of the sell not find");
                error.statusCode = 404;
                throw error;            
            }
            res.status(200).json({
                message:"we find the car",
                car:car
            });
        }).catch(err => {
            if(!err.statusCode){
                err.statusCode = 500;
            }
            next(err);
        })
}



exports.createCar = (req, res, next) => {
    const mark = req.body.mark;
    const model = req.body.model;
    const owner = req.body.owner;
    const seller = req.body.seller;

    const _car= new Car({
        mark: mark,
        model: model,
        owner: owner,
        seller: seller
    });
    
    _car.save()
    .then(result =>{
        res.status(201).json({
            message:"new Owner of car in park!",
            car: result
        });
    }).catch(err =>{
        console.log(err);
    });

    
};