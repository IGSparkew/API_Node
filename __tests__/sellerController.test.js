const { register, login } = require('../Controller/sellerController');
const Seller = require('../Model/sellerModel');
const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');

jest.mock('express-validator');

describe('Seller Controller Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should register a new seller', async () => {
    validationResult.mockReturnValue({ isEmpty: jest.fn().mockReturnValue(true) });

    const mockReq = {
      body: {
        name: 'FakeName',
        firstname: 'FakeFirstName',
        email: 'fake@example.com',
        password: 'fakePassword',
      },
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const mockNext = jest.fn();

    await register(mockReq, mockRes, mockNext);

    expect(validationResult).toHaveBeenCalled();
    expect.objectContaining({
      message: 'New Seller Create',
    })
  });

  it('should log in a seller and return a token', async () => {
    validationResult.mockReturnValue({ isEmpty: jest.fn().mockReturnValue(true) });

    jest.spyOn(Seller, 'findOne').mockResolvedValueOnce({
      email: 'fake@example.com',
      password: '$2b$12$fakehash',
    });

    jest.spyOn(bcrypt, 'compare').mockResolvedValueOnce(true);

    const mockReq = {
      body: {
        email: 'fake@example.com',
        password: 'fakePassword',
      },
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const mockNext = jest.fn();

    await login(mockReq, mockRes, mockNext);

    expect.objectContaining({
      token: expect.any(String),
      userId: expect.any(String),
    })
  });
});
