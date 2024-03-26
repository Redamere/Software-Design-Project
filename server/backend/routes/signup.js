import express from 'express';
import cor from 'cors';
import mongoose from 'mongoose';

const router = express.Router();
router.use(express.json());
router.use(cors());
router.use(express.urlencoded({ extended: true }));

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
app.post('/signup', async (req, res) => {
    console.log(req.body);
    const {username,password,confirmPassword} = req.body;
    if(password !== confirmPassword){
        res.send({ message: 'Passwords do not match' });
    }
    else{
        const user = new User({username,password,})
         user.save((err) => {
            if(err){
                res.send(err);
            }
            else{
                res.send({ message: 'User registered successfully' });
            }
        })
    }
});
app.listen(5000, () => {
    console.log('Server started at http://localhost:5000');
});