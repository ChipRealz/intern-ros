import {Schema, models, model, Document} from 'mongoose';

export interface IUser extends Document {
    clerkId: string;
    email: string;
    name: string;
    username: string;
    password?: string;
    joinedAt: Date;
}

const UserSchema = new Schema({
    clerkId: { type: String, required: true },
    email: { type: String, required: true },
    name: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    joinedAt: { type: Date, default: Date.now }
});

const User = models.User || model('User', UserSchema);

export default User;