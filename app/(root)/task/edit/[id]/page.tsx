import Task from '@/components/Forms/Task'
import { getTaskById } from '@/lib/actions/task.action'
import React from 'react'
import { ParamsProps } from '@/types'
import { auth } from '@clerk/nextjs/server'
import { getUserById } from '@/lib/actions/user.action'

const Page = async ({ params }: ParamsProps) => {
  const { userId } = await auth();
  if (!userId) return null;

  const mongoUser = await getUserById({ userId });
  const result = await getTaskById(params.id);

  return (
    <>
      <h1 className=''>Edit Task</h1>

      <div className='mt-9'>
        <Task
          type='Edit'
          mongoUserId={mongoUser._id.toString()} // Convert ObjectId to string
          taskDetails={JSON.stringify(result)}
        />
      </div>
    </>
  )
}

export default Page;