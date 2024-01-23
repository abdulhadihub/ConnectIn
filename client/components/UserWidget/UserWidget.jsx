import React from 'react'
import Image from 'next/image'

function UserWidget() {
    return (
        <div className='bg-white shadow-md rounded-md flex flex-col justify-center items-center'>
            <Image src='/user.jpg' width={100} height={100} className='rounded-full' />
            <h2 className='text-xl'>User Name</h2>
            <p className='text-sm text-gray-500'>@username</p>
        </div>
    )
}

export default UserWidget