import React from 'react'
import calculateTime from '@/utils/calculateTime';
import server from '@/utils/server';
import { useUserById } from '@/utils/Hooks/UseHooks';

function Comment({ comment }) {
    const { user, loading, error } = useUserById(comment?.user?._id)
    return (
        <div className='flex mt-5'>
            <img src={`${server}/images/${user?.profileImage}`} width={30} height={30} className='rounded-full mr-3' />
            <div className='bg-[#f2f2f2] p-3 rounded-sm w-full relative'>
                <span className='text-[11px] text-gray-500 absolute top-2 right-2'>{calculateTime(comment?.createdAt)}</span>
                <h2 className='font-semibold'>{user?.fName} {user?.lName}</h2>
                <p>{comment?.comment}</p>
            </div>
        </div>
    )
}

export default Comment