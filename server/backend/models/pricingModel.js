const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const pricingSchema = new Schema({
    clientLocation: {
        type: String,
        required: [true, 'Client location is required'],
        enum: ['in-state', 'out-of-state'],
    },
    clientHistory: {
        type: String,
        required: [true, 'Client history is required'],
        enum: ['existing', 'new'],
    },
    gallonsRequested: {
        type: Number,
        required: [true, 'Gallons requested is required'],
        min: [1, 'Gallons requested must be at least 1'],
    },
    profitMargin: {
        type: Number,
        required: [true, 'Profit margin is required'],
        min: [0, 'Profit margin cannot be negative'],
        max: [100, 'Profit margin cannot exceed 100%'],
    },
    rate: {
        type: Number,
        required: true,
    },
    totalCost: {
        type: Number,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    client: {
        type: Schema.Types.ObjectId,
        ref: 'Profile',
    },
});

module.exports = mongoose.model('Pricing', pricingSchema);
