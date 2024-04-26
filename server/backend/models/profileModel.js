const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const profileSchema = new Schema({
    user_id: {
        type: String,
        required: true
    },
    fullName: {
        type: String,
        required: [true, 'Full name is required'],
        trim: true,
        minlength: [2, 'Full name must be at least 2 characters long'],
        maxlength: [50, 'Full name cannot exceed 50 characters'],
    },
    address1: {
        type: String,
        required: [true, 'Address line 1 is required'],
        trim: true,
        minlength: [5, 'Address line 1 must be at least 5 characters long'],
        maxlength: [50, 'Address line 1 cannot exceed 50 characters'],
    },
    address2: {
        type: String,
        trim: true,
        maxlength: [50, 'Address line 2 cannot exceed 100 characters'],
    },
    city: {
        type: String,
        required: [true, 'City is required'],
        trim: true,
        minlength: [2, 'City must be at least 2 characters long'],
        maxlength: [50, 'City cannot exceed 50 characters'],
    },
    state: {
        type: String,
        required: [true, 'State is required'],
        trim: true,
        minlength: [2, 'State must be at least 2 characters long'],
        maxlength: [2, 'State cannot exceed 2 characters'],
    },
    zipcode: {
        type: String,
        required: [true, 'Zip code is required'],
        trim: true,
        match: [/^\d{5}(?:[-\s]\d{4})?$/, 'Invalid zip code format'],
    },
});

module.exports = mongoose.model('Profile', profileSchema);
