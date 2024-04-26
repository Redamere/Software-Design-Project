const User = require('../../models/user');
const bcrypt = require('bcrypt');
const { signupUser } = require('../../controller/signup');

jest.mock('../../models/user', () => ({
  findOne: jest.fn(),
  create: jest.fn(),
}));

describe('signupUser', () => {
  let req, res;

  beforeEach(() => {
    req = {
      body: {
        username: 'testuser',
        password: 'testpassword',
      },
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  it('should create a new user and return it', async () => {
    User.findOne.mockResolvedValueOnce(null); 
    User.create.mockResolvedValueOnce({ username: 'testuser' });

    await signupUser(req, res);

    expect(User.findOne).toHaveBeenCalledWith({ username: 'testuser' });
    expect(User.create).toHaveBeenCalledWith({ username: 'testuser', password: 'testpassword' });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ user: { username: 'testuser' } });
  });

  it('should return 400 if username already exists', async () => {
    User.findOne.mockResolvedValueOnce({ username: 'testuser' }); // Simulate that username exists

    await signupUser(req, res);

    expect(User.findOne).toHaveBeenCalledWith({ username: 'testuser' });
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: 'Username already exists' });
  });

  it('should return 400 if username or password is missing', async () => {
    delete req.body.password;

    await signupUser(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: 'Username and password are required' });
  });

  it('should return 500 if an error occurs during user creation', async () => {
    User.findOne.mockResolvedValueOnce(null); // Simulate that username doesn't exist
    User.create.mockRejectedValueOnce('Some error');

    await signupUser(req, res);

    expect(User.create).toHaveBeenCalledWith({ username: 'testuser', password: 'testpassword' });
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: 'Internal Server Error' });
  });
});