import React, { useEffect } from 'react'
import UsersNavbar from '../../../components/UsersNavbar';
import AccountSidebar from '../../../components/AccountSidebar';
import { getData } from '../../../functions';
import { useNavigate } from "react-router-dom";

export default function Services() {

    const nav = useNavigate();

    useEffect(() => {
        const check = async () => {
            const response = await getData("/services");
            if (!response.state) {
                nav("/login");
            }
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
                            <h3>Services</h3>

                        </form>
                    </div>
                </div>
            </AccountSidebar>
        </div>
    )
}
