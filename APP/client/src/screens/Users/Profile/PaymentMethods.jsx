import React, { useEffect, useState } from 'react'
import UsersNavbar from '../../../components/UsersNavbar';
import AccountSidebar from '../../../components/AccountSidebar';
import { getData } from '../../../functions';
import { useNavigate } from "react-router-dom";

export default function PaymentMethods() {

    let [cnumber, setCNumber] = useState([]);
    let [errorMessage, setErrorMessage] = useState(null);
    const nav = useNavigate();

    useEffect(() => {
        const check = async () => {
            const response = await getData("/");
            if (!response.state) {
                nav("/login");
            }
            const data = await getData("/profile/paymentmethods");
            if (data.state) {
                setCNumber(data.cardLastDigits);
            } else {
                setErrorMessage(response.message);
            }
        };
        check();
    });

    async function submitNewCard(e) {
        nav("/profile/addpaymentmethod");
    }

    async function submitChangeCard(e) {

    }

    return (
        <div className="App">
            <UsersNavbar />
            <AccountSidebar>
                <div className='auth-wrapper'>
                    <div className='auth-inner'>
                        <form>
                            <h3>Payment Methods</h3>
                            {errorMessage ? (<span style={{ color: "red" }}>{errorMessage}</span>) : (null)}
                            {cnumber === undefined ? (<div>Payment Methods Not Saved</div>) : (<div className='mb-3'>{cnumber.map(cnumber => (<div>****-****-****-*{cnumber.cardLastDigits}<button>Edit</button>
                                <button>Delete</button></div>))}</div>)}
                            <div className="d-grid">
                                <button type="submit" className="btn" style={{ backgroundColor: "#202020", color: "#FFFFFF" }} onClick={submitNewCard}>Add New Card</button>
                            </div>
                        </form>
                    </div>
                </div>
            </AccountSidebar>
        </div>
    )
}
