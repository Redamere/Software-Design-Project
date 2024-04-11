const bcrypt = require('bcryptjs');
const User = require('../models/user');

const loginUser = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }


  try {
    // Find user by username in the database
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: 'Username or password is incorrect' });
    }

    // Compare hashed password with the provided password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Username or password is incorrect' });
    }

    // Password is correct, login successful
    res.status(200).json({ message: 'Login Successful' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = {
  loginUser
};