"use client"

import { Input } from '@/components/ui/input'
import { formUrlQuery, removeKeysFromQuery } from '@/lib/utils'
import Image from 'next/image'
import { usePathname, useRouter, useSearchParams} from 'next/navigation'
import React, { useEffect, useState } from 'react'


interface CustomInputProps {
    route: string
    iconPosition: string
    imgSrc: string
    placeholder: string
}

const LocalSearchbar = ({
    route,
    iconPosition,
    imgSrc,
    placeholder,
}: CustomInputProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const query = searchParams.get('q');

  const [search, setSearch] = useState(query || '');

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if(search) {
        const newUrl = formUrlQuery({
          params: searchParams.toString(),
          key:'q',
          value: search
        })

        router.push( newUrl, { scroll: false});
      } else {
        if (pathname === route){
          const newUrl = removeKeysFromQuery({
            params: searchParams.toString(),
            keysToRemove: ['q'],
          })
          router.push( newUrl, { scroll: false});
        }
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [search, route, pathname, router, searchParams, query]);

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
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className='paragraph-regular no focus border-none
        shadow-none outline-none'
        />
    </div>
  )
}

export default LocalSearchbar