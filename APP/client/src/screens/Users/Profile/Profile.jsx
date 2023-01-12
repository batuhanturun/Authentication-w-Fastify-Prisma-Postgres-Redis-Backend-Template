import React from 'react'
import UsersNavbar from '../../../components/UsersNavbar';
import AccountSidebar from '../../../components/AccountSidebar';
import { IoPersonCircleOutline } from "react-icons/io5"

export default function Profile() {
    return (
        <div className="App">
            <UsersNavbar />
            <AccountSidebar>
                <div className='auth-wrapper'>
                    <div className='auth-inner'>
                        <form>
                            <h3>My Profile</h3>
                            <IoPersonCircleOutline size={340} style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }} />

                            <div className='mb-3'>
                                <label>Name: </label>

                            </div>
                            <div className='mb-3'>
                                <label>Email: </label>

                            </div>
                            <div className='mb-3'>
                                <label>Account Type: </label>

                            </div>
                        </form>
                    </div>
                </div>
            </AccountSidebar>
        </div>
    )
}
