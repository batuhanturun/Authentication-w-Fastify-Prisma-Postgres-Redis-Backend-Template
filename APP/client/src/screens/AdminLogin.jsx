import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { postData } from '../functions';

export default function AdminLogin() {

    let [email, setEmail] = useState("");
    let [password, setPassword] = useState("");
    let [errorMessage, setErrorMessage] = useState(null)
    const nav = useNavigate();

    async function submitAdminLogin(e) {
        e.preventDefault();
        const response = await postData("/adminlogin", { email, password });
        if(response.state) {
            console.log("Admin Successfuly Logged In! ", response);
            nav("/");
        } else {
            setErrorMessage(response.message);
        }
    }

    return (
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
    )
}