'use client'
import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'

function Page() {
    const router = useRouter()
    useEffect(() => {
        router.push('/feed');
    }, [router]);

    return (
        <div className='bg-[#f4f2ee] min-h-[100vh]'>
            <div className='sm:mx-40 mx-10 py-5'>
                <div className='flex flex-col items-center'>
                    <div className='text-2xl font-bold text-gray-600'>Redirecting to feed</div>
                </div>
            </div>
        </div>
    )
}

export default Page