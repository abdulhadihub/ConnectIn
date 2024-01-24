import React from 'react'
import calculateTime from '@/utils/calculateTime';
import server from '@/utils/server';

function Comment({ comment }) {
    console.log(comment)
    return (
        <div className='flex mt-5'>
            <img src={`${server}/images/${comment?.user?.profileImage}`} width={30} height={30} className='rounded-full mr-3' />
            <div className='bg-[#f2f2f2] p-3 rounded-sm w-full relative'>
                <span className='text-[11px] text-gray-500 absolute top-2 right-2'>{calculateTime(comment?.createdAt)}</span>
                <h2 className='font-semibold'>{comment?.user?.fName} {comment?.user?.lName}</h2>
                <p>{comment?.comment}</p>
            </div>
        </div>
    )
}

export default Comment