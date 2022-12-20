import React, { useEffect, Fragment } from 'react';
import { useNavigate } from "react-router-dom";
import { getData } from '../functions';

export default function Logging() {

    const nav = useNavigate();

    useEffect(() => {
        const logging = async () => {
            try {
                const check = await getData("/login");
                if (check.state) {
                    var counter = 0;
                    var interval = setInterval(async function () {
                        counter++;
                        if (counter === 3) {
                            nav("/");
                            clearInterval(interval);
                        }
                    }, 1000);
                } else {
                    nav("/login")
                }
            } catch (error) {
                console.log(error);
            }
        };
        logging();
    });

    return (
        <div className="App">
            <nav className="navbar navbar-expand-lg navbar-light fixed-top">
                <Fragment>
                    <form>
                        <h3>Giriş Yapılıyor...</h3>
                    </form>
                </Fragment>
            </nav>
        </div>
    )
}
