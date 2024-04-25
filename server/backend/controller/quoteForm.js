const quoteForm = require("../models/quoteFormModels")
const Pricing = require('../models/pricingModel')
const mongoose = require("mongoose")

// get all forms
const getForms = async(req, res) => {
    const forms = await quoteForm.find({}).sort({createdAt: -1})
    res.status(200).json(forms)
}

const postQuoteForm = async (req, res) => {
    //address date gallons price
    const { address, date, gallons, price, user_id }= req.body
   
    try {
        // Create a new document using the quoteForm model
        const formResponse = await quoteForm.create({
            FormAddress: address,
            FormDate: date,
            FormGallons: gallons,
            FormPrice: price,
            user_id
        });
        res.status(200).json(formResponse)
    } catch(error) {
        res.status(400).json({error: error.message})
    }
}

// const getQuoteForm = async (req, res) => {
//     const {id} = req.params
//     let quoteRequest = await quoteForm.findById(id)
//     res.status(200).json(quoteRequest)
//     if (!quoteRequest){
//         return res.status(404).json({error: "Could not find this form"})
//     }
// }

const getQuoteForm = async (req, res) => {
    const { id } = req.params;
    try {
        let quoteRequest = await quoteForm.findById(id);
        if (!quoteRequest) {
            return res.status(404).json({ error: "Could not find this form" });
        }
        return res.status(200).json(quoteRequest);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getUserQuoteForms = async (req, res) => {
    const { id } = req.params; // Destructure 'id' from req.params
    try {
        const forms = await quoteForm
            .find({ user_id: id })
            .sort({ createdAt: -1 });
        res.status(200).json(forms);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

const getUserQuoteFormsInCode = async (user_id) => { // Add user_id as a parameter
    try {
        const forms = await quoteForm
            .find({ user_id: user_id }) // Use user_id parameter to filter forms
            .sort({ createdAt: -1 });
        return forms; // Return the forms
    } catch (error) {
        throw error; // Throw any errors
    }
};

const calculateFuelQuote = async (req, res) => {
    const { user_id, address, city, state, zipcode, date, gallonsRequested } = req.body;
    if (!user_id || !address || !city || !state || !zipcode || !date || !gallonsRequested) {
        return res.status(400).json("Missing required fields");
    }
    try {
        // Determine if the location is out of state
        const isOutOfState = state.toLowerCase() !== 'tx';

        // Check if the user is a repeat customer based on previous orders
        const userForms = await getUserQuoteFormsInCode(user_id);
        const isRepeatedCustomer = userForms.length > 0;

        // Create a new Pricing document based on the provided details
        const pricing = new Pricing({
            user_id: user_id,
            gallonsRequested: gallonsRequested,
            isOutOfState: isOutOfState,
            isRepeatCustomer: isRepeatedCustomer,
        });

        // Calculate price and other details using the calculatePrice method defined in the Pricing model
        const { suggestedPricePerGallon, totalAmountDue } = pricing.calculatePrice();

        // Save the Pricing document to MongoDB
        await pricing.save();

        // Return the calculated price
        return res.status(200).json({ suggestedPricePerGallon, totalAmountDue });
    }
    catch (error) {
        console.error(error);
        return res.status(500).send("Error in server");
    }
};

module.exports = {
    getForms,
    postQuoteForm,
    getQuoteForm,
    getUserQuoteForms,
    calculateFuelQuote,
    
    
}