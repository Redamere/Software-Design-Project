const express = require('express')
const { 
    getForms,
    postQuoteForm,
    getUserQuoteForms,
    calculateFuelQuote
} = require("../controller/quoteForm")

const router = express.Router()

//req is an object containing information about the HTTP request raised in the event.
//res is used to send back the desired HTTP response

//get all forms (for testing purposes)
router.get("/", getForms)

//post new quote form
router.post("/", postQuoteForm)

router.get("/:id", getUserQuoteForms)

router.post("/calculate", calculateFuelQuote)

//post gallons given by user
// router.get("/:id", postGallons)

// //post delivery date
// router.post("/", postDeliveryAddress) 

// //get delivery address
// router.get("/:id", getDeliveryAddress)

// //post a suggested price (currently using for testing purposes)
// router.post("/", postSuggestedPrice)
// //get suggested price
// router.get("/:id", getSuggestedPrice)

// router.post("/", postFullForm)
// router.get("/:id", getFullForm)


module.exports = router