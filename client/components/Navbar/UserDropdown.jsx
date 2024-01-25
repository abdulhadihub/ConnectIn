import React from 'react'
import { Dropdown, notification } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import { useCookies } from 'react-cookie';
import { useRouter } from 'next/navigation';
import { useUser } from '@/utils/Context/UserContext';
import server from '@/utils/server';

const UserDropdown = () => {
    const { user, updateUser } = useUser()
    const router = useRouter()
    //eslint-disable-next-line
    const [cookies, setCookie, removeCookie] = useCookies(['x-auth-token'])
    const handleLogout = () => {
        removeCookie('x-auth-token')
        notification.success({
            message: 'Success',
            description: 'Logged out successfully'
        })
        updateUser(null)
        router.push('/login')
    }
    const items = [
        {
            key: '1',
            label: (
                <div>
                    <Link href='/profile'>
                        <div className='flex'>
                            {!user?.profileImage ? (
                                <img src='/user.jpg' width={50} height={50} className='rounded-full' />
                            ) : (<img src={`${server}/images/${user?.profileImage}`} width={50} height={50} className='rounded-full' />)}
                            <div className='ml-3'>
                                <p className='text-md font-semibold text-black'>{user?.fName} {user?.lName}</p>
                                <p className='text-[12px] text-gray-500'>{user?.userName}</p>
                            </div>
                        </div>
                        <button className=' my-2 border border-solid text-blue-500 border-blue-500 hover:bg-blue-500 hover:text-white transition-all w-full px-5 py-1 rounded-full font-bold'>View Profile</button>
                    </Link>

                    <div className='mt-2'>

                        <h3 className='font-bold'>
                            Manage
                        </h3>
                        <Link href={"/profile"} className='text-gray-500 text-sm my-1 hover:underline'>Posts</Link>
                    </div>

                    <div>
                        <h3 onClick={handleLogout} className='text-gray-500 text-sm hover:underline'>
                            Sign Out
                        </h3>
                    </div>
                </div>
            ),
        }
    ];
    return (
        <Dropdown
            menu={{
                items,
            }}
            placement="bottom"
        >
            <button className='text-gray-500'>
                {!user?.profileImage ? (
                    <img src='/user.jpg' width={30} height={30} className='rounded-full' />
                ) : (<img src={`${server}/images/${user?.profileImage}`} width={40} height={40} className='rounded-full' />)}</button>
        </Dropdown>
    )
}

export default UserDropdown
