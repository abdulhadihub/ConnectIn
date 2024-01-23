'use client'
import React from 'react'
import UserWidget from '@/components/UserWidget/UserWidget'
import Post from '@/components/Post/Post'
import SuggestionsWidget from '@/components/SuggestionsWidget/SuggestionsWidget'
import { useUser } from '@/utils/Context/UserContext'
import isAuth from '@/components/isAuth/isAuth'

function page() {
    const { user } = useUser();
    console.log(user)
    return (
        <>
            <div className='grid grid-cols-12 mt-10 bg-[#f4f2ee] gap-5'>
                <div className='col-span-2'>
                    <UserWidget />
                </div>

                <div className='col-span-7 flex flex-col gap-5'>
                    <div className='flex text-sm justify-end mt-3'>

                        Sort by: <select className='border border-gray-300 rounded-md px-2 py-1 ml-2'>
                            <option>Top</option>
                            <option>New</option>
                        </select>
                    </div>
                    <Post />
                    <Post />
                </div>

                <div className='col-span-3'>
                    <SuggestionsWidget />
                </div>
            </div>
        </>
    )
}

export default isAuth(page)