import React, { useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import { getData } from '../../../functions';
import UsersNavbar from '../../../components/UsersNavbar';

// <div className="collapse navbar-collapse" id="navbarTogglerDemo02">

export default function Home() {

    const nav = useNavigate();

    useEffect(() => {
        const home = async () => {
            const response = await getData("/");
            if (!response.state) {
                nav("/login");
            }
        };
        home();
    });

    return (
        <div className="App">
            <UsersNavbar />
            <div className="auth-wrapper">
                <div className="auth-inner">
                    <form>
                        <h3>Welcome</h3>

                    </form>
                </div>
            </div>
        </div>
    )
}
