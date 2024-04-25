const quoteForm = require("../models/quoteFormModels")
const Pricing = require('../models/quoteFormModels')
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
    const { user_id, gallonsRequested } = req.body;
    if (!user_id || !gallonsRequested) {
        return res.status(400).json("Missing required fields");
    }
    try {
        // Determine if the user is a repeat customer based on previous orders
        const userForms = await getUserQuoteFormsInCode(user_id);
        const isRepeatCustomer = userForms.length > 0;

        // Define pricing factors
        const locationFactor = req.body.state.toLowerCase() === 'tx' ? 0.02 : 0.04;
        const rateHistoryFactor = isRepeatCustomer ? 0.01 : 0;
        const gallonsFactor = gallonsRequested > 1000 ? 0.02 : 0.03;
        const companyProfit = 0.1;

        // Calculate suggested price per gallon
        const basePricePerGallon = 1.50;
        const margin = (locationFactor - rateHistoryFactor + gallonsFactor + companyProfit) * basePricePerGallon;
        const suggestedPricePerGallon = basePricePerGallon + margin;

        // Calculate total amount due
        let totalAmountDue = gallonsRequested * suggestedPricePerGallon;

        // Round to two decimal places and ensure at least two decimal places
        totalAmountDue = totalAmountDue.toFixed(2);

        // If the total amount due has less than 2 numbers after the decimal, add a 0
        if (!totalAmountDue.includes('.')) {
            totalAmountDue += '.00';
        } else if (totalAmountDue.split('.')[1].length === 1) {
            totalAmountDue += '0';
        }

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
    getUserQuoteFormsInCode

}