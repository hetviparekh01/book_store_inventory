import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const url = process.env.URL as string;

export const connectDB = async () => {
    try {
        await mongoose.connect(url);
        console.log('Connected to database!');
    } catch (error) {
        console.error('Failed to connect to database:', error);
        throw error; // You may choose to handle this differently depending on your application's requirements
    }
};
