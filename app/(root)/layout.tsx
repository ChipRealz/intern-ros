import Navbar from '@/components/Navbar/Navbar'
import LeftSidebar from '@/components/shared/LeftSidebar'
import React, { ReactNode } from 'react'

const RootLayout = ({children}: {children: ReactNode}) => {
  return (
    <main className='bg-black min-h-screen relative'>
      <Navbar />
      <div className="flex min-h-screen">
        {/* Left Sidebar takes fixed width */}
        <LeftSidebar />
        
        {/* Children section takes the remaining space */}
        <section className='flex-1 min-h-screen flex flex-col px-6 pb-6 pt-36 bg-white'>
          <div className="mx-auto w-full max-w-3xl">
            {children}
          </div>
        </section>
      </div>
    </main>
  )
}

export default RootLayout
