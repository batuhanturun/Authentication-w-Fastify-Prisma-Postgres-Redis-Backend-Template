import React, { useEffect, Fragment } from 'react';
import { useNavigate } from "react-router-dom";
import { getData } from '../functions';

export default function Logout() {

    const nav = useNavigate();

    useEffect(() => {
        const logOut = async () => {
            try {
                var counter = 0;
                var interval = setInterval(async function () {
                    counter++;
                    if (counter === 3) {
                        const response = await getData("/logout");
                        console.log(response);
                        nav("/login");
                        clearInterval(interval);
                    }
                }, 1000);
            } catch (error) {
                console.log(error);
            }
        };
        logOut();
    })

    return (
        <Fragment>
            <form>
                <h3>Çıkış Yapılıyor...</h3>
            </form>
        </Fragment>
    )
}
