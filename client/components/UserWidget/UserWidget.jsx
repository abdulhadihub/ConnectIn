import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import server from '@/utils/server'

function UserWidget({ user }) {
    return (
        <div className='bg-white shadow-md rounded-md p-5 mx-5'>

            <Link href={`/profile`}>
                <div className='flex justify-center md:justify-center'>
                    <div className='w-full md:w-[110px]   p-4 flex md:flex-col justify-center items-center'>
                        {!user?.profileImage ? (
                            <img src='/user.jpg' width={100} height={100} className='rounded-full' />
                        ) : (<img src={`${server}/images/${user?.profileImage}`} width={100} height={100} className='rounded-full' />)}
                    <div className='ml-3 flex flex-col justify-center md:items-center'>
                            <h2 className='text-xl'>{user?.fName} {user?.lName}</h2>
                            <p className='text-sm text-gray-500'>{user?.email}</p>
                    </div>
                    </div>
                </div>
            <div className='flex justify-between'>
                <div className='text-blue-600 text-sm'>{user?.followers?.length} followers</div>
                <div className='text-blue-600 text-sm'>{user?.followers?.length} followings</div>
            </div>
            </Link>
        </div>
    )
}

export default UserWidget