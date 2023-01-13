import React, { useEffect } from 'react';
import UsersNavbar from '../../../components/UsersNavbar';
import { getData } from '../../../functions';
import { useNavigate } from 'react-router-dom';

export default function PatchNotes() {

  const nav = useNavigate();

  useEffect(() => {
    const check = async () => {
      const response = await getData("/");
      if (!response) {
        nav("/login");
      }
    };
    check();
  });

  const notes = [{}];


  return (
    <div className='App'>
      <UsersNavbar />
      <div>
        
      </div>
    </div>
  )
}
