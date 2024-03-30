const bcrypt = require('bcrypt');
const User = require('../models/user');

async function AuthController(request, response) {
  try {
    const { username, password } = request.body;

    // Check if username and password are provided
    if (!username || !password) {
      return response.status(400).json({ message: 'Username and password are required' });
    }

    // Validate password strength
    if (password.length < 8 || !/\d/.test(password) || !/[a-zA-Z]/.test(password)) {
      return response.status(400).json({ message: 'Password must be at least 8 characters long and contain at least one letter and one digit' });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return response.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    // // Create new user
   await User.create({ username, password: hashedPassword });

    return response.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error in AuthController:', error);
    return response.status(500).json({ message: 'Internal Server Error' });
  }
}

module.exports = AuthController;

