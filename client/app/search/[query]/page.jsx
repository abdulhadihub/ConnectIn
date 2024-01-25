'use client'
import React from 'react'
import { useSearch } from '@/utils/Hooks/UseHooks'
import Seach from '@/components/Search/Search'
import isAuth from '@/components/isAuth/isAuth.jsx'

function Page({ params }) {
    const { query } = params
    const { users, loading, error } = useSearch(query)
    console.log(users)


    return (
        <div className='min-h-[100vh] bg-[#f4f2ee]'>

            <Seach users={users} loading={loading} error={error} />
        </div>
    )
}

export default isAuth(Page)