import React, { useState } from 'react';
import { useNavigate, Link } from "react-router-dom";
import { postData } from '../functions';

export default function Login() {

  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [errorMessage, setErrorMessage] = useState(null)
  const nav = useNavigate();

  async function submitLogin(e) {
    e.preventDefault();
    const response = await postData("/login", { email: email, password: password });
    if (response.state === true) {
      console.log("User Successfuly Logged In! ", response);
      nav('/');
    }
    else {
      setErrorMessage(response.message);
    }
  }

  return (
    <form onSubmit={submitLogin}>
      <h3>Login</h3>  
      {errorMessage ? (<span style={{ color: "red" }}>{errorMessage}</span>) : (null)}
      <div className='mb-3'>
        <label>Email:</label>
        <input type="email" name='email' className="form-control" placeholder="Enter Email" required onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div className="mb-3">
        <label>Password:</label>
        <input type="password" name='password' className="form-control" placeholder="Enter Password" required onChange={(e) => setPassword(e.target.value)} />
      </div>
      <div className="d-grid">
        <button type="submit" className="btn btn-primary">Login</button>
      </div>
      <p className="forgot-password text-right">Don't have an account? <Link to="/register">Register!</Link></p>
      <p className="forgot-password text-right"><Link to="/resetpassword">Forgot Password?</Link></p>
      <p className="forgot-password text-right"><Link to="/resendverificationmail">Verify Your Account!</Link></p>
    </form>
  )

}