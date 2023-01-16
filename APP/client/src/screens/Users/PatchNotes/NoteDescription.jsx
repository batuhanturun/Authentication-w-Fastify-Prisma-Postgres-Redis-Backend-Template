import React, { useState, useEffect, Fragment } from 'react';
import { useParams } from 'react-router-dom';
import { getData } from '../../../functions';

export default function NoteDescription() {

    let [validUrl, setValidUrl] = useState(false);
    let [errorMessage, setErrorMessage] = useState(null);
    const param = useParams();

    useEffect(() => {
        const noteURL = async () => {
            try {
                const response = await getData(`/patchnotes/${param.id}`);
                if (response.state) {
                    setValidUrl(true);
                }
            } catch (error) {
                setErrorMessage(error);
            }
        };
        noteURL();
    }, [param]);

  return (
    <div className='App'>
            <Fragment>
                {validUrl ? (
                <>
                </>): (<h1>404 Not Found</h1>)}
        </Fragment>
    </div>
  )
}
