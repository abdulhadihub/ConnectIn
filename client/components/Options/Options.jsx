import React from 'react'
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { Button, Dropdown } from 'antd';
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
            arrow
        >
            <button className='text-gray-500'>
                <HiOutlineDotsHorizontal className='text-xl' />
            </button>
        </Dropdown>

    </>
);
export default App;