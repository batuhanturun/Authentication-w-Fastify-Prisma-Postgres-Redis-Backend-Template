import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { postData } from '../functions';

export default function ResendVerificationMail() {

    let [email, setEmail] = useState("");
    let [errorMessage, setErrorMessage] = useState(null);
    const nav = useNavigate();

    async function submitResendVerificationMail(e) {
        e.preventDefault();
        const response = await postData("/resendverificationmail", { email: email });
        if(response.state === true) {
            setErrorMessage(null);
            console.log("Mail başarılı bir şekilde gönderildi.");
            nav("/login");
        } else {
            setErrorMessage(response.message);
        }
    }

    return (
        <form onSubmit={submitResendVerificationMail}>
            <h3>Resend Verification Email</h3>
            {errorMessage ? (<span style={{ color: "red" }}>{errorMessage}</span>) : (null)}
            <div className='mb-3'>
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
                        Resend Verification Email
                    </button>
                </div>
            <p className="forgot-password text-right">Go back <Link to="/login">Login</Link> page!</p>
        </form>
    )
}
