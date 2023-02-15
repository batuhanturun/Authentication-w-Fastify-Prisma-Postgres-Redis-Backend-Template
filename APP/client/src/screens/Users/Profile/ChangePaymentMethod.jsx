import React, { useEffect, useState } from 'react'
import UsersNavbar from '../../../components/UsersNavbar';
import AccountSidebar from '../../../components/AccountSidebar';
import { getData, patchData } from '../../../functions';
import { useNavigate, Link, useParams } from "react-router-dom";

export default function ChangePaymentMethod() {

    let [cnumber, setCNumber] = useState();
    let [cexpired, setCExpired] = useState();
    let [cCVC, setCCVC] = useState();
    let [errorMessage, setErrorMessage] = useState(null);
    const param = useParams();
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

    async function submitChangeCard(e) {
        e.preventDefault();
        const response = await patchData(`/profile/paymentmethods/${param.id}`, {cnumber: cnumber, cexpired: cexpired, cCVC: cCVC});
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
                        <form onSubmit={submitChangeCard}>
                            <h3>Change Credit Card</h3>
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
                                    <input type="number" name='cardexpired' className='form-control' placeholder='Month/Year' required onChange={(e) => setCExpired(e.target.value)} />
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
