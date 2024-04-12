<<<<<<< Updated upstream
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
=======
const UserController = require('../../controller/signup');
const User = require('../../models/user');
const bcrypt = require('bcrypt');

jest.mock('../../models/user');
jest.mock('bcrypt', () => ({
    hash: jest.fn().mockResolvedValue('hashedPassword'),
}));

describe('signupUser', () => {
    beforeEach(() => {
        jest.clearAllMocks(); // Clear all mocked functions before each test
    });

    it('should create a new user with status 200', async () => {
        // Mock data for request body
        const newUser = {
            username: 'john_doe',
            password: 'password123',
            confirmPassword: 'password123'
        };
        const createdUser = {
            _id: 'userId',
            ...newUser
        };

        // Mock User.create to resolve with createdUser
        User.create.mockResolvedValue(createdUser);

        const req = { body: newUser };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        // Call the signupUser function from the UserController
        await UserController.signupUser(req, res);

        // Assert that User.create was called with newUser
        expect(User.create).toHaveBeenCalledWith(newUser);

        // Assert that response status was set to 200
        expect(res.status).toHaveBeenCalledWith(200);

        // Assert that response json was called with createdUser
        expect(res.json).toHaveBeenCalledWith({ user: createdUser });
    });

    it('should return status 500 if an error occurs during user creation', async () => {
        // Mock data for request body
        const newUser = {
            username: 'john_doe',
            password: 'password123',
            confirmPassword: 'password123'
        };

        // Mock User.create to reject with an error
        const errorMessage = 'Database error';
        User.create.mockRejectedValue(new Error(errorMessage));

        const req = { body: newUser };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        // Call the signupUser function from the UserController
        await UserController.signupUser(req, res);

        // Assert that User.create was called with newUser
        expect(User.create).toHaveBeenCalledWith(newUser);

        // Assert that response status was set to 500
        expect(res.status).toHaveBeenCalledWith(500);

        // Assert that response json was called with the error message
        expect(res.json).toHaveBeenCalledWith({ message: 'Internal Server Error' });
    });


    it('should return status 400 if username, password, or confirmPassword are missing', async () => {
        // Mock request body with missing fields
        const req = { body: { username: 'john_doe', password: 'password123' } };

        // Mock response object
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        // Call the signupUser function from the UserController
        await UserController.signupUser(req, res);

        // Assert that response status was set to 400
        expect(res.status).toHaveBeenCalledWith(400);

        // Assert that response json was called with the error message
        expect(res.json).toHaveBeenCalledWith({ message: 'Username, password, and confirmPassword are required' });
    });

    it('should return status 400 if password and confirmPassword do not match', async () => {
        // Mock request body with mismatched passwords
        const req = { body: { username: 'john_doe', password: 'password123', confirmPassword: 'mismatchedPassword' } };

        // Mock response object
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        // Call the signupUser function from the UserController
        await UserController.signupUser(req, res);

        // Assert that response status was set to 400
        expect(res.status).toHaveBeenCalledWith(400);

        // Assert that response json was called with the error message
        expect(res.json).toHaveBeenCalledWith({ message: 'Passwords do not match' });
    });

});

>>>>>>> Stashed changes

