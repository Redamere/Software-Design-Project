const User = require('../models/user')


const signupUser = async (req, res) => {
  const { username, password, confirmPassword } = req.body;
  try {
    // Validate request body
    if (!username || !password || !confirmPassword) {
      return res.status(400).json({ message: 'Username, password, and confirmPassword are required' });
    }
    
    // Check if password and confirmPassword match
    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }
    
    // Create user
    const user = await User.create({ username, password, confirmPassword });
    res.status(200).json({ user });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }

};



module.exports = {
  signupUser
}
