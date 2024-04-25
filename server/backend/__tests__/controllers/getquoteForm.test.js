const { getQuoteForm } = require('../../controller/quoteForm');

// Mocking the required dependencies
jest.mock("../../models/quoteFormModels", () => ({
  findById: jest.fn()
}));

jest.mock('../../models/pricingModel', () => ({}));

const quoteForm = require("../../models/quoteFormModels");
const Pricing = require('../../models/pricingModel');

describe('getQuoteForm', () => {
    it('should return the quote form when found', async () => {
      const mockReq = { params: { id: 'validId' } };
      const mockRes = {
        status: jest.fn(() => mockRes),
        json: jest.fn()
      };
      const mockQuote = { _id: 'validId', // Assuming your quote object has at least this property
                         // Other properties of your quote object here...
                        };
      jest.spyOn(quoteForm, 'findById').mockResolvedValueOnce(mockQuote);
  
      await getQuoteForm(mockReq, mockRes);
  
      expect(quoteForm.findById).toHaveBeenCalledWith('validId');
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith(mockQuote);
    });
  
    it('should return an error if quote form not found', async () => {
      const mockReq = { params: { id: 'invalidId' } };
      const mockRes = {
        status: jest.fn(() => mockRes),
        json: jest.fn()
      };
      jest.spyOn(quoteForm, 'findById').mockResolvedValueOnce(null);
  
      await getQuoteForm(mockReq, mockRes);
  
      expect(quoteForm.findById).toHaveBeenCalledWith('invalidId');
      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.json).toHaveBeenCalledWith({ error: 'Could not find this form' });
    });
  
    it('should return an internal server error if an error occurs', async () => {
      const mockReq = { params: { id: 'validId' } };
      const mockRes = {
        status: jest.fn(() => mockRes),
        json: jest.fn()
      };
      jest.spyOn(quoteForm, 'findById').mockRejectedValueOnce(new Error('Test error'));
  
      await getQuoteForm(mockReq, mockRes);
  
      expect(quoteForm.findById).toHaveBeenCalledWith('validId');
      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith({ error: 'Internal Server Error' });
    });
  });