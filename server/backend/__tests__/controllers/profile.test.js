const ProfileController = require('../../controller/profileController')
const Profile = require('../../models/profileModel');

jest.mock('../../models/profileModel'); // Mock Profile model

describe('createProfile', () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Clear all mocked functions before each test
  });

  it('should create a new profile with status 200', async () => {
    // Mock data for request body
    const newProfileData = {
      fullName: 'John Doe',
      address1: '123 Main St',
      address2: 'Apt 101',
      city: 'New York',
      state: 'NY',
      zipcode: '10001'
    };

    // Mock data for created profile
    const createdProfile = {
      _id: 'profileId',
      ...newProfileData
    };

    // Mock Profile.create to resolve with created profile
    Profile.create.mockResolvedValue(createdProfile);

    // Mock request object
    const req = { body: newProfileData };

    // Mock response object
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Call createProfile function
    await ProfileController.createProfile(req, res);

    // Check if Profile.create was called with the correct arguments
    expect(Profile.create).toHaveBeenCalledWith(newProfileData);

    // Check if response status is 200
    expect(res.status).toHaveBeenCalledWith(200);

    // Check if response JSON includes the created profile
    expect(res.json).toHaveBeenCalledWith({ profile: createdProfile });
  });

  it('should create a new profile with status 200', async () => {
    // Mock data for request body
    const newProfileData = {
      fullName: 'Andrew Dieu',
      address1: '2011 Sesame St',
      address2: '',
      city: 'Houston',
      state: 'TX',
      zipcode: '77007'
    };

    // Mock data for created profile
    const createdProfile = {
      _id: 'profileId',
      ...newProfileData
    };

    // Mock Profile.create to resolve with created profile
    Profile.create.mockResolvedValue(createdProfile);

    // Mock request object
    const req = { body: newProfileData };

    // Mock response object
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Call createProfile function
    await ProfileController.createProfile(req, res);

    // Check if Profile.create was called with the correct arguments
    expect(Profile.create).toHaveBeenCalledWith(newProfileData);

    // Check if response status is 200
    expect(res.status).toHaveBeenCalledWith(200);

    // Check if response JSON includes the created profile
    expect(res.json).toHaveBeenCalledWith({ profile: createdProfile });
  });

  it('should return status 200', async () => {
    // Mock data for request body with missing required fields
    const incompleteProfileData = {
        fullName: 'Mary Jane',
        address1: '1234 Street Ave',
        city: 'Dallas',
        state: 'TX',
        zipcode: '20402'
    };
  
    // Mock request object
    const req = { body: incompleteProfileData };
  
    // Mock response object
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  
    // Call createProfile function
    await ProfileController.createProfile(req, res);
  
    // Check if response status is 400
    expect(res.status).toHaveBeenCalledWith(200);
  });
  

  // Add more tests for edge cases if needed
});
