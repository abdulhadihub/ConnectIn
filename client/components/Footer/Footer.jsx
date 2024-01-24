import Link from 'next/link'
import React from 'react'

function Footer() {
    return (
        <footer className='bg-white py-5'>
            <div className="container mx-auto text-center flex justify-between">
                <div>&copy; 2024 ConnectIn. All rights reserved.</div>
                <div>Designed and developed by <Link target='_blank' href="https://www.github.com/alirazahub">TechTitans</Link></div>
            </div>
        </footer>
    )
}

export default Footer