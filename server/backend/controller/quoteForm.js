const quoteForm = require("../models/quoteFormModels")

//post gallons given by user
const postGallons = async (req, res) => {
    let gallons = req.body //let gallons be the body of the request
    
    try {
        let gallons = await quoteForm.create(gallons)
        res.status(200).json(gallons)
    }
    catch (error ){
        res.status(400).json({error: error.message})
    }

}
//post delivery date
const postDeliveryAddress = async (req, res) => {
    let requestedDate = req.body
    // add document to database
    try {
    let deliveryDate = await quoteForm.create(requestedDate)
        res.status(200).json(deliveryDate)
    } catch (error){
        res.status(400).json({error: error.message})
    }
}

//get delivery address
const getDeliveryAddress = async (req, res) => {
    let deliveryAddress = await quoteForm.find({})
}
//get suggested price
const getSuggestedPrice = async (req, res) => {
    let price = await quoteForm.find({})
}


module.exports = {
    postGallons,
    postDeliveryAddress,
    getDeliveryAddress,
    getSuggestedPrice
}

