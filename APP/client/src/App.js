import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from './screens/Home';
import Login from "./screens/Login";
import Register from "./screens/Register";
import ResetPassword from "./screens/ResetPassword";
import ResendVerificationMail from "./screens/ResendVerificationMail";
import AdminPage from "./screens/AdminPage";
import AdminLogin from "./screens/AdminLogin";
import './App.css'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Verification from "./screens/Verification";
import ResetPasswordMail from "./screens/ResetPasswordMail";
import Logout from "./screens/Logout";
import AdminLogOut from "./screens/AdminLogout";

import { getData } from "./functions";
import { useEffect, useState } from "react";

function App() {

  let [user, setUser] = useState();
  let [admin, setAdmin] = useState();

  
  useEffect(() => {
    const welcome = async () => {
      try {
        const response1 = await getData("/adminlogin");
        if(response1.state) {
          setAdmin(true)
        } else {
          const response2 = await getData("/login");
        if(response2.state) {
          setUser(true); 
        } else{
          setUser(false);
        }
        }     
      } catch (error) {
        console.log(error);
      }
    };
    welcome();
  }, [admin, user]);
  

  return (
    <BrowserRouter>
      <Routes>
        {user && <Route path='/' exact element={<Home />} />}
        {user && <Route path='/logout' exact element={<Logout />} />}
        {user && <Route path='/login' exact element={<Navigate replace to="/" />} />}
        {user && <Route path='/register' exact element={<Navigate replace to="/" />} />}
        {user && <Route path='/resetpassword' exact element={<Navigate replace to="/" />} />}
        {user && <Route path='/resendverificationmail' exact element={<Navigate replace to="/" />} />}
        {admin && <Route path='/adminlogin' exact element={<Navigate replace to="/admin" />} />}
        {admin && <Route path='/admin' exact element={<AdminPage />} />}
        {admin && <Route path='/adminlogout' exact element={<AdminLogOut />} />}
        <Route path='/login' exact element={<Login />} />
        <Route path='/register' exact element={<Register />} />
        <Route path='/resetpassword' exact element={<ResetPassword />} />
        <Route path='/resendverificationmail' exact element={<ResendVerificationMail />} />
        <Route path='/adminlogin' exact element={<AdminLogin />} />
        <Route path='/admin' exact element={<Navigate replace to="/adminlogin" />} />
        <Route path='/' exact element={<Navigate replace to="/login" />} />
        <Route path='/logout' exact element={<Navigate replace to="/login" />} />
        <Route path="/verify/:id/:verifyCode" element={<Verification />} />
        <Route path="/reset/:id/:resetCode" element={<ResetPasswordMail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;