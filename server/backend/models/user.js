const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');


const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required:  [true, 'Username is required'],
        unique: true,
        trim: true,
        minlength: [2, 'Username must be at least 2 characters long'],
        maxlength: [50, 'Username cannot exceed 50 characters']
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [2, 'Password must be at least 6 characters long']
    }
});


userSchema.pre('save', async function(next) {
    const user = this;
    if (!user.isModified('password')) return next();
    const hashedPassword = await bcrypt.hash(user.password, 10);
    user.password = hashedPassword;
    next();
});

module.exports = mongoose.model('User', userSchema);