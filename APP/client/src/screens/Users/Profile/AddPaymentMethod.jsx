import React, { useEffect, useState } from 'react'
import UsersNavbar from '../../../components/UsersNavbar';
import AccountSidebar from '../../../components/AccountSidebar';
import { getData, postData } from '../../../functions';
import { useNavigate, Link } from "react-router-dom";

export default function AddPaymentMethod() {

    let [cnumber, setCNumber] = useState();
    let [cexpiredMonth, setCExpiredMonth] = useState();
    let [cexpiredYear, setCExpiredYear] = useState();
    let [cCVC, setCCVC] = useState();
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

    async function submitSaveCard(e) {
        e.preventDefault();
        const response = await postData("/profile/addpaymentmethod", {cnumber: cnumber, cexpiredMonth: cexpiredMonth, cexpiredYear: cexpiredYear, cCVC: cCVC});
        if(response.state) {
            nav("/profile/paymentmethods");
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
                        <form onSubmit={submitSaveCard}>
                            <h3>Add New Credit Card</h3>
                            {errorMessage ? (<span style={{ color: "red" }}>{errorMessage}</span>) : (null)}
                            <div className='mb-3'>
                                <label>Credit Card Number:</label>
                                <div>
                                    <input type="number" name='cardnumber' className='form-control' placeholder='Credit Card Number' required onChange={(e) => setCNumber(e.target.value)} />
                                </div>
                            </div>
                            <div className='mb-3'>
                                <label>Credit Card Expired Time:</label>
                                <div>
                                    <input type="number" name='cardexpiredMonth' className='form-control' placeholder='Month' required onChange={(e) => setCExpiredMonth(e.target.value)} />
                                    <input type="number" name='cardexpiredYear' className='form-control' placeholder='Year(Last 2 Digits)' required onChange={(e) => setCExpiredYear(e.target.value)} />
                                </div>
                            </div>
                            <div className='mb-3'>
                                <label>Credit Cart Verification Code:</label>
                                <div>
                                    <input type="number" name='cartnumber' className='form-control' placeholder='CVC' required onChange={(e) => setCCVC(e.target.value)} />
                                </div>
                            </div>
                            <div className="d-grid">
                                <button type="submit" className="btn" style={{ backgroundColor: "#202020", color: "#FFFFFF" }}>Save Card</button>
                            </div>
                            <p className="forgot-password text-right"><Link to="/profile/paymentmethods">Back</Link></p>
                        </form>
                    </div>
                </div>
            </AccountSidebar>
        </div>
    )
}
