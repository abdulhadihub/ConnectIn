import React from 'react'
import Image from 'next/image'
import { CiCirclePlus } from "react-icons/ci";
import Link from 'next/link';
import { useFollowUser } from '@/utils/Hooks/UseHooks';
import server from '@/utils/server';
import { notification } from 'antd'

function Suggestion({ user }) {
    const { followUser } = useFollowUser()

    const handleFollow = async () => {
        try {
            const res = await followUser(user?._id)
            if (res?.data?.success) {
                notification.success({
                    message: 'Success',
                    description: res?.data?.message
                })
            } else {
                notification.error({
                    message: 'Error',
                    description: res?.data?.message
                })
            }
        } catch (error) {
            console.log(error)
            notification.error({
                message: 'Error',
                description: error?.response?.data?.message
            })
        }
    }


    return (
        <div className='flex'>
            <Link href={`/profile/${user?._id}`}>
                {!user?.profileImage ? (
                    <img src='/user.jpg' width={50} height={50} className='rounded-full' />
                ) : (<img src={`${server}/images/${user?.profileImage}`} width={50} height={50} className='rounded-full' />)}
            </Link>
            <div className='ml-3'>
                <p className='font-semibold'>{user?.fName} {user?.lName}</p>
                <p className='text-gray-500 text-sm'>{user?.userName}</p>
                <div onClick={handleFollow} className='cursor-pointer text-sm px-3 py-1 my-2 w-[50px] border-solid border-blue-500 text-blue-500 rounded-full font-semibold hover:bg-blue-500 hover:text-white transition-all flex items-center'>
                    Follow
                </div>
            </div>
        </div>
    )
}

export default Suggestion