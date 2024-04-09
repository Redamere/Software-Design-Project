const express = require('express')
const {
    createQuote,
    allQuotes,
    getQuote,
    updateQuote,
    deleteQuote
} = require('../controller/quoteHistoryController')


const router = express.Router()

// router.get('/', () => { })

//post new quote form
router.post("/", createQuote)

//get quote form 
router.get("/:id", getQuote)

// Delete quote form
router.delete("/:id", deleteQuote)

// Update quote form
router.patch("/:id", updateQuote)

// get all quote forms
router.get("/", allQuotes)

module.exports = router