import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { getData } from '../functions';

export default function Home() {

    let [data, setData] = useState(null);
    let [isAuth, setIsAuth] = useState(false);
    let [errorMessage, setErrorMessage] = useState(null)
    const nav = useNavigate();

    async function submitLogout(e) {
        e.preventDefault();
        const response = await getData("/logout");
        if(response.state === true) {
            console.log("User Successfuly Logout! ", response);
            setIsAuth(false);
            nav('/login');
        } else {
            setErrorMessage(response.message);
        }
    }

    return (
        <>
        <form onSubmit={submitLogout}>
            <h3>Welcome</h3>
            {errorMessage ? (<span style={{ color: "red" }}>{errorMessage}</span>) : (null)}
            <button>Logout</button>
        </form>
        </>
    )
}
