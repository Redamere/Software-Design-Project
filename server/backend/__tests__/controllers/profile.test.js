const Profile = require('../../models/profileModel');
const {
    getProfiles,
    createProfile,
    editProfile
} = require('../../controller/profileController');

jest.mock('../../models/profileModel', () => ({
    find: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    findOneAndUpdate: jest.fn(),
}));

describe('Profile Controller', () => {
    let req, res;

    beforeEach(() => {
        req = {
            body: {},
            params: {},
        };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
    });

    afterEach(() => {
        jest.clearAllMocks(); // Clear all mock calls between tests
    });

    describe('getProfiles', () => {
        it('should return all profiles', async () => {
            const profiles = [{ fullName: 'John Doe' }, { fullName: 'Jane Doe' }];
            Profile.find.mockResolvedValueOnce(profiles);

            await getProfiles(req, res);

            expect(Profile.find).toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ profiles });
        });

        it('should handle errors', async () => {
            const errorMessage = 'Internal Server Error';
            Profile.find.mockRejectedValueOnce(new Error(errorMessage));

            await getProfiles(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
        });
    });

    describe('createProfile', () => {
        it('should create a new profile', async () => {
            const profileData = {
                fullName: 'John Doe',
                address1: '123 Main St',
                address2: 'Apt 101',
                city: 'City',
                state: 'State',
                zipcode: '12345',
                user_id: 'user_id',
            };
            req.body = profileData;
            const createdProfile = { ...profileData, _id: 'profile_id' };
            Profile.create.mockResolvedValueOnce(createdProfile);

            await createProfile(req, res);

            expect(Profile.create).toHaveBeenCalledWith(profileData);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ profile: createdProfile });
        });

        it('should handle errors', async () => {
            const errorMessage = 'Internal Server Error';
            Profile.create.mockRejectedValueOnce(new Error(errorMessage));

            await createProfile(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
        });
    });

    describe('editProfile', () => {
        it('should edit a user\'s profile successfully', async () => {
            const updatedProfile = {
                _id: '123',
                fullName: 'John Doe',
                address1: '123 Main St',
                address2: 'Apt 101',
                city: 'New York',
                state: 'NY',
                zipcode: '10001',
                user_id: '1234567890'
            };

            // Mock Profile.findOneAndUpdate to return the updated profile
            Profile.findOneAndUpdate.mockResolvedValueOnce(updatedProfile);

            // Call the function with the mocked request and response objects
            await editProfile(req, res);

            // Check if the response status and JSON methods are called correctly
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ profile: updatedProfile });
        });

        it('should handle profile not found', async () => {
            const profileData = {
                fullName: 'John Doe',
                address1: '123 Main St',
                address2: 'Apt 101',
                city: 'City',
                state: 'State',
                zipcode: '12345',
                user_id: 'nonexistent_id',
            };
            req.body = profileData;
            Profile.findOneAndUpdate.mockResolvedValueOnce(null);

            await editProfile(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ error: 'Profile not found' });
        });

        it('should handle errors', async () => {
            const errorMessage = 'Internal Server Error';
            Profile.findOneAndUpdate.mockRejectedValueOnce(new Error(errorMessage));

            await editProfile(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
        });
    });
});