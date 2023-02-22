import React, { useState, useEffect, Fragment } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getData, patchData, deleteData } from '../../../functions';
import { BsPencil, BsXCircle } from "react-icons/bs";
import AdminNavbar from '../../../components/AdminNavbar';

export default function AdminNoteOptions() {

    let [hopup, setHopup] = useState(false);
    let [title, setTitle] = useState();
    let [note, setNote] = useState();
    let [newNotes, setNewNotes] = useState();
    let [newTitle, setNewTitle] = useState();
    let [date, setDate] = useState();
    let [validUrl, setValidUrl] = useState(false);
    let [errorMessage, setErrorMessage] = useState(null);
    const param = useParams();

    const nav = useNavigate();

    useEffect(() => {
        const noteURL = async () => {
            try {
                const check = await getData("/admin");
                if (!check.state) {
                    nav("/adminlogin");
                } else {
                    const response = await getData(`/admin/patchnotes/${param.id}`);
                    if (!response.state) {
                        setValidUrl(false);
                    } else {
                        setTitle(response.title);
                        setNote(response.notes);
                        setDate(response.date);
                        setValidUrl(true);
                    }
                }
            } catch (error) {
                setErrorMessage(error);
            }
        };
        noteURL();
    }, [param]);

    async function submitUpdate(e) {
        e.preventDefault();
        const response = await patchData(`/admin/patchnotes/${param.id}`, { newNotes: newNotes, newTitle: newTitle });
        if (response.state) {
            console.log("Not başarılı bir şekilde değiştirildi.");
            window.location.reload(true);
        } else {
            setErrorMessage(response.message);
        }
    }

    async function submitDelete(e) {
        e.preventDefault();
        const response = await deleteData(`/admin/patchnotes/${param.id}`);
        if (response.state) {
            console.log("Not başarılı bir şekilde silindi.");
            nav("/admin/patchnotes");
        } else {
            setErrorMessage(response.message);
        }
    }

    async function submitHopup() {
        if (hopup) {
            setHopup(false);
        } else {
            setHopup(true);
        }
    }

    return (
        <div className='App'>
            <AdminNavbar />
            <Fragment>
                {validUrl ? (
                    <div>
                        <h3 style={{ color: "white" }}>Patch Note: {param.id}</h3>
                        <div className='container'>
                            <button className='btn' onClick={submitHopup} style={{ background: "white" }}><BsPencil size={25} /> Edit Note</button>
                            <button className='btn' onClick={submitDelete} style={{ background: "white" }}><BsXCircle size={25} /> Delete Note</button>
                        </div>
                        {errorMessage ? (<span style={{ color: "red" }}>{errorMessage}</span>) : (null)}
                        {hopup ? (<div className='auth-inner'>                  
                                <div className='mb-3'>
                                    <label>Title:</label>
                                    <input type="text" name='title' className="form-control" placeholder="Enter New Title" required onChange={(e) => setNewTitle(e.target.value)} />
                                </div>
                                <div className='mb-3'>
                                    <label>Notes:</label>
                                    <input type="text" name='notes' className="form-control" placeholder="Enter New Notes" required onChange={(e) => setNewNotes(e.target.value)} />
                                </div>
                                <div className="d-grid">
                                    <button type="submit" className="btn" onClick={submitUpdate} style={{ backgroundColor: "#202020", color: "#FFFFFF" }}>Change Note</button>
                                </div>
                        </div>) : null}
                        <div className='mb-3' style={{color: "white"}}>
                            {title}
                        </div>
                        <div className='mb-3' style={{color: "white"}}>
                            {note}
                        </div>
                        <p className='mb-3 forgot-password text-right'>{date}</p>
                    </div>) : (<h1>404 Not Found</h1>)}
            </Fragment>
        </div>
    )
}
