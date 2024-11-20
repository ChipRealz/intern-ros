"use client";
import { deleteTask } from '@/lib/actions/task.action';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react';

interface Props {
  type: string;
  itemId: string;
}

const EditDeleteAction = ({ type, itemId }: Props) => {

    const pathname = usePathname(); 
    const router = useRouter();

  const handleEdit = () => {
    router.push(`/task/edit/${JSON.parse(itemId)}`)
  };

  const handleDelete = async () => {
    await deleteTask(JSON.parse(itemId), pathname);
  };

  return (
    <div className='flex items-center justify-end gap-3'>
      {type === 'Task' && (
        <>
          <Image
            src="/assets/icons/edit.svg"
            alt="Edit"
            width={15}
            height={15}
            className='cursor-pointer object-contain'
            onClick={handleEdit}
          />
          <Image
            src="/assets/icons/trash.svg"
            alt="Delete"
            width={15}
            height={15}
            className='cursor-pointer object-contain'
            onClick={handleDelete}
          />
        </>
      )}
    </div>
  );
};

export default EditDeleteAction;