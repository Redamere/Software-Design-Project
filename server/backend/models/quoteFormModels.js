const mongoose = require('mongoose')

const Schema = mongoose.Schema

const quoteFormSchema = new Schema({
    deliveryAddress: String,
    required: true
})

module.exports = mongoose.model("quoteForm", quoteFormSchema)

//quoteForm.find()