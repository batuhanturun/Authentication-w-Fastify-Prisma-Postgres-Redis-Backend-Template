import React, { useState, useEffect } from 'react'
import UsersNavbar from '../../../components/UsersNavbar';
import AccountSidebar from '../../../components/AccountSidebar';
import { getData, postData } from '../../../functions';
import { useNavigate } from "react-router-dom";

export default function Profile() {

    let [oldEmail, setOldEmail] = useState("");
    let [newEmail, setNewEmail] = useState("");
    let [reNewEmail, setReNewEmail] = useState("");
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

    async function submitChangeEmail(e) {
        e.preventDefault();
        const response = await postData("/profile/changemail", { oldEmail: oldEmail, newEmail: newEmail, reNewEmail: reNewEmail });
        if(response.state) {
            setSuccessMessage("Email değiştirme talebiniz oluşturuldu. Lütfen Email adresinize gelen bağlantıya tıklayın, aksi takdirde Email adresiniz değişmeyecektir.");
            nav("/logout");
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
                        <form onSubmit={submitChangeEmail}>
                            <h3>Change Email</h3>
                            {errorMessage ? (<span style={{ color: "red" }}>{errorMessage}</span>) : (null)}
                            {successMessage ? (<span style={{ color: "green"}}>{successMessage}</span>) : (null)}
                            <div className='mb-3'>
                                <label>Old Email:</label>
                                <input type="email" name="email" className="form-control" placeholder="Enter Old Email Adress" required onChange={(e) => setOldEmail(e.target.value)} />
                            </div>
                            <div className='mb-3'>
                                <label>New Email:</label>
                                <input type="email" name='email' className="form-control" placeholder="Enter New Email Adress" required onChange={(e) => setNewEmail(e.target.value)} />
                            </div>
                            <div className='mb-3'>
                                <label>Re-Enter New Email:</label>
                                <input type="email" name='email' className="form-control" placeholder="Re-Enter New Email Adress" required onChange={(e) => setReNewEmail(e.target.value)} />
                            </div>
                            <div className='d-grid'>
                                <button type="submit" className="btn" style={{ backgroundColor: "#202020", color: "#FFFFFF" }}>Change Email</button>
                            </div>
                        </form>
                    </div>
                </div>
            </AccountSidebar>
        </div>
    )
}
