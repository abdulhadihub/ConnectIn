'use client'
import Profile from '@/components/Profile/Profile'
import React from 'react'
import isAuth from '@/components/isAuth/isAuth'

const page = () => {
  return (
    <div className='bg-[#F4F2EE]'>
      <Profile />
    </div>
  )
}

export default isAuth(page)
