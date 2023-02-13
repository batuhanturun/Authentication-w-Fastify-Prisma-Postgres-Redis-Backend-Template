import React, { useState, useEffect, Fragment } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import UsersNavbar from '../../../components/UsersNavbar';
import { getData } from '../../../functions';

export default function NoteDescription() {

    const nav = useNavigate();

    let [title, setTitle] = useState();
    let [note, setNote] = useState();
    let [validUrl, setValidUrl] = useState(false);
    let [errorMessage, setErrorMessage] = useState(null);
    const param = useParams();

    useEffect(() => {
        const noteURL = async () => {
            try {
                const check = await getData("/login");
                if (!check.state) {
                    nav("/login");
                } else {
                    const response = await getData(`/patchnotes/${param.id}`);
                    if (!response.state) {
                        setValidUrl(false);
                    } else {
                        setTitle(response.title);
                        setNote(response.notes);
                        setValidUrl(true);
                    }
                }
            } catch (error) {
                setErrorMessage(error);
            }
        };
        noteURL();
    }, [param]);

    return (
        <div className='App'>
            <UsersNavbar />
            <Fragment>
                {validUrl ? (
                    <form>
                        <h3 style={{ color: "white" }}>Patch Note: {param.id}</h3>
                        {errorMessage ? (<span style={{ color: "red" }}>{errorMessage}</span>) : (null)}
                        <div className='mb-3'>
                            {title}
                        </div>
                        <div className='mb-3'>
                            {note}
                        </div>
                    </form>) : (<h1>404 Not Found</h1>)}
            </Fragment>
        </div>
    )
}
