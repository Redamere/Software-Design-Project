const History = require('../models/quoteHistoryModels.js')
const quoteHistory = require('../models/quoteHistoryModels')
const mongoose = require('mongoose')

// create quote form 
const createQuote = async (req, res) => {
    const { FormAddress, FormDate, FormGallons, FormPrice } = req.body

    // add doc to db
    try {
        const createQuote = await quoteHistory.create({ FormAddress, FormDate, FormGallons, FormPrice })
        res.status(200).json(quoteHistory)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// get quote form
const getQuoteForm = async (req, res) => {
    const { id } = req.params

    // Testing if the Id we got is valid
    if (!moongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "No such quote" })
    }

    const getQuote = await quoteHistory.findById(id)

    if (!quoteHistory) {
        return res.status(404).json({ error: "No such quote" })
    }

    response.status(200).json(getQuote)
}

// get all forms
const getAllQuotes = async (req, res) => {
    const getAllQuotes = await quoteHistory.find({}).sort({ createdAT: -1 })

    res.status(200).json(getAllQuotes)
}

// update quote form
const updateQuote = async (req, res) => {
    const { id } = req.params

    // Testing if the Id we got is valid
    if (!moongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "No such quote" })
    }

    const updateQuoteForm = await quoteHistory.findOneAndUpdate({ _id: id }, {
        ...req.body
    })

    if (!quoteHistory) {
        return res.status(404).json({ error: "No such quote" })
    }

    res.status(200).json(updateQuoteForm)
}

// delete quote form
const deleteQuote = async (req, res) => {
    const { id } = req.params

    // Testing if the Id we got is valid
    if (!moongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "No such quote" })
    }

    const deleteQuote = await quoteHistory.findOneAndDelete({ _id: id })

    if (!quoteHistory) {
        return res.status(404).json({ error: "No such quote" })
    }

    res.status(200).json(deleteQuote)
}






// get table row


module.exports = {
    createQuote,
    getQuoteForm,
    getAllQuotes,
    updateQuote,
    deleteQuote
}