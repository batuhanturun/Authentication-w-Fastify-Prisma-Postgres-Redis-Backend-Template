import React, { useEffect, useState } from 'react';
import UsersNavbar from '../../../components/UsersNavbar';
import AccountSidebar from '../../../components/AccountSidebar';
import { IoPersonCircleOutline } from "react-icons/io5";
import { getData } from '../../../functions';
import { useNavigate } from "react-router-dom";

export default function Profile() {

    let [name, setName] = useState();
    let [email, setEmail] = useState();
    let [accType, setAccType] = useState();

    const nav = useNavigate();

    useEffect(() => {
        const check = async () => {
            const response = await getData("/");
            if (!response.state) {
                nav("/login");
            }
            setName(response.name);
            setEmail(response.email);
            setAccType(response.accType);
        };
        check();
    });

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
                                    <label>Name: {name}</label>
                                </div>
                                <div className='mb-3'>
                                    <label>Email: {email}</label>
                                </div>
                                <div className='mb-3'>
                                    <label>Account Type: {accType ? "Admin" : "Trial"}</label>
                                </div>
                            </form>
                        </div>
                    </div>
                
            </AccountSidebar>
        </div>
    )
}
