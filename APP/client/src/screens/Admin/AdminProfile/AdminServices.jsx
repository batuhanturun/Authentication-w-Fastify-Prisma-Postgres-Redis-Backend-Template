import React, { useEffect } from 'react'
import AdminNavbar from '../../../components/AdminNavbar';
import AdminSidebar from '../../../components/AdminSidebar';
import { getData } from '../../../functions';
import { useNavigate } from "react-router-dom";

export default function AdminServices() {

    const nav = useNavigate();

    useEffect(() => {
        const check = async () => {
            const response = await getData("/admin");
            if (!response.state) {
                nav("/adminlogin");
            }
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
                            <h3>Services</h3>

                        </form>
                    </div>
                </div>
            </AdminSidebar>
        </div>
    )
}