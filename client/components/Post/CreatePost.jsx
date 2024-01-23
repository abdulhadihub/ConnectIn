import React from 'react'

const CreatePost = () => {
    const data = {
        user: {
            profileImage: 'https://media.licdn.com/dms/image/D4D03AQFh-x1O7wZkvQ/profile-displayphoto-shrink_400_400/0/1694578053479?e=1711584000&v=beta&t=pGT0uZKUdaN3iC4o6616a2zYpscIAfnogfih8oF_eVE',
            fName: 'John',
            lName: 'Doe'
        }
    }
  return (
    <div className='sm:mx-36 mx-10 py-6'>
        <div className='bg-white rounded-lg'>
        <div className='flex gap-2  px-2'>
                    <div className='w-[10%]'><img className='w-[100%] rounded-full' src={data?.user?.profileImage} /></div>
                    <div className='w-[90%]'>
                        <div className='text-sm text-black font-semibold'>{data?.user?.fName} {data?.user?.lName}</div>
                        <div className='text-xs text-gray-500'>2h • Edited</div>
                    </div>
                </div>
        </div>

    </div>
  )
}

export default CreatePost
