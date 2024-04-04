const User = require('../models/user')

const signupUser = async (req, res) => {
  const { username, password, confirmPassword } = req.body;
  // if (password !== confirmPassword) {
  //     res.status(400).json({ message: 'Passwords do not match' });
  // } else {
  //     try {
  //         const existingUser = await User.findOne({ username });
  //         if (existingUser) {
  //             res.status(409).json({ message: 'Username already exists' });
  //         } else {
  //             const user = new User({ username, password });
  //             await user.save();
  //             res.status(201).json({ message: 'User registered successfully' });
  //         }
  //     } catch (error) {
  //         console.error('Error:', error);
  //         res.status(500).json({ message: 'Internal Server Error' });
  //     }
  // }
  try {
    const user = await User.create({ username, password, confirmPassword});
    res.status(201).json({ user });
  }
  catch (error) {
    res.status(400).json({ error: error.message });
  }
};



const loginUser = async (req, res) => {
  const { username, password } = req.body;
  try {
      // Simulating user login without actual database check
      if (username === 'fleet' && password === 'password') {
          res.status(200).json({ message: 'Login Successful' });
      } else {
          res.status(401).json({ message: 'Username or password is incorrect' });
      }
  } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = {
  signupUser,
  loginUser
}
