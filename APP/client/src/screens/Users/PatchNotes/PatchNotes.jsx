import React, { useEffect, useState } from 'react';
import UsersNavbar from '../../../components/UsersNavbar';
import { getData } from '../../../functions';
import { Link, useNavigate } from 'react-router-dom';

export default function PatchNotes() {

  const nav = useNavigate();

  let [title, setTitle] = useState();
  let [errorMessage, setErrorMessage] = useState(null);
  let [id, setId] = useState();

  useEffect(() => {
    const check = async () => {
      const check = await getData("/login");
      if (!check.state) {
        nav("/login");
      } else {
        const response = await getData("/patchnotes");
        if (response.state) {
          setTitle(response.title);
          setId(response.id);
        } else {
          setErrorMessage(response.message);
        }
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
        {id === undefined ? (null) : (<div className='mb-3'>
          <Link to={"/patchnotes/" + id}>{id + ", " + title}</Link>
        </div>)}
      </form>
    </div>
  )
}
