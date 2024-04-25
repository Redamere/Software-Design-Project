const { signupUser } = require('../../controller/signup');
const User = require('../../models/user');

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

  it('should return 400 if username or password is missing', async () => {
    req.body.username = '';
    req.body.password = '';

    await signupUser(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: 'Username and password are required' });
  });

  it('should return 409 if username already exists', async () => {
    User.findOne.mockResolvedValueOnce({ username: 'testuser' });

    await signupUser(req, res);

    expect(res.status).toHaveBeenCalledWith(409);
    expect(res.json).toHaveBeenCalledWith({ message: 'Username already exists' });
  });

  it('should create user and return 201 if username is unique', async () => {
    User.findOne.mockResolvedValueOnce(null);
    User.create.mockResolvedValueOnce({ username: 'testuser', password: 'testpassword' });

    await signupUser(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ user: { username: 'testuser', password: 'testpassword' } });
  });

  it('should handle internal server error', async () => {
    User.findOne.mockRejectedValueOnce(new Error('Some internal error'));

    await signupUser(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: 'Internal Server Error' });
  });
});
