import React from 'react'
import Image from 'next/image'
import Suggestion from '@/components/SuggestionsWidget/Suggestion'

function SuggestionsWidget() {
    return (
        <div className='bg-white shadow-md rounded-md p-5'>
            <h2 className='font-semibold'>Add to your feed</h2>
            <div className='flex flex-col gap-3 mt-5'>
                <Suggestion />
                <Suggestion />
                <Suggestion />
                <Suggestion />
                <Suggestion />
            </div>
        </div>
    )
}

export default SuggestionsWidget