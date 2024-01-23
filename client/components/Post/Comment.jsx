import React from 'react'
import Image from 'next/image'

function Comment() {
    return (
        <div className='flex mt-5'>
            <Image src='/user.jpg' width={30} height={30} className='rounded-full mr-3' />
            <div className='bg-[#f2f2f2] p-3 rounded-sm'>
                <h2 className='font-semibold'>User Name</h2>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem architecto obcaecati molestiae vel maiores. Accusantium, sit perspiciatis! Totam, temporibus quisquam.</p>
            </div>
        </div>
    )
}

export default Comment