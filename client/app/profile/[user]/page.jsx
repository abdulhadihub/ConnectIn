'use client'
import Profile from '@/components/Profile/Profile'
import ProfileCustom from '@/components/Profile/ProfileCustom'
import React from 'react'
import { useUserById, useUserByUsername } from '@/utils/Hooks/UseHooks'
import { useUser } from '@/utils/Context/UserContext'
import { redirect } from 'next/navigation';
import isAuth from '@/components/isAuth/isAuth'

const Page = ({ params }) => {
    // const { user, loading, error } = useUserById(params?.user)
    const { user, loading, error } = useUserByUsername(params?.user)
    const { user: currentUser } = useUser()

    if (loading) return <div>Loading...</div>
    if (error) return <div>{error}</div>
    if (!user) return <div>User not found</div>
    if (currentUser?._id === params?.user) redirect('/profile')

    return (
        <div className='bg-[#F4F2EE]'>
            <ProfileCustom user={user?.user} isFollowing={user?.isFollowing} isBlocked={user?.isBlocked} isBlockedBy={user?.isBlockedBy} />
        </div>
    )
}

export default isAuth(Page)
