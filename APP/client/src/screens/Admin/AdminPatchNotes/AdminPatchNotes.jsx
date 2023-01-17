import React, { useEffect, useState } from 'react';
import AdminNavbar from '../../../components/AdminNavbar';
import { getData, postData } from '../../../functions';
import { Link, useNavigate } from 'react-router-dom';
import { BsPatchPlus } from "react-icons/bs";

export default function AdminPatchNotes() {

    let [hopup, setHopup] = useState(false);
    let [notes, setNotes] = useState();
    let [title, setTitle] = useState();
    let [uid, setUId] = useState();
    let [utitle, setUTitle] = useState();
    let [errorMessage, setErrorMessage] = useState(null);
    const nav = useNavigate();

    useEffect(() => {
        const check = async () => {
            const response = await getData("/admin/patchnotes");
            if (!response.state) {
                nav("/adminlogin");
            } else {
                setUId(response.id);
                setUTitle(response.title);
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
                    <form onSubmit={submitCreate}>
                        <div className='mb-3'>
                            <label>Title:</label>
                            <input type="text" name='title' className="form-control" placeholder="Enter Title" required onChange={(e) => setTitle(e.target.value)} />
                        </div>
                        <div className='mb-3'>
                            <label>Notes:</label>
                            <input type="text" name='notes' className="form-control" placeholder="Enter Notes" required onChange={(e) => setNotes(e.target.value)} />
                        </div>
                        <div className="d-grid">
                            <button type="submit" className="btn" style={{ backgroundColor: "#202020", color: "#FFFFFF" }}>Create Note</button>
                        </div>
                    </form>
                </div>) : null}
                <form>
                    {uid === undefined ? (null) : (<div className='mb-3'>
                        <Link to={"/admin/patchnotes/" + uid}>{uid + ", " + utitle}</Link>
                    </div>)}

                </form>
            </div>


        </div>
    )
}
