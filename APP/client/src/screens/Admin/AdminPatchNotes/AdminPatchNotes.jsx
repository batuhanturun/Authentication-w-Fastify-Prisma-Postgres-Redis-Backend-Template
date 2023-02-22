import React, { useEffect, useState } from 'react';
import AdminNavbar from '../../../components/AdminNavbar';
import { getData, postData } from '../../../functions';
import { Link, useNavigate } from 'react-router-dom';
import { BsPatchPlus } from "react-icons/bs";

export default function AdminPatchNotes() {

    let [hopup, setHopup] = useState(false);
    let [notes, setNotes] = useState();
    let [title, setTitle] = useState();
    let [getNote, setGetNote] = useState([]);
    let [errorMessage, setErrorMessage] = useState(null);
    const nav = useNavigate();

    useEffect(() => {
        const check = async () => {
            const check = await getData("/admin");
            if (!check.state) {
                nav("/adminlogin");
            }
            const response = await getData("/admin/patchnotes");
            if (response.state) {
                setGetNote(response.notes);
            } else {
                setErrorMessage(response.message);
            }
        };
        check();
    });

    async function submitHopup() {
        if (hopup) {
            setHopup(false);
        } else {
            setHopup(true);
        }
    }

    async function submitCreate(e) {
        e.preventDefault();
        const response = await postData("/admin/patchnotes", { notes: notes, title: title });
        if (response) {
            console.log("Not başarılı bir şekilde eklendi.");
        } else {
            setErrorMessage(response.message);
        }
    }

    return (
        <div className='App'>
            <AdminNavbar />
            <div>
                <h1 style={{ color: "white" }}>Patch Notes</h1>
                <button className='btn' onClick={submitHopup} style={{ background: "white" }}><BsPatchPlus size={25} /> Add Note</button>
                {errorMessage ? (<span style={{ color: "red" }}>{errorMessage}</span>) : (null)}
                {hopup ? (<div className='auth-inner'>
                    <div className='mb-3'>
                        <label>Title:</label>
                        <input type="text" name='title' className="form-control" placeholder="Enter Title" required onChange={(e) => setTitle(e.target.value)} />
                    </div>
                    <div className='mb-3'>
                        <label>Notes:</label>
                        <input type="text" name='notes' className="form-control" placeholder="Enter Notes" required onChange={(e) => setNotes(e.target.value)} />
                    </div>
                    <div className="d-grid">
                        <button type="submit" className="btn" onClick={submitCreate} style={{ backgroundColor: "#202020", color: "#FFFFFF" }}>Create Note</button>
                    </div>
                </div>) : null}

                <form>
                    {getNote.length === 0 ? (<div style={{color: "white"}}>No note</div>) : (<div className='mb-3'>
                        {getNote.map(getNote => (<div><Link to={"/patchnotes/" + getNote.id}>{getNote.id + ", " + getNote.title}</Link></div>))}
                    </div>)}
                </form>

            </div>


        </div>
    )
}
