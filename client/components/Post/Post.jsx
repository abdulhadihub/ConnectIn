'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import { postImages } from '@/utils/data'
import { PiThumbsUpThin } from "react-icons/pi";
import { FaRegCommentDots } from "react-icons/fa6";
import Options from '@/components/Options/Options'
import Comment from '@/components/Post/Comment'

function Post({ post }) {
    const [showComment, setShowComment] = useState(false)

    return (
        <div className='bg-white shadow-md rounded-md p-3 relative '>
            <div className='absolute top-5 right-5'>
                <Options userId={post.userId} />
            </div>
            <div className='flex'>
                <Image src='/user.jpg' width={50} height={50} className='rounded-full mr-3' />
                <div>
                    <h2 className='text-md'>User Name</h2>
                    <p className='text-[12px] text-gray-500'>@username</p>
                    <p className='text-[12px] text-gray-500'>{post.createdAt}</p>
                </div>
            </div>
            <div>
                <h2 className='text-lg my-3'>{post.title}</h2>
                <p className='text-md my-5'>{post.description}</p>
                <div className='w-full h-[300px]'>
                    <Image src={post.postImage} width={300} height={300} className='object-cover w-full h-full' />
                </div>
                {/* <div className='grid grid-cols-3 gap-1'>

                    {postImages.map((image, index) => {
                        return (
                            <div key={index}>
                                <Image src={image} width={200} height={200} className='w-full h-full' />
                            </div>
                        )
                    })}
                </div> */}
            </div>

            <div className='mt-5'>
                <div className='flex justify-between items-center'>
                    <div className='flex items-center gap-2 cursor-pointer'>
                        <PiThumbsUpThin className='text-xl text-gray-500' />
                        <p className='text-gray-500'>Like 12</p>
                    </div>
                    <div onClick={() => setShowComment(!showComment)} className='flex items-center gap-2 cursor-pointer'>
                        <FaRegCommentDots className='text-xl text-gray-500' />
                        <p className='text-gray-500'>Comment 3</p>
                    </div>
                </div>
            </div>

            {
                showComment && (
                    <div>

                        <div className='flex mt-5'>
                            <Image src='/user.jpg' width={30} height={30} className='rounded-full mr-3' />
                            <input type="text" placeholder='Add a comment...' className='w-full outline-none border border-gray-500 rounded-full px-5 py-2' />
                        </div>
                        <Comment />
                    </div>
                )
            }
        </div>
    )
}

export default Post