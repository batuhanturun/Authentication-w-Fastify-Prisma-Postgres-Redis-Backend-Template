import React, { useEffect, useState } from 'react'
import { getData } from '../../../functions';
import UsersNavbar from '../../../components/UsersNavbar';
import AnonymousNavbar from '../../../components/AnonymousNavbar';

export default function Home() {

    let [isLog, setIsLog] = useState();
    let [loading, setLoading] = useState(false);

    useEffect(() => {
        const home = async () => {
            setLoading(true);
            const response = await getData("/").then(setLoading(false));
            if (!response.state) {
                setIsLog(false);

            } else {
                setIsLog(true);
            }
        };
        home();
    });

    return (
        <div className="App">
            {loading ? (
                <div className="loader-container">
                    <div className="spinner"></div>
                </div>
            ) : (
                <>
                    {isLog ? <UsersNavbar /> : <AnonymousNavbar />}
                    <div className="auth-wrapper">
                        <div className="auth-inner">
                            <form>
                                <h3>Welcome</h3>

                            </form>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}
