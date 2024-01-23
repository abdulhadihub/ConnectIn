'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import { postImages } from '@/utils/data'
import { PiThumbsUpThin } from "react-icons/pi";
import { FaRegCommentDots } from "react-icons/fa6";
import Options from '@/components/Options/Options'
import Comment from '@/components/Post/Comment'

function Post() {
    const [showComment, setShowComment] = useState(false)

    return (
        <div className='bg-white shadow-md rounded-md p-3 relative '>
            <div className='absolute top-0 right-0'>
                <Options />
            </div>
            <div className='flex'>
                <Image src='/user.jpg' width={50} height={50} className='rounded-full mr-3' />
                <div>
                    <h2 className='text-md'>User Name</h2>
                    <p className='text-[12px] text-gray-500'>@username</p>
                    <p className='text-[12px] text-gray-500'>28m</p>
                </div>
            </div>
            <div>
                <p className='text-md my-5'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Temporibus distinctio culpa magni. Delectus, quae reiciendis? Quasi saepe autem aspernatur provident esse beatae eos quas quis porro? Rerum aliquid est aut nemo qui magni sint placeat odio at illum ex dolores, officia repudiandae a expedita inventore debitis laudantium cupiditate modi amet reprehenderit aliquam quas alias dolor. Ipsum rem asperiores distinctio officiis, ducimus velit quidem harum perferendis, ab omnis voluptate earum laborum deserunt, commodi minima. Aliquam a cumque cupiditate quos totam deserunt, sit esse. Esse amet autem placeat in, adipisci voluptatum aperiam optio accusamus quaerat nisi vitae consequatur doloribus dignissimos veritatis incidunt.</p>
                <div className='grid grid-cols-3 gap-1'>

                    {postImages.map((image, index) => {
                        return (
                            <div key={index}>
                                <Image src={image} width={200} height={200} className='w-full h-full' />
                            </div>
                        )
                    })}
                </div>
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