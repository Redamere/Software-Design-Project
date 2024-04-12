const mongoose = require("mongoose")

const Schema = mongoose.Schema

const quoteFormSchema = new Schema({
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

    // FormComplete: {
    //     deliveryAddress: String,
    //     DeliveryDate: String,
    //     gallons: Number,
    //     price: Number
    // }

}, { timestamps: true},

)

module.exports = mongoose.model("quoteForm", quoteFormSchema)

//find all of the quote forms in the collection
//quoteForm.find()

// fullName: {
//     type: String,
//     required: [true, 'Full name is required'],
//     trim: true,
//     minlength: [2, 'Full name must be at least 2 characters long'],
//     maxlength: [50, 'Full name cannot exceed 50 characters'],
// },