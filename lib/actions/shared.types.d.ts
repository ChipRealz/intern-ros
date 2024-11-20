export interface GetTasksParams {
    page?: number;
    pageSize?: number;
    searchQuery?: string;
    filter?: string;
    
}

export interface CreateTaskParams {
    title: string;
    description: string;
    status: string;
    author: Schema.Types.ObjectId | IUser;
    path: string;
}

export interface CreateUserParams {
    clerkId: string;
    name: string;
    username: string;
    email: string;
    picture: string;
  }

  export interface UpdateUserParams {
    clerkId: string;
    updateData: Partial<IUser>;
    path: string;
}

export interface DeleteUserParams {
    clerkId: string;
}

export interface editTaskParams {
  taskId: string;
  title: string;
  description: string;
  status: string;
  path: string;
}