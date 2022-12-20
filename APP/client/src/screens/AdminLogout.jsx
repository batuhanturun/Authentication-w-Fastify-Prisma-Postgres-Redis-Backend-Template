import React, { useEffect, Fragment } from 'react';
import { useNavigate } from "react-router-dom";
import { getData } from '../functions';

export default function AdminLogOut() {

    const nav = useNavigate();

    useEffect(() => {
        const adminLogOut = async () => {
            try {
                const check = await getData("/adminlogin");
                if (check.state) {
                    var counter = 0;
                    var interval = setInterval(async function () {
                        counter++;
                        if (counter === 3) {
                            const response = await getData("/adminlogout");
                            if (response.logout) {
                                nav("/adminlogin");
                                clearInterval(interval);
                            } else {
                                console.log("Hata oluştu.");
                            }
                        }
                    }, 1000);
                } else {
                    nav("/adminlogin")
                }
            } catch (error) {
                console.log(error);
            }
        };
        adminLogOut();
    })

    return (
        <div className="App">
            <nav className="navbar navbar-expand-lg navbar-light fixed-top">
                <Fragment>
                    <form>
                        <h3>Çıkış Yapılıyor...</h3>
                    </form>
                </Fragment>
            </nav>
        </div>
    )
}
