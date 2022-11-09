import React from 'react'

export default function Register() {
        return (
            <form>
                <h3>Register</h3>
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
