import React, { useEffect, useState } from 'react'
import UsersNavbar from '../../../components/UsersNavbar';
import AccountSidebar from '../../../components/AccountSidebar';
import { deleteData, getData } from '../../../functions';
import { useNavigate, useParams } from "react-router-dom";

export default function PaymentMethods() {

    let [cnumber, setCNumber] = useState([]);
    let [successMessage, setSuccessMessage] = useState(null);
    let [errorMessage, setErrorMessage] = useState(null);
    const param = useParams();
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
        e.preventDefault();
        nav("/profile/addpaymentmethod");
    }

    async function submitChangeCard(e) {
        e.preventDefault();
        nav(`/profile/paymentmethods/${param.id}`);
    }

    async function submitDeleteCard(e) {
        e.preventDefault();
        const deleteCard = await deleteData(`/profile/paymentmethods/${param.id}`);
        if(deleteCard.state) {
            setSuccessMessage("Kredi kartı başarılı bir şekilde silindi.");
        } else {
            setErrorMessage(deleteCard.message);
        }
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
                            {successMessage ? (<span style={{ color: "green" }}>{successMessage}</span>) : (null)}
                            {cnumber.length === 0 ? (<div>Payment Methods Not Found</div>) : (<div className='mb-3'>{cnumber.map(cnumber => (<div>****-****-****-*{cnumber.cardLastDigits}
                                <button onClick={submitChangeCard}>Edit</button>
                                <button onClick={submitDeleteCard}>Delete</button>
                                </div>))}</div>)}
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
