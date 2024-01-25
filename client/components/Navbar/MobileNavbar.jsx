import React, { useState, useEffect } from 'react'
import { Drawer } from 'antd';
import { FaBars } from 'react-icons/fa';
import { IoSearch } from "react-icons/io5";
import { LuLinkedin } from "react-icons/lu";
import { IoMdHome } from "react-icons/io";
import { useUser } from '@/utils/Context/UserContext';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import server from '@/utils/server';
import Link from 'next/link';
import { FaUserPlus } from "react-icons/fa6";
import UserDropdown from './UserDropdown';



function MobileNavbar() {
    const [isOpen, setOpen] = useState(false);
    const [data, setData] = useState({})
    const [cookies] = useCookies(['x-auth-token'])
    const { user } = useUser()



    const showDrawer = () => {
        setOpen(!isOpen);
    };

    const onClose = () => {
        setOpen(false);
    };
    return (
        <>
            <div className='relative'>
                <div className='grid grid-cols-12 m-3'>

                    <div className="col-span-4">

                        <div className='flex justify-center items-center gap-5'>
                            <FaBars className='hover:text-blue-500 transition-all cursor-pointer' size={20} onClick={showDrawer} />
                            <div className='flex justify-center items-center'>
                                <Link href='/feed'>
                                    <h2 className='text-md font-bold flex items-center'>
                                        <div className='text-gray-600'>Connect</div>
                                        <div className='bg-blue-500 text-white rounded-md p-1 flex items-center'>
                                            <LuLinkedin />
                                        </div>
                                    </h2>
                                </Link>
                            </div>
                        </div>
                    </div>


                    <div className="col-span-6">

                        <div className='flex justify-end items-center'>
                            <label className='mx-3 bg-gray-100 flex jitems-center py-2 px-3 rounded-full'>
                                <IoSearch className='text-gray-600 text-md' />
                                <input placeholder='Search' className='px-2 text-[14px] bg-gray-100 border-none outline-none hover:border hover:border-black  w-[100px]' type="text" />
                            </label>
                        </div>
                    </div>

                    <div className="col-span-2">

                        <div className='flex justify-center items-center'>
                            {user ? <UserDropdown data={data} /> : <Link href='/login'> <button className='bg-blue-500 text-white px-2 py-1 rounded-md font-bold'>Sign In</button></Link>}

                        </div>
                    </div>

                </div>
            </div>
            <Drawer width={150} placement="left" onClose={onClose} open={isOpen} closeIcon={false}>
                <ul className='flex flex-col gap-5  justify-center items-center'>
                    <li>

                        <Link href='/feed'>
                            <h2 className='text-2xl font-bold flex items-center'>
                                <div className='text-gray-600'>Connect</div>
                                <div className='bg-blue-500 text-white rounded-md p-1 flex items-center'>
                                    <LuLinkedin />
                                </div>
                            </h2>
                        </Link>
                    </li>
                    <li>
                        <Link href='/feed' className=''>
                            <IoMdHome className='text-3xl text-gray-600 hover:text-blue-500 transition-all cursor-pointer' />
                        </Link>
                    </li>
                    <li>
                        <Link href='/find-friend' className=''>
                            <FaUserPlus className='text-3xl text-gray-600 hover:text-blue-500 transition-all cursor-pointer' />
                        </Link>
                    </li>
                </ul>
            </Drawer>
        </>
    )
}

export default MobileNavbar