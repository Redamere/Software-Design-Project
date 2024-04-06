const {
    postGallons,
    getGallons,
    postDeliveryAddress,
    getDeliveryAddress,
    getSuggestedPrice,
    postSuggestedPrice,
   // getForms,
    postFullForm,
    getFullForm,
} = require('../controller/quoteForm'); // Replace 'your_controller_file' with the correct path

// Mocking quoteForm model
const quoteForm = require("../models/quoteFormModels");
jest.mock("../models/quoteFormModels");

describe("Express Controller Functions", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe("postGallons", () => {
        it("should create gallons and return response", async () => {
            const req = { body: { gallons: { amount: 100 } } };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

            const mockResponse = {
                _id: "someId",
                amount: 100,
                createdAt: new Date(),
                // Add any other properties based on your model structure
            };


            quoteForm.create.mockResolvedValue(mockResponse);

            await postGallons(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mockResponse);
        });


        it("should handle error if creation fails", async () => {
            const req = { body: { gallons: { amount: 200 } } };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
            const error = new Error("Creation failed");

            quoteForm.create.mockRejectedValue(error);

            await postGallons(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ error: error.message });
        });
    });

});
