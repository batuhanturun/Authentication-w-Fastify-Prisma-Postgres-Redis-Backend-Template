import React from 'react'
import { useState } from 'react'
import postData from '../functions';

export default function Register() {

    let [name, setName] = useState("");
    let [email, setEmail] = useState("");
    let [password, setPassword] = useState("");
    let [errorMessage, setErrorMessage] = useState(null);

    async function submitRegister(e) {
        e.preventDefault();
        const response = await postData("/register", { name: name, email: email, password: password });

        console.log("response", response)
        if (response.state === true) {
            console.log("User Successfuly Registered! ", response);
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
                    type="text"
                    className="form-control"
                    placeholder="Enter Name"
                    required
                />
            </div>
            <div className="mb-3">
                <label>Email:</label>
                <input
                    type="email"
                    className="form-control"
                    placeholder="Enter Email"
                    required
                />
            </div>
            <div className="mb-3">
                <label>Password:</label>
                <input
                    type="password"
                    className="form-control"
                    placeholder="Enter Password"
                    required
                />
            </div>
            <div className="d-grid">
                <button type="submit" className="btn btn-primary">
                    Register
                </button>
            </div>
            <p className="forgot-password text-right">
                Already registered? <a href="/login">Login</a>
            </p>
        </form>
    )
}
