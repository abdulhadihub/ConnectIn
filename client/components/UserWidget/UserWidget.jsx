import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import server from '@/utils/server'

function UserWidget({ user }) {
    return (
        <Link href={`/profile`}>
            <div className='flex justify-center md:justify-end'>
                <div className='w-full md:w-[110px] bg-white shadow-md rounded-md p-5 flex md:flex-col justify-center items-center'>
                    {!user?.profileImage ? (
                        <img src='/user.jpg' width={100} height={100} className='rounded-full' />
                    ) : (<img src={`${server}/images/${user?.profileImage}`} width={100} height={100} className='ounded-full' />)}
                    <div className='ml-3 flex flex-col justify-center md:items-center'>
                        <h2 className='text-xl'>{user?.fName} {user?.lName}</h2>
                        <p className='text-sm text-gray-500'>{user?.email}</p>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default UserWidget