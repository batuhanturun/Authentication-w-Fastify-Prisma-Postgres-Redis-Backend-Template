import React, { useEffect, useState } from 'react'
import AdminNavbar from '../../../components/AdminNavbar';
import AdminSidebar from '../../../components/AdminSidebar';
import { getData } from '../../../functions';
import { useNavigate } from "react-router-dom";

export default function AdminServices() {

    let [bammaActive, setBammaActive] = useState();
    let [isPremium, setIsPremium] = useState();
    let [awsActive, setAwsActive] = useState();
    let [awsPlus, setAwsPlus] = useState();
    let [highCap, setHighCap] = useState();

    const nav = useNavigate();

    useEffect(() => {
        const check = async () => {
            const response = await getData("/admin");
            if (!response.state) {
                nav("/adminlogin");
            }
            const data = await getData("/admin/services");
            if (data.state) {
                setBammaActive(data.bammaActive);
                setIsPremium(data.isPremium);
                setAwsActive(data.awsActive);
                setAwsPlus(data.awsPlus);
                setHighCap(data.highCap);
            }
        };
        check();
    });

    return (
        <div className="App">
            <AdminNavbar />
            <AdminSidebar>
                <div className='auth-wrapper'>
                    <div className='auth-inner'>
                        <form>
                            <h3>Services</h3>
                            {isPremium ? (<div>
                                <div className='mb-3'>
                                    <label>{isPremium}</label>
                                </div>
                                <div className='mb-3'>
                                    <label>{bammaActive}</label>
                                </div>
                                <div className='mb-3'>
                                    <label>{awsActive}</label>
                                </div>
                                <div className='mb-3'>
                                    <label>{awsPlus}</label>
                                </div>
                                <div className='mb-3'>
                                    <label>{highCap}</label>
                                </div>
                            </div>) : (<div className='mb-3'>No Service Aviable</div>)}
                        </form>
                    </div>
                </div>
            </AdminSidebar>
        </div>
    )
}