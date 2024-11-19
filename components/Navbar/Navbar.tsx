import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Navbar = () => {
  return (
    <nav className='flex items-center justify-between bg-black fixed z-50 w-full gap-5 p-6 shadow-light-300'>
        <Link href='/' className='flex items-center gap-1'>
            <Image
                src="/assets/images/site-logo.svg"
                width={25}
                height={25}
                alt='TaskManagement'    
            />
            <p className='font-bold text-white'>Task Management</p>
        </Link>

        <div className='flex items-center gap-5'>
            <UserButton afterSwitchSessionUrl='/'
            appearance={{
                elements: {
                    avatarBox:'h-10 w-10'
                },
                variables: {
                    colorPrimary: '#ff7000'
                }
            }}
            />
        </div>
    </nav>
  )
}

export default Navbar
