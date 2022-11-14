import React from 'react'
import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import postData from '../functions';

export default function ResetPassword() {

    let [email, setEmail] = useState("");
    let [errorMessage, setErrorMessage] = useState(null);
    const nav = useNavigate();

    async function submitResetPassword(e) {
        e.preventDefault();
        const response = await postData("/resetpassword", { email: email });
        if(response.state === true) {
            console.log("Mail Successfuly Sent! ", response);
            nav('/login');
        } else {
            setErrorMessage(response.message)
        }
    }

        return (
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
                    <button type="submit" className="btn btn-primary">
                        Send Mail
                    </button>
                </div>
                <p className="forgot-password text-right">Go back <Link to="/login">Login</Link> page!</p>
            </form>
        )
}
