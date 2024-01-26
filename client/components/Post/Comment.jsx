import React, { useState } from 'react'
import calculateTime from '@/utils/calculateTime';
import server from '@/utils/server';
import { useUserById } from '@/utils/Hooks/UseHooks';
import { useUser } from '@/utils/Context/UserContext';
import { FaEdit, FaReply } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';

function Comment({ comment, handleEdited, handleDeleted, replyToComment }) {
    const { user, loading, error } = useUserById(comment?.user?._id)
    const { user: currentUser } = useUser()
    const [reply, setReply] = useState()
    const [isReplying, setIsReplying] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()
        replyToComment(comment?._id, reply)
        setIsReplying(false)
        setReply('')
    }

    return (
        <>
            <div className='flex mt-5'>
                <img src={`${server}/images/${user?.profileImage}`} width={30} height={30} className='object-cover rounded-full mr-3' />
                <div className='bg-[#f2f2f2] p-3 rounded-sm w-full relative'>
                    <span className='text-[11px] text-gray-500 absolute top-2 right-2'>{calculateTime(comment?.createdAt)}</span>

                    <span className=' p-3 absolute top-4 right-2'>
                        <FaReply onClick={() => setIsReplying(true)} title='Reply' className='text-blue-500 cursor-pointer' />
                    </span>
                    {currentUser?._id === comment?.user?._id &&
                        <span className='p-3 absolute top-4 right-8'>
                            <FaEdit onClick={() => handleEdited(comment)} title='Edit' className='text-gray-500 cursor-pointer' />
                        </span>}

                    {currentUser?._id === comment?.user?._id &&
                        <span className='p-3 absolute top-4 right-14'>
                            <MdDelete onClick={() => handleDeleted(comment)} title='Delete' className='text-red-500 cursor-pointer' />
                        </span>}
                    <h2 className='font-semibold'>{user?.fName} {user?.lName}</h2>
                    <p>{comment?.comment}</p>
                </div>
            </div>
            <div className='flex justify-end'>
                {comment?.reply?.length > 0 && (
                    <div className=' p-2 rounded mt-1 w-[70%]'>
                        {comment?.reply?.map((reply) => (
                            <div className='flex mt-2' key={reply?._id}>
                                <img src={`${server}/images/${reply?.user?.profileImage}`} width={30} height={30} className='object-cover rounded-full mr-3' />
                                <div className='bg-[#f2f2f2] p-3 rounded-sm w-full relative'>
                                    <span className='text-[11px] text-gray-500 absolute top-2 right-2'>{calculateTime(reply?.createdAt)}</span>
                                    <h2 className='font-semibold'>{reply?.user?.fName} {reply?.user?.lName}</h2>
                                    <p>{reply?.comment}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <div className='flex justify-end'>
                {isReplying && (
                    <div className='bg-gray-100 p-2 rounded mt-1 w-[80%]'>
                        <form onSubmit={handleSubmit} className='flex'>
                            <input
                                className='w-full p-2 rounded-l-full ml-2 outline-none border-none bg-white'
                                placeholder='Write your reply...'
                                value={reply}
                                onChange={(e) => setReply(e.target.value)}
                            />
                            <div className='flex'>
                                <button type='submit' className='bg-blue-500 text-white px-4 py-2'>
                                    Reply
                                </button>
                                <div onClick={() => setIsReplying(false)} className='cursor-pointer bg-red-500 text-white px-4 py-2 rounded-r-full'>
                                    Cancle
                                </div>
                            </div>
                        </form>
                    </div>
                )}
            </div>
        </>
    )
}

export default Comment