import React from 'react'
import { Dropdown } from 'antd';
import Image from 'next/image';
const items = [
    {
        key: '1',
        label: (
            <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
                Block
            </a>
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
                <Image src='/user.jpg' width={50} height={50} className='rounded-full' />
            </button>
        </Dropdown>

    </>
);
export default App;