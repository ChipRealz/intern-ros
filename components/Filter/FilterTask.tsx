"use client"

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { formUrlQuery } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";

  

interface Props {
    filters: {
        name: string, 
        value: string
    }[];

    }

const Filter = ({filters}:(Props)) => {
    const searchParams = useSearchParams();
    const router = useRouter();

    const paramFilter = searchParams.get('filter');

    const handleUpdateParams = (value: string) => {
        const newUrl = formUrlQuery({
            params: searchParams.toString(),
            key: 'filter',
            value
        })
        router.push(newUrl, {scroll: false})
    }

  return (
    <div className='relative'>
        <Select
            onValueChange={ handleUpdateParams}
            defaultValue={paramFilter || undefined}
        >
            <SelectTrigger className='body-regular light-border border px-5 py-2.5'>            
                <div className="line-clamp-1 flex-1 text-left">
                <SelectValue placeholder="Select a filter" />
                </div>
            </SelectTrigger>
            <SelectContent className="text-dark400_light700 small-regular
            border-none bg-light-900 dark:bg-dark-300">
                <SelectGroup>
                    {filters.map((item) => (
                        <SelectItem key={item.value} value={item.value}
                        className="cursor-pointer focus:bg-light-800
                        dark:focus:bg-dark-400">
                            {item.name}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>

    </div>
  )
}

export default Filter