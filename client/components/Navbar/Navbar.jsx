import React from 'react'
import { IoMdHome } from "react-icons/io";
import UserDropdown from './UserDropdown';

function Navbar() {
    return (
        <nav>
            <div className='grid grid-cols-3'>
                <h2>ConnectIn</h2>
                <IoMdHome />
                <div>

                    <UserDropdown />
                </div>
            </div>
        </nav>
    )
}

export default Navbar