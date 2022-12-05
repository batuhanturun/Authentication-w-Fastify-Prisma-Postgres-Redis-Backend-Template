import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import { getData } from '../functions';

export default function AdminPage() {

    let [isAuth, setIsAuth] = useState(false);
    let [errorMessage, setErrorMessage] = useState(null)
    const nav = useNavigate();

    async function submitAdminLogout(e) {
        e.preventDefault();
        const response = await getData("/adminlogout");
        if (response.state === true) {
            console.log("Admin Successfuly Logout! ", response);
            setIsAuth(false);
            nav('/adminlogin');
        } else {
            setErrorMessage(response.message);
        }
    }

    async function submitLogin(e) {
        e.preventDefault();
        nav('/adminlogin');
    }


    async function home(e) {
        e.preventDefault();
        const response = await getData("/");
        if (response.state === true) {
            setIsAuth(true);
        } else {
            setErrorMessage(response.errorMessage);
        }
    }


    return (
        <form>
            <h3>Welcome</h3>
            {errorMessage ? (<span style={{ color: "red" }}>{errorMessage}</span>) : (null)}
            {isAuth ? (<button onClick={submitAdminLogout}>Logout</button>) : (<button onClick={submitLogin}>Login</button>)}
        </form>
    )
}
