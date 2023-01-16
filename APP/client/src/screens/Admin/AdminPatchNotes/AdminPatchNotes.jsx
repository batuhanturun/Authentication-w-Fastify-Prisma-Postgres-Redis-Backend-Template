import React, { useEffect, useState } from 'react';
import AdminNavbar from '../../../components/AdminNavbar';
import { getData, postData, patchData, deleteData } from '../../../functions';
import { useNavigate } from 'react-router-dom';

export default function AdminPatchNotes() {

    let [notes, setNotes] = useState();
    let [title, setTitle] = useState();
    let [errorMessage, setErrorMessage] = useState(null);
    const nav = useNavigate();

    useEffect(() => {
        const check = async () => {
            const response = await getData("/admin/patchnotes");
            if (!response.state) {
                nav("/adminlogin");
            } else {
                //! Notları çağır.
            }
        };
        check();
    });

    async function submitCreate(e) {
        e.preventDefault();
        const response = await postData("/admin/patchnotes", { notes: notes, title: title });
        if (response) {
            console.log("Not başarılı bir şekilde eklendi.");
        } else {
            setErrorMessage(response.message);
        }
    }

    const note = [{}];

    return (
        <div className='App'>
            <AdminNavbar />
            <div className='container'>
                <h1 style={{color: "white"}}>Patch Notes</h1>
            </div>
            

        </div>
    )
}
