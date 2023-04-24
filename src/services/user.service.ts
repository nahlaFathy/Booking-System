
import { Types } from 'mongoose';
import User, { IUser } from '../models/user';

class UserService {

    // Update an existing User for a specific User
    async updateUser(userId: Types.ObjectId,  updatedFields: IUser) {
        try {
            // Find the User by ID
            const user = await User.findById(userId);
            if (!user) {
                throw new Error('User not found');
            }

            // Update the User fields
            const updatedUser = await User.findByIdAndUpdate(userId, updatedFields, { new: true });
            if (!updatedUser) {
                throw new Error('Error updating User');
            }

            return updatedUser;
        } catch (err: any) {
            throw new Error(err);
        }
    };

    // Delete an existing User for a specific User
    async deleteUser(userId: Types.ObjectId) {
        try {

            // Find the User by ID and delete it
            const deletedUser = await User.findByIdAndDelete(userId);
            if (!deletedUser) {
                throw new Error('User not found');
            }

            return true;
        } catch (err: any) {
            throw new Error(err);
        }
    };

    // Get specific user information for a specific User
    async getUserByUserId(userId: Types.ObjectId) {
        try {
            // Find the User by ID
            const user = await User.findById(userId);
            if (!user) {
                throw new Error('User not found');
            }

            return user;
        } catch (err: any) {
            throw new Error(err);
        }
    };

}

export default UserService;
