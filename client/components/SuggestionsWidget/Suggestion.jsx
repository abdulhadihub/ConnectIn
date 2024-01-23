import React from 'react'
import Image from 'next/image'
import { CiCirclePlus } from "react-icons/ci";

function Suggestion({ user }) {
    return (
        <div className='flex'>
            <Image src='/user.jpg' width={40} height={40} className='rounded-full mr-2' />
            <div>
                <h2 className='font-semibold'>User Name</h2>
                <p className='text-sm text-gray-500'>@username</p>
                <div className='cursor-pointer px-3 py-1 border-solid border-blue-500 text-blue-500 rounded-full font-semibold hover:bg-blue-500 hover:text-white transition-all flex items-center'>
                    <CiCirclePlus className='m' />
                    <div className='ml-2'>
                        Follow
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Suggestion