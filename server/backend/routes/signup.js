const express = require('express');
const mongoose = require('mongoose');

const app = express();
const router = express.Router();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// mongoose.connect(process.env.MONGO_URI_SEAN, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

const userSchema = new mongoose.Schema({
    username: String, 
    password: String,
});

const User = mongoose.model('User', userSchema);


router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    User.findOne({ username: username}, (err, user) => {
        if (user) {
            if(user.password === password){
                res.send({ message: 'Login Successful' });
            }
            else{
                res.send({ message: 'Password is incorrect' });
            }
        }
        else{
            res.send({ message: 'User not registered' });
        }
    })
});
router.post('/signup', async (req, res) => {
    const { username, password, confirmPassword } = req.body;
    if (password !== confirmPassword) {
      res.send({ message: 'Passwords do not match' });
    } else {
      try {
        const existingUser = await User.findOne({ username });
        if (existingUser) {
          res.send({ message: 'Username already exists' });
        } else {
          const user = new User({ username, password });
          await user.save();
          res.send({ message: 'User registered successfully' });
        }
      } catch (error) {
        res.status(500).send({ message: 'Internal Server Error' });
      }
    }
  });
  
  // app.use('/', router);
  
  // const PORT = process.env.PORT || 5000;
  // app.listen(PORT, () => {
  //   console.log(`Server started at http://localhost:${PORT}`);
  // });
  

module.exports = router;

async function AuthController(request, response) {
    try {
        const { username, password } = request.body;

        // Input validation
        if (!username || !password) {
            return response.status(400).json({ message: 'Username and password are required' });
        }

        // Check if the user exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return response.status(400).json({ message: 'User already exists' });
        }

        // Hash the password securely
        const hashedPassword = await hashPassword(password); 

        // Create a new user
        await User.create({ username, password: hashedPassword });
        
        // Return success message
        return response.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error in AuthController:', error);
        return response.status(500).json({ message: 'Internal Server Error' });
    }
}

module.exports = AuthController;