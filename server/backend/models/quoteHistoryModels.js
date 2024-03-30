const mongoose = require('mongoose')

const Schema = mongoose.Schema

const quoteHistorySchema = new Schema({
    gallonsRequested: {
        type: Number,
        // required: true
    },
    deliveryAddress: {
        type: String,
        // required: true
    },
    deliveryDate: {
        type: Date,
        // required: true
    },
    suggestedPrice: {
        type: Number,
        // required: true
    },
    totalAmount: {
        type: Number,
        // required: true
    }
}, { timestamps: true })

module.exports = mongoose.model('History', quoteHistorySchema)