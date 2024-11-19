import Task from '@/components/Forms/Task'
import React from 'react'

const Page = () => {
  return (
    <div>
        <h1 className='font-bold text-black text-3xl'>
            Add Task
        </h1>
        <div>
            <Task/>
        </div>
    </div>
  )
}

export default Page