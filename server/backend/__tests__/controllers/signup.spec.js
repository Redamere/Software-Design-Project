const request = require('supertest');
const AuthController = require('../../controller/signup');
const User = require('../../models/user');
const { response } = require('express');

describe('AuthController', () => {
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
    User.findOne = jest.fn(() => true);
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
    User.findOne = jest.fn(() => true);
    const res = {
      status: jest.fn(() => res),
      json: jest.fn(),
    };

    await AuthController(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: 'User already exists' });
  });

  // it('should return 500 if an internal server error occurs', async () => {
  //   // Mock request object
  //   const req = { body: { username: 'newuser', password: 'StrongPassword123' } };

  //   // Mock User.create to throw an error
  //   User.create = jest.fn(() => { throw new Error('Internal Server Error'); });

  //   // Mock response object
  //   const res = {
  //     status: jest.fn(() => res),
  //     json: jest.fn(),
  //   };
  //   await AuthController(req, res);

  //   expect(res.status).toHaveBeenCalledWith(500);
  //   expect(res.json).toHaveBeenCalledWith({ message: 'Internal Server Error' });
  // });
});