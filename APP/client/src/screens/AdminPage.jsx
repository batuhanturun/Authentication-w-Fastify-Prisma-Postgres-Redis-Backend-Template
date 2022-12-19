import React, { useState } from 'react'
import { useNavigate, Link } from "react-router-dom";
import { getData } from '../functions';

export default function AdminPage() {

    let [isAuth, setIsAuth] = useState(false);
    let [errorMessage, setErrorMessage] = useState(null)
    const nav = useNavigate();

    async function submitAdminLogout(e) {
        e.preventDefault();
        const response = await getData("/adminlogout");
        if (response.state === true) {
            console.log("Admin Successfuly Logout! ", response);
            setIsAuth(false);
            nav('/adminlogin');
        } else {
            setErrorMessage(response.message);
        }
    }

    async function submitLogin(e) {
        e.preventDefault();
        nav('/adminlogin');
    }

    return (
        <div className="App">
            <nav className="navbar navbar-expand-lg navbar-light fixed-top">
                <div className="container">
                    <Link className="navbar-brand" to={'/admin'}>
                        Authentication Demo (Admin)
                    </Link>
                    (
                        <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                            <ul className="navbar-nav ml-auto">
                                <li className="nav-item">
                                    <Link className="nav-link" to={'/adminlogout'}>
                                        Exit
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    )
                </div>
            </nav>
            <div className="App">
                <div className="auth-wrapper">
                    <div className="auth-inner"> 
                        <form>
                            <h3>Admin Page</h3>
                            {errorMessage ? (<span style={{ color: "red" }}>{errorMessage}</span>) : (null)}
                            {isAuth ? (<button onClick={submitAdminLogout}>Logout</button>) : (<button onClick={submitLogin}>Login</button>)}
                        </form>
                    </div>
                </div>
            </div>
        </div>



    )
}
