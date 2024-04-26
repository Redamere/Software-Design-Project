
const quoteForm = require('../../models/quoteFormModels');
const { getUserQuoteForms } = require('../../controller/quoteForm');

jest.mock('../../models/quoteFormModels');

describe('getUserQuoteForms', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should return user quote forms with status 200', async () => {
        const mockForms = [
            {
                _id: '6629d333c9f9681f41ac2102',
                user_id: '6628b94d57a97473ab98f775',
                FormAddress: '456 New Street, Apt 202, New City, California, 54321',
                FormDate: '2024-04-04',
                FormGallons: '123',
                FormPrice: 1.69,
                createdAt: '2024-04-25T03:51:15.335+00:00',
                updatedAt: '2024-04-25T03:51:15.335+00:00'
            }
        ];

        quoteForm.find.mockResolvedValue(mockForms);


        const mockReq = {
            params: { id: '6628b94d57a97473ab98f775' }
        };
        const mockRes = {
            status: jest.fn(() => mockRes),
            json: jest.fn()
        };

        await getUserQuoteForms(mockReq, mockRes);

        expect(quoteForm.find).toHaveBeenCalledWith({ user_id: '6628b94d57a97473ab98f775' });
        expect(mockRes.status).toHaveBeenCalledWith(200);
        expect(mockRes.json).toHaveBeenCalledWith(mockForms);
    });

    it('should handle errors and return status 400 with error details', async () => {
        const errorMessage = 'Database connection failed';
        const error = new Error(errorMessage);

        // Mocking the find method of quoteForm model to reject with an error
        quoteForm.find.mockRejectedValue(error);

        // Mock request and response objects
        const mockReq = {
            params: { id: '6628b94d57a97473ab98f775' }
        };
        const mockRes = {
            status: jest.fn(() => mockRes),
            json: jest.fn()
        };

        // Call the getUserQuoteForms function
        await getUserQuoteForms(mockReq, mockRes);

        // Verify that quoteForm.find is called with correct parameters
        expect(quoteForm.find).toHaveBeenCalledWith({ user_id: '6628b94d57a97473ab98f775' });

        // Verify that response status is set to 400 and error message is sent in JSON format
        expect(mockRes.status).toHaveBeenCalledWith(400);
        expect(mockRes.json).toHaveBeenCalledWith({ error: 'Failed to fetch user quote forms', details: errorMessage });
    });
});