const quoteForm = require("../models/quoteFormModels")
const mongoose = require("mongoose")

//get all forms
const getForms = async(req, res) => {
    const forms = await quoteForm.find({}).sort({createdAt: -1})
    res.status(200).json(forms)
}

const postQuoteForm = async (req, res) => {
    //address date gallons price
    const {address, date, gallons, price}= req.body

   
    try {
        // Create a new document using the quoteForm model
        const formResponse = await quoteForm.create({
            FormAddress: address,
            FormDate: date,
            FormGallons: gallons,
            FormPrice: price
        });
        res.status(200).json(formResponse)
    } catch(error) {
        res.status(400).json({error: error.message})
    }
}

const getQuoteForm = async (req, res) => {
    const {id} = req.params
    let quoteRequest = await quoteForm.findById(id)
    res.status(200).json(quoteRequest)
    if (!quoteRequest){
        return res.stats(404).json({error: "Could not find this form"})
    }
}

// //post gallons given by user
// const postGallons = async (req, res) => {
//     let gallons = req.body //let gallons be the body of the request
    
//     try {
//         let response_gallons = await quoteForm.create(gallons)
//         res.status(200).json(response_gallons)
//     }
//     catch (error ){
//         res.status(400).json({error: error.message})
//     }

// }

//     //get gallons (used for testing purposes)
// const getGallons = async (req, res) => {
//     const {id} = req.params
//     let gallonRequest = await quoteForm.findByID(id)
//     if (!gallonRequest){
//         return res.stats(404).json({error: "Cannot find this price"})
//     }
//     return res.status(200).json(gallonRequest)
// }
// //post delivery date
// const postDeliveryAddress = async (req, res) => {
//     let requestedDate = req.body
//     // add document to database
//     try {
//     let deliveryDate = await quoteForm.create(requestedDate)
//         res.status(200).json(deliveryDate)
//     } catch (error){
//         res.status(400).json({error: error.message})
//     }
// }

// //get delivery address
// const getDeliveryAddress = async (req, res) => {
//     const {id} = req.params
//     let deliveryAddress = await quoteForm.findByID(id)
//     if (!deliveryAddress) {
//         return res.status(404).json({error: "Cannot find this address"})
//     }
//     res.status(200).json(deliveryAddress)
// }
// //get suggested price
// const getSuggestedPrice = async (req, res) => {
//     const {id} = req.params
//     let price = await quoteForm.findByID(id)
//     if (!price){
//         return res.status(404).json({error: "Cannot find this price"})
//     }
//     res.status(400).json(price)
// }

// //used for backend testing purposes
// const postSuggestedPrice = async (req, res) => {
//     let postRequest = req.body

//     try {
//     let price = await quoteForm.create(postRequest)
//         res.status(200).json(price)
//     } catch (error){
//         res.status(400).json({error: error.message})
//     }
// }

// const postFullForm = async(req, res) => {
//     let {address, date, gallons, price} = req.body

//     try {
//         let form = await (quoteForm.create(address, date, gallons, price))
//         res.status(200).json(form)
//     } catch (error){
//         res.status(400).json({error: error.message})
//     }
// }
// const getFullForm = async (req, res) => {
//     const {id} = req.params
//     let form = await quoteForm.findByID(id)
//     if (!form){
//         return res.status(404).json({error: ""})
//     }
//     res.status(400).json(form)
// }
module.exports = {
    getForms,
    postQuoteForm,
    getQuoteForm,
    // postGallons,
    // getGallons,
    // postDeliveryAddress,
    // getDeliveryAddress,
    // getSuggestedPrice,
    // postSuggestedPrice,
    // postFullForm,
    // getFullForm,
}

