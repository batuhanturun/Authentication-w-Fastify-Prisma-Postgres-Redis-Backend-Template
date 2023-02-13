import React, { useEffect, useState } from 'react'
import UsersNavbar from '../../../components/UsersNavbar';
import AccountSidebar from '../../../components/AccountSidebar';
import { getData } from '../../../functions';
import { useNavigate } from "react-router-dom";

export default function Services() {

    let [bammaActive, setBammaActive] = useState();
    let [isPremium, setIsPremium] = useState();
    let [awsActive, setAwsActive] = useState();
    let [awsPlus, setAwsPlus] = useState();
    let [highCap, setHighCap] = useState();

    const nav = useNavigate();

    useEffect(() => {
        const check = async () => {
            const response = await getData("/");
            if (!response.state) {
                nav("/login");
            }
            const data = await getData("/services");
            if (data.state) {
                setBammaActive(data.bammaActive);
                setIsPremium(data.isPremium);
                setAwsActive(data.awsActive);
                setAwsPlus(data.awsPlusActive);
                setHighCap(data.highCap);
            }
        };
        check();
    });

    return (
        <div className="App">
            <UsersNavbar />
            <AccountSidebar>
                <div className='auth-wrapper'>
                    <div className='auth-inner'>
                    <form>
                            <h3>Services</h3>
                            {isPremium ? (<div>
                                <div className='mb-3'>
                                    <label>Premium: {isPremium ? (<>Aktif</>) : (<>Pasif</>)}</label>
                                </div>
                                <div className='mb-3'>
                                    <label>Bamma Erişim: {bammaActive ? (<>Aktif</>) : (<>Pasif</>)}</label>
                                </div>
                                <div className='mb-3'>
                                    <label>AWS Erişim: {awsActive ? (<>Aktif</>) : (<>Pasif</>)}</label>
                                </div>
                                <div className='mb-3'>
                                    <label>AWS Premium: {awsPlus ? (<>Aktif</>) : (<>Pasif</>)}</label>
                                </div>
                                <div className='mb-3'>
                                    <label>Kapasite: {highCap ? (<>Yüksek Kapasite</>) : (<>Düşük Kapasite</>)}</label>
                                </div>
                            </div>) : (<div className='mb-3'>No Service Aviable</div>)}
                        </form>
                    </div>
                </div>
            </AccountSidebar>
        </div>
    )
}
