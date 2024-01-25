'use client'
import React from 'react'
import { useRouter } from 'next/navigation'

function Page() {
    const router = useRouter()
    return (
        router.push('/feed')
    )
}

export default Page