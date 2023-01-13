import React, { useState, useEffect } from 'react'
import UsersNavbar from '../../../components/UsersNavbar';
import AccountSidebar from '../../../components/AccountSidebar';
import { getData, postData } from '../../../functions';
import { useNavigate } from "react-router-dom";

export default function Profile() {

    let [oldPassword, setOldPassword] = useState("");
    let [newPassword, setNewPassword] = useState("");
    let [reNewPassword, setReNewPassword] = useState("");
    let [successMessage, setSuccessMessage] = useState(null);
    let [errorMessage, setErrorMessage] = useState(null);

    const nav = useNavigate();

    useEffect(() => {
        const check = async () => {
            const response = await getData("/");
            if (!response.state) {
                nav("/login");
            }
        };
        check();
    });

    async function submitChangePassword(e) {
        e.preventDefault();
        const response = await postData("/profile/changepassword", { oldPassword: oldPassword, newPassword: newPassword, reNewPassword: reNewPassword });
        if (response.state) {
            setSuccessMessage("Şifre başarılı bir şekilde değiştirildi.");         
        } else {
            setErrorMessage(response.message);
        }
    }

    return (
        <div className="App">
            <UsersNavbar />
            <AccountSidebar>
                <div className='auth-wrapper'>
                    <div className='auth-inner'>
                        <form onSubmit={submitChangePassword}>
                            <h3>Change Password</h3>
                            {successMessage ? (<span style={{ color: "green"}}>{successMessage}</span>) : (null)}
                            {errorMessage ? (<span style={{ color: "red" }}>{errorMessage}</span>) : (null)}
                            <div className='mb-3'>
                                <label>Old Password:</label>
                                <input type="password" name="password" className="form-control" placeholder="Enter Old Password" required onChange={(e) => setOldPassword(e.target.value)} />
                            </div>
                            <div className='mb-3'>
                                <label>New Password:</label>
                                <input type="password" name='password' className="form-control" placeholder="Enter New Password" required onChange={(e) => setNewPassword(e.target.value)} />
                            </div>
                            <div className='mb-3'>
                                <label>Re-Enter New Password:</label>
                                <input type="password" name='password' className="form-control" placeholder="Re-Enter New Password" required onChange={(e) => setReNewPassword(e.target.value)} />
                            </div>
                            <div className='d-grid'>
                                <button type="submit" className="btn" style={{ backgroundColor: "#202020", color: "#FFFFFF" }}>Change Password</button>
                            </div>
                        </form>
                    </div>
                </div>
            </AccountSidebar>
        </div>
    )
}
