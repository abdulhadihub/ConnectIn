import React from 'react'
import Login from '@/components/Forms/Login'
import Image from 'next/image'

function Page() {
  return (
    <>
      <div className='bg-slate-100 h-[90vh] flex flex-col justify-center items-center'>

        <div>


          <div>
            <h1 className='text-center text-3xl '>Welcome to your <br /> community</h1>
            <div className='w-[250px] bg-white px-10 py-5 rounded-lg shadow-md my-5'>
              <Login />
            </div>
          </div>
          <Image src='/connections.jpg' width={500} height={500} />
        </div>
      </div>
    </>
  )
}

export default Page