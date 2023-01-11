import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { postData, getData } from '../../../functions';

export default function ResendVerificationMail() {

    let [email, setEmail] = useState("");
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

    async function submitResendVerificationMail(e) {
        e.preventDefault();
        const response = await postData("/resendverificationmail", { email: email });
        if (response.state) {
            console.log("Mail başarılı bir şekilde gönderildi.");
            nav("/successful");
        } else {
            setErrorMessage(response.message);
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
                            <button type="submit" className="btn" style={{backgroundColor: "#202020", color: "#FFFFFF"}}>
                                Resend Verification Email
                            </button>
                        </div>
                        <p className="forgot-password text-right">Go back <Link to="/login">Login</Link> page!</p>
                    </form>
                </div>
            </div>
        </div>
    )
}
