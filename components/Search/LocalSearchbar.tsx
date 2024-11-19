"use client"

import { Input } from '@/components/ui/input'
import Image from 'next/image'
import React from 'react'

interface CustomInputProps {
    iconPosition: string
    imgSrc: string
    placeholder: string
}

const LocalSearchbar = ({
    iconPosition,
    imgSrc,
    placeholder,
}: CustomInputProps) => {
  return (
    <div className='flex min-h-[46px] grow items-center gap-4 rounded-[10px] px-4'>
        {iconPosition === 'left' && (
        <Image
        src={imgSrc}
        alt='search icon'
        width={25}
        height={25}
        className='cursor-pointer'
        />)}

        <Input
        type='text'
        placeholder={placeholder}
        value=''
        onChange={() => {}}
        className='paragraph-regular no focus border-none
        shadow-none outline-none'
        />
    </div>
  )
}

export default LocalSearchbar