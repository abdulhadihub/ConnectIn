import React from 'react'
import Link from 'next/link';
import server from '@/utils/server';

function Suggestion({ user }) {


    return (
        <div className='flex bg-white p-2 rounded-lg px-4'>
            <Link className='flex' href={`/profile/${user?.userName}`}>
                {!user?.profileImage ? (
                    <img src='/user.jpg' width={50} height={50} className='rounded-full' />
                ) : (<img src={`${server}/images/${user?.profileImage}`} width={50} height={50} className='rounded-full' />)}
                <div className='ml-3'>
                    <p className='font-semibold'>{user?.fName} {user?.lName}</p>
                    <p className='text-gray-500 text-sm'>{user?.userName}</p>
                    {/* <div onClick={handleFollow} className='cursor-pointer text-sm px-3 py-1 my-2 w-[50px] border-solid border-blue-500 text-blue-500 rounded-full font-semibold hover:bg-blue-500 hover:text-white transition-all flex items-center'>
                    Follow
                </div> */}
                </div>
            </Link>
        </div>
    )
}

export default Suggestion