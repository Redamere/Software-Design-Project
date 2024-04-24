const User = require('../models/user')


const signupUser = async (req, res) => {
  const { username, password} = req.body;
  try {
    // Validate request body
    if (!username || !password) {
      return res.status(400).json({ message: 'Username, password, and confirmPassword are required' });
    }
    
    // Create user
    const user = await User.create({ username, password });
    res.status(200).json({ user });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


module.exports = {
  signupUser
}
