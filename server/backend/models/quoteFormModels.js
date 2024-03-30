const mongoose = require("mongoose")

const Schema = mongoose.Schema

const quoteFormSchema = new Schema({
    FormAddress: {
        type: String,
        // required: true
    },
    FormDate: {
        type: String,
        // required: true
    },
    FormGallons: {
        type: Number,
        // required: true
    },
    FormPrice: {
        type: Number,
        // required: true
    },

    FormComplete: {
        deliveryAddress: String,
        DeliveryDate: String,
        gallons: Number,
        price: Number
    }

}, { timestamps: true},

)

module.exports = mongoose.model("quoteForm", quoteFormSchema)

//find all of the quote forms in the collection
//quoteForm.find()