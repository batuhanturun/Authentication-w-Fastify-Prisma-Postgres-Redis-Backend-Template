import React, { useEffect, useState } from 'react'
import { getData } from '../../../functions';
import UsersNavbar from '../../../components/UsersNavbar';
import AnonymousNavbar from '../../../components/AnonymousNavbar';

export default function Home() {

    let [isLog, setIsLog] = useState();

    useEffect(() => {
        const home = async () => {
            const response = await getData("/");
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
            {isLog ? <UsersNavbar /> : <AnonymousNavbar />}
            <div className="auth-wrapper">
                <div className="auth-inner">
                    <form>
                        <h3>Welcome</h3>

                    </form>
                </div>
            </div>
        </div>
    )
}
