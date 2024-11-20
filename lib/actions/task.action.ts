"use server"

import Task from "@/database/task.model";
import { connectToDatabase } from "../mongoose";
import { CreateTaskParams, editTaskParams, GetTasksParams } from "./shared.types";
import { revalidatePath } from "next/cache";


export async function createTask(params :CreateTaskParams){
  try {
    connectToDatabase();

    const {title, description, status, author, path} = params;

    await Task.create({
      title,
      description,
      status,
      author,
    });
  revalidatePath(path);

  } catch (error) {
  console.error("Error creating task:", error);  
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function getTasks(params: GetTasksParams) {
  try {
    await connectToDatabase();

    const tasks = await Task.find({}).populate('author', 'name picture');

    return { tasks };
  } catch (error) {
    console.error("Error getting tasks:", error);
    throw new Error("Failed to get tasks.");
  }
}

export async function getTaskById(taskId: string) {
    try {
      await connectToDatabase();
      console.log('Searching for task with ID:', taskId);
      
      const task = await Task.findById(taskId)
      .populate('author', 'name')
      
      console.log('Found task:', task);
      
      if (!task) {
        console.log('No task found with ID:', taskId);
        throw new Error('Task not found');
      }
      
      return task;
    } catch (error) {
      console.error("Detailed error getting task:", error);
      throw error;
    }
  }

export async function deleteTask(taskId: string, path: string) {
    try {
        await connectToDatabase();

        await Task.deleteOne({_id : taskId});

        revalidatePath(path);

    }
    catch (error) {
        console.error("Error deleting task:", error);
        throw new Error("Failed to delete task.");
    }
}

export async function editTask(params: editTaskParams) {
  try {
      await connectToDatabase();

      const {taskId, title, description, status, path} = params;

      const task = await Task.findById(taskId)

      if(!task){
        throw new Error('Task not found')
      }

      task.title = title;
      task.description = description;
      task.status = status;

      await task.save();

      revalidatePath(path);

  }
  catch (error) {
      console.error("Error deleting task:", error);
      throw new Error("Failed to delete task.");
  }
}
