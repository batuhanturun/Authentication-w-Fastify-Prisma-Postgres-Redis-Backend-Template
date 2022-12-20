import React, { useEffect, Fragment } from 'react';
import { useNavigate } from "react-router-dom";
import { getData } from '../functions';

export default function Successful() {

    const nav = useNavigate();

    useEffect(() => {
        const successful = async () => {
            try {
                const check = await getData("/login");
                if (!check.state) {
                    var counter = 0;
                    var interval = setInterval(async function () {
                        counter++;
                        if (counter === 3) {
                            nav("/login");
                            clearInterval(interval);
                        }
                    }, 1000);
                } else {
                    nav("/")
                }
            } catch (error) {
                console.log(error);
            }
        };
        successful();
    });

    return (
        <div className="App">
            <nav className="navbar navbar-expand-lg navbar-light fixed-top">
                <Fragment>
                    <form>
                        <h3>İşlem Başarılı! Giriş Sayfasına Yönlendiriliyorsunuz...</h3>
                    </form>
                </Fragment>
            </nav>
        </div>
    )
}
