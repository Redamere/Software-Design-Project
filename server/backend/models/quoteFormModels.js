const mongoose = require("mongoose")

const Schema = mongoose.Schema

const quoteFormSchema = new Schema({
    user_id: {
        type: String,
        required: true
    },
    FormAddress: {
        type: String,
        required: [true, 'Address is required'],
        trim: true,
        minlength: [10, "Address must be 10 characters long"],
        maxlength: [100, "Address cannot exceed 100 characters"]
    },
    FormDate: {
        type: String,
        required: [true, 'Address is required'],
        trim: true,
        minlength: [7, "Date must be at least 7 characters"],
        maxlength: [10, "Date cannot be more than 10 characters"]
    },
    FormGallons: {
        type: Number,
        required: true,
        minlength: [1, "date must have at least 1 character"],
        maxlength: [1000, "gallons cannot exceed 1000 characters"]
    },
    FormPrice: {
        type: Number,
        required: true,
        minlength: [1, "price must have at least 1 character"],
        maxlength: [1000, "price cannot exceed 1000 characters"]
    },
}, { timestamps: true},

)

module.exports = mongoose.model("quoteForm", quoteFormSchema)