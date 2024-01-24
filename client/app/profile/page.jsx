'use client'
import Profile from '@/components/Profile/Profile'
import React from 'react'
import isAuth from '@/components/isAuth/isAuth'
import { useUser } from '@/utils/Context/UserContext'

const page = () => {
  const { user } = useUser()
  return (
    <div className='bg-[#F4F2EE]'>
      <Profile user={user} />
    </div>
  )
}

export default isAuth(page)
