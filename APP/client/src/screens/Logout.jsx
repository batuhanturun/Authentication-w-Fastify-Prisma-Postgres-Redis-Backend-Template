import React, { useEffect, Fragment } from 'react'
import { getData } from '../functions';

export default function Logout() {

    useEffect(() => {
        const logOut = async () => {
            try {
                var timeleft = 3;
                var downloadTimer = setInterval(function () {
                    if (timeleft <= 0) {
                        clearInterval(downloadTimer);
                    }
                    timeleft -= 1;
                }, 1000);
                const response = await getData("/logout");
                console.log(response);
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
