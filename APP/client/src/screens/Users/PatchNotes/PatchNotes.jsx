import React, { useEffect } from 'react';
import UsersNavbar from '../../../components/UsersNavbar';
import { getData } from '../../../functions';
import { useNavigate } from 'react-router-dom';

export default function PatchNotes() {

  const nav = useNavigate();

  useEffect(() => {
    const check = async () => {
      const response = await getData("/patchnotes");
      if (!response) {
        nav("/login");
      } else {
        //! Notları çağır.
      }
    };
    check();
  });

  const notes = [{}];


  return (
    <div className='App'>
      <UsersNavbar />
      <div className='container'>
        <h1 style={{ color: "white" }}>Patch Notes</h1>
      </div>
    </div>
  )
}
