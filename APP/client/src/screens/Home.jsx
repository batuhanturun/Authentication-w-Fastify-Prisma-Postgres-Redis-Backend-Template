import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from "react-router-dom";
import { getData } from '../functions';

export default function Home() {

    let [isAuth, setIsAuth] = useState(false);
    let [errorMessage, setErrorMessage] = useState(null);
    let [onExit, setOnExit] = useState();
    const nav = useNavigate();

    async function submitLogout(e) {
        e.preventDefault();
        const response = await getData("/logout");
        if (response.logout) {
            console.log("User Successfuly Logout! ", response);
            localStorage.removeItem("token");
            setIsAuth(false);
            setOnExit(false);
            nav('/logout');
        } else {
            setErrorMessage(response.message);
        }
    }

    async function submitLogin(e) {
        e.preventDefault();
        nav('/login');
    }

    useEffect(() => {
        const home = async () => {
            const response = await getData("/");
            if (!response.state) {
                setOnExit(false);
                nav("/login");
            } else {
                setOnExit(true);
                setIsAuth(true);
            }
        };
        home();
    });

    return (
        <div className="App">
            <nav className="navbar navbar-expand-lg navbar-light fixed-top">
                <div className="container">
                    <Link className="navbar-brand" to={'/'}>
                        Authentication Demo
                    </Link>
                    <div id="navbarTogglerDemo02">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <Link className="nav-link" to={'/logout'}>
                                    Exit
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            <div className="auth-wrapper">
                <div className="auth-inner">
                    <form>
                        <h3>Welcome</h3>
                        {errorMessage ? (<span style={{ color: "red" }}>{errorMessage}</span>) : (null)}
                        {isAuth ? (<button onClick={submitLogout}>Logout</button>) : (<button onClick={submitLogin}>Login</button>)}
                    </form>
                </div>
            </div>
        </div>
    )
}
