
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

    // it('should return error message with status 400 if an error occurs', async () => {
    //     const mockError = new Error('Database error');
    //     quoteForm.find.mockRejectedValue(mockError);

    //     const mockReq = {
    //         params: { id: '6628b94d57a97473ab98f775' }
    //     };
    //     const mockRes = {
    //         status: jest.fn(() => mockRes),
    //         json: jest.fn()
    //     };

    //     await getUserQuoteForms(mockReq, mockRes);

    //     expect(mockRes.status).toHaveBeenCalledWith(400);
    //     expect(mockRes.json).toHaveBeenCalledWith({ error: 'Database error' });
    // });
});
