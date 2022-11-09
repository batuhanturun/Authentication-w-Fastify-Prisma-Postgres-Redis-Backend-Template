import React from 'react'

export default function ResetPassword() {
        return (
            <form>
                <h3>Reset Password</h3>
                <div className="mb-3">
                    <label>Email:</label>
                    <input
                        type="email"
                        className="form-control"
                        placeholder="Enter Email"
                        required
                    />
                </div>
                <div className="d-grid">
                    <button type="submit" className="btn btn-primary">
                        Send Mail
                    </button>
                </div>
            </form>
        )
}
