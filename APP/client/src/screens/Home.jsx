import React from 'react'
import { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { getData } from '../functions';

export default function Home() {

    let [data, setData] = useState(null);
    let [errorMessage, setErrorMessage] = useState(null)
    const nav = useNavigate();

    async function submitLogout(e) {
        e.preventDefault();
        const response = await getData("/logout", {});
        if(response.state === true) {
            console.log("User Successfuly Logout! ", response);
            nav('/login');
        } else {
            setErrorMessage(response.message);
        }
    }

    return (
        <form onSubmit={submitLogout}>
            <h3>Welcome</h3>
            {errorMessage ? (<span style={{ color: "red" }}>{errorMessage}</span>) : (null)}
            <button>Deneme</button>
        </form>
    )
}
