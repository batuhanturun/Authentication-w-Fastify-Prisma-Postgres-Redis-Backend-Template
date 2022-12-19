import React, { useState, useEffect, Fragment } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getData } from '../functions';

export default function Verification() {

    let [validUrl, setValidUrl] = useState(false);
    let [errorMessage, setErrorMessage] = useState(null);
    const param = useParams();

    useEffect(() => {
        const verifyEmailUrl = async () => {
            try {
                const response = await getData(`/verify/${param.id}/${param.verifyCode}`);
                if (response.state) {
                    setValidUrl(true);
                }
            } catch (error) {
                setErrorMessage(error);
            }
        };
        verifyEmailUrl();
    }, [param]);

    return (
        <div className="App">
            <nav className="navbar navbar-expand-lg navbar-light fixed-top">
                <div className="container">
                    <Link className="navbar-brand" to={'/'}>
                        Authentication Demo
                    </Link>
                </div>
            </nav>
            <div className="App">
                <div className="auth-wrapper">
                    <div className="auth-inner">
                        <Fragment>
                            {validUrl ? (
                                <form>
                                    <h3>User Verification</h3>
                                    {errorMessage ? (<span style={{ color: "red" }}>{errorMessage}</span>) : (<span style={{ color: "green" }}>Kullanıcı başarılı bir şekilde onaylandı. Bu sayfayı kapatabilirsiniz.</span>)}
                                </form>
                            ) : (
                                <h1>404 Not Found</h1>
                            )}
                        </Fragment>
                    </div>
                </div>
            </div>
        </div>
    )
}
