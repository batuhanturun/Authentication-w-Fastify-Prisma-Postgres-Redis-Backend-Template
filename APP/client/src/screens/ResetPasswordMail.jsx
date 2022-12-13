import React, { useState, useEffect, Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { getData, patchData } from '../functions';

export default function ResetPasswordMail() {

    let [errorMessage, setErrorMessage] = useState(null);
    const nav = useNavigate();

    let [password, setPassword] = useState("");
    let [verifyPassword, setVerifyPassword] = useState("");

    let [validUrl, setValidUrl] = useState(false);
    const param = useParams();

    async function submitChangePassword(e, param) {
        e.preventDefault();
        const response = await patchData(`/verify/${param.id}/${param.resetCode}`, { password: password, verifyPassword: verifyPassword });
        if (response.state === true) {
            console.log("Password Successfuly Changed! ", response);
            nav('/login');
        } else {
            setErrorMessage(response.message);
        }
    }

    useEffect(() => {
        const resetEmailUrl = async () => {
            try {
                const response = await getData(`/verify/${param.id}/${param.resetCode}`);
                console.log(response);
                setValidUrl(true);
            } catch (error) {
                console.log(error);
                setValidUrl(false);
            }
        };
        resetEmailUrl();
    }, [param]);

  return (
    <Fragment>
            {validUrl ? (
            <form onSubmit={submitChangePassword}>
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
                    <button type="submit" className="btn btn-primary">
                        Change Password
                    </button>
                </ div>
            </form>
            ) : (
            <h1>404 Not Found</h1>
            )}
        </Fragment>
  )
}
