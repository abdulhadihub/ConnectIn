import React from 'react'
import UserWidget from '@/components/UserWidget/UserWidget'
import Post from '@/components/Post/Post'
import SuggestionsWidget from '@/components/SuggestionsWidget/SuggestionsWidget'

function page() {
    return (
        <>
            <div className='grid grid-cols-12 mt-10 bg-[#f4f2ee] gap-5'>
                <div className='col-span-2'>
                    <UserWidget />
                </div>

                <div className='col-span-7'>
                    <Post />
                </div>

                <div className='col-span-3'>
                    <SuggestionsWidget />
                </div>
            </div>
        </>
    )
}

export default page