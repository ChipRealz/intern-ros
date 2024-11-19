import React, { ReactNode } from 'react'

const AuthLayout = ({children}: {children: ReactNode}) => {
  return (
    <main className='flex min-h-screen justify-center items-center'>
        {children}
    </main>
  )
}

export default AuthLayout