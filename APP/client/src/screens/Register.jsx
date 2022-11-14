import React from 'react'
import { useState } from 'react'
import { useNavigate } from "react-router-dom";
import postData from '../functions';

export default function Register() {

    let [name, setName] = useState("");
    let [email, setEmail] = useState("");
    let [password, setPassword] = useState("");
    let [errorMessage, setErrorMessage] = useState(null);
    const nav = useNavigate();

    async function submitRegister(e) {
        e.preventDefault();
        const response = await postData("/register", { name: name, email: email, password: password });
        if (response.state === true) {
            console.log("User Successfuly Registered! ", response);
            nav('/login');
        }
        else {
            setErrorMessage(response.message)
        }
    }

    return (
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
            <div className="d-grid">
                <button type="submit" className="btn btn-primary">
                    Register
                </button>
            </div>
            <p className="forgot-password text-right">
                Already registered? <a href='/login' >Login</a>
            </p>
        </form>
    )
}