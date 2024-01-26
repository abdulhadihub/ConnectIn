import React from 'react'
import { HiDotsVertical } from "react-icons/hi";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import { FaRegCommentDots } from "react-icons/fa";
import { IoShareSocialSharp } from "react-icons/io5";
import server from '@/utils/server';
import { calculatePostTime } from '@/utils/utils';
import { Dropdown } from 'antd';
import { MdDelete, MdEdit } from 'react-icons/md';
import Link from 'next/link';
import { useUser } from '@/utils/Context/UserContext';

const PostItem = ({ data, deletePost }) => {
    const { user } = useUser();

    const items = [
        {
            key: '1',
            label: (
                <div onClick={() => deletePost(data?._id)} className='flex items-center'>
                    <MdDelete className='mr-2' color='red' size={25} /> Delete
                </div>
            ),
        },
        // {
        //     key: '2',
        //     label: (
        //         <Link href={`/edit-post/${data?._id}`} className='flex items-center'>
        //             <MdEdit className='mr-2' color='blue' size={25} /> Edit
        //         </Link>
        //     ),
        // }
    ];
    return (

        <div style={{ border: '1px solid grey' }} className='text-sm text-gray-500 rounded-lg'>
            <div className='flex justify-between items-center my-2'>
                <div className='flex gap-2  px-2'>
                    <div className='w-[30%]'><img width={40} height={40} className='object-cover rounded-full' src={`${server}/images/${data?.user?.profileImage}`} /></div>
                    <div className='w-[70%]'>
                        <div className='text-sm flex text-black font-semibold'>{data?.user?.fName} {data?.user?.lName}</div>
                        <div className='text-xs text-gray-500'> {data?.isEdited ? calculatePostTime(data?.postUpdatedAt) : calculatePostTime(data?.createdAt)} {data?.isEdited && "• Edited"}</div>
                    </div>
                </div>
                {user?._id === data?.user?._id && (
                    <div className='cursor-pointer hover:bg-gray-200 p-2 flex items-center rounded-full'>
                        <Dropdown
                            menu={{
                                items,
                            }}
                            placement="bottom"
                            arrow
                        >
                            <HiDotsVertical color='gray' size={20} />
                        </Dropdown>
                    </div>
                )}
            </div>
            <div>
                <div className='text-sm text-gray-500 px-2'>
                    {data?.description?.length > 200 ? data?.description?.slice(0, 50) + '' : data?.description}
                    <div className='flex justify-end'>
                        <Link href={`/post/${data?._id}`} className='text-blue-600 hover:underline cursor-pointer'>... see more</Link>
                    </div>
                </div>
                <div className='my-2' ><img style={{ height: "300px", objectFit: 'cover' }} className='w-[100%]' src={`${server}/images/${data?.postImage}`} alt='imggg' />
                </div>
                <div className='px-3'>
                    <div className='flex text-[12px] justify-between my-2'>
                        <div className='flex justify-center'>
                            <AiFillLike size={16} color='blue' className='mx-2' />  Likes {data?.likes?.length}
                        </div>
                        <div className='flex justify-center'>
                            <FaRegCommentDots size={16} color='gray' className='mx-2' />  Comments {data?.comments?.length}
                        </div>
                    </div>
                    {/* <div className='grid grid-cols-3 px-2 my-2'>
                        <div className='flex flex-col md:flex-row justify-center items-center hover:bg-blue-100 p-2 rounded-full cursor-pointer'>
                            <AiOutlineLike size={20} color='blue' className='mx-2' />
                            <span className='text-sm text-gray-500'>Like</span>
                        </div>
                        <div className='flex flex-col md:flex-row justify-center items-center  hover:bg-green-100 p-2 rounded-full cursor-pointer'>
                            <FaRegCommentDots size={20} color='gray' className='mx-2' />
                            <span className='text-sm text-gray-500'>Comment</span>
                        </div>
                        <div className='flex flex-col md:flex-row justify-center items-center  hover:bg-purple-200 p-2 rounded-full cursor-pointer'>
                            <IoShareSocialSharp size={20} color='gray' className='mx-2' />
                            <span className='text-sm text-gray-500'>Share</span>
                        </div>
                    </div> */}
                </div>
            </div>
        </div>
    )
}

export default PostItem
