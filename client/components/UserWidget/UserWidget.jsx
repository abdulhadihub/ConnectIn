import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import server from '@/utils/server'

function UserWidget({ user }) {
    return (
        <Link href={`/profile`}>
            <div className='flex justify-end'>
                <div className='bg-white shadow-md rounded-md p-5 flex flex-col justify-center items-center'>
                    {!user?.profileImage ? (
                        <img src='/user.jpg' width={100} height={100} className='rounded-full' />
                    ) : (<img src={`${server}/images/${user?.profileImage}`} width={100} height={100} className='ounded-full' />)}
                    <h2 className='text-xl'>{user?.fName} {user?.lName}</h2>
                    <p className='text-sm text-gray-500'>{user?.email}</p>
                </div>
            </div>
        </Link>
    )
}

export default UserWidget