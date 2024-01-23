import React from 'react'
import { Dropdown } from 'antd';
import Image from 'next/image';
import Link from 'next/link';


const items = [
    {
        key: '1',
        label: (
            <div>
                <Link href='/profile'>
                    <div className='flex'>
                        <Image src='/user.jpg' width={50} height={50} className='rounded-full' />
                        <div className='ml-3'>
                            <p className='text-md font-bold text-black'>User Name</p>
                            <p className='text-[12px] text-gray-500'>@username</p>
                        </div>
                    </div>
                    <button className=' my-2 border border-solid text-blue-500 border-blue-500 hover:bg-blue-500 hover:text-white transition-all w-full px-5 py-1 rounded-full font-bold'>View Profile</button>
                </Link>

                <div className='mt-2'>

                    <h3 className='font-bold'>
                        Manage
                    </h3>
                    <p className='text-gray-500 text-sm my-1 hover:underline'>Posts</p>
                </div>

                <div>
                    <h3 className='text-gray-500 text-sm hover:underline'>
                        Sign Out
                    </h3>
                </div>
            </div>
        ),
    }
];
const App = () => (
    <>
        <Dropdown
            menu={{
                items,
            }}
            placement="bottom"
        >
            <button className='text-gray-500'>
                <Image src='/user.jpg' width={30} height={30} className='rounded-full' />
            </button>
        </Dropdown>

    </>
);
export default App;