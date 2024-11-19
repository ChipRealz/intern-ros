import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Button } from '../ui/button'

interface Props {
    title: string;
    description: string;
    link: string;
    linkTitle: string;
}

const NoResult = ({ title, description, link, linkTitle }: Props) => {
  return (
    <div className="flex flex-col items-center justify-center bg-white p-6 rounded-lg shadow-md text-center space-y-6">
      <Image 
        src="/assets/images/light-illustration.png"
        alt="No result illustration"
        width={280}
        height={280}
        className="rounded-lg"
      />

      <h2 className="text-2xl font-semibold text-gray-800">
        {title}
      </h2>
      <p className="text-gray-600 text-base max-w-md">
        {description}
      </p>

      <Link href={link}>
        <Button className="px-6 py-3 bg-black text-white rounded-md shadow hover:bg-gray-900 transition duration-200">
          {linkTitle}
        </Button>
      </Link>
    </div>
  )
}

export default NoResult;
