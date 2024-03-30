const {
    postGallons,
    getGallons,
    // postDeliveryAddress,
    // getDeliveryAddress,
    // getSuggestedPrice,
    // postSuggestedPrice,
    // // getForms,
    // postFullForm,
    // getFullForm,
} = require('../../controller/quoteForm'); // Replace 'your_controller_file' with the correct path

// Mocking quoteForm model
const quoteForm = require("../../models/quoteFormModels");
// jest.mock("../../models/quoteFormModels");
jest.mock("../../models/quoteFormModels", () => ({
    create: jest.fn(),
    findByID: jest.fn(),
}));


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

    describe("getGallons", () => {
        it("should return gallons if found", async () => {
            const mockGallons = {
                _id: "1",
                amount: 100,
                date: new Date(),
                customer: "John Doe",
                // Add other properties as needed
            };

            const req = { params: { id: "1" } };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

            quoteForm.findByID.mockResolvedValue(mockGallons);

            await getGallons(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mockGallons);
        });

        it("should return 404 error if gallons not found", async () => {
            const req = { params: { id: "1" } };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

            quoteForm.findByID.mockResolvedValue(null);

            await getGallons(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ error: "Cannot find this price" });
        });

        it("should handle error if fetching gallons fails", async () => {
            const req = { params: { id: "1" } };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

            // Mocking the error without throwing it immediately
            quoteForm.findByID.mockRejectedValueOnce(new Error("Failed to fetch gallons"));

            // Call the function and wait for it to complete
            await getGallons(req, res);

            // Ensure that the appropriate error response was sent
            expect(res.status).toHaveBeenCalledWith(500); // or the appropriate error status code
            expect(res.json).toHaveBeenCalledWith({ error: "Failed to fetch gallons" });
        });

    });



    describe("getForms", () => {
        it("should return forms sorted by createdAt in descending order", async () => {
            const mockForms = [
                { _id: "1", createdAt: new Date("2024-03-29T12:00:00Z"), /* other properties */ },
                { _id: "2", createdAt: new Date("2024-03-28T12:00:00Z"), /* other properties */ },
                // Add more mock forms as needed
            ];

            const req = {};
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

            quoteForm.find.mockResolvedValue(mockForms);

            await getForms(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mockForms);
        });

        it("should handle error if fetching forms fails", async () => {
            const error = new Error("Failed to fetch forms");

            const req = {};
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

            quoteForm.find.mockRejectedValue(error);

            await getForms(req, res);

            expect(res.status).toHaveBeenCalledWith(500); // or the appropriate error status code
            expect(res.json).toHaveBeenCalledWith({ error: error.message });
        });
    });
});
