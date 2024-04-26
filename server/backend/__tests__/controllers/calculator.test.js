const { calculateFuelQuote } = require('../../controller/quoteForm');
const quoteForm = require('../../models/quoteFormModels');

// Mocking getUserQuoteFormsInCode function
jest.mock('../../models/quoteFormModels', () => ({
    getUserQuoteFormsInCode: jest.fn(),
    find: jest.fn(),
    sort: jest.fn()
}));

describe('calculateFuelQuote', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should return suggested price per gallon and total amount due when all required fields are provided', async () => {
        const req = {
            body: {
                user_id: 'user123',
                gallonsRequested: 500,
                state: 'TX',
            },
        };
        const res = {
            status: jest.fn(() => res),
            json: jest.fn(),
            send: jest.fn(), 
        };
    
        quoteForm.getUserQuoteFormsInCode.mockResolvedValueOnce([]);
        
        await calculateFuelQuote(req, res);
        console.log('res.status calls:', res.status.mock.calls);
        console.log('res.json calls:', res.json.mock.calls);
    
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
            suggestedPricePerGallon: expect.any(Number),
            totalAmountDue: expect.any(String),
        }));
    });

    it('should return 400 when required fields are missing', async () => {
        const req = {
            body: {},
        };
        const res = {
            status: jest.fn(() => res),
            json: jest.fn(),
        };

        await calculateFuelQuote(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith("Missing required fields");
    });

    it('should return 500 when an error occurs in the server', async () => {
        const req = {
            body: {
                user_id: 'user123',
                gallonsRequested: 500,
                state: 'TX',
            },
        };
        const res = {
            status: jest.fn(() => res),
            json: jest.fn(),
            send: jest.fn(), 
        };

        // Simulate an error by rejecting the promise
        quoteForm.getUserQuoteFormsInCode.mockRejectedValueOnce(new Error('Server error'));

        await calculateFuelQuote(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.send).toHaveBeenCalledWith("Error in server");
    });

    it('should return 400 when gallonsRequested is less than 1', async () => {
        const req = {
            body: {
                user_id: 'user123',
                gallonsRequested: 0,
                state: 'TX',
            },
        };
        const res = {
            status: jest.fn(() => res),
            json: jest.fn(),
        };

        await calculateFuelQuote(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith("Missing required fields");
    });

});
    

