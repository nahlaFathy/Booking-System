import User, { UserType } from '../models/user';

class AuthService {

    login(phone: string, secret: string) {
        try {
            return User.findByCredentials(phone, secret);
        } catch (err: any) {
            throw new Error(err);
        }
    }

    async signup(name: string, phone: string, secret: string, type: UserType) {
        try {
            const user: any = await User.findOne({ phone });
            // If user not found, return error
            if (user) {
                throw new Error('Phone number already exists');
            }
            const newUser = new User({
                name,
                phone,
                secret,
                type
            })
            // Save the user to the database
            const createdUser = await newUser.save();
            return createdUser;

        } catch (err: any) {
            throw new Error(err);
        }
    }
}

export default  AuthService;