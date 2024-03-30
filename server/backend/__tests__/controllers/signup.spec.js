const request = require('supertest');
const AuthController = require('../../controller/signup');
const User = require('../../models/user');
const bcrypt = require('bcrypt');
const { response } = require('express');

jest.mock('bcrypt', () => ({
  hash: jest.fn((password, salt) => Promise.resolve('hashedPassword'))
}));


describe('AuthController', () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Clear all mocked functions before each test
  });

  it('should return 400 if username and password are not provided', async () => {
    const req = { body: {} };
    const res = {
      status: jest.fn(() => res),
      json: jest.fn(),
    };

    await AuthController(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: 'Username and password are required' });
  });

  it('should return 400 if password does not meet strength requirements', async () => {
    const req = { body: { username: 'testuser', password: 'weak' } };
    const res = {
      status: jest.fn(() => res),
      json: jest.fn(),
    };

    await AuthController(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: 'Password must be at least 8 characters long and contain at least one letter and one digit' });
  });

  it('should return 400 if user already exists', async () => {
    const req = { body: { username: 'existinguser', password: 'StrongPassword123' } };
    User.findOne = jest.fn(() => true); // Mocking User.findOne to return true (user exists)
    const res = {
      status: jest.fn(() => res),
      json: jest.fn(),
    };

    await AuthController(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: 'User already exists' });
  });

  it('should return 500 if an internal server error occurs', async () => {
    // Mock request object
    const req = { body: { username: 'newuser', password: 'StrongPassword123' } };

    // Mock User.findOne to throw an error
    User.findOne = jest.fn(() => { throw new Error('Internal Server Error'); });

    
    // Mock response object
    const res = {
      status: jest.fn(() => res),
      json: jest.fn(),
    };

    await AuthController(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: 'Internal Server Error' });
    User.findOne.mockRestore();
  });
  

  describe('User Model', () => {
    it('should return 500 if an internal server error occurs', async () => {
        // Mock request object
        const req = { body: { username: 'newuser', password: 'StrongPassword123' } };
      
        // Mock User.findOne to throw an error
        try {
          // Mock User.findOne to throw an error
          User.findOne = jest.fn(() => { throw new Error('Internal Server Error'); });
          const res = {
            status: jest.fn(() => res),
            json: jest.fn(),
          };
        
          await AuthController(req, res);
          expect(res.status).toHaveBeenCalledWith(500);
          expect(res.json).toHaveBeenCalledWith({ message: 'Internal Server Error' });
        } finally {
          // Always restore the original implementation of User.findOne
          User.findOne.mockRestore();
        }
      });
  });
  
  it('should create new user and return 201 if user is registered successfully', async () => {
    const req = { body: { username: 'newuser', password: 'StrongPassword123' } };
    const res = {
      status: jest.fn().mockReturnThis(), 
      json: jest.fn() 
    };

    await AuthController(req, res); // Make sure to await the completion of AuthController

    // // Assertions
    expect(bcrypt.hash).toHaveBeenCalledWith('StrongPassword123', 10); // Check if bcrypt.hash is called with the correct arguments
    expect(User.create).toHaveBeenCalledWith({ username: 'newuser', password: 'hashedPassword' }); // Check if User.create is called with the correct arguments
    expect(res.status).toHaveBeenCalledWith(201); // Check if response status is 201
    expect(res.json).toHaveBeenCalledWith({ message: 'User registered successfully' }); // Check if response JSON is correct
  });
  

});

