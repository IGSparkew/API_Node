const express = require('express');

const router = express.Router();

const { body } = require('express-validator');

const saleController = require('../Controller/saleController');

const multer = require('multer');

const storageDisk = multer.diskStorage({
    destination:function(req ,file,cb){
        cb(null,'images');
    },
    filename:function(req,file,cb){
        cb(null,file.originalname);
    }
})

const upload = multer({storage:storageDisk});


//GET 
router.get('/list',saleController.getSales);

//GET by ID
router.get('/one/:saleId',saleController.getSalebyId);

//POST
router.post('/add',[
    body('mark').trim().isLength({min: 3}).toLowerCase(),
    body('model').trim().toLowerCase()
],upload.single('image'),saleController.newSale);


router.post('/image', upload.single('image'), (req,res) => {
    res.send(req.file.path);
});

module.exports = router;