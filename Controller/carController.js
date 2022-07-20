exports.getCars = (req, res, next) => {
    res.status(200).json({
        cars: [
            {
                _id:0,
                mark:"peugeot",
                model:"206",
                owner:"Jhon Smith"
            }
        ]
    });
};


exports.createCar = (req, res, next) => {
    const mark = req.body.mark;
    const model = req.body.model;
    const owner = req.body.owner;

    res.status(201).json({
        message:"new Owner of car in park!",
        car: {id: 1,mark: mark,model: model,owner: owner}
    });
};