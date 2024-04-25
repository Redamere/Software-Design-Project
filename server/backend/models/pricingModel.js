const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const pricingSchema = new Schema({
    user_id: {
        type: String,
        required: true
    },
    gallonsRequested: {
        type: Number,
        required: [true, 'Gallons requested is required'],
        min: [1, 'Gallons requested must be at least 1'],
    },
    isOutOfState: {
        type: Boolean,
        required: true,
    },
    isRepeatCustomer: {
        type: Boolean,
        required: true,
    },
    suggestedPricePerGallon: {
        type: Number,
        required: true,
    },
    totalAmountDue: {
        type: Number,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// Method to calculate price and other details
pricingSchema.methods.calculatePrice = function () {
    // Define pricing factors
    let locationFactor = this.isOutOfState ? 0.04 : 0.02;
    let rateHistoryFactor = this.isRepeatCustomer ? -0.01 : 0.00;
    let gallonsFactor = this.gallonsRequested > 1000 ? 0.02 : 0.03;
    const basePricePerGallon = 1.50;
    const companyProfit = 0.1;

    // Calculate price components
    const locationPrice = basePricePerGallon * locationFactor;
    const rateHistoryPrice = basePricePerGallon * rateHistoryFactor;
    const gallonsPrice = basePricePerGallon * gallonsFactor;
    const suggestedPricePerGallon = parseFloat((basePricePerGallon + locationPrice + rateHistoryPrice + gallonsPrice + companyProfit).toFixed(2));
    const totalAmountDue = parseFloat((this.gallonsRequested * suggestedPricePerGallon).toFixed(2));

    // Set calculated values to the document
    this.suggestedPricePerGallon = suggestedPricePerGallon;
    this.totalAmountDue = totalAmountDue;

    return { suggestedPricePerGallon, totalAmountDue };
};

module.exports = mongoose.model('Pricing', pricingSchema);
