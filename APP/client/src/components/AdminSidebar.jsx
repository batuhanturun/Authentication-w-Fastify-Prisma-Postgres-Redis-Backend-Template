import React from 'react'
import {
    BsPersonFill,
    BsFillKeyFill,
    BsDoorOpenFill,
    BsServer,
} from "react-icons/bs"
import { NavLink } from 'react-router-dom'

const AdminSidebar = ({children}) => {

    const menuItem = [
        {
            path: "/admin/profile/main",
            name: "Profile",
            icon: <BsPersonFill />
        },
        {
            path: "/admin/profile/services",
            name: "Services",
            icon: <BsServer />
        },
        {
            path: "/admin/profile/changepassword",
            name: "Change Password",
            icon: <BsFillKeyFill />
        },
        {
            path: "/adminlogout",
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

export default AdminSidebar;