import React from 'react'
import Register from '@/components/Forms/Register'
import Image from 'next/image'


function Page() {
    return (
        <>
            <div className='bg-slate-100 '>
                <div className='grid grid-cols-2'>
                    <div className='col-span-2 lg:col-span-1'>
                        <div className='flex flex-col justify-center items-center my-5'>
                            <h1 className='text-center text-2xl my-5'>Make the most of your life,<br /> make connections</h1>
                            <div className='w-[250px] bg-white px-10 py-5 rounded-lg shadow-md my-5'>
                                <Register />
                            </div>
                        </div>
                    </div>
                    <div className='col-span-2 lg:col-span-1'>
                        <div className='flex justify-center items-center'>
                            <Image src='/connections-registration.svg' width={500} height={500} className='w-[300px] h-[300px] lg:w-[500px] lg:h-[500px]' />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Page