import React, { useState, useEffect, Fragment } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { getData, patchData } from '../functions';

export default function ResetPasswordMail() {

    let [errorMessage, setErrorMessage] = useState(null);
    const nav = useNavigate();

    let [password, setPassword] = useState("");
    let [verifyPassword, setVerifyPassword] = useState("");

    let [validUrl, setValidUrl] = useState(false);
    const param = useParams();

    async function submitChangePassword(e) {
        e.preventDefault();
        const response = await patchData(`/reset/${param.id}/${param.resetCode}`, { password: password, verifyPassword: verifyPassword });
        if (response.state) {
            console.log("Password Successfuly Changed! ", response);
            nav('/successful');
        } else {
            setErrorMessage(response.message);
        }
    }

    useEffect(() => {
        const resetEmailUrl = async () => {
            try {
                const response = await getData(`/reset/${param.id}/${param.resetCode}`);
                if (response.state) {
                    setValidUrl(true);
                } else {
                    setValidUrl(false);
                }
            } catch (error) {
                setErrorMessage(error);
            }
        };
        resetEmailUrl();
    }, [param]);

    return (
        <div className="App">
            <nav className="navbar navbar-expand-lg navbar-light fixed-top">
                <div className="container">
                    <Link className="navbar-brand" to={'/'}>
                        Authentication Demo
                    </Link>
                </div>
            </nav>
            <div className="auth-wrapper">
                <div className="auth-inner">
                    <Fragment>
                        {validUrl ? (
                            <form>
                                <h3>Reset Password</h3>
                                {errorMessage ? (<span style={{ color: "red" }}>{errorMessage}</span>) : (null)}
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
                                        onChange={(e) => setVerifyPassword(e.target.value)}
                                    />
                                </div>
                                <div className="d-grid">
                                    <button type="submit" className="btn btn-primary" onClick={submitChangePassword}>
                                        Change Password
                                    </button>
                                </ div>
                            </form>
                        ) : (
                            <h1>404 Not Found</h1>
                        )}
                    </Fragment>
                </div>
            </div>
        </div>
    )
}
