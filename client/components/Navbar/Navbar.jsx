import React from 'react'
import { IoMdHome } from "react-icons/io";
import UserDropdown from './UserDropdown';
import Link from 'next/link';

function Navbar() {
    return (

        <nav className='h-[70px] fixed w-full bg-white z-[999]'>
            <div className='grid grid-cols-3 h-full'>
                <div className='flex justify-start items-center mx-5'>
                    <Link href='/feed'>
                        <h2 className='text-2xl font-bold'>
                            <span className='text-gray-600'>Connect</span>
                            <span className='bg-blue-500 text-white rounded-md p-1'>In</span>
                        </h2>
                    </Link>
                </div>

                <div className='flex justify-center items-center'>
                    <Link href='/feed' >
                        <IoMdHome className='text-3xl text-gray-600 hover:text-blue-500 transition-all cursor-pointer' />
                    </Link>
                </div>
                <div className='flex justify-center items-center'>
                    <UserDropdown />
                </div>
            </div>
        </nav>
    )
}

export default Navbar