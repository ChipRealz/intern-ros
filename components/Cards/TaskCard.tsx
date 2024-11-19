import { getTimestamp } from '@/lib/utils'; 
import Link from 'next/link';
import Image from 'next/image';
import React from 'react';

interface TaskProps {
  _id: string;
  title: string;
  description: string;
  author: {
    _id: string;
    picture: string;
    clerkId: string;
    name: string; // Add name field to author
  };
  status: 'completed' | 'in-progress' | 'pending';
  createdAt: Date;
}

const TaskCard = ({
  _id,
  title,
  description,
  author,
  status,
  createdAt,
}: TaskProps) => {
  return (
    <div className='bg-white border border-gray-200 rounded-lg shadow-md p-6'>
      <div className='flex flex-col items-start justify-between gap-5'>
        <div>
          <Link href={`/task/${_id}`}>
            <h3 className='font-semibold line-clamp-1 flex-1'>{title}</h3>
          </Link>
          <span className='subtle-regular line-clamp-1 flex'>{getTimestamp(createdAt)}</span>
        </div>
      </div>

      <div className="mt-3.5 flex flex-wrap items-center justify-between gap-2">
        <p className="text-gray-700 flex-1 line-clamp-3">{description}</p>
        <span
            className={`px-2 py-1 rounded text-white ${ 
                status === 'completed' ? 'bg-green-500' : 
                status === 'in-progress' ? 'bg-blue-500' : 
                'bg-yellow-500'
            }`}
            >
            {status}
        </span>
      </div>

      {/* Author Info below description */}
      <div className="mt-4 flex items-center gap-3">
        <Image 
          src={author.picture} 
          alt={author.name} 
          width={32} 
          height={32} 
          className="rounded-full object-cover" 
        />
        <span className="text-sm font-medium text-gray-700">{author.name}</span>
      </div>
    </div>
  );
};

export default TaskCard;
