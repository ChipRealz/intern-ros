import Task from '@/components/Forms/Task'
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { getUserById } from '@/lib/actions/user.action';
import React from 'react'

const Page = async () => {
  const { userId } = await auth();


  if (!userId) redirect('/sign-in');

  const mongoUser = await getUserById({ userId });

  return (
    <div>
        <h1 className='font-bold text-black text-3xl'>
            Add Task
        </h1>
        <div>
            <Task mongoUserId={JSON.stringify(mongoUser._id)}/>
        </div>
    </div>
  )
}

export default Page