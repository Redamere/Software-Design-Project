const mongoose = require('mongoose');


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
    },
    confirmPassword: {
        type: String,
        required: [true, 'Confirm Password is required'],
        validate: {
            validator: function(value) {
                return value === this.password;
            },
            message: 'Passwords do not match'
        }
    }
});





module.exports = mongoose.model('User', userSchema);