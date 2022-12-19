import React, { useEffect, Fragment } from 'react';
import { useNavigate } from "react-router-dom";
import { getData } from '../functions';

export default function AdminLogOut() {

    const nav = useNavigate();

    useEffect(() => {
        const adminLogOut = async () => {
            try {
                var counter = 0;
                var interval = setInterval(async function () {
                    counter++;
                    if (counter === 3) {
                        const response = await getData("/adminlogout");
                        console.log(response);
                        nav("/adminlogin");
                        clearInterval(interval);
                    }
                }, 1000);
            } catch (error) {
                console.log(error);
            }
        };
        adminLogOut();
    })

    return (
        <Fragment>
            <form>
                <h3>Çıkış Yapılıyor...</h3>
            </form>
        </Fragment>
    )
}
