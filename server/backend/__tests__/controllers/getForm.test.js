const { getForms } = require('../../controller/quoteForm');

// Mocking the quoteForm model
const quoteForm = require('../../models/quoteFormModels');

const req = {};
const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn()
};

describe('getForms function', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should return forms sorted by createdAt in descending order', async () => {
        // Mocking the forms
        const mockForms = [
            { _id: 'formId1', createdAt: new Date('2024-04-24') },
            { _id: 'formId2', createdAt: new Date('2024-04-23') },
            { _id: 'formId3', createdAt: new Date('2024-04-22') }
        ];
        quoteForm.find = jest.fn().mockReturnValue({
            sort: jest.fn().mockResolvedValueOnce(mockForms)
        });

        await getForms(req, res);

        expect(quoteForm.find).toHaveBeenCalledWith({});
        expect(quoteForm.find).toHaveBeenCalledTimes(1);
        expect(quoteForm.find().sort).toHaveBeenCalledWith({ createdAt: -1 });
        expect(quoteForm.find().sort).toHaveBeenCalledTimes(1);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(mockForms);
    });

    // it('should handle errors', async () => {
    //     // Mocking an error
    //     const error = new Error('Something went wrong');
    //     quoteForm.find = jest.fn().mockReturnValue({
    //         sort: jest.fn().mockRejectedValueOnce(error)
    //     });

    //     await getForms(req, res);

    //     expect(res.status).toHaveBeenCalledWith(500);
    //     expect(res.json).toHaveBeenCalledWith({ error: 'Internal Server Error' });
    // });
});
