"use server"

import Task from "@/database/task.model";
import { connectToDatabase } from "../mongoose";
import { CreateTaskParams, GetTasksParams } from "./shared.types";


export async function createTask(params: CreateTaskParams) {
    try {
        await connectToDatabase();

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { title, description, status } = params;

        // Log parameters for debugging
        console.log("Creating task with parameters:", params);

        // Ensure all required fields are provided
        if (!title || !description || !status) {
            throw new Error("Missing required fields: title, description, or status.");
        }

        // Create the task
        const task = await Task.create({
            title,
            description,
            status
        });

        // Convert the Mongoose document to a plain object and return only the necessary fields
        const taskObj = task.toObject();

        // Remove non-serializable fields (_id, __v, and createdAt)
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { _id, __v, createdAt, ...taskData } = taskObj;

        // Optionally, you can add a custom taskId field if needed
        taskData.id = taskObj._id.toString();

        return taskData; // Return the clean object
    } catch (error) {
        console.error("Error creating task:", error);
        throw new Error("Failed to create task.");
    }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function getTasks(params: GetTasksParams){
    try {
        connectToDatabase();

        const tasks = await Task.find({});

        return {tasks};
    } catch (error) {
        console.error("Error getting tasks:", error);
        throw new Error("Failed to get tasks.");
    }
}