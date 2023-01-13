import React, { useEffect } from 'react';
import AdminNavbar from '../../../components/AdminNavbar';
import { getData } from '../../../functions';
import { useNavigate } from 'react-router-dom';

export default function AdminPatchNotes() {

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
        <div className='App'>
            <AdminNavbar />
        </div>
    )
}
