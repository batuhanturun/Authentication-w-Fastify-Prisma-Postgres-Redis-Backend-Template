import React, { useEffect, useState } from 'react';
import AdminNavbar from '../../../components/AdminNavbar';
import AdminSidebar from '../../../components/AdminSidebar';
import { IoPersonCircleOutline } from "react-icons/io5";
import { getData } from '../../../functions';
import { useNavigate } from "react-router-dom";

export default function AdminProfile() {

    let [name, setName] = useState();
    let [email, setEmail] = useState();
    let [accType, setAccType] = useState();

    const nav = useNavigate();

    useEffect(() => {
        const check = async () => {
            const response = await getData("/admin");
            if (!response.state) {
                nav("/adminlogin");
            }
            setName(response.name);
            setEmail(response.email);
            setAccType(response.accType);
        };
        check();
    });

    return (
        <div className="App">
            <AdminNavbar />
            <AdminSidebar>
                
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
                
            </AdminSidebar>
        </div>
    )
}
