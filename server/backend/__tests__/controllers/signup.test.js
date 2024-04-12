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