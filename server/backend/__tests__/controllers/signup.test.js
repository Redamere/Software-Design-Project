const User = require('../../models/user');
const bcrypt = require('bcrypt');
const { signupUser } = require('../../controller/signup'); 
jest.mock('../../models/user', () => ({
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
      User.create.mockResolvedValueOnce({ username: 'testuser' });
  
      await signupUser(req, res);
  
      expect(User.create).toHaveBeenCalledWith({ username: 'testuser', password: 'testpassword' });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ user: { username: 'testuser' } });
    });
  
    it('should return 400 if username or password is missing', async () => {
      delete req.body.password;
  
      await signupUser(req, res);
  
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'Username, password, and confirmPassword are required' });
    });
  
    it('should return 500 if an error occurs during user creation', async () => {
      User.create.mockRejectedValueOnce('Some error');
  
      await signupUser(req, res);
  
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: 'Internal Server Error' });
    });
  });