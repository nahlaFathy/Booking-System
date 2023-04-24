import User from '../user';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config({
	path: '.env'
});
const url: string = process.env.DATABASE_CONNECTION!

mongoose.connect(url);

const users = [
    { username: 'John Doe', email: 'email1@unifi.com', secret: 'password1' },
    { username: 'Jane Smith', email: 'email2@unifi.com', secret: 'password2' }
];

// Seed the data into the database
const seedData = async () => {
    try {
        await User.insertMany(users);
        console.log("Data seeded successfully");
        mongoose.disconnect();
    } catch (err) {
        console.log(err);
        mongoose.disconnect();
        process.exit(1);
    }
}

seedData();

// run it by type in terminal node filePath.ts
