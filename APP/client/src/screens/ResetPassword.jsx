import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { postData, patchData } from '../functions';

export default function ResetPassword() {

    let [email, setEmail] = useState("");
    let [errorMessage, setErrorMessage] = useState(null);
    const nav = useNavigate();

    let [resetCode, setResetCode] = useState("");
    let [password, setPassword] = useState("");
    let [verfyPassword, setVerfyPassword] = useState("");

    let [isSend, setIsSend] = useState(false);

    async function submitResetPassword(e) {
        e.preventDefault();
        const response = await postData("/resetpassword", { email: email });
        if (response.state === true) {
            setIsSend(true);
            console.log("Mail Successfuly Sent! ", response);
        } else {
            setErrorMessage(response.message);
        }
    }

    async function submitChangePassword(e) {
        e.preventDefault();
        const response = await patchData("/changepassword", { email: email, resetCode: resetCode, password: password, verfyPassword: verfyPassword });
        if (response.state === true) {
            setIsSend(false);
            console.log("Password Successfuly Changed! ", response);
            nav('/login');
        } else {
            setErrorMessage(response.message);
        }
    }

    return (
        <form >
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
            <button type='submit' className='btn btn-primary' onClick={submitResetPassword} >Send Code</button>
            {isSend ? (<>
                <hr />
                <div className="mb-3">
                    <label>Code:</label>
                    <input
                        name='code'
                        type="number"
                        className="form-control reset-code"
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
                    <button type="submit" className="btn btn-primary" onClick={submitChangePassword}>
                        Change Password
                    </button>
                </div>
                <p className="forgot-password text-right">Go back <Link to="/login">Login</Link> page!</p>
            </>) : null}
        </form>
    )
}
