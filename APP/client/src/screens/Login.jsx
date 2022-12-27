import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from "react-router-dom";
import { postData, getData } from '../functions';

export default function Login() {

  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [errorMessage, setErrorMessage] = useState(null);

  const nav = useNavigate();

  useEffect(() => {
    const check = async () => {
      const response = await getData("/login");
      if (response.state) {
        nav("/");
      }
    };
    check();
  });

  async function submitLogin(e) {
    e.preventDefault();
    const response = await postData("/login", { email: email, password: password });
    if (response.state) {
      nav("/logging");
    }
    else {
      setErrorMessage(response.message);
    }
  }

  return (
    <div className="App">
      <nav className="navbar navbar-expand-lg navbar-light fixed-top">
        <div className="container">
          <Link className="navbar-brand" to={'/'}>
            Authentication Demo
          </Link>
        </div>
      </nav>
      <div className="auth-wrapper">
        <div className="auth-inner">
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
              <button type="submit" className="btn" style={{backgroundColor: "#202020", color: "#FFFFFF"}}>Login</button>
            </div>
            <p className="forgot-password text-right">Don't have an account? <Link to="/register">Register!</Link></p>
            <p className="forgot-password text-right"><Link to="/resetpassword">Forgot Password?</Link></p>
            <p className="forgot-password text-right"><Link to="/resendverificationmail">Verify Your Account!</Link></p>
          </form>
        </div>
      </div>
    </div>
  )
}