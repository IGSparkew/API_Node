const express = require('express')

const router = express.Router()

const { body } = require('express-validator')

const saleController = require('../Controller/saleController')

const isSeller = require('../middleware/verificationSeller')

// import multer to storage image file
const multer = require('multer')

// configuration of storage disk with destination and filename
const storageDisk = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'images')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})

// Filter to limit the type of file we can upload
const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
    cb(null, true)
  } else {
    cb(null, false)
  }
}

// create an upload object
const upload = multer({ storage: storageDisk, fileFilter })

// GET
router.get('/list', isSeller, saleController.getSales)

// GET by ID
router.get('/one/:saleId', isSeller, saleController.getSalebyId)

// POST
router.post('/add', [
  body('mark').trim().toLowerCase(),
  body('model').trim().toLowerCase()
], upload.single('image'), isSeller, saleController.newSale)

// PUT
router.put('/update/:saleId', [
  body('mark').trim().isLength({ min: 3 }).toLowerCase(),
  body('model').trim().toLowerCase()
], upload.single('image'), isSeller, saleController.update)

// DELETE
router.delete('/delete/:saleId', saleController.deleteSale)

module.exports = router
