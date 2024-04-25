const Pricing = require('../../models/pricingModel');
const mongoose = require('mongoose');

describe('calculatePrice method', () => {

    const testData = {
        isOutOfState: false,
        isRepeatCustomer: false,
        gallonsRequested: 500
    };
    beforeEach(() => {
        // Create a new mock object before each test
        documentMock = new Pricing(testData);
    });

    afterEach(() => {
        // Reset the mock object after each test
        jest.clearAllMocks(); // This clears any mock implementation and restores initial implementation
    });


    it('should calculate the price correctly', () => {
        // Mock the document object
        const documentMock = new Pricing(testData);
    
        // Call the method
        const calculatedPrice = documentMock.calculatePrice();
    
        // Assertion
        expect(calculatedPrice.suggestedPricePerGallon).toEqual(1.68); // Updated expected value
        expect(calculatedPrice.totalAmountDue).toEqual(840); // Adjusted expected value
    });
    
    
    it('should handle edge cases correctly', () => {
        // Mock the document object with different test data
        const testDataOutOfState = {
            isOutOfState: true,
            isRepeatCustomer: true,
            gallonsRequested: 1500
        };
        const documentMockOutOfState = new Pricing(testDataOutOfState);
    
        // Call the method
        const calculatedPriceOutOfState = documentMockOutOfState.calculatePrice();
    
        // Assertion for out of state
        expect(calculatedPriceOutOfState.suggestedPricePerGallon).toEqual(1.68);
        expect(calculatedPriceOutOfState.totalAmountDue).toEqual(2520);
    
        // Mock the document object with different test data
        const testDataRepeatCustomer = {
            isOutOfState: false,
            isRepeatCustomer: true,
            gallonsRequested: 700
        };
        const documentMockRepeatCustomer = new Pricing(testDataRepeatCustomer);
    
        // Call the method
        const calculatedPriceRepeatCustomer = documentMockRepeatCustomer.calculatePrice();
    
        // Assertion for repeat customer
        expect(calculatedPriceRepeatCustomer.suggestedPricePerGallon).toEqual(1.66);
        expect(calculatedPriceRepeatCustomer.totalAmountDue).toEqual(1162);
    });
});