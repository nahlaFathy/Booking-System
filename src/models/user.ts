import { Schema, model, Document, Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// user type schema
export enum UserType {
  guest = 'guest',
  manager = 'manager'
}

export interface IUser extends Document {
  name: string;
  phone: string;
  secret?: string;
  type: UserType;
}

export interface UserModelInterface extends Model<IUser> {
  // declare any static methods here
  findByCredentials(key: string, secret: string): Promise<IUser | null>;
}

const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    secret: { type: String, required: true },
    type: {
      type: String,
      enum: Object.values(UserType),
      required: true
    }
  },
  { timestamps: true }
);

// hashing user secret before creating new user 
UserSchema.pre("save", async function (next) {
  const user = this;
  if (!user.isModified('secret')) {
    return next();
  }
  if (user.secret) {
    try {
      const salt = await bcrypt.genSalt(10);
      bcrypt.hash(user.secret, salt, (err, hashedPassword) => {
        if (err) {
          return;
        }
        user.secret = hashedPassword;
        next();
      });
    } catch (err: any) {
      return next(err);
    }
  }
});

// Static method to find a user by phone and secret
UserSchema.statics.findByCredentials = async function (phone: string, secret: string) {
  const User = this;
  const user = await User.findOne({ phone });
  // If user not found, return error
  if (!user) {
    throw new Error('Wrong credentials');
  }
  if (secret) {
    if (!bcrypt.compareSync(secret, user.secret))
      throw new Error('Wrong Credentials');
  } else {
    throw new Error('Wrong Credentials');
  }
  // Generate and sign JWT token with user ID and secret key
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY || 'secret-key', { expiresIn: '1h' });

  // Return the token as response
  return token;

}

const User = model<IUser, UserModelInterface>("User", UserSchema);


export default User;

