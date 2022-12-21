import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from "react-router-dom";
import { getData, postData } from '../functions';

export default function AdminLogin() {

    let [email, setEmail] = useState("");
    let [password, setPassword] = useState("");
    let [errorMessage, setErrorMessage] = useState(null);
    let [onExit, setOnExit] = useState(false);
    const nav = useNavigate();

    useEffect(() => {
        const check = async () => {
            const response = await getData("/adminlogin");
            if (response.state) {
                setOnExit(true);
                nav("/adminlogging");
            } else {
                setOnExit(false);
            }
        };
        check();
    });

    async function submitAdminLogin(e) {
        e.preventDefault();
        const response = await postData("/adminlogin", { email, password });
        if (response.state) {
            setOnExit(true);
            console.log("Admin Successfuly Logged In! ", response);
            nav("/admin");
        } else {
            setOnExit(false);
            setErrorMessage(response.message);
        }
    }

    return (
        <div className="App">
            <nav className="navbar navbar-expand-lg navbar-light fixed-top">
                <div className="container">
                    <Link className="navbar-brand" to={'/adminlogin'}>
                        Authentication Demo (Admin)
                    </Link>
                    <div id="navbarTogglerDemo02">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <Link className="nav-link" to={'/adminlogout'}>
                                    Exit
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <div className="auth-wrapper">
                <div className="auth-inner">
                    <form onSubmit={submitAdminLogin}>
                        <h3>Admin Login</h3>
                        {errorMessage ? (<span style={{ color: "red" }}>{errorMessage}</span>) : (null)}
                        <div className='mb-3'>
                            <label>Email:</label>
                            <input type="email" name='email' className="form-control" placeholder="Enter Email" required onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <label>Password:</label>
                            <input type="password" name='password' className="form-control" placeholder="Enter Password" required onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <div className="d-grid">
                            <button type="submit" className="btn btn-primary">Login</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}