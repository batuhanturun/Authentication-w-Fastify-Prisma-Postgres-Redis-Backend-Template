import React, { useState, useEffect, Fragment } from 'react';
import { useParams } from 'react-router-dom';
import { getData } from '../functions';

export default function Verification() {

    let [validUrl, setValidUrl] = useState(false);
    const param = useParams();

    useEffect(() => {
        const verifyEmailUrl = async () => {
            try {
                const response = await getData(`/verify/${param.id}/${param.verifyCode}`);
                console.log(response);
                setValidUrl(true);
            } catch (error) {
                console.log(error);
                setValidUrl(false);
            }
        };
        verifyEmailUrl();
    }, [param]);

    return (
        <Fragment>
            {validUrl ? (
            <form>
                <h3>User Verification</h3>
                <span style={{ color: "green" }}>Kullanıcı başarılı bir şekilde onaylandı.</span>
            </form>
            ) : (
            <h1>404 Not Found</h1>
            )}

        </Fragment>
    )
}
