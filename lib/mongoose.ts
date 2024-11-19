// lib/database/mongoose.ts
import mongoose from 'mongoose';
import { Schema } from 'mongoose';

export const connectToDatabase = async () => {
    mongoose.set('strictQuery', true);
    
    if (!process.env.MONGODB_URL) {
        console.log('MISSING MONGODB_URL');
        return;
    }

    try {
        await mongoose.connect(process.env.MONGODB_URL, {
            dbName: 'taskmanagement'
        });

        // Explicitly register models using their schemas
        if (!mongoose.models.User) {
            mongoose.model('User', new Schema({
                clerkId: { type: String, required: true },
                name: { type: String, required: true },
                username: { type: String, required: true, unique: true },
                email: { type: String, required: true, unique: true },
                password: { type: String },
                picture: { type: String, required: true },
                joinedAt: { type: Date, default: Date.now }
            }));
        }

        if (!mongoose.models.Task) {
            mongoose.model('Task', new Schema({
                title: { type: String, required: true },
                description: { type: String, required: true },
                status: { type: String, required: true },
                author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
                createdAt: { type: Date, default: Date.now }
            }));
        }

        console.log('Connected to the database');
    } catch (error) {
        console.log('Error connecting to the database', error);
    }
}