'use client'
import React from 'react'
import Image from 'next/image'
import Suggestion from '@/components/SuggestionsWidget/Suggestion'
import { useSuggestions } from '@/utils/Hooks/UseHooks'

function SuggestionsWidget() {
    const { suggestions, loading, error } = useSuggestions()

    if (loading) return <p>Loading...</p>
    if (error) return <p>{error}</p>
    return (
        <div className='bg-white shadow-md rounded-md p-5 mx-5'>
            <h2 className='font-semibold'>Add to your feed</h2>
            <div className='flex flex-col gap-3 mt-5'>
                {suggestions.map((user, index) => (
                    <Suggestion key={index} user={user} />
                ))}
            </div>
        </div>
    )
}

export default SuggestionsWidget