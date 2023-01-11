import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from "react-router-dom";
import { getData, postData } from '../../../functions';

export default function Register() {

    let [name, setName] = useState("");
    let [email, setEmail] = useState("");
    let [password, setPassword] = useState("");
    let [rePassword, setRePassword] = useState("");
    let [errorMessage, setErrorMessage] = useState(null);
    let [onExit, setOnExit] = useState(false);
    const nav = useNavigate();

    useEffect(() => {
        const check = async () => {
            const response = await getData("/login");
            if (response.state) {
                setOnExit(true);
                nav("/");
            } else {
                setOnExit(false);
            }
        };
        check();
    });

    async function submitRegister(e) {
        e.preventDefault();
        if (rePassword !== password) {
            setErrorMessage("Şifreler uyuşmamaktadır.");
        } else {
            const response = await postData("/register", { name: name, email: email, password: password });
            if (response.state === true) {
                console.log("User Successfuly Registered! ", response);
                nav('/login');
            }
            else {
                setErrorMessage(response.message);
            }
        }
    }

    return (
        <div className="App">
            <nav className="navbar navbar-expand-lg navbar-light fixed-top">
                <div className="container">
                    <Link className="navbar-brand" to={'/login'}>
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
            <div className="auth-wrapper">
                <div className="auth-inner">
                    <form onSubmit={submitRegister}>
                        <h3>Register</h3>
                        {errorMessage ? (<span style={{ color: "red" }}>{errorMessage}</span>) : (null)}
                        <div className="mb-3">
                            <label>Name:</label>
                            <input
                                name='name'
                                type="text"
                                className="form-control"
                                placeholder="Enter Name"
                                required
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label>Email:</label>
                            <input
                                name='email'
                                type="email"
                                className="form-control"
                                placeholder="Enter Email"
                                required
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label>Password:</label>
                            <input
                                name='password'
                                type="password"
                                className="form-control"
                                placeholder="Enter Password"
                                required
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label>Re-Password:</label>
                            <input
                                name='password'
                                type="password"
                                className="form-control"
                                placeholder="Enter Re-Password"
                                required
                                onChange={(e) => setRePassword(e.target.value)}
                            />
                        </div>
                        <div className="d-grid">
                            <button type="submit" className="btn" style={{backgroundColor: "#202020", color: "#FFFFFF"}}>
                                Register
                            </button>
                        </div>
                        <p className="forgot-password text-right">
                            Already registered? <Link to='/login' >Login!</Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    )
}