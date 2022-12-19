import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from "react-router-dom";
import { getData } from '../functions';

export default function Home() {

    let [isAuth, setIsAuth] = useState(false);
    let [errorMessage, setErrorMessage] = useState(null);
    let [onExit, setOnExit] = useState(true);
    const nav = useNavigate();

    async function submitLogout(e) {
        e.preventDefault();
        const response = await getData("/logout");
        if (response.state === true) {
            console.log("User Successfuly Logout! ", response);
            localStorage.removeItem("token");
            setIsAuth(false);
            nav('/login');
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
            try {
                const response = await getData("/");
                if (response.state) {
                    setIsAuth(true);
                } else {
                    setErrorMessage(response.errorMessage);
                }
            } catch (error) {
                console.log(error);
            }
        };
        home();
    })

    return (
        <div className="App">
            <nav className="navbar navbar-expand-lg navbar-light fixed-top">
                <div className="container">
                    <Link className="navbar-brand" to={'/'}>
                        Authentication Demo
                    </Link>
                    <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                        <ul className="navbar-nav ml-auto">
                            {onExit ? (<li className="nav-item">
                                <Link className="nav-link" onClick={setOnExit(false)} to={'/logout'}>
                                    Exit
                                </Link>
                            </li>) : null}
                        </ul>
                    </div>
                </div>
            </nav>
            <div className="App">
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
        </div>
    )
}
