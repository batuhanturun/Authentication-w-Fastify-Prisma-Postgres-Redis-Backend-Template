import React from 'react'
import {
    BsPersonFill,
    BsEnvelopeFill,
    BsFillKeyFill,
    BsDoorOpenFill,
} from "react-icons/bs"
import { NavLink } from 'react-router-dom'

const AccountSidebar = ({children}) => {

    const menuItem = [
        {
            path: "/profile",
            name: "Profile",
            icon: <BsPersonFill />
        },
        {
            path: "/changemail",
            name: "Change Email",
            icon: <BsEnvelopeFill />
        },
        {
            path: "/changepassword",
            name: "Change Password",
            icon: <BsFillKeyFill />
        },
        {
            path: "/logout",
            name: "Logout",
            icon: <BsDoorOpenFill />
        }
    ]


    return (
        <div className='container'>
            <div className='sidebar'>
                {
                    menuItem.map((item, index) => 
                        (
                            <NavLink to={item.path} key={index} className="link">
                                <div className='icon'>{item.icon}</div>
                                <div className='link-text'>{item.name}</div>
                            </NavLink>
                        )
                    )
                }
            </div>
            <main>
                {children}
            </main>
        </div>
    );
}

export default AccountSidebar;