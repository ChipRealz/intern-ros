"use client"

import { sidebarLinks } from '@/constants';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '../ui/button';
import { SignedOut } from '@clerk/nextjs';

const LeftSidebar = () => {
  const pathname = usePathname();
  
  return (
    <section className="bg-white border-r border-gray-200 flex h-screen flex-col justify-between overflow-y-auto p-6 pt-36 shadow-lg">
      <div className="flex flex-1 flex-col gap-6">
        {sidebarLinks.map((item) => {
          const isActive = (pathname.includes(item.route) && item.route.length > 1) || pathname === item.route;

          return (
              <Link
              href={item.route}
              key={item.label}
              className={`${
                isActive
                  ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-lg"
                  : "text-gray-700"
              }  flex items-center justify-start gap-4 p-4`}
            >
                <Image 
                  src={item.imgURL}
                  alt={item.label}
                  width={20}
                  height={20}
                  className={`${isActive ? "" : "invert"}`}
                />
                <p className={`${isActive ? 'font-bold' : 'font-medium'} hidden lg:block`}>{item.label}</p>
              </Link>
          )
        })}
      </div>

      <SignedOut>
          <div className="flex flex-col gap-3">
              <Link href="/sign-in">
                <Button className="small-medium  min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none">
                  <Image 
                    src="/assets/icons/account.svg"
                    alt="login"
                    width={20}
                    height={20}
                    className="invert-colors lg:hidden"
                  /> 
                  <span className="primary-text-gradient max-lg:hidden">Log In</span>
                </Button>
              </Link>

          
              <Link href="/sign-up">
                <Button className='small-medium  min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none'>
                <Image 
                    src="/assets/icons/sign-up.svg"
                    alt="sign up"
                    width={20}
                    height={20}
                    className="invert-colors lg:hidden"
                  /> 
                  <span className="max-lg:hidden">Sign up</span>
                </Button>
              </Link>
          </div>
        </SignedOut>
    </section>
  )
}

export default LeftSidebar
