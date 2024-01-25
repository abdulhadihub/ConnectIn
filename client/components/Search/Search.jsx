import React from 'react'
import Suggestion from '@/components/SuggestionsWidget/Suggestion'

function Search({ users, loading, error }) {


    if (loading) return (
        <div className='bg-[#f4f2ee]'>
            <div className='sm:mx-40 mx-10 py-5'>
                <div className='flex flex-col items-center'>
                    <div className='text-2xl font-bold text-gray-600'>Loading...</div>
                </div>
            </div>
        </div>
    )
    if (error) return <div>Something  went wrong...</div>
    if (users.length === 0) return (
        <div className='bg-[#f4f2ee]'>
            <div className='sm:mx-40 mx-10 py-5'>
                <div className='flex flex-col items-center'>
                    <div className='text-2xl font-bold text-gray-600'>Sorry no results found</div>
                </div>
            </div>
        </div>
    )
    return (
        <div className='bg-[#f4f2ee]'>
            <div className='sm:mx-40 mx-10 py-5'>
                <div className='flex flex-col items-center'>
                    <div className='text-2xl font-bold text-gray-600'>Search Results</div>
                    <div className='mt-5'>
                        {users?.map((user) => (
                            <Suggestion key={user?._id} user={user} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Search