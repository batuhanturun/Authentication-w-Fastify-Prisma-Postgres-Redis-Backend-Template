import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { postData, patchData } from '../functions';
import { UserContext } from '../context.js';

export default function ResetPassword() {

    let [isSent, setIsSent] = useState(false);

    let [email, setEmail] = useState("");
    let [errorMessage, setErrorMessage] = useState(null);
    let [resetCode, setResetCode] = useState("");
    let [password, setPassword] = useState("");
    let [verfyPassword, setVerfyPassword] = useState("");
    const nav = useNavigate();

    async function submitResetPassword(e) {
        e.preventDefault();
        const response = await postData("/resetpassword", { email: email });
        if (response.state === true) {
            console.log("Mail Successfuly Sent! ", response);
        } else {
            setErrorMessage(response.message);
        }
    }

    async function submitChangePassword(e) {
        e.preventDefault();
        const response = await patchData("/changepassword", { resetCode: resetCode, password: password, verfyPassword: verfyPassword });
        if(response.state === true) {
            console.log("Password Successfuly Changed! ", response);
            nav('/login');
        } else {
            setErrorMessage(response.message);
        }
    }

    return (
        <>
        {!isSent ? (
            <form onSubmit={submitResetPassword}>
                <h3>Reset Password</h3>
                {errorMessage ? (<span style={{ color: "red" }}>{errorMessage}</span>) : (null)}
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
                <div className="d-grid">
                    <button type="submit" className="btn btn-primary" onClick={() => setIsSent(true)}>
                        Send Mail
                    </button>
                </div>
                <p className="forgot-password text-right">Go back <Link to="/login">Login</Link> page!</p>
            </form>
        ) : (
            <form onSubmit={submitChangePassword}>
            <h3>Change Password</h3>
            {errorMessage ? (<span style={{ color: "red" }}>{errorMessage}</span>) : (null)}
            <div className="mb-3">
                <label>Code:</label>
                <input
                    name='code'
                    type="number"
                    className="form-control"
                    placeholder="Enter Code"
                    required
                    onChange={(e) => setResetCode(e.target.value)}
                />
            </div>
            <div className="mb-3">
                <label>New Password:</label>
                <input
                    type="password"
                    name='password'
                    className="form-control"
                    placeholder="Enter Password"
                    required
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <div className="mb-3">
                <label>Re-Enter New Password:</label>
                <input
                    type="password"
                    name='password'
                    className="form-control"
                    placeholder="Re-Enter Password"
                    required
                    onChange={(e) => setVerfyPassword(e.target.value)} 
                />
            </div>
            <div className="d-grid">
                <button type="submit" className="btn btn-primary">Change Password</button>
            </div>
        </form>
        )}
            
        </>
    )
}
