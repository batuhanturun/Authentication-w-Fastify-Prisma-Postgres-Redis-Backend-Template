import React, { useState, useEffect, Fragment } from 'react';
import { useParams } from 'react-router-dom';
import { getData, patchData, deleteData } from '../../../functions';

export default function AdminNoteOptions() {

    let [title, setTitle] = useState();
    let [newNotes, setNewNotes] = useState();
    let [validUrl, setValidUrl] = useState(false);
    let [errorMessage, setErrorMessage] = useState(null);
    const param = useParams();

    useEffect(() => {
        const noteURL = async () => {
            try {
                const response = await getData(`/admin/patchnotes/${param.id}`);
                if (response.state) {
                    setValidUrl(true);
                }
            } catch (error) {
                setErrorMessage(error);
            }
        };
        noteURL();
    }, [param]);

    async function submitUpdate(e) {
        e.preventDefault();
        const response = await patchData(`/admin/patchnotes/${param.id}`, { newNotes: newNotes, title: title });
    }

    async function submitDelete(e) {
        e.preventDefault();
        const response = await deleteData(`/admin/patchnotes/${param.id}`);

    }

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
