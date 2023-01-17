import React, { useEffect, useState } from 'react';
import UsersNavbar from '../../../components/UsersNavbar';
import { getData } from '../../../functions';
import { Link, useNavigate } from 'react-router-dom';

export default function PatchNotes() {

  const nav = useNavigate();

  let [title, setTitle] = useState();
  let [id, setId] = useState();

  useEffect(() => {
    const check = async () => {
      const response = await getData("/patchnotes");
      if (!response) {
        nav("/login");
      } else {
        setTitle(response.title);
        setId(response.id);
      }
    };
    check();
  });

  return (
    <div className='App'>
      <UsersNavbar />
      <div>
        <h1 style={{ color: "white" }}>Patch Notes</h1>
      </div>
      <form>
        {id === undefined ? (null) : (<div className='mb-3'>
          <Link to={"/admin/patchnotes/" + id}>{id + ", " + title}</Link>
        </div>)}
      </form>
    </div>
  )
}
