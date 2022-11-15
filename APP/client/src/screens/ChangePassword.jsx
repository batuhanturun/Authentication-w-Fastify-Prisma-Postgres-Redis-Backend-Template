import React from 'react'
import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import { postData } from '../functions';

function ChangePassword() {

    let [verfyCode, setVerfyCode] = useState("");
    let [password, setPassword] = useState("");
    let [verfyPassword, setVerfyPassword] = useState("");
    let [errorMessage, setErrorMessage] = useState(null);
    const nav = useNavigate();

    async function submitChangePassword(e) {
        e.preventDefault();
        //! Password check burada da olabilir.
        const response = await postData("/changepassword", { verfyCode: verfyCode, password: password, verfyPassword: verfyPassword });
        if(response.state === true) {
            console.log("Password Successfuly Changed! ", response);
            nav('/login');
        } else {
            setErrorMessage(response.message);
        }
    }

    return (
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
                    onChange={(e) => setVerfyCode(e.target.value)}
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
    )
}

export default ChangePassword