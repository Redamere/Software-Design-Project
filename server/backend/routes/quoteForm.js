const express = require('express')

const router = express.Router()

const quoteForm = require("../models/quoteFormModels")

//req is an object containing information about the HTTP request raised in the event.
//res is used to send back the desired HTTP resoibse

//post gallons given by user
router.get("/", (req, res) => {
    res.json({mssg: "Posting gallons from input"})
})

//post delivery date
router.post("/", async (req, res) => {
    let requestedDate = req.body
    try {
    let deliveryDate = await quoteForm.create(requestedDate)
        res.status(200).json(deliveryDate)
    } catch (error){
        res.status(400).json({error: error.message})
    }
})

//get delivery address
router.get("/:id", (res, req) => {
    res.json({mssg: "Get User's delivery address"})
})
//get suggested price
router.get("/:id", (res, req) => {
    res.json({mssg: "Get a suggested price for fuel"})
})

module.exports = router