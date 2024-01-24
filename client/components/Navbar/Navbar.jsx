"use client"
import React, { useEffect, useState } from 'react'
import { IoMdHome } from "react-icons/io";
import UserDropdown from './UserDropdown';
import Link from 'next/link';
import { LuLinkedin } from "react-icons/lu";
import axios from 'axios';
import server from '@/utils/server';
import { useCookies } from 'react-cookie';
import { useUser } from '@/utils/Context/UserContext';
import { FaUserPlus } from "react-icons/fa6";
import { IoSearch } from "react-icons/io5";


function Navbar() {
    const [data, setData] = useState({})
    const [cookies] = useCookies(['x-auth-token'])
    const { user } = useUser()


    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`${server}/api/user/verify`, {
                    headers: {
                        'x-auth-token': cookies['x-auth-token']
                    }
                })
                setData(res?.data?.user)
            } catch (error) {
                console.log(error)
                
            }
        }
        fetchData()
    }
    , [])


    return (
        <nav className='h-[50px] fixed w-full bg-white z-[999]'>
            <div className='grid grid-cols-3 h-full'>
                <div className='flex justify-start items-center mx-5'>
                    <Link href='/feed'>
                        <h2 className='text-2xl font-bold flex items-center'>
                            <div className='text-gray-600'>Connect</div>
                            <div className='bg-blue-500 text-white rounded-md p-1 flex items-center'>
                                <LuLinkedin  />
                            </div>
                        </h2>
                    </Link>
                    <label className='mx-3 bg-gray-100 flex items-center py-1 px-2 rounded-sm'>
                        <IoSearch className='text-gray-600 text-2xl' />
                        <input placeholder='Search' className='px-2 text-[14px] bg-gray-100 outline-none border-none' type="text" />
                    </label>
                </div>

                <div className='flex justify-center items-center gap-10'>
                    <Link href='/feed'  className='mx-3'>
                        <IoMdHome className='text-3xl text-gray-600 hover:text-blue-500 transition-all cursor-pointer' />
                    </Link>
                    <Link href='/find-friend' className='mx-3'>
                        <FaUserPlus className='text-3xl text-gray-600 hover:text-blue-500 transition-all cursor-pointer' />
                    </Link>
                </div>
                <div className='flex justify-center items-center'>
                    {user ?  <UserDropdown data={data} /> : <Link href='/login'> <button className='bg-blue-500 text-white px-5 py-2 rounded-md font-bold'>Sign In</button></Link>}
                   
                </div>
            </div>
        </nav>
    )
}

export default Navbar