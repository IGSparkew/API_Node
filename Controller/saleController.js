const Sale = require('../Model/saleModel')
const Saller = require('../Model/sellerModel')
const { validationResult } = require('express-validator')
const path = require('path')
const fs = require('fs')

// GET all cars
exports.getSales = (req, res, next) => {
  Sale.find().then(sales => {
    res.status(200).json({
      message: 'Get the list of sales with owner!',
      sales
    })
  }).catch(err => {
    if (!err.statusCode) {
      err.statusCode = 500
    }
    next(err)
  })
}

// GET by ID
exports.getSalebyId = (req, res, next) => {
  const Id = req.params.saleId
  Sale.findById(Id)
    .then(sale => {
      if (!sale) {
        const error = new Error('id of the sale not find')
        error.statusCode = 404
        throw error
      }
      res.status(200).json({
        message: 'we find the sale',
        sale
      })
    }).catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500
      }
      next(err)
    })
}

// Add car
exports.newSale = (req, res, next) => {
  const bodyContent = validationResult(req)
  // verify field
  if (!bodyContent.isEmpty()) {
    const error = new Error('Invalid data in field please enter correct field')
    error.statusCode = 422
    throw error
  }

  // verify image upload
  if (!req.file) {
    const error = new Error('No image found for this sale')
    error.statusCode = 422
    throw error
  }

  if (!req.userId) {
    const error = new Error('you are not login in seller')
    error.statusCode = 401
    throw error
  }

  const mark = req.body.mark
  const model = req.body.model
  const owner = req.body.owner
  const productImageUrl = req.file.path

  Saller.findById(req.userId).then(seller => {
    const _sale = new Sale({
      mark,
      model,
      productImageUrl,
      owner,
      seller: seller.id
    })

    _sale.save()
      .then(result => {
        res.status(201).json({
          message: 'New sale!',
          sale: result
        })
      }).catch(err => {
        console.log(err)
      })
  })
}

// Update sale
exports.update = (req, res, next) => {
  const saleId = req.params.saleId
  if (!saleId) {
    const error = new Error('wrong or not defined id')
    error.statusCode = 422
    throw error
  }

  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    const error = new Error('Field are incorrect or empty')
    error.statusCode = 422
    throw error
  }

  const mark = req.body.mark
  const model = req.body.model
  const owner = req.body.owner
  const seller = req.body.seller

  let productImageUrl = req.body.image
  if (req.file) {
    productImageUrl = req.file.path
  }

  if (!productImageUrl) {
    const error = new Error('No image upload!')
    error.statusCode = 422
    throw error
  }

  Sale.findById(saleId)
    .then(sale => {
      if (!sale) {
        const error = new Error('not find sale')
        error.statusCode = 404
        throw error
      }

      if (productImageUrl !== sale.productImageUrl) {
        clearImage(sale.productImageUrl)
      }

      sale.mark = mark
      sale.model = model
      sale.owner = owner
      sale.seller = seller
      sale.productImageUrl = productImageUrl
      return sale.save()
    }).then(result => {
      res.status(200).json({ message: 'Sale Update !' })
    }).catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500
      }
      next(err)
    })
}

const clearImage = Imageurl => {
  Imageurl = path.join(__dirname, '..', Imageurl)
  fs.unlink(Imageurl, err => console.log(err))
}

// Delete
exports.deleteSale = (req, res, next) => {
  const saleId = req.params.saleId
  Sale.findById(saleId)
    .then(sale => {
      if (!sale) {
        const error = new Error('id of the sale not find')
        error.statusCode = 404
        throw error
      }
      clearImage(sale.productImageUrl)
      return Sale.findByIdAndRemove(saleId)
    }).then(result => {
      res.status(200).json({ message: 'the Sale is delete' })
    }).catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500
      }
      next(err)
    })
}
