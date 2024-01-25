import React from 'react'
import calculateTime from '@/utils/calculateTime';
import server from '@/utils/server';
import { useUserById } from '@/utils/Hooks/UseHooks';
import { useUser } from '@/utils/Context/UserContext';
import { FaEdit, FaReply } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';

function Comment({ comment, handleEdited, handleDeleted, replyToComment }) {
    const { user, loading, error } = useUserById(comment?.user?._id)
    const { user: currentUser } = useUser()

    return (
        <div className='flex mt-5'>
            <img src={`${server}/images/${user?.profileImage}`} width={30} height={30} className='rounded-full mr-3' />
            <div className='bg-[#f2f2f2] p-3 rounded-sm w-full relative'>
                <span className='text-[11px] text-gray-500 absolute top-2 right-2'>{calculateTime(comment?.createdAt)}</span>

                <span className=' p-3 absolute top-4 right-2'>
                    <FaReply title='Reply' className='text-blue-500 cursor-pointer' />
                </span>
                {currentUser?._id === comment?.user?._id &&
                    <span className='p-3 absolute top-4 right-8'>
                        <FaEdit onClick={()=>handleEdited(comment)} title='Edit' className='text-gray-500 cursor-pointer' />
                    </span>}

                    {currentUser?._id === comment?.user?._id &&
                    <span className='p-3 absolute top-4 right-14'>
                        <MdDelete onClick={()=>handleDeleted(comment)} title='Delete' className='text-red-500 cursor-pointer' />
                    </span>}
                <h2 className='font-semibold'>{user?.fName} {user?.lName}</h2>
                <p>{comment?.comment}</p>
            </div>
        </div>
    )
}

export default Comment