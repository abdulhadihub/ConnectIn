'use client'
import React from 'react'
import UserWidget from '@/components/UserWidget/UserWidget'
import Post from '@/components/Post/Post'
import SuggestionsWidget from '@/components/SuggestionsWidget/SuggestionsWidget'
import { useUser } from '@/utils/Context/UserContext'
import isAuth from '@/components/isAuth/isAuth'
import { feedPosts } from '@/utils/data'

function page() {
    const { user } = useUser();
    return (
        <>
            <div className='w-full bg-[#f4f2ee]'>
                <div className='w-[90%] mx-auto'>
                    <div className='grid grid-cols-12 py-5 gap-5'>
                        <div className='col-span-2'>
                            <UserWidget user={user} />
                        </div>

                        <div className='col-span-7'>
                            <div className='flex text-sm justify-end my-3'>

                                Sort by: <select className='border border-gray-300 rounded-md px-2 py-1 ml-2'>
                                    <option>Top</option>
                                    <option>New</option>
                                </select>
                            </div>
                            <div className='flex flex-col gap-5'>
                                {feedPosts.map((post, index) => (
                                    <Post key={index} post={post} />
                                ))}
                            </div>

                        </div>

                        <div className='col-span-3'>
                            <SuggestionsWidget />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default isAuth(page)