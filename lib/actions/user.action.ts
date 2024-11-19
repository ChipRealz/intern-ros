import { connectToDatabase } from "../mongoose";
import User from "@/database/user.model";
import { CreateUserParams, DeleteUserParams, UpdateUserParams } from "./shared.types";
import { revalidatePath } from "next/cache";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function getUserById(params: any) {
    try {
      connectToDatabase();
  
      const { userId } = params;
  
      const user = await User.findOne({ clerkId: userId });
  
      return user;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  export async function createUser(userData: CreateUserParams) {
    try {
      connectToDatabase();
  
      const newUser = await User.create(userData);
  
      return newUser;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  export async function updateUser(params: UpdateUserParams) {
    try {
      connectToDatabase();
  
      const { clerkId, updateData, path } = params;
  
      await User.findOneAndUpdate({ clerkId }, updateData, {
        new: true,
      });
  
      revalidatePath(path);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  export async function deleteUser(params: DeleteUserParams) {
    try {
        connectToDatabase();
    
        const { clerkId } = params;
    
        const deletedUser = await User.findOneAndDelete({ clerkId });

        return deletedUser;

    } catch (error) {
      console.log(error);
      throw error;
        
    }
  }