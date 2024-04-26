const { postQuoteForm} = require('../../controller/quoteForm'); 
const quoteForm = require("../../models/quoteFormModels");

jest.mock("../../models/quoteFormModels", () => ({
  create: jest.fn(),
  findById: jest.fn(),
  find: jest.fn(),
}));

describe('quoteForm Controller', () => {
  let req, res;

  beforeEach(() => {
      req = {};
      res = {
          status: jest.fn().mockReturnThis(),
          json: jest.fn()
      };
  });

  describe('postQuoteForm', () => {
    beforeEach(() => {
        req.body = {
            address: "123 Main St",
            date: "2024-04-25",
            gallons: 100,
            price: 200,
            user_id: "user123"
        };
    });

    it('should create a new form and return formResponse with status 200', async () => {
        // Mock create function to return a formResponse
        const formResponse = { id: "form123", ...req.body };
        quoteForm.create.mockResolvedValueOnce(formResponse);

        await postQuoteForm(req, res);

        expect(quoteForm.create).toHaveBeenCalledWith({
            FormAddress: req.body.address,
            FormDate: req.body.date,
            FormGallons: req.body.gallons,
            FormPrice: req.body.price,
            user_id: req.body.user_id
        });
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(formResponse);
    });

    it('should return status 400 and error message if there is an error', async () => {
        // Mock create function to throw an error
        const errorMessage = "An error occurred";
        quoteForm.create.mockRejectedValueOnce(new Error(errorMessage));

        await postQuoteForm(req, res);

        expect(quoteForm.create).toHaveBeenCalledWith({
            FormAddress: req.body.address,
            FormDate: req.body.date,
            FormGallons: req.body.gallons,
            FormPrice: req.body.price,
            user_id: req.body.user_id
        });
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
    });
  });
  


});