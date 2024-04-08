const express = require('express')
const {
    createQuote,
    getAllQuotes,
    getQuoteForm,
    updateQuote,
    deleteQuote
} = require('../controller/quoteHistoryController')


const router = express.Router()

router.get('/', () => { })

//post new quote form
router.post("/", createQuote)

//get quote form 
router.get("/:id", getQuoteForm)

// Delete quote form
router.delete("/:id", deleteQuote)

// Update quote form
router.patch("/:id", updateQuote)

// get all quote forms
router.get('/', getAllQuotes)

module.exports = router