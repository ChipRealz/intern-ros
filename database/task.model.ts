import {Schema, models, model, Document} from 'mongoose';

export interface ITask extends Document {
    title: string;
    description: string;
    status: string;
    author: Schema.Types.ObjectId;
    createdAt: Date;
}

const TaskSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: 'User' },
    createdAt: { type: Date, default: Date.now }
});

const Task = models.Task || model('Task', TaskSchema);

export default Task;