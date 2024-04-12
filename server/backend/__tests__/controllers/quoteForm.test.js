const QuoteFormController  = require('../../controller/quoteForm')
const QuoteForm = require('../../models/quoteFormModels');

jest.mock('../../models/quoteFormModels'); // Mock QuoteForm model

describe('postQuoteForm', () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Clear all mocked functions before each test
  });

  it('should create a new quote form with status 200', async () => {
    // Mock data for request body
    const newFormData = {
      address: '123 Main St',
      date: '2024-04-12',
      gallons: 100,
      price: 200
    };

    // Mock data for created quote form
    const createdForm = {
      _id: 'formId',
      ...newFormData
    };

    // Mock QuoteForm.create to resolve with created form
    QuoteForm.create.mockResolvedValue(createdForm);

    // Mock request object
    const req = { body: newFormData };

    // Mock response object
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Call postQuoteForm function
    await QuoteFormController.postQuoteForm(req, res);

    // Check if QuoteForm.create was called with the correct arguments
    expect(QuoteForm.create).toHaveBeenCalledWith({
      FormAddress: newFormData.address,
      FormDate: newFormData.date,
      FormGallons: newFormData.gallons,
      FormPrice: newFormData.price
    });

    // Check if response status is 200
    expect(res.status).toHaveBeenCalledWith(200);

    // Check if response JSON includes the created form
    expect(res.json).toHaveBeenCalledWith(createdForm);
  });

  // Add more tests for edge cases if needed
});

describe('getQuoteForm', () => {
  it('should return a quote form with status 200', async () => {
    // Mock data for quote form
    const mockQuoteForm = {
      _id: 'formId',
      address: '123 Main St',
      date: '2024-04-12',
      gallons: 100,
      price: 200
    };

    // Mock QuoteForm.findById to resolve with mock quote form
    QuoteForm.findById.mockResolvedValue(mockQuoteForm);

    // Mock request object
    const req = { params: { id: 'formId' } };

    // Mock response object
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Call getQuoteForm function
    await QuoteFormController.getQuoteForm(req, res);

    // Check if QuoteForm.findById was called with the correct arguments
    expect(QuoteForm.findById).toHaveBeenCalledWith('formId');

    // Check if response status is 200
    expect(res.status).toHaveBeenCalledWith(200);

    // Check if response JSON includes the quote form
    expect(res.json).toHaveBeenCalledWith(mockQuoteForm);
  });

  it('should return status 404 when quote form is not found', async () => {
    // Mock QuoteForm.findById to resolve with null (not found)
    QuoteForm.findById.mockResolvedValue(null);

    // Mock request object
    const req = { params: { id: 'nonExistentId' } };

    // Mock response object
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Call getQuoteForm function
    await QuoteFormController.getQuoteForm(req, res);

    // Check if QuoteForm.findById was called with the correct arguments
    expect(QuoteForm.findById).toHaveBeenCalledWith('nonExistentId');

    // Check if response status is 404
    expect(res.status).toHaveBeenCalledWith(404);

    // Check if response JSON includes the error message
    expect(res.json).toHaveBeenCalledWith({ error: "Could not find this form" });
  });

  // Add more tests for edge cases if needed
});

describe('getForms', () => {
    it('should return profiles with status 200', async () => {
      // Mock data for profiles
      const mockForms = [
        { _id: '1', fullName: 'John Doe' },
        { _id: '2', fullName: 'Jane Smith' },
      ];
  
      // Mock Profile.find to resolve with mock profiles
      QuoteForm.find.mockReturnValue({ sort: jest.fn().mockReturnValueOnce(mockForms) });
  
      // Mock request and response objects
      const req = {};
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      // Call getProfiles function
      await QuoteFormController.getForms(req, res);
  
      // Check if Profile.find was called with the correct arguments
      expect(QuoteForm.find).toHaveBeenCalledWith({});
  
      // Check if sort was called
      expect(QuoteForm.find().sort).toHaveBeenCalledWith({ createdAt: -1 });
  
      // Check if response status is 200
      expect(res.status).toHaveBeenCalledWith(200);
  
      // Check if response JSON includes the profiles
      expect(res.json).toHaveBeenCalledWith(mockForms);
    });
  });