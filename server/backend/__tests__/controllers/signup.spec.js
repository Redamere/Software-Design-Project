const UserController = require('../../controller/signup');
const User = require('../../models/user');

jest.mock('../../models/user');

describe('signupUser', () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Clear all mocked functions before each test
  });

  it('should create a new user with status 201', async () => {
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

    User.create.mockResolvedValue(createdUser);
    const req = { body: newUser };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await UserController.signupUser(req, res);
    expect(User.create).toHaveBeenCalledWith(newUser);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ user: createdUser });
  });

  it('should return status 400 if there is an error during user creation', async () => {
    const req = { body: { username: 'john_doe', password: 'password123' } };

    const errorMessage = 'Password and confirmPassword do not match';

    User.create.mockRejectedValue(new Error(errorMessage));
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await UserController.signupUser(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
  });
});

describe('loginUser', () => {
  it('should return status 200 if login is successful', async () => {
    const req = { body: { username: 'fleet', password: 'password' } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Call loginUser function
    await UserController.loginUser(req, res);

    // Check if response status is 200
    expect(res.status).toHaveBeenCalledWith(200);

    // Check if response JSON includes success message
    expect(res.json).toHaveBeenCalledWith({ message: 'Login Successful' });
  });

  it('should return status 401 if login fails due to incorrect credentials', async () => {
    // Mock request object with invalid credentials
    const req = { body: { username: 'invalid_user', password: 'invalid_password' } };

    // Mock response object
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Call loginUser function
    await UserController.loginUser(req, res);

    // Check if response status is 401
    expect(res.status).toHaveBeenCalledWith(401);

    // Check if response JSON includes error message
    expect(res.json).toHaveBeenCalledWith({ message: 'Username or password is incorrect' });
  });
});