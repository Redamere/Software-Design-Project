const UserController = require('../../controller/login');

const User = require('../../models/user');
const bcrypt = require('bcryptjs');
jest.mock('../../models/user');
jest.mock('bcryptjs');

describe('loginUser', () => {
    beforeEach(() => {
        jest.clearAllMocks(); // Clear all mocked functions before each test
    });

    it('should login successfully with correct username and password', async () => {
        // Mock data for request body
        const userData = {
            username: 'john_doe',
            password: 'password123',
        };

        const userFromDatabase = {
            _id: 'userId',
            username: 'john_doe',
            password: await bcrypt.hash('password123', 10) // Simulate hashed password in database
        };

        // Mock User.findOne to resolve with userFromDatabase
        User.findOne.mockResolvedValue(userFromDatabase);

        // Mock bcrypt.compare to resolve with true
        bcrypt.compare.mockResolvedValue(true);

        const req = { body: userData };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        // Call the loginUser function from the UserController
        await UserController.loginUser(req, res);

        // Assert that User.findOne was called with userData.username
        expect(User.findOne).toHaveBeenCalledWith({ username: userData.username });

        // Assert that bcrypt.compare was called with userData.password and userFromDatabase.password
        expect(bcrypt.compare).toHaveBeenCalledWith(userData.password, userFromDatabase.password);

        // Assert that response status was set to 200
        expect(res.status).toHaveBeenCalledWith(200);

        // Assert that response json was called with success message
        expect(res.json).toHaveBeenCalledWith({ message: 'Login Successful' });
    });

    it('should return 401 if user does not exist', async () => {
        // Mock data for request body
        const userData = {
            username: 'non_existing_user',
            password: 'password123',
        };

        // Mock User.findOne to resolve with null, simulating user not found
        User.findOne.mockResolvedValue(null);

        const req = { body: userData };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        // Call the loginUser function from the UserController
        await UserController.loginUser(req, res);

        // Assert that User.findOne was called with userData.username
        expect(User.findOne).toHaveBeenCalledWith({ username: userData.username });

        // Assert that response status was set to 401
        expect(res.status).toHaveBeenCalledWith(401);

        // Assert that response json was called with error message
        expect(res.json).toHaveBeenCalledWith({ message: 'Username or password is incorrect' });
    });

    it('should return 401 if password is incorrect', async () => {
        // Mock data for request body
        const userData = {
            username: 'john_doe',
            password: 'incorrect_password',
        };

        const userFromDatabase = {
            _id: 'userId',
            username: 'john_doe',
            password: await bcrypt.hash('password123', 10) // Simulate hashed password in database
        };

        // Mock User.findOne to resolve with userFromDatabase
        User.findOne.mockResolvedValue(userFromDatabase);

        // Mock bcrypt.compare to resolve with false, simulating incorrect password
        bcrypt.compare.mockResolvedValue(false);

        const req = { body: userData };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        // Call the loginUser function from the UserController
        await UserController.loginUser(req, res);

        // Assert that User.findOne was called with userData.username
        expect(User.findOne).toHaveBeenCalledWith({ username: userData.username });

        // Assert that bcrypt.compare was called with userData.password and userFromDatabase.password
        expect(bcrypt.compare).toHaveBeenCalledWith(userData.password, userFromDatabase.password);

        // Assert that response status was set to 401
        expect(res.status).toHaveBeenCalledWith(401);

        // Assert that response json was called with error message
        expect(res.json).toHaveBeenCalledWith({ message: 'Username or password is incorrect' });
    });

    it('should return 400 if username or password is missing', async () => {
        // Mock request body with missing fields
        const req = { body: { password: 'password123' } };

        // Mock response object
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        // Call the loginUser function from the UserController
        await UserController.loginUser(req, res);

        // Assert that response status was set to 400
        expect(res.status).toHaveBeenCalledWith(400);

        // Assert that response json was called with the error message
        expect(res.json).toHaveBeenCalledWith({ message: 'Username and password are required' });
    });
    it('should return 500 if an error occurs during login process', async () => {
      // Mock data for request body
      const userData = {
          username: 'john_doe',
          password: 'password123',
      };
  
      // Mock User.findOne to throw an error
      const errorMessage = 'Database error';
      User.findOne.mockRejectedValue(new Error(errorMessage));
  
      const req = { body: userData };
      const res = {
          status: jest.fn().mockReturnThis(),
          json: jest.fn(),
      };
  
      // Call the loginUser function from the UserController
      await UserController.loginUser(req, res);
  
      // Assert that User.findOne was called with userData.username
      expect(User.findOne).toHaveBeenCalledWith({ username: userData.username });
  
      // Assert that response status was set to 500
      expect(res.status).toHaveBeenCalledWith(500);
  
      // Assert that response json was called with the error message
      expect(res.json).toHaveBeenCalledWith({ message: 'Internal Server Error' });
  });
});