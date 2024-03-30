const express = require('express')
const History = require('../models/quoteHistoryModels')
const {
    createQuote,
} = require('../controller/quoteHistoryController')

const router = express.Router()

//req is an object containing information about the HTTP request raised in the event.
//res is used to send back the desired HTTP response

// post table row
router.post('/', createQuote)

// get gallons requested
router.get('/:id', (req, res) => {
    res.json({ mssg: "Get gallons requested" })
})

// get delivery address
router.get('/:id', (req, res) => {
    res.json({ mssg: "Get delivery address" })
})

// get table row
router.get('/', (req, res) => {
    res.json({ mssg: "Get the entire table if possible" })
})

// delete table row
router.delete('/:id', (req, res) => {
    res.json({ mssg: "Delete table row" })
})


router.patch('/:id', (req, res) => {
    res.json({ mssg: "update values in table row" })
})







module.exports = router