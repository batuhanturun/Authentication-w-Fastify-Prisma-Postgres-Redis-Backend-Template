import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import { getData } from '../functions';

export default function Home() {

    let [isAuth, setIsAuth] = useState(false);
    let [errorMessage, setErrorMessage] = useState(null)
    const nav = useNavigate();

    async function submitLogout(e) {
        e.preventDefault();
        const response = await getData("/logout");
        if (response.state === true) {
            console.log("User Successfuly Logout! ", response);
            localStorage.removeItem("token");
            setIsAuth(false);
            nav('/login');
        } else {
            setErrorMessage(response.message);
        }
    }

    async function submitLogin(e) {
        e.preventDefault();
        nav('/login');
    }

    useEffect(() => {
        const home = async () => {
            try {
                const response = await getData("/");
                if (response.state) {
                    setIsAuth(true);
                } else {
                    setErrorMessage(response.errorMessage);
                }
            } catch (error) {
                console.log(error);
            }
        };
        home();
    })

    return (
        <form>
            <h3>Welcome</h3>
            {errorMessage ? (<span style={{ color: "red" }}>{errorMessage}</span>) : (null)}
            {isAuth ? (<button onClick={submitLogout}>Logout</button>) : (<button onClick={submitLogin}>Login</button>)}
        </form>
    )
}
