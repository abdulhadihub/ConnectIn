import React from 'react'
import Register from '@/components/Forms/Register'


function page() {
    return (
        <>
            <div className='bg-slate-100 flex flex-col justify-center items-center'>

                <h1 className='text-center text-2xl'>Make the most of your life,<br /> make connections</h1>
                <div className='md:w-[400px] flex justify-center items-center bg-white px-3 py-5 rounded-lg shadow-md my-5'>

                    <Register />
                </div>
            </div>
        </>
    )
}

export default page