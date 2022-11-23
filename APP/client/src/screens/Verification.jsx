/*
Bu kısım link'e tıklanınca onaylama aktifleşmesi için. Daha aktif değil.
*/
import React, { useState } from 'react'
import { getData } from '../functions';

export default function Verification() {

    let [errorMessage, setErrorMessage] = useState(null);

    async function submitVerification(e) {
        e.preventDefault();
        const response = await getData("/:email/:verifycode");
        if (response.state === true) {
            setErrorMessage(null);
            console.log("Kullanıcı başarılı bir şekilde onaylandı. ", response);
        } else {
            setErrorMessage(response.message);
        }
    }

    return (
        <form>
            <h3>User Verification</h3>
            {errorMessage ? (<span style={{ color: "red" }}>{errorMessage}</span>) : (<span style={{ color: "green" }}>Kullanıcı başarılı bir şekilde onaylandı.</span>)}
        </form>
    )
}
