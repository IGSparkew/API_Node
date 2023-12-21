const mockingoose = require('mockingoose')
const { getSales, getSalebyId, newSale, update, deleteSale } = require('../Controller/saleController')
const Sale = require('../Model/saleModel')
const Saller = require('../Model/sellerModel')

// Mocking necessary modules or dependencies
jest.mock('express-validator')
jest.mock('path')
jest.mock('fs')

// Mocking express-validator functions
const { validationResult } = require('express-validator')
validationResult.mockImplementation(() => ({ isEmpty: jest.fn(() => true) }))

// Mocking necessary objects and functions
const mockReq = {
  params: {},
  body: {},
  file: {
    path: '/path/to/fake/image.jpg'
  },
  userId: 'fakeUserId'
}

const mockRes = {
  status: jest.fn(() => mockRes),
  json: jest.fn()
}

const mockNext = jest.fn()

describe('Controller Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockingoose.resetAll()
  })

  describe('getSales', () => {
    it('should return a list of sales', async () => {
      // Mocking Sale.find to resolve with fake sales
      mockingoose(Sale).toReturn([{ mark: 'FakeMark', model: 'FakeModel' }], 'find')

      await getSales(mockReq, mockRes, mockNext)

      expect(mockRes.status).toHaveBeenCalledWith(200)
      expect(mockRes.json).toHaveBeenCalledWith({
        message: 'Get the list of sales with owner!',
        sales: expect.any(Array)
      })
    })
  })

  describe('getSalebyId', () => {
    beforeEach(() => {
      jest.clearAllMocks()
      mockingoose.resetAll()
    })

    it('should return a specific sale by ID', async () => {
      const fakeSale = {
        _id: '65833df9702824bf114eac3a',
        mark: 'FakeMark',
        model: 'FakeModel'
      }

      mockingoose(Sale).toReturn(fakeSale, 'findOne')

      mockReq.params.saleId = 'fakeSaleId'

      await getSalebyId(mockReq, mockRes, mockNext)

      expect(mockRes.status).toHaveBeenCalledWith(200)
      expect(mockRes.json).toHaveBeenCalledWith(
        expect.objectContaining({
          message: 'we find the sale',
          sale: expect.objectContaining({
            mark: 'FakeMark',
            model: 'FakeModel'
          })
        })
      )
    })
  })

  describe('update', () => {
    beforeEach(() => {
      jest.clearAllMocks()
    })

    it('should update a sale', async () => {
      // Mocke les résultats de la validation
      validationResult.mockReturnValue({
        isEmpty: jest.fn().mockReturnValue(true)
      })

      // Mocke les paramètres de la requête
      mockReq.params.saleId = 'fakeSaleId'
      mockReq.body = {
        mark: 'UpdatedMark',
        model: 'UpdatedModel',
        owner: 'UpdatedOwner',
        seller: 'UpdatedSeller',
        image: '/path/to/fake/updated/image.jpg'
      }
      mockReq.file = { path: '/path/to/fake/updated/image.jpg' }

      const fakeSale = {
        _id: 'fakeSaleId',
        mark: 'FakeMark',
        model: 'FakeModel',
        owner: 'FakeOwner',
        seller: 'FakeSeller',
        productImageUrl: '/path/to/fake/image.jpg',
        save: Sale.prototype.save.mockResolvedValueOnce({
          _id: 'newFakeSaleId',
          mark: 'FakeMark',
          model: 'FakeModel',
          productImageUrl: '/path/to/fake/image.jpg',
          owner: 'FakeOwner',
          seller: 'fakeSellerId'
        })
      }

      mockingoose(Sale).toReturn(fakeSale, 'findOne')

      await update(mockReq, mockRes, mockNext)

      expect(validationResult).toHaveBeenCalled()
      expect.objectContaining({
        message: 'Sale Update !'
      })
    })
  })

  describe('newSale', () => {
    beforeEach(() => {
      jest.clearAllMocks()
      mockingoose.resetAll()
    })

    it('should create a new sale', async () => {
      // Mocke les résultats de la validation
      validationResult.mockReturnValue({
        isEmpty: jest.fn().mockReturnValue(true)
      })

      // Mocke le fichier pour simuler une image uploadée
      mockReq.file = { path: '/path/to/fake/image.jpg' }

      // Mocke l'ID de l'utilisateur connecté
      mockReq.userId = 'fakeSellerId'

      jest.spyOn(Saller, 'findById').mockResolvedValueOnce({
        _id: 'fakeSellerId',
        name: 'FakeName',
        firstname: 'FakeFirstName',
        email: 'fake@email.com',
        password: 'fakePassword',
        sales: []
      })

      Sale.prototype.save.mockResolvedValueOnce({
        _id: 'newFakeSaleId', // Assurez-vous d'utiliser un nouvel ID unique
        mark: 'FakeMark',
        model: 'FakeModel',
        productImageUrl: '/path/to/fake/image.jpg',
        owner: 'FakeOwner',
        seller: 'fakeSellerId'
      })

      // Exécute la fonction du contrôleur
      await newSale(mockReq, mockRes, mockNext)

      // Vérifie si les appels aux fonctions attendus ont été effectués
      expect(validationResult).toHaveBeenCalled()
      expect.objectContaining({
        message: 'New sale!',
        sale: expect.objectContaining({
          mark: 'FakeMark',
          model: 'FakeModel',
          owner: 'FakeOwner',
          productImageUrl: '/path/to/fake/image.jpg',
          seller: 'fakeSellerId'
        })
      })
    })
  })

  describe('deleteSale', () => {
    beforeEach(() => {
      jest.clearAllMocks()
      mockingoose.resetAll()
    })

    it('should delete a sale', async () => {
      // Mocke l'ID de la vente à supprimer
      const fakeSaleId = 'fakeSaleId'
      mockReq.params.saleId = fakeSaleId
      validationResult.mockReturnValue({
        isEmpty: jest.fn().mockReturnValue(true)
      })

      // Mocke Sale.findById pour résoudre avec un faux objet de vente
      jest.spyOn(Sale, 'findById').mockResolvedValueOnce({
        _id: fakeSaleId,
        mark: 'FakeMark',
        model: 'FakeModel',
        productImageUrl: '/path/to/fake/image.jpg',
        owner: 'FakeOwner',
        seller: 'fakeSellerId'
      })

      // Mocke Sale.findByIdAndRemove pour résoudre avec un faux résultat
      jest.spyOn(Sale, 'findByIdAndRemove').mockResolvedValueOnce({})

      // Exécute la fonction du contrôleur
      await deleteSale(mockReq, mockRes, mockNext)

      expect.objectContaining({
        message: 'the Sale is delete'
      })
    })
  })
})
