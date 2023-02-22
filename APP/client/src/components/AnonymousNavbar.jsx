import React from 'react';
import { Link } from "react-router-dom";

export default function AnonymousNavbar() {
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light">
                <div className="container">
                    <Link className="navbar-brand" to={'/'}>
                        Authentication Demo
                    </Link>
                    <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item ">
                                <Link className="nav-link" to={'/contact'}>
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div id="navbarTogglerDemo02">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item ">
                                <Link className="nav-link" to={'/login'}>
                                    Login
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div id="navbarTogglerDemo02">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item ">
                                <Link className="nav-link" to={'/register'}>
                                    Register
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}
