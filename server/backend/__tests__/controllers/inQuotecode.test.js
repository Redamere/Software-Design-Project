const quoteForm = require('../../models/quoteFormModels');
const { getUserQuoteFormsInCode } = require('../../controller/quoteForm');

jest.mock('../../models/quoteFormModels');

describe('getUserQuoteFormsInCode', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should return user quote forms', async () => {
        // Mocked quote forms data
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

        // Mocking the find method of quoteForm model to return a Query object
        quoteForm.find.mockReturnValue({
            sort: jest.fn().mockReturnValue(mockForms) // Mocking the sort method to return mockForms
        });

        // Call the getUserQuoteFormsInCode function with a user_id
        const user_id = '6628b94d57a97473ab98f775';
        const forms = await getUserQuoteFormsInCode(user_id);

        // Verify that quoteForm.find is called with correct parameters
        expect(quoteForm.find).toHaveBeenCalledWith({ user_id });

        // Verify that the returned forms match the mocked forms
        expect(forms).toEqual(mockForms);
    });

    // it('should throw an error if an error occurs during retrieval', async () => {
    //     // Mocked error object
    //     const errorMessage = 'Database connection failed';
    //     const error = new Error(errorMessage);

    //     // Mocking the find method of quoteForm model to reject with an error
    //     quoteForm.find.mockRejectedValue(error);

    //     // Call the getUserQuoteFormsInCode function with a user_id
    //     const user_id = '6628b94d57a97473ab98f775';
        
    //     // Verify that getUserQuoteFormsInCode throws an error
    //     await expect(getUserQuoteFormsInCode(user_id)).rejects.toThrow(errorMessage);
    // });
});

