import React, { useEffect, useState } from 'react';
import UsersNavbar from '../../../components/UsersNavbar';
import { getData } from '../../../functions';
import { Link, useNavigate } from 'react-router-dom';

export default function PatchNotes() {

  const nav = useNavigate();

  let [errorMessage, setErrorMessage] = useState(null);
  let [notes, setNotes] = useState([]);

  useEffect(() => {
    const check = async () => {
      const check = await getData("/login");
      if (!check.state) {
        nav("/login");
      }
      const response = await getData("/patchnotes");
      if (response.state) {
        setNotes(response.notes);
      } else {
        setErrorMessage(response.message);
      }
    };
    check();
  });

  return (
    <div className='App'>
      <UsersNavbar />
      <div>
        <h1 style={{ color: "white" }}>Patch Notes</h1>
        {errorMessage ? (<span style={{ color: "red" }}>{errorMessage}</span>) : (null)}
      </div>
      <form>
        {notes === undefined ? (null) : (<div className='mb-3'>
          {notes.map(notes => (<Link to={"/patchnotes/"+notes.id}>{notes.id + ", " + notes.title}</Link>))}       
        </div>)}
      </form>
    </div>
  )
}
