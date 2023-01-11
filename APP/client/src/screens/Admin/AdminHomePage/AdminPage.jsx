import React, { useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import { getData } from '../../../functions';
import AdminNavbar from '../../../components/AdminNavbar';

export default function AdminPage() {

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

            <div className="auth-wrapper">
                <div className="auth-inner">
                    <form>
                        <h3>Admin Page</h3>
                    </form>
                </div>
            </div>
        </div>
    )
}
