import React, { useEffect, Fragment } from 'react';
import { useNavigate } from "react-router-dom";
import { getData } from '../functions';

export default function AdminLogging() {

    const nav = useNavigate();

    useEffect(() => {
        const adminLogging = async () => {
            try {
                const check = await getData("/adminlogin");
                if (check.state) {
                    var counter = 0;
                    var interval = setInterval(async function () {
                        counter++;
                        if (counter === 3) {
                            nav("/admin");
                            clearInterval(interval);
                        }
                    }, 1000);
                } else {
                    nav("/adminlogin")
                }
            } catch (error) {
                console.log(error);
            }
        };
        adminLogging();
    });

    return (
        <div className="App">
            <nav className="navbar navbar-expand-lg navbar-light fixed-top">
                <Fragment>
                    <form>
                        <h3>Admin, Giriş Yapılıyor...</h3>
                    </form>
                </Fragment>
            </nav>
        </div>
    )
}
