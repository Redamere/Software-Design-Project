const express = require('express')
// const { 
//     postGallons,
//     postDeliveryAddress,
//     getDeliveryAddress,
//     getSuggestedPrice
// } = require("../client/src/controller/quoteForm")

const router = express.Router()

//req is an object containing information about the HTTP request raised in the event.
//res is used to send back the desired HTTP response

//post gallons given by user
router.get("/:id", (req, res) => {
    res.json({mssg: "Posting gallons from input"})
})

//post delivery date
// router.post("/:id", getDeliveryAddress) 

//get delivery address
router.get("/:id", (res, req) => {
    res.json({mssg: "Get User's delivery address"})
})
//get suggested price
router.get("/:id", (res, req) => {
    res.json({mssg: "Get a suggested price for fuel"})
})

module.exports = router