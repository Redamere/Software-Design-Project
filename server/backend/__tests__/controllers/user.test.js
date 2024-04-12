const UserController = require('../../controller/signup');
const User = require('../../models/user');
const bcrypt = require('bcrypt');

jest.mock('bcryptjs', () => ({
    hash: jest.fn().mockResolvedValue('hashedPassword')
}));

describe('User Schema', () => {
    describe('confirmPassword validation', () => {
        it('should return true if confirmPassword matches password', () => {
            const user = new User({
                username: 'testuser',
                password: 'password123',
                confirmPassword: 'password123'
            });
            const isValid = user.validateSync();
            expect(isValid).toBeUndefined();
        });

        it('should return false if confirmPassword does not match password', () => {
            const user = new User({
                username: 'testuser',
                password: 'password123',
                confirmPassword: 'mismatchedPassword'
            });
            const isValid = user.validateSync();
            expect(isValid.errors.confirmPassword.message).toBe('Passwords do not match');
        });
    });

    // describe('password hashing', () => {
    //     it('should hash the password before saving the user', async () => {
    //         const user = new User({
    //             username: 'testuser',
    //             password: 'password123',
    //             confirmPassword: 'password123'
    //         });
    //         await user.save();
    //         expect(bcrypt.hash).toHaveBeenCalledWith('password123', 10);
    //         expect(user.password).toBe('hashedPassword');
    //     });
    // });

});